import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { useToasts, Grid } from '@lumos/core';
import { CartItem } from 'store/Cart';
import { AddressInfoInput } from 'gqlTypes/globalTypes';
import { UserProfileRequest_userProfile } from '../../../../graphql/queries/gqlTypes/UserProfileRequest';
import { CartCatalogData } from 'store/Cart';
import { OrderConfirmationPath } from 'utils/routes';
import { getRelevantPath } from '../../utils';
import { CREATE_CATALOG_ORDER } from '../../queries';
import {
  CreateCatalogOrder_createCatalogOrder_shippingForm,
  CreateCatalogOrder,
} from '../../queries/gqlTypes/CreateCatalogOrder';
import CheckoutCancelModal from '../../components/CheckoutCancelModal';
import { getReturnTo, RequestOrigin } from '../../utils';
import OrderDetails from '../../components/OrderDetails';
import BackButton from 'components/BackButton';
import ProductDetails from '../../components/ProductDetails';
import DefaultCheckoutTemplate from '../../templates/DefaultCheckoutTemplate';
import ReplacementBanner, {
  ReplacementBannerProps,
} from 'components/ReplacementBanner';

/**
 *  Catalog Default Checkout component props
 */
interface CatalogDefaultCheckoutProps {
  cartItem: CartItem;
  replacedProductInfo: ReplacementBannerProps | null;
  isUserProfileLoading: boolean;
  userProfile?: UserProfileRequest_userProfile;
}

/**
 *  Catalog Default Checkout component
 *
 * If replacedProductInfo contains data, it means we are doing a Replace of an existing item.
 * Data of previous item comes on replacedProductInfo and new item data comes on cartItem.
 */
const CatalogDefaultCheckout: React.FC<CatalogDefaultCheckoutProps> = ({
  cartItem,
  replacedProductInfo,
  isUserProfileLoading,
  userProfile,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const {
    // this field indicates where the previous workflow originated.
    from,
  } = useLocation().state || {};

  const checkoutType = cartItem.checkoutType;

  const [createOrder, { loading: createOrderLoading }] = useMutation<
    CreateCatalogOrder
  >(CREATE_CATALOG_ORDER);

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

  // set cancel modal state
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const { catalogItem, requestConfigOptions } =
    (cartItem.data as CartCatalogData) || {};

  let itemImage = null;
  let itemName = '';
  let itemDescription = '';
  if (catalogItem) {
    itemImage = catalogItem.catalogItemImage;
    itemName = catalogItem.catalogItemName;
    itemDescription = catalogItem.description ? catalogItem.description : '';
  }

  const productDetails = [
    {
      label: t('common:plugType'),
      value: requestConfigOptions && requestConfigOptions.plugType,
    },
    {
      label: t('common:keyboard'),
      value: requestConfigOptions && requestConfigOptions.keyboardLanguage,
    },
    {
      label: t('common:replacedDevice'),
      value: replacedProductInfo && replacedProductInfo.productName,
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
      value: requestConfigOptions.requestReason,
    },
    {
      label: t('pages:request.checkout.deviceUsage'),
      value: requestConfigOptions.deviceUsage,
    },
    {
      label: t('common:businessJustification'),
      value: requestConfigOptions.businessJustification,
    },
    {
      label: t('common:incidentNumber'),
      value: requestConfigOptions.incidentNumber,
    },
    {
      label: t('common:situationDetails'),
      value: requestConfigOptions.situationDetails,
    },
  ];

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
    const catalogItemId =
      requestConfigOptions && requestConfigOptions.catalogItemId;
    if (catalogItemId) {
      try {
        const { data, errors } = await createOrder({
          variables: {
            data: {
              catalogItemId,
              origin: replacedProductInfo
                ? RequestOrigin.Technology
                : RequestOrigin.Catalog,
              quantity: 1,
              requestedFor: (userProfile && userProfile.userId) as string,
              reason: requestConfigOptions.requestReason,
              deviceUsage: requestConfigOptions.deviceUsage!,
              businessJustification: requestConfigOptions.businessJustification,
              acknowledgment: requestConfigOptions.isAcknowledged || true,
              expeditedDelivery: false,
              validateAddress,
              shippingInfo,

              /* Computer specific data needed */
              ...(catalogItem!.computerCatalogInfo && {
                computerDetails: {
                  assetId: replacedProductInfo && replacedProductInfo.id,
                  keyboardLanguage: requestConfigOptions.keyboardLanguage,
                  operatingSystemLanguage:
                    requestConfigOptions.keyboardLanguage,
                  operatingSystemName: requestConfigOptions.osType,
                  domain: 'LOGON',
                  msOfficeLanguage: 'English',
                },
              }),

              /* Accessory specific data needed */
              ...(catalogItem!.accessoryCatalogInfo && {
                accessoryDetails: {
                  assetId: '',
                  keyboardLanguage: requestConfigOptions.keyboardLanguage,
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
            catalogItem,
            orderNumber: createCatalogOrder.ticketId,
            requestConfigOptions,
            checkoutType,
            userData: userProfile,
            shippingInfo,
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
        showSpinner={createOrderLoading}
        showSkeletons={isUserProfileLoading}
        showShippingForm={requestConfigOptions.hasShipping || true}
        showBilling
        checkoutType={checkoutType}
        showOverrideValidation={showOverrideValidation}
        shippingAddressErrors={
          shippingFormAddressErrorResponse.shippingAddressErrors
        }
        userProfile={userProfile}
        onSubmitClick={submitRequest}
        onCancelClick={setIsCancelModalOpen}
        banner={
          replacedProductInfo && <ReplacementBanner {...replacedProductInfo} />
        }
        backButton={
          <BackButton
            text={t('common:backToDetailsPage')}
            to={{
              pathname: `${getRelevantPath(from)}/${itemName}`,
              state: {
                item: catalogItem || null,
                previousState: { ...requestConfigOptions },
                force: true,
              },
            }}
          />
        }
        productDetails={
          <ProductDetails
            catalogItemImage={itemImage}
            catalogItemName={itemName}
            description={itemDescription}
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

export default CatalogDefaultCheckout;
