import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { useToasts } from '@lumos/core';
import { AddressInfoInput } from 'gqlTypes/globalTypes';
import { useUserId } from 'containers/AuthContainer/AuthContext';
import { UserProfileRequest_userProfile } from '../../../../graphql/queries/gqlTypes/UserProfileRequest';
import { getRelevantPath } from '../../utils';
import {
  ReportBroken,
  ReportBrokenVariables,
} from '../../../../graphql/mutations/gqlTypes/ReportBroken';
import { REPORT_BROKEN } from 'graphql/mutations';
import CheckoutCancelModal from '../../components/CheckoutCancelModal';
import { getReturnTo } from '../../utils';
import ProductDetails from '../../components/ProductDetails';
import DefaultCheckoutTemplate from '../../templates/DefaultCheckoutTemplate';
import ReplacementBanner from 'components/ReplacementBanner';
import { OrderConfirmationPath } from 'utils/routes';
import ReportBrokenOrderDetails from '../../components/ReportBrokenOrderDetails';
import { ReportBrokenInfo_reportBrokenInfo } from '../../../../store/apollo/store/actions/queries/gqlTypes/ReportBrokenInfo';

/**
 *  Report Broken Checkout component props
 */
interface ReportBrokenCheckoutProps {
  reportBrokenInfo: ReportBrokenInfo_reportBrokenInfo;
  isUserProfileLoading: boolean;
  userProfile?: UserProfileRequest_userProfile;
}

/**
 *  Report Broken Checkout component
 */
const ReportBrokenCheckout: React.FC<ReportBrokenCheckoutProps> = ({
  reportBrokenInfo,
  isUserProfileLoading,
  userProfile,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const currentUserId = useUserId() as string;
  const {
    // this field indicates where the previous workflow originated.
    from,

    // Request data passed via location.state - often from Technology workflows
    requestConfigOptions,
    checkoutType,
  } = useLocation().state || {};

  const [
    createReportBrokenRequest,
    { loading: createReportBrokenRequestLoading },
  ] = useMutation<ReportBroken, ReportBrokenVariables>(REPORT_BROKEN);

  // set cancel modal state
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

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
    if (reportBrokenInfo && userProfile) {
      try {
        const { data, errors } = await createReportBrokenRequest({
          variables: {
            data: {
              assetId: reportBrokenInfo.id || '',
              caseReference: reportBrokenInfo.incidentNumber,
              requestDetails: reportBrokenInfo.details,
              requestedForId: userProfile.userId || '',
              shippingDetails: shippingInfo
                ? {
                    ...shippingInfo,
                    contactName: shippingInfo.name,
                    contactPhoneNumber: shippingInfo.phone,
                  }
                : {
                    address1: '',
                    city: '',
                    state: '',
                    zip: '',
                    country: '',
                    contactName: '',
                    contactPhoneNumber: '',
                  },
              requestedById: currentUserId,
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
            requestConfigOptions,
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
        showSpinner={createReportBrokenRequestLoading}
        showSkeletons={isUserProfileLoading}
        showShippingForm
        showBilling
        checkoutType={checkoutType}
        showOverrideValidation={false}
        userProfile={userProfile}
        onSubmitClick={submitRequest}
        onCancelClick={setIsCancelModalOpen}
        banner={<ReplacementBanner {...reportBrokenInfo} />}
        productDetails={
          <ProductDetails
            productMessage={t('pages:request.checkout.replacementMessage')}
            flex={1}
          />
        }
        orderDetails={<ReportBrokenOrderDetails />}
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

export default ReportBrokenCheckout;
