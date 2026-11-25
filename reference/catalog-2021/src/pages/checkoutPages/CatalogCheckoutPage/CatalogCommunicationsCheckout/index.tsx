import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { useToasts, Grid } from '@lumos/core';
import { CartItem, CartGcomData } from 'store/Cart';
import { AddressInfoInput } from 'gqlTypes/globalTypes';
import { useLocation, useHistory } from 'react-router-dom';
import { UserProfileRequest_userProfile } from '../../../../graphql/queries/gqlTypes/UserProfileRequest';
import { CheckoutTypes } from '../../../CatalogPage/utils';
import { RequestGComPath, OrderConfirmationPath } from 'utils/routes';
import {
  CreateGComCatalogOrder,
  CreateGComCatalogOrderVariables,
} from 'graphql/mutations/gqlTypes/CreateGComCatalogOrder';
import { CREATE_GCOM_CATALOG_ORDER } from 'graphql/mutations/createGComCatalogOrder';
import { CreateCatalogOrder_createCatalogOrder_shippingForm } from '../../queries/gqlTypes/CreateCatalogOrder';
import { SPECIAL_REQUEST_SKU } from 'pages/CatalogCommunicationsPage/utils';
import CheckoutCancelModal from '../../components/CheckoutCancelModal';
import { getReturnTo, RequestOrigin } from '../../utils';
import OrderDetails from '../../components/OrderDetails';
import BackButton from 'components/BackButton';
import ProductDetails from '../../components/ProductDetails';
import DefaultCheckoutTemplate from '../../templates/DefaultCheckoutTemplate';

/**
 *  Catalog Communications Checkout component props
 */
interface CatalogCommunicationsCheckoutProps {
  cartItem: CartItem;
  isUserProfileLoading: boolean;
  userProfile?: UserProfileRequest_userProfile;
}

/**
 *  Catalog Communications Checkout component
 */
const CatalogCommunicationsCheckout: React.FC<CatalogCommunicationsCheckoutProps> = ({
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
    CreateGComCatalogOrder,
    CreateGComCatalogOrderVariables
  >(CREATE_GCOM_CATALOG_ORDER);

  // set cancel modal state
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const checkoutType = CheckoutTypes.GCom;

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
    billedToUser,
    location: userLocation,
    sku,
    selectedProduct,
    image,
    description,
    reasonForRequest,
    businessJustification,
    hasShipping,
    answers,
    skuComponents,
  } = (cartItem.data as CartGcomData) || {};
  let productDetails: {
    label: string;
    value?: string | null;
  }[] = [];
  if (sku !== SPECIAL_REQUEST_SKU) {
    productDetails = [
      {
        label: t('common:sku'),
        value: sku,
      },
    ];
  }

  const orderDetails = [
    {
      label: t('pages:request.checkout.requestedFor'),
      value: `${userProfile ? userProfile.firstName : ''} ${
        userProfile ? userProfile.lastName : ''
      }`,
    },
    {
      label: t('pages:request.checkout.billedTo'),
      value: `${billedToUser.firstName} ${billedToUser.lastName}`,
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
    if (sku && userProfile) {
      try {
        const skuFollowUps = skuComponents
          ? skuComponents.map(component => {
              return {
                id: component.id,
                label: component.label,
                value:
                  answers && answers[sku] ? answers[sku][component.id] : '',
                protected: component.isPersonal || false,
              };
            })
          : [];

        const { data, errors } = await createOrder({
          variables: {
            data: {
              sku,
              skuFollowUps: skuFollowUps || {},
              assignedTo: userProfile.userId,
              billedTo: billedToUser.userId,
              locationCode: userLocation.site,
              origin: RequestOrigin.Catalog,
              reason: reasonForRequest,
              deviceUsage: '',
              businessJustification: businessJustification,
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
            catalogItem: {
              catalogItemImage: image,
              catalogItemName: selectedProduct.label,
              description,
            },
            orderNumber: createGComCatalogOrder.ticketId,
            requestConfigOptions: {
              requestReason: reasonForRequest,
              ...(businessJustification && { businessJustification }),
            },
            checkoutType: CheckoutTypes.GCom,
            userData: userProfile,
            shippingInfo,
            billedToUser,
            businessJustification,
            sku,
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
        showShippingForm={hasShipping}
        showBilling
        checkoutType={checkoutType}
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
              pathname: RequestGComPath,
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
            catalogItemName={selectedProduct.label}
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
        relevantPath={RequestGComPath}
        returnTo={t(getReturnTo(from))}
      />
    </>
  );
};

export default CatalogCommunicationsCheckout;
