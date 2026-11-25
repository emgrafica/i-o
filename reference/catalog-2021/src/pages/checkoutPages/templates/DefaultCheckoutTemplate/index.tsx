import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useOBOInfoLocalState } from 'store/apollo/store/hooks';
import { AddressInfoInput } from 'gqlTypes/globalTypes';
import BaseCheckoutTemplate, {
  BaseCheckoutTemplateProps,
} from '../BaseCheckoutTemplate';
import ErrorScreen from '../../../../components/ErrorScreen';
import { UserProfileRequest_userProfile } from '../../../../graphql/queries/gqlTypes/UserProfileRequest';
import { useUserId } from 'containers/AuthContainer/AuthContext';
import { useFormFields } from 'utils/useFormFields';
import { ADDRESS_CONFIG } from 'graphql/queries';
import {
  parseAddressConfig,
  getFormFieldInit,
  getBillingText,
  getCatalogItemClass,
} from '../../utils';
import { GET_CATALOG_ORDER_CONFIG } from 'graphql/queries/catalogOrderConfiguration';
import {
  getCatalogOrderConfiguration,
  getCatalogOrderConfigurationVariables,
} from 'graphql/queries/gqlTypes/getCatalogOrderConfiguration';
import Billing from '../../components/Billing';
import LocationValidationForm from '../../components/LocationValidationForm';
import Shipping from '../../components/Shipping';
import DefaultActionButtons, {
  DefaultActionButtonsProps,
} from '../../components/DefaultActionButtons';
import { CreateCatalogOrder_createCatalogOrder_shippingForm_shippingAddressErrors } from '../../queries/gqlTypes/CreateCatalogOrder';
import LoadingScreen from 'components/LoadingScreen';

const REQUEST_TYPE = 'PrimaryDevice';

type DefaultCheckoutTemplateProps = Pick<
  DefaultActionButtonsProps,
  'submitButtonText' | 'submitButtonIcon' | 'onCancelClick'
> &
  Pick<
    BaseCheckoutTemplateProps,
    'banner' | 'backButton' | 'productDetails' | 'orderDetails'
  > & {
    /**Set to true if the page is loading it's initial data to render the skeletons*/
    showSkeletons?: boolean;
    /**Set to true if the page is submitting a mutation to render the spinner*/
    showSpinner?: boolean;
    /**If true, the Shipping Form is rendered*/
    showShippingForm?: boolean;
    /**If true, the Billing section is rendered*/
    showBilling?: boolean;
    /**Checkout Type e.g. "accessory", "computer", etc*/
    checkoutType: string;
    /**If true the override validation form is displayed*/
    showOverrideValidation?: boolean;
    /**Shipping address error the form has as they come from the BE validation*/
    shippingAddressErrors?: CreateCatalogOrder_createCatalogOrder_shippingForm_shippingAddressErrors | null;
    /**The user profile info to initialize the form fields*/
    userProfile?: UserProfileRequest_userProfile;
    /**Callback to handle the submit button click*/
    onSubmitClick: (
      shippingInfo: AddressInfoInput | null,
      validateAddress: boolean,
    ) => void;
  };

/** Default Checkout Template with shipping and billing templates*/
const DefaultCheckoutTemplate: React.FC<DefaultCheckoutTemplateProps> = ({
  banner,
  backButton,
  productDetails,
  orderDetails,
  showSkeletons,
  showShippingForm,
  showBilling,
  checkoutType,
  showOverrideValidation,
  shippingAddressErrors,
  userProfile,
  showSpinner,
  onSubmitClick,
  onCancelClick,
  submitButtonText,
  submitButtonIcon,
}) => {
  // state to track when the form was already submitted
  const [formWasSubmitted, setFormWasSubmitted] = useState(false);
  // Get OBOUser
  const oboInfoLocalState = useOBOInfoLocalState();
  const oboUser = oboInfoLocalState && oboInfoLocalState.user;
  const currentUserId = useUserId() as string;
  const requestedForUserId = oboUser ? oboUser.userId : currentUserId;

  const {
    loading: isOrderRequestConfigLoading,
    data: catalogOrderConfigData,
  } = useQuery<
    getCatalogOrderConfiguration,
    getCatalogOrderConfigurationVariables
  >(GET_CATALOG_ORDER_CONFIG, {
    variables: {
      assignedToId: requestedForUserId,
      isReplacement: false,
      catalogClass: getCatalogItemClass(checkoutType),
    },
  });
  // Shipping related configuration data that helps enforce validation logic
  const { loading: isAddressConfigLoading, data: addressConfigData } = useQuery(
    ADDRESS_CONFIG,
    {
      variables: {
        catalogClass: getCatalogItemClass(checkoutType),
        requestType: REQUEST_TYPE,
        userId: requestedForUserId,
      },
    },
  );

  // Determines whether the user will bypass the shipping form validation
  const [willOverrideValidation, setWillOverrideValidation] = useState(false);

  const {
    isValid: isShippingFormValid,
    formData: {
      name: { set: nameSet },
      company: { set: companySet },
      address1: { set: address1Set },
      address2: { set: address2Set },
      city: { set: citySet },
      state: { set: stateSet },
      zipCode: { set: zipCodeSet },
      country: { set: countrySet },
      phoneNumber: { set: phoneNumberSet },
    },
    formData: {
      name,
      company,
      address1,
      address2,
      city,
      state,
      zipCode,
      country,
      phoneNumber,
      deliveryInstructions,
    },
  } = useFormFields(getFormFieldInit());

  /**
   * Sets partial user data in form once it is fetched
   */
  useEffect(() => {
    //TODO: When name, lastName and business start coming as part of the address configuration, we need to remove this piece of code and start using only addressConfig as source of true.
    if (userProfile) {
      nameSet(
        userProfile.firstName && userProfile.lastName
          ? `${userProfile.firstName} ${userProfile.lastName}`
          : '',
      );
      companySet(
        userProfile.businessInfo[0].name
          ? userProfile.businessInfo[0].name
          : '',
      );
    }

    //--------------------------------------------------------------------
    // Populate fields based on the result of address configuration query
    //--------------------------------------------------------------------
    if (addressConfigData) {
      const addressToLoad = parseAddressConfig(addressConfigData.addressConfig);
      if (addressToLoad) {
        const {
          address1: addressConfigAddress1,
          address2: addressConfigAddress2,
          city: addressConfigCity,
          country: addressConfigCountry,
          phoneNumber: addressConfigPhoneNumber,
          state: addressConfigPhoneState,
          zip: addressConfigZip,
        } = addressToLoad;

        address1Set(addressConfigAddress1 ? addressConfigAddress1.text : '');
        address2Set(addressConfigAddress2 ? addressConfigAddress2.text : '');
        citySet(addressConfigCity ? addressConfigCity.text : '');
        stateSet(addressConfigPhoneState ? addressConfigPhoneState.text : '');
        zipCodeSet(addressConfigZip ? addressConfigZip.text : '');
        countrySet(addressConfigCountry ? addressConfigCountry.text : '');
        phoneNumberSet(
          addressConfigPhoneNumber ? addressConfigPhoneNumber.text : '',
        );
      }
    }
  }, [
    userProfile,
    addressConfigData,
    nameSet,
    companySet,
    address1Set,
    address2Set,
    citySet,
    stateSet,
    zipCodeSet,
    countrySet,
    phoneNumberSet,
  ]);

  const getShippingInfo = (): AddressInfoInput => ({
    name: name.value,
    company: company.value,
    address1: address1.value,
    address2: address2.value,
    city: city.value,
    state: state.value,
    zip: zipCode.value,
    country: country.value,
    phone: phoneNumber.value,
    additionalDeliveryInfo: deliveryInstructions.value,
  });

  const handleSubmit = () => {
    setFormWasSubmitted(true);
    /*
     * If the shipping form is invalid and the user is not attempting to override validation, prevent submit
     * Otherwise, allow user to submit request
     */
    let canSubmit = true;
    if (showShippingForm) {
      canSubmit =
        isShippingFormValid || (!isShippingFormValid && willOverrideValidation);
    }

    if (canSubmit) {
      const validateAddress =
        !willOverrideValidation &&
        addressConfigData &&
        addressConfigData.addressConfig.carrier !== '' &&
        addressConfigData.addressConfig.addressEditable;

      // TODO: Ideally we could move showOverrideValidation to this component and handle the visibility of the override here,
      // but only way of doing that is if we separate that validation from the create Order mutation.
      onSubmitClick(
        showShippingForm ? getShippingInfo() : null,
        showShippingForm ? validateAddress : false,
      );
    }
  };

  // onChange handler for shipping form validation override checkbox
  const handleFormValidationOverrideChange = () => {
    setWillOverrideValidation(
      prevWillOverrideValidation => !prevWillOverrideValidation,
    );
  };

  const isLoadingFull =
    showSkeletons || isOrderRequestConfigLoading || isAddressConfigLoading;

  const displayCheckoutContent = userProfile;

  return showSpinner ? (
    <LoadingScreen />
  ) : displayCheckoutContent || isLoadingFull ? (
    <BaseCheckoutTemplate
      banner={banner}
      backButton={backButton}
      billing={
        showBilling && (
          <Billing
            isLoading={isLoadingFull}
            billingText={getBillingText(catalogOrderConfigData)}
          />
        )
      }
      shipping={
        showShippingForm ? (
          <Shipping
            isLoading={isLoadingFull}
            addressConfigData={addressConfigData}
            formData={{
              name,
              company,
              address1,
              address2,
              city,
              state,
              zipCode,
              country,
              phoneNumber,
              deliveryInstructions,
            }}
            formWasSubmitted={formWasSubmitted}
            shippingAddressErrors={shippingAddressErrors}
          />
        ) : null
      }
      productDetails={productDetails}
      orderDetails={orderDetails}
      validationForm={
        <LocationValidationForm
          addressConfigData={addressConfigData}
          showOverrideValidation={showOverrideValidation}
          handleFormValidationOverrideChange={
            handleFormValidationOverrideChange
          }
          willOverrideValidation={willOverrideValidation}
        />
      }
      actionButtons={
        <DefaultActionButtons
          disabled={isLoadingFull}
          onSubmitClick={handleSubmit}
          {...{
            onCancelClick,
            submitButtonIcon,
            submitButtonText,
          }}
        />
      }
    />
  ) : (
    <ErrorScreen />
  );
};

export default DefaultCheckoutTemplate;
