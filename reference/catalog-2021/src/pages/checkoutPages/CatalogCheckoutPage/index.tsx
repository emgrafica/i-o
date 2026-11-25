import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useOBOInfoLocalState } from 'store/apollo/store/hooks';
import { useTranslation } from 'react-i18next';
import USER_PROFILE_REQUEST from '../../../graphql/queries/UserProfileRequest';
import {
  UserProfileRequest,
  UserProfileRequestVariables,
} from '../../../graphql/queries/gqlTypes/UserProfileRequest';
import {
  useReplacementInfo,
  useSetReplacementInfo,
  useReportBrokenInfo,
  useSetReportBrokenInfo,
} from 'store/apollo/store/hooks';
import { useUserId } from 'containers/AuthContainer/AuthContext';
import { CheckoutTypes } from '../../CatalogPage/utils';
import { useCart, useReportMissingInfo } from 'store';
import PageTemplate from '../../../components/PageTemplate';
import CatalogCommunicationsCheckout from './CatalogCommunicationsCheckout';
import CatalogDefaultCheckout from './CatalogDefaultCheckout';
import CatalogMobilityCheckout from './CatalogMobilityCheckout';
import ReportMissingCheckout from './ReportMissingCheckout';
import ReportBrokenCheckout from './ReportBrokenCheckout';
import { getRelevantContent } from '../utils';
import ErrorScreen from '../../../components/ErrorScreen';
import { LeaveModal } from 'components';
import ReturnLabelDownloadCheckout from './ReturnLabelDownloadCheckout';
import { useLocation } from 'react-router-dom';

/**
 * Location State type for the CatalogCheckoutPage to pass state via history/location
 * All the fields in the type are optional and only one of them should
 * be defined at any time to identify the current flow.
 */
export interface CatalogCheckoutLocationState {
  /**Store the data for the return label download flow*/
  returnLabelDownloadInfo?: {};
}
/**
 *  Catalog Communications Checkout component
 */
const CatalogCheckoutPage: React.FC = () => {
  const { t } = useTranslation();
  const currentUserId = useUserId() as string;

  // Get OBOUser
  const oboInfoLocalState = useOBOInfoLocalState();
  const oboUser = oboInfoLocalState && oboInfoLocalState.user;

  const {
    loading: isUserProfileLoading,
    data: userProfileData,
    error: userProfileError,
  } = useQuery<UserProfileRequest, UserProfileRequestVariables>(
    USER_PROFILE_REQUEST,
    {
      variables: {
        userId: oboUser ? oboUser.userId : currentUserId,
      },
      // Any errors thrown from the userProfile query should be considered a "critical error"
      // This error will bubble up to the ErrorBoundary, which will render the "Oops" page.
      onError: (error: any) => {
        throw new Error(error);
      },
    },
  );

  const replacementInfo = useReplacementInfo();
  const reportBrokenInfo = useReportBrokenInfo();
  const setReplacementInfo = useSetReplacementInfo();
  const setReportBrokenInfo = useSetReportBrokenInfo();
  const [reportMissingInfo, setReportMissingInfo] = useReportMissingInfo();
  const { returnLabelDownloadInfo } = useLocation<
    CatalogCheckoutLocationState
  >().state;

  //-----------------------------------------------------------------------------
  // This brings in the request data via Cart, and
  // sets the data to the necessary values to be used
  // throughout the Checkout page and logic.
  //-----------------------------------------------------------------------------
  const [cart] = useCart(currentUserId);
  const cartItem = cart.items.length > 0 ? cart.items[0] : null;

  let checkoutType = '';
  let body = null;

  // TODO: Consider separating the cartItem and external workflows to diferent routes.
  if (cartItem) {
    //-----------------------------------------------------------------------------
    // If comes from PDP sending item via cart.
    //-----------------------------------------------------------------------------
    checkoutType = cartItem.checkoutType;
    switch (checkoutType) {
      case CheckoutTypes.Accessories:
      case CheckoutTypes.Computers:
        // If replacementInfo contains data, it means we are doing a Replace of an existing item.
        // Previous item data come on replacementInfo and new item come on cartItem.
        body = (
          <CatalogDefaultCheckout
            cartItem={cartItem}
            replacedProductInfo={replacementInfo}
            isUserProfileLoading={isUserProfileLoading}
            userProfile={userProfileData && userProfileData.userProfile}
          />
        );
        break;

      case CheckoutTypes.GCom:
        body = (
          <CatalogCommunicationsCheckout
            cartItem={cartItem}
            isUserProfileLoading={isUserProfileLoading}
            userProfile={userProfileData && userProfileData.userProfile}
          />
        );
        break;
      case CheckoutTypes.Mobility:
        body = (
          <CatalogMobilityCheckout
            cartItem={cartItem}
            isUserProfileLoading={isUserProfileLoading}
            userProfile={userProfileData && userProfileData.userProfile}
          />
        );
        break;
    }
  } else if (reportBrokenInfo) {
    body = (
      <ReportBrokenCheckout
        reportBrokenInfo={reportBrokenInfo}
        isUserProfileLoading={isUserProfileLoading}
        userProfile={userProfileData && userProfileData.userProfile}
      />
    );
  } else if (reportMissingInfo) {
    body = (
      <ReportMissingCheckout
        reportMissingInfo={reportMissingInfo}
        isUserProfileLoading={isUserProfileLoading}
        userProfile={userProfileData && userProfileData.userProfile}
      />
    );
  } else if (returnLabelDownloadInfo) {
    body = (
      <ReturnLabelDownloadCheckout
        isUserProfileLoading={isUserProfileLoading}
        userProfile={userProfileData && userProfileData.userProfile}
      />
    );
  }

  const exitWorkflow = () => {
    if (replacementInfo) {
      setReplacementInfo(null);
    }
    if (reportBrokenInfo) {
      setReportBrokenInfo(null);
    }
    if (reportMissingInfo) {
      setReportMissingInfo(null);
    }
  };

  const isInWorkflow =
    replacementInfo ||
    reportBrokenInfo ||
    reportMissingInfo ||
    returnLabelDownloadInfo;

  return (
    <PageTemplate
      hasBanner
      title={t(getRelevantContent(checkoutType).title)}
      subtitle={t(getRelevantContent(checkoutType).header)}
    >
      {!userProfileError ? (
        <>
          {body}
          {/* If we are on a workflow, LeaveModal should be displayed. */}
          {isInWorkflow && (
            <LeaveModal
              title={t('pages:request.leaveModal.title')}
              content={t('pages:request.leaveModal.content')}
              onConfirm={exitWorkflow}
            />
          )}
        </>
      ) : (
        <ErrorScreen />
      )}
    </PageTemplate>
  );
};

export default CatalogCheckoutPage;
