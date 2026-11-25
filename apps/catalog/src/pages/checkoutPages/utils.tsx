import { TFunction } from 'i18next';
import { AddressConfig_addressConfig } from 'graphql/queries/gqlTypes/AddressConfig';
import {
  RequestComputersPath,
  RequestAccessoriesPath,
  ManagePersonalTechnologyPath,
  RequestMobilityPath,
  RequestGComPath,
  SearchPath,
  OrderConfirmationPath,
} from 'utils/routes';
import { FormField } from 'utils/useFormFields';
import { CheckoutTypes } from '../CatalogPage/utils';
import {
  CreateCatalogOrder_createCatalogOrder_shippingForm_shippingAddressErrors,
  CreateCatalogOrder_createCatalogOrder_shippingForm_shippingAddressErrors_address1,
  CreateCatalogOrder_createCatalogOrder_shippingForm_shippingAddressErrors_address2,
  CreateCatalogOrder_createCatalogOrder_shippingForm_shippingAddressErrors_zip,
  CreateCatalogOrder_createCatalogOrder_shippingForm_shippingAddressErrors_country,
  CreateCatalogOrder_createCatalogOrder_shippingForm_shippingAddressErrors_state,
  CreateCatalogOrder_createCatalogOrder_shippingForm_shippingAddressErrors_city,
  CreateCatalogOrder_createCatalogOrder_shippingForm,
} from './queries/gqlTypes/CreateCatalogOrder';
import { getCatalogOrderConfiguration } from 'graphql/queries/gqlTypes/getCatalogOrderConfiguration';
import { AddressConfig } from 'graphql/queries/gqlTypes/AddressConfig';
import { UserProfileRequest } from '../../graphql/queries/gqlTypes/UserProfileRequest';
import { OboInfo_oboInfo_user } from 'store/apollo/store/actions/queries/gqlTypes/OboInfo';
import { ReportBrokenInfo_reportBrokenInfo } from '../../store/apollo/store/actions/queries/gqlTypes/ReportBrokenInfo';
import { ReportMissingInfo } from 'store/ReportMissingInfo';
import { CreateMissingComputerReplacementOrderVariables } from '../../graphql/mutations/gqlTypes/CreateMissingComputerReplacementOrder';
import { CatalogItemDetails_catalogItem } from 'graphql/queries/gqlTypes/CatalogItemDetails';
import { IHash, RequestConfigOptions } from 'store/Cart';
import { ReplacementBannerProps } from 'components/ReplacementBanner';
import { CreateCatalogOrderVariables } from './queries/gqlTypes/CreateCatalogOrder';
import { AddressInfoInput, CatalogItemClass } from 'gqlTypes/globalTypes';
import { GComResolveSku_gcomResolveSku_components as GComComponent } from 'graphql/queries/gqlTypes/GComResolveSku';
import { ReportMissingVariables } from 'graphql/mutations/gqlTypes/ReportMissing';
import {
  ReportBrokenVariables,
  ReportBroken,
} from 'graphql/mutations/gqlTypes/ReportBroken';
import { ExecutionResult } from 'apollo-boost';

export enum ShippingFormFields {
  NAME = 'name',
  COMPANY = 'company',
  ADDRESS1 = 'address1',
  ADDRESS2 = 'address2',
  CITY = 'city',
  STATE = 'state',
  ZIPCODE = 'zipCode',
  COUNTRY = 'country',
  PHONE = 'phoneNumber',
}

// Enum to define the origin of an Order
export enum RequestOrigin {
  Catalog = 'Catalog',
  Technology = 'Technology',
}

// Enum to define the origin of an Order
export interface UserProfileType {
  firstName: string;
  lastName: string;
  userId?: string;
}

const onlyLettersApostropheAccentsSpacesRegex = /^['A-zÀ-ú]['A-zÀ-ú\s]*$/i;
const onlyLettersAccentsSpacesRegex = /^[A-zÀ-ú][A-zÀ-ú\s]*$/i;
const phoneRegex = /^[-\s./0-9.+ext()/]*$/i;

/**
 * hasOnlyLettersApostropheAccentsSpacesValidation validates if a string contains only letters, apostrophe, accents and spaces,
 *
 * @param value string to validate.
 * @returns boolean as true if is valid
 */
export const hasOnlyLettersApostropheAccentsSpacesValidation = (
  value: string,
) => (value ? onlyLettersApostropheAccentsSpacesRegex.test(value) : true);

/**
 * hasOnlyLettersAccentsSpacesValidation validates if a string contains only letters, accents and spaces
 *
 * @param value string to validate.
 * @returns boolean as true if is valid
 */
export const hasOnlyLettersAccentsSpacesValidation = (value: string) =>
  value ? onlyLettersAccentsSpacesRegex.test(value) : true;

/**
 * phoneValidation validates if a string is a valid phone
 *
 * @param value string to validate.
 * @returns boolean as true if is valid
 */
export const phoneValidation = (value: string) =>
  value ? phoneRegex.test(value) : true;

/**
 * hasValueRequiredField validates if a required form field has value
 *
 * @param field Form Field to validate.
 * @returns boolean as true if is valid
 */
const hasValueRequiredField = (field: FormField) => {
  return (
    field.validationResults && field.validationResults.isRequiredValidation
  );
};

/**
 * hasOnlyLetters validates if a form field has only letters
 *
 * @param field Form Field to validate.
 * @returns boolean as true if is valid
 */
const hasOnlyLetters = (field: FormField) => {
  return field.validationResults.hasOnlyLetters;
};

/**
 * hasValidPhone validates if a form field has a valid phone
 *
 * @param field Form Field to validate.
 * @returns boolean as true if is valid
 */
const hasValidPhone = (field: FormField) => {
  return field.validationResults.hasValidPhone;
};

/**
 * getFieldErrorMessage validates a field and return an error message if the validation fails
 *
 * @param field Form Field to validate.
 * @param fieldName Name of the field to validate.
 * @returns string with error message and empty string if all validaitons are successful
 */
export const getFieldErrorMessage = (
  field: FormField,
  fieldName: String,
  t: TFunction,
  formWasSubmitted: Boolean,
  shippingAddressErrorProps:
    | CreateCatalogOrder_createCatalogOrder_shippingForm_shippingAddressErrors
    | null
    | undefined = null,
) => {
  let errorMessage = '';
  //----------------------------------------------
  //  Validate Required fields
  //----------------------------------------------
  if (
    formWasSubmitted &&
    (fieldName === ShippingFormFields.NAME ||
      fieldName === ShippingFormFields.COMPANY ||
      fieldName === ShippingFormFields.ADDRESS1 ||
      fieldName === ShippingFormFields.CITY ||
      fieldName === ShippingFormFields.STATE ||
      fieldName === ShippingFormFields.ZIPCODE ||
      fieldName === ShippingFormFields.COUNTRY ||
      fieldName === ShippingFormFields.PHONE)
  ) {
    errorMessage = hasValueRequiredField(field)
      ? ''
      : t('requests:order.errors.requiredField');
  }
  //----------------------------------------------
  //  Validate Only Letters fields
  //----------------------------------------------
  if (
    !errorMessage &&
    (fieldName === ShippingFormFields.CITY ||
      fieldName === ShippingFormFields.STATE)
  ) {
    errorMessage = hasOnlyLetters(field)
      ? ''
      : t('requests:order.errors.onlyLetters');
  }
  //----------------------------------------------
  //  Validate Phone field
  //----------------------------------------------
  if (!errorMessage && fieldName === ShippingFormFields.PHONE) {
    errorMessage = hasValidPhone(field)
      ? ''
      : t('requests:order.errors.onlyPhoneNumber');
  }

  //---------------------------------------------------
  //  Show address validation errors from shipping-api
  //---------------------------------------------------
  if (!errorMessage && shippingAddressErrorProps) {
    let addressValidationError:
      | CreateCatalogOrder_createCatalogOrder_shippingForm_shippingAddressErrors_address1
      | CreateCatalogOrder_createCatalogOrder_shippingForm_shippingAddressErrors_address2
      | CreateCatalogOrder_createCatalogOrder_shippingForm_shippingAddressErrors_zip
      | CreateCatalogOrder_createCatalogOrder_shippingForm_shippingAddressErrors_country
      | CreateCatalogOrder_createCatalogOrder_shippingForm_shippingAddressErrors_state
      | CreateCatalogOrder_createCatalogOrder_shippingForm_shippingAddressErrors_city
      | null
      | undefined;

    switch (fieldName) {
      case ShippingFormFields.ADDRESS1:
        addressValidationError = shippingAddressErrorProps.address1;
        break;
      case ShippingFormFields.ADDRESS2:
        addressValidationError = shippingAddressErrorProps.address2;
        break;
      case ShippingFormFields.CITY:
        addressValidationError = shippingAddressErrorProps.city;
        break;
      case ShippingFormFields.STATE:
        addressValidationError = shippingAddressErrorProps.state;
        break;
      case ShippingFormFields.COUNTRY:
        addressValidationError = shippingAddressErrorProps.country;
        break;
      case ShippingFormFields.ZIPCODE:
        addressValidationError = shippingAddressErrorProps.zip;
        break;
    }

    if (addressValidationError && addressValidationError.inLine) {
      errorMessage = addressValidationError.text || '';
    }
  }

  return errorMessage;
};

/**
 * Returns the relevant content based on the type of checkout experience
 *
 * @param checkoutType - Checkout type that is set for the checkout page
 */
export const getRelevantContent = (checkoutType?: string) => {
  switch (checkoutType) {
    case CheckoutTypes.Accessories:
      return {
        title: 'pages:request.checkout.header.accessoryTitleSubmit',
        header: 'pages:request.checkout.header.subtitleSubmit',
        productDetailsHeader:
          'pages:request.checkout.productDetails.header.accessory',
      };
    case CheckoutTypes.Computers:
      return {
        title: 'pages:request.checkout.header.computerTitleSubmit',
        header: 'pages:request.checkout.header.subtitleSubmit',
        productDetailsHeader:
          'pages:request.checkout.productDetails.header.computer',
      };
    case CheckoutTypes.Mobility:
      return {
        title: 'pages:request.checkout.header.mobileTitleSubmit',
        header: 'pages:request.checkout.header.subtitleSubmit',
        productDetailsHeader:
          'pages:request.checkout.productDetails.header.mobileDevice',
      };
    default:
      return {
        title: 'pages:request.checkout.header.standardTitle',
        header: 'pages:request.checkout.header.standardSubtitle',
        productDetailsHeader:
          'pages:request.checkout.productDetails.header.standard',
      };
  }
};

/**
 * getReturnTo will return to which path user should be redirected based from where the workflow originated
 *
 * @param from string representing where the workflow originated.
 *
 * @return string representing the path where the user should be redirected.
 */
export const getReturnTo = (from: string): string => {
  switch (from) {
    case RequestComputersPath:
      return 'pageAlias:computerCatalog';
    case RequestAccessoriesPath:
      return 'pageAlias:accessoryCatalog';
    case RequestMobilityPath:
      return 'pageAlias:mobilityCatalog';
    case RequestGComPath:
      return 'pageAlias:gcomCatalog';
    case ManagePersonalTechnologyPath:
      return 'pageAlias:technology';
    case SearchPath:
      return 'pageAlias:search';
    default:
      return '';
  }
};

/**
 * Returns the relevant path for linking back to the appropriate catalog page
 *
 *  technology related path.
 * @param from - where the workflow originated.
 * @param exit - A flag that determine if the current path selector should
 *  attempt to opt out from the current workflow.
 */
export const getRelevantPath = (from: string, exit: boolean = false) => {
  if (exit && from) {
    return ManagePersonalTechnologyPath;
  }
  return from;
};

/**
 * Parse address configuration to a known format
 *
 * @param addressConfig - address config data to parse.
 * @returns parsed address configuration
 */
export const parseAddressConfig = (
  addressConfig: AddressConfig_addressConfig,
) => {
  let result = null;
  if (addressConfig && addressConfig.shippingAddressData) {
    const {
      alert,
      carrier,
      shippingAddressData: {
        name,
        business,
        address1,
        address2,
        city,
        country,
        phoneNumber,
        state,
        zip,
      },
    } = addressConfig;

    result = {
      alert,
      carrier,
      name,
      business,
      address1,
      address2,
      city,
      state,
      zip,
      country,
      phoneNumber,
    };
  }
  return result;
};

/**
 * Returns the whether checkout is a catalog checkout versus other (replace flow).
 *
 * @param checkoutType - type of item being checked out
 */
export const isCatalogCheckout = (checkoutType?: CheckoutTypes) => {
  switch (checkoutType) {
    case CheckoutTypes.Accessories:
      return true;
    case CheckoutTypes.Computers:
      return true;
    case CheckoutTypes.Mobility:
      return true;
    case CheckoutTypes.GCom:
      return true;
    default:
      return false;
  }
};

/**
 * Returns the input for the useFormField hook on Checkout.
 *
 * @returns useFormField input
 */
export const getFormFieldInit = () => {
  return {
    name: {
      required: true,
      defaultValue: '',
    },
    company: {
      required: true,
      defaultValue: '',
    },
    address1: {
      required: true,
      defaultValue: '',
    },
    address2: {
      defaultValue: '',
    },
    city: {
      required: true,
      defaultValue: '',
      validations: {
        hasOnlyLetters: hasOnlyLettersAccentsSpacesValidation,
      },
    },
    state: {
      required: true,
      defaultValue: '',
      validations: {
        hasOnlyLetters: hasOnlyLettersAccentsSpacesValidation,
      },
    },
    zipCode: {
      required: true,
      defaultValue: '',
    },
    country: {
      required: true,
      defaultValue: '',
    },
    phoneNumber: {
      required: true,
      defaultValue: '',
      validations: {
        hasValidPhone: phoneValidation,
      },
    },
    deliveryInstructions: {
      defaultValue: '',
    },
  };
};

/**
 * Returns billing text based on catalog order configuration
 *
 * @param catalogOrderConfigData - catalog order config data to parse.
 * @returns billing text to be displayed
 */
export const getBillingText = (
  catalogOrderConfigData?: getCatalogOrderConfiguration,
) => {
  return catalogOrderConfigData &&
    catalogOrderConfigData.catalogOrderConfiguration &&
    catalogOrderConfigData.catalogOrderConfiguration.billing &&
    catalogOrderConfigData.catalogOrderConfiguration.billing.summary
    ? catalogOrderConfigData.catalogOrderConfiguration.billing.summary.text
    : '';
};

/**
 * Returns user profile to be used throughout Checkout
 *
 * @param userProfileData - logged in user's profile.
 * @param userId - logged in user's userId.
 * @param oboUser - OBO user's profile.
 * @returns to be used user's profile information
 */
export const getUserProfile = (
  userProfileData?: UserProfileRequest,
  userId?: string,
  oboUser?: OboInfo_oboInfo_user | null,
) => {
  return {
    firstName: oboUser
      ? oboUser.firstName
        ? oboUser.firstName
        : ''
      : userProfileData && userProfileData.userProfile
      ? userProfileData.userProfile.firstName
      : '',
    lastName: oboUser
      ? oboUser.lastName
        ? oboUser.lastName
        : ''
      : userProfileData && userProfileData.userProfile
      ? userProfileData.userProfile.lastName
      : '',
    userId: oboUser ? oboUser.userId : userId,
  };
};

export const submitNewRequest = async (
  isShippingFormValid: boolean,
  requestConfigData: RequestConfigOptions,
  willOverrideValidation: boolean,
  createOrder: (variables: { variables: CreateCatalogOrderVariables }) => any,
  replacedProductInfo: ReplacementBannerProps | null,
  userProfile: UserProfileType,
  addressConfigData: AddressConfig,
  itemData: CatalogItemDetails_catalogItem,
  getShippingInfo: () => AddressInfoInput,
  handleError: () => void,
  setShippingFormAddressErrorResponse: (
    form: CreateCatalogOrder_createCatalogOrder_shippingForm,
  ) => void,
  setShowOverrideValidation: (show: boolean) => void,
  checkoutType: string,
  history: any,
) => {
  if (isShippingFormValid) {
    if (requestConfigData && requestConfigData.catalogItemId) {
      try {
        const validateAddress =
          !willOverrideValidation &&
          addressConfigData.addressConfig.carrier !== '' &&
          addressConfigData.addressConfig.addressEditable;

        const { data, errors } = await createOrder({
          variables: {
            data: {
              catalogItemId: requestConfigData.catalogItemId,
              origin: replacedProductInfo
                ? RequestOrigin.Technology
                : RequestOrigin.Catalog,
              quantity: 1,
              requestedFor: (userProfile && userProfile.userId) as string,
              reason: requestConfigData.requestReason,
              deviceUsage: requestConfigData.deviceUsage!,
              businessJustification: requestConfigData.businessJustification,
              acknowledgment: requestConfigData.isAcknowledged || true,
              expeditedDelivery: false,
              validateAddress,
              shippingInfo: getShippingInfo(),

              /* Computer specific data needed */
              ...(itemData!.computerCatalogInfo && {
                computerDetails: {
                  assetId: replacedProductInfo && replacedProductInfo.id,
                  keyboardLanguage: requestConfigData.keyboardLanguage,
                  operatingSystemLanguage: requestConfigData.keyboardLanguage,
                  operatingSystemName: requestConfigData.osType,
                  domain: 'LOGON',
                  msOfficeLanguage: 'English',
                },
              }),

              /* Accessory specific data needed */
              ...(itemData!.accessoryCatalogInfo && {
                accessoryDetails: {
                  assetId: '',
                  keyboardLanguage: requestConfigData.keyboardLanguage,
                },
              }),
            },
          },
        });
        if (errors) {
          handleError();
        } else if (data) {
          const { createCatalogOrder } = data;
          if (createCatalogOrder.shippingForm) {
            setShippingFormAddressErrorResponse(
              createCatalogOrder.shippingForm,
            );

            // Address validation error occured
            if (!createCatalogOrder.shippingForm.isAddressValid) {
              setShowOverrideValidation(true);
              handleError();
              return;
            }
          }

          // No address validation error has occurred
          history.push(OrderConfirmationPath, {
            force: true,
            catalogItem: itemData,
            orderNumber: createCatalogOrder.ticketId,
            requestConfigOptions: requestConfigData,
            checkoutType,
            userData: userProfile,
            shippingInfo: getShippingInfo(),
          });
        }
      } catch (error) {
        setShippingFormAddressErrorResponse({
          isAddressValid: false,
          __typename: 'AddressSubmissionResponse',
          shippingAddressErrors: null,
        });
        setShowOverrideValidation(true);
        handleError();
      }
    }
  }
};

export const submitReportMissingRequest = async (
  reportMissingInfo: ReportMissingInfo,
  reportMissingVariables: ReportMissingVariables,
  requestConfigData: RequestConfigOptions,
  willOverrideValidation: boolean,
  createMissingComputerReplacementOrder: (variables: {
    variables: CreateMissingComputerReplacementOrderVariables;
  }) => any,
  userProfile: UserProfileType,
  requestedForUserId: string,
  addressConfigData: AddressConfig,
  getShippingInfo: () => AddressInfoInput,
  handleError: () => void,
  setShippingFormAddressErrorResponse: (
    form: CreateCatalogOrder_createCatalogOrder_shippingForm,
  ) => void,
  setShowOverrideValidation: (show: boolean) => void,
  checkoutType: string,
  history: any,
) => {
  try {
    const validateAddress =
      !willOverrideValidation && addressConfigData.addressConfig.carrier !== '';

    const { data, errors } = await createMissingComputerReplacementOrder({
      variables: {
        requestedFor: requestedForUserId,
        shippingInfo: getShippingInfo(),
        deviceUsage: reportMissingInfo.usage!,
        validateAddress,
        ...reportMissingVariables,
      },
    });

    const shippingErrors =
      (data && data.createReplaceMissingComputerOrder.error) || [];
    const incidentData =
      (data && data.createReplaceMissingComputerOrder.assetTicket) || null;

    if (errors || shippingErrors.length || !data || !incidentData) {
      if (shippingErrors.length > 0) setShowOverrideValidation(true);
      handleError();
      return;
    }

    // Navigate to the confirmation page with the required data
    history.push(OrderConfirmationPath, {
      force: true,
      orderNumber: data.createReplaceMissingComputerOrder.ticketId,
      requestConfigOptions: requestConfigData,
      checkoutType,
      userData: userProfile,
      shippingInfo: getShippingInfo(),
      isReplacement: true,
    });
  } catch (error) {
    setShippingFormAddressErrorResponse({
      isAddressValid: false,
      __typename: 'AddressSubmissionResponse',
      shippingAddressErrors: null,
    });
    setShowOverrideValidation(true);
    handleError();
  }
};

export const submitReportBrokenRequest = async (
  reportBrokenInfo: ReportBrokenInfo_reportBrokenInfo,
  requestConfigData: RequestConfigOptions,
  createReportBrokenRequest: (variables: {
    variables: ReportBrokenVariables;
  }) => Promise<ExecutionResult<ReportBroken>>,
  userProfile: UserProfileType,
  requestedForUserId: string,
  getShippingInfo: () => AddressInfoInput,
  handleError: () => void,
  history: any,
) => {
  try {
    const shippingInfo = getShippingInfo();
    const { data, errors } = await createReportBrokenRequest({
      variables: {
        data: {
          assetId: reportBrokenInfo.id,
          caseReference: reportBrokenInfo.incidentNumber,
          requestDetails: reportBrokenInfo.details,
          requestedForId: requestedForUserId,
          shippingDetails: {
            ...shippingInfo,
            contactName: shippingInfo.name,
            contactPhoneNumber: shippingInfo.phone,
          },
          requestedById: userProfile.userId || '',
          usage: reportBrokenInfo.usage || '',
        },
      },
    });

    if (errors) {
      handleError();
    } else if (data) {
      history.push(OrderConfirmationPath, {
        force: true,
        orderNumber: data.reportBroken.ticketId,
        requestConfigOptions: requestConfigData,
        userData: userProfile,
        shippingInfo: getShippingInfo(),
      });
    }
  } catch (error) {
    handleError();
  }
};

export const submitGComRequest = async (
  sku: string | null,
  skuComponents: GComComponent[],
  skuAnswers: IHash,
  requestConfigData: RequestConfigOptions,
  billedTo: string,
  locationCode: string,
  itemData: {
    catalogItemImage: string | null;
    catalogItemName: string | null;
    description: string | null;
  },
  userProfile: UserProfileType,
  willOverrideValidation: boolean,
  createOrder: (variables: { variables: any }) => any,
  handleError: () => void,
  setShippingFormAddressErrorResponse: (
    form: CreateCatalogOrder_createCatalogOrder_shippingForm,
  ) => void,
  setShowOverrideValidation: (show: boolean) => void,
  isShippingFormValid: boolean | null,
  addressConfigData: AddressConfig | null,
  getShippingInfo: (() => AddressInfoInput) | null,
  history: any,
) => {
  if (isShippingFormValid !== false) {
    if (sku) {
      try {
        const validateAddress =
          !willOverrideValidation &&
          addressConfigData &&
          addressConfigData.addressConfig.carrier !== '' &&
          addressConfigData.addressConfig.addressEditable;

        const skuFollowUps = skuComponents.map(component => {
          return {
            id: component.id,
            label: component.label,
            value: skuAnswers[sku][component.id],
            protected: component.isPersonal || false,
          };
        });

        const { data, errors } = await createOrder({
          variables: {
            data: {
              sku,
              skuFollowUps: skuFollowUps,
              assignedTo: userProfile.userId,
              billedTo: billedTo,
              locationCode,
              origin: RequestOrigin.Catalog,
              reason: requestConfigData.requestReason,
              deviceUsage: requestConfigData.deviceUsage || '',
              businessJustification: requestConfigData.businessJustification,
              quantity: 1,
              acknowledgment: true,
              expeditedDelivery: false,
              validateAddress,
              shippingInfo: getShippingInfo && getShippingInfo(),
            },
          },
        });
        if (errors) {
          handleError();
        } else if (data) {
          const { createGComCatalogOrder } = data;
          if (createGComCatalogOrder.shippingForm) {
            setShippingFormAddressErrorResponse(
              createGComCatalogOrder.shippingForm,
            );

            // Address validation error occured
            if (!createGComCatalogOrder.shippingForm.isAddressValid) {
              setShowOverrideValidation(true);
              handleError();
              return;
            }
          }

          // No address validation error has occurred
          history.push(OrderConfirmationPath, {
            force: true,
            catalogItem: itemData,
            orderNumber: createGComCatalogOrder.ticketId,
            requestConfigOptions: requestConfigData,
            checkoutType: CheckoutTypes.GCom,
            userData: userProfile,
            shippingInfo: getShippingInfo && getShippingInfo(),
          });
        }
      } catch (error) {
        setShippingFormAddressErrorResponse({
          isAddressValid: false,
          __typename: 'AddressSubmissionResponse',
          shippingAddressErrors: null,
        });
        setShowOverrideValidation(true);
        handleError();
      }
    }
  }
};

export const getCatalogItemClass = (checkoutType: string) => {
  switch (checkoutType) {
    case CheckoutTypes.Accessories:
      return CatalogItemClass.accessory;

    case CheckoutTypes.Computers:
      return CatalogItemClass.computer;

    case CheckoutTypes.Mobility:
      return CatalogItemClass.mobility;

    case CheckoutTypes.GCom:
      return CatalogItemClass.gcom;

    default:
      return CatalogItemClass.computer;
  }
};
