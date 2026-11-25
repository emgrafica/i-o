import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { useToasts, Grid } from '@lumos/core';
import { ReportMissingInfo } from 'store/ReportMissingInfo';
import { AddressInfoInput } from 'gqlTypes/globalTypes';
import { UserProfileRequest_userProfile } from '../../../../graphql/queries/gqlTypes/UserProfileRequest';
import { OrderConfirmationPath } from 'utils/routes';
import { getRelevantPath } from '../../utils';
import { CREATE_MISSING_COMPUTER_REPLACEMENT_ORDER } from 'graphql/mutations/createMissingComputerReplacementOrder';
import { CreateCatalogOrder_createCatalogOrder_shippingForm } from '../../queries/gqlTypes/CreateCatalogOrder';
import {
  CreateMissingComputerReplacementOrder,
  CreateMissingComputerReplacementOrderVariables,
} from '../../../../graphql/mutations/gqlTypes/CreateMissingComputerReplacementOrder';
import CheckoutCancelModal from '../../components/CheckoutCancelModal';
import { getReturnTo } from '../../utils';
import OrderDetails from '../../components/OrderDetails';
import ProductDetails from '../../components/ProductDetails';
import DefaultCheckoutTemplate from '../../templates/DefaultCheckoutTemplate';
import ReplacementBanner from 'components/ReplacementBanner';

/**
 *  Report Missing Checkout component props
 */
interface ReportMissingCheckoutProps {
  reportMissingInfo: ReportMissingInfo;
  isUserProfileLoading: boolean;
  userProfile?: UserProfileRequest_userProfile;
}

/**
 *  Report Missing Checkout component
 */
const ReportMissingCheckout: React.FC<ReportMissingCheckoutProps> = ({
  reportMissingInfo,
  isUserProfileLoading,
  userProfile,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const {
    // this field is for calling the report missing incident mutation
    reportMissingVariables,
    // this field indicates where the previous workflow originated.
    from,

    // Request data passed via location.state - often from Technology workflows
    requestConfigOptions,
    checkoutType,
  } = useLocation().state || {};

  const [
    createMissingComputerReplacementOrder,
    { loading: createMissingComputerReplacementOrderLoading },
  ] = useMutation<
    CreateMissingComputerReplacementOrder,
    CreateMissingComputerReplacementOrderVariables
  >(CREATE_MISSING_COMPUTER_REPLACEMENT_ORDER);

  const [shippingFormAddressErrorResponse] = useState<
    CreateCatalogOrder_createCatalogOrder_shippingForm
  >({
    isAddressValid: true,
    __typename: 'AddressSubmissionResponse',
    shippingAddressErrors: null,
  });

  // Controls whether override validation markup is rendered
  // TODO: Remove this state once address validation BE work is complete
  const [showOverrideValidation, setShowOverrideValidation] = useState(false);

  // set cancel modal state
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

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
      label: t('checkout:reportBroken.orderDetails.reasonForReturn'),
      value: requestConfigOptions.returnReason,
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
    {
      label: t('common:nextSteps'),
      value: requestConfigOptions.nextSteps,
    },
    {
      label: t('common:pickupInstructions'),
      value: requestConfigOptions.pickupInstructions,
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
    if (reportMissingInfo && userProfile) {
      try {
        const { data, errors } = await createMissingComputerReplacementOrder({
          variables: {
            requestedFor: userProfile.userId || '',
            shippingInfo,
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
          requestConfigOptions,
          checkoutType,
          userData: userProfile,
          shippingInfo,
          isReplacement: true,
        });
      } catch (error) {
        handleError();
      }
    }
  };

  return (
    <>
      <DefaultCheckoutTemplate
        showSkeletons={isUserProfileLoading}
        showSpinner={createMissingComputerReplacementOrderLoading}
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
        banner={<ReplacementBanner {...reportMissingInfo} />}
        productDetails={
          <ProductDetails
            productMessage={t('pages:request.checkout.replacementMessage')}
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

export default ReportMissingCheckout;
