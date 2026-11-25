import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { useToasts, Grid } from '@lumos/core';
import { CartItem, CartMobilityData } from 'store/Cart';
import { AddressInfoInput } from 'gqlTypes/globalTypes';
import { useLocation, useHistory } from 'react-router-dom';
import { UserProfileRequest_userProfile } from '../../../../graphql/queries/gqlTypes/UserProfileRequest';
import { CheckoutTypes } from '../../../CatalogPage/utils';
import { OrderConfirmationPath } from 'utils/routes';
import {
  CreateMobilityCatalogOrder,
  CreateMobilityCatalogOrderVariables,
} from 'graphql/mutations/gqlTypes/CreateMobilityCatalogOrder';
import { CREATE_MOBILITY_CATALOG_ORDER } from 'graphql/mutations/createMobilityCatalogOrder';
import { CreateCatalogOrder_createCatalogOrder_shippingForm } from '../../queries/gqlTypes/CreateCatalogOrder';
import CheckoutCancelModal from '../../components/CheckoutCancelModal';
import { getReturnTo, getRelevantPath, RequestOrigin } from '../../utils';
import OrderDetails from '../../components/OrderDetails';
import BackButton from 'components/BackButton';
import ProductDetails from '../../components/ProductDetails';
import DefaultCheckoutTemplate from '../../templates/DefaultCheckoutTemplate';

/**
 *  Catalog Mobility Checkout component props
 */
interface CatalogMobilityCheckoutProps {
  cartItem: CartItem;
  isUserProfileLoading: boolean;
  userProfile?: UserProfileRequest_userProfile;
}

/**
 *  Catalog Mobility Checkout component
 */
const CatalogMobilityCheckout: React.FC<CatalogMobilityCheckoutProps> = ({
  cartItem,
  isUserProfileLoading,
  userProfile,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const {
    // this field indicates where the previous workflow originated.
    from,
  } = useLocation().state || {};

  const [createOrder, { loading: createOrderLoading }] = useMutation<
    CreateMobilityCatalogOrder,
    CreateMobilityCatalogOrderVariables
  >(CREATE_MOBILITY_CATALOG_ORDER);

  // set cancel modal state
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const checkoutType = CheckoutTypes.Mobility;

  const [
    shippingFormAddressErrorResponse,
    setShippingFormAddressErrorResponse,
  ] = useState<CreateCatalogOrder_createCatalogOrder_shippingForm>({
    isAddressValid: true,
    __typename: 'AddressSubmissionResponse',
    shippingAddressErrors: null,
  });

  // Controls whether override validation markup is rendered
  // TODO: Remove this state once address validation BE work is complete
  const [showOverrideValidation, setShowOverrideValidation] = useState(false);

  const {
    // Keeping this fields commented to use them on coming story
    // modelId,
    name,
    hardwareSku,
    planSku,
    carrier,
    plan,
    features,
    image,
    description,
    reasonForRequest,
    deviceUsage,
    businessJustification,
  } = (cartItem.data as CartMobilityData) || {};

  const featureValues = features.map(feature => feature.value);

  let productDetails: {
    label: string;
    value?: string | null;
  }[] = [
    {
      label: t('pages:request.mobility.mobilityDetails.carrier'),
      value: carrier.split('-').reverse()[0],
    },
    {
      label: t('pages:request.mobility.mobilityDetails.plan'),
      value: plan.split('-').reverse()[0],
    },
    {
      label: t('pages:request.mobility.mobilityDetails.features'),
      value: featureValues.join(', '),
    },
  ];

  const orderDetails = [
    {
      label: t('pages:request.checkout.requestedFor'),
      value: `${userProfile ? userProfile.firstName : ''} ${
        userProfile ? userProfile.lastName : ''
      }`,
    },
    {
      label: t('pages:request.checkout.reasonForRequest'),
      value: reasonForRequest,
    },
    {
      label: t('common:businessJustification'),
      value: businessJustification,
    },
  ];
  //-----------------------------------------------------------------------------

  const { addToast } = useToasts();
  const handleError = () => {
    addToast(t('common:submissionFailure'), {
      // Lumos typing issue, will be removed when fixed there
      // @ts-ignore
      kind: 'danger',
      autoDismiss: true,
    });
  };

  const submitRequest = async (
    shippingInfo: AddressInfoInput | null,
    validateAddress: boolean,
  ) => {
    if (hardwareSku && planSku && userProfile) {
      try {
        const { data, errors } = await createOrder({
          variables: {
            data: {
              hardwareSku,
              planSku,
              features: features,
              requestedFor: userProfile.userId,
              origin: RequestOrigin.Catalog,
              reason: reasonForRequest,
              deviceUsage,
              businessJustification,
              quantity: 1,
              acknowledgment: true,
              expeditedDelivery: false,
              validateAddress,
              shippingInfo,
            },
          },
        });
        if (errors) {
          handleError();
        } else if (data) {
          const { createMobilityCatalogOrder } = data;
          if (createMobilityCatalogOrder.shippingForm) {
            setShippingFormAddressErrorResponse(
              createMobilityCatalogOrder.shippingForm,
            );

            // Address validation error occured
            if (!createMobilityCatalogOrder.shippingForm.isAddressValid) {
              setShowOverrideValidation(true);
              handleError();
              return;
            }
          }
          // No address validation error has occurred
          history.push(OrderConfirmationPath, {
            force: true,
            catalogItem: {
              catalogItemImage: image,
              catalogItemName: name,
              description,
            },
            orderNumber: createMobilityCatalogOrder.ticketId,
            requestConfigOptions: {
              requestReason: reasonForRequest,
              ...(businessJustification && { businessJustification }),
            },
            checkoutType: CheckoutTypes.GCom,
            userData: userProfile,
            shippingInfo,
            businessJustification,
            carrier: carrier.split('-').reverse()[0],
            plan: plan.split('-').reverse()[0],
            features: featureValues.join(', '),
          });
        }
      } catch (error) {
        handleError();
      }
    }
  };

  return (
    <>
      <DefaultCheckoutTemplate
        showSkeletons={isUserProfileLoading}
        showSpinner={createOrderLoading}
        showShippingForm
        checkoutType={checkoutType}
        showBilling
        showOverrideValidation={showOverrideValidation}
        shippingAddressErrors={
          shippingFormAddressErrorResponse.shippingAddressErrors
        }
        userProfile={userProfile}
        onSubmitClick={submitRequest}
        onCancelClick={setIsCancelModalOpen}
        backButton={
          <BackButton
            text={t('common:backToDetailsPage')}
            to={{
              pathname: `${getRelevantPath(from)}/${name}`,
              state: {
                item: cartItem.data,
                previousState: {},
                force: true,
              },
            }}
          />
        }
        productDetails={
          <ProductDetails
            catalogItemImage={image}
            catalogItemName={name}
            description={description}
            details={productDetails}
            flex={1}
          />
        }
        orderDetails={
          <Grid flexDirection="column">
            <OrderDetails details={orderDetails} flex={1} />
          </Grid>
        }
      />
      {/* Checkout Cancel Modal */}
      <CheckoutCancelModal
        isModalOpen={isCancelModalOpen}
        setIsModalOpen={setIsCancelModalOpen}
        relevantPath={getRelevantPath(from, true)}
        returnTo={t(getReturnTo(from))}
      />
    </>
  );
};

export default CatalogMobilityCheckout;
