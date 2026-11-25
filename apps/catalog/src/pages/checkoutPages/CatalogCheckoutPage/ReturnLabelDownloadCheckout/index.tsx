import { Grid } from '@lumos/core';
import { UserProfileRequest_userProfile } from 'graphql/queries/gqlTypes/UserProfileRequest';
import CheckoutCancelModal from 'pages/checkoutPages/components/CheckoutCancelModal';
import OrderDetails from 'pages/checkoutPages/components/OrderDetails';
import ProductDetails from 'pages/checkoutPages/components/ProductDetails';
import DefaultCheckoutTemplate from 'pages/checkoutPages/templates/DefaultCheckoutTemplate';
import { getRelevantPath, getReturnTo } from 'pages/checkoutPages/utils';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DescriptionOutlined } from '@material-ui/icons';
import { ManagePersonalTechnologyPath } from 'utils/routes';

/**
 *  Report Missing Checkout component props
 */
interface ReturnLabelDownloadCheckoutProps {
  isUserProfileLoading: boolean;
  userProfile?: UserProfileRequest_userProfile;
}

/** Checkout component for the return label download flow */
const ReturnLabelDownloadCheckout: React.FC<ReturnLabelDownloadCheckoutProps> = ({
  isUserProfileLoading,
  userProfile,
}) => {
  const { t } = useTranslation('checkout');

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const orderDetails: [] = [];
  return (
    <>
      <DefaultCheckoutTemplate
        showSkeletons={isUserProfileLoading}
        showShippingForm
        checkoutType=""
        shippingAddressErrors={null}
        userProfile={userProfile}
        onSubmitClick={() => {}}
        onCancelClick={setIsCancelModalOpen}
        productDetails={<ProductDetails productMessage={''} flex={1} />}
        orderDetails={
          <Grid flexDirection="column">
            <OrderDetails details={orderDetails} flex={1} />
          </Grid>
        }
        submitButtonText={t('returnLabelDownload.submitActionButtonLabel')}
        submitButtonIcon={<DescriptionOutlined />}
      />
      {/* Checkout Cancel Modal */}
      <CheckoutCancelModal
        isModalOpen={isCancelModalOpen}
        setIsModalOpen={setIsCancelModalOpen}
        relevantPath={getRelevantPath(ManagePersonalTechnologyPath, true)}
        returnTo={t(getReturnTo(ManagePersonalTechnologyPath))}
      />
    </>
  );
};

export default ReturnLabelDownloadCheckout;
