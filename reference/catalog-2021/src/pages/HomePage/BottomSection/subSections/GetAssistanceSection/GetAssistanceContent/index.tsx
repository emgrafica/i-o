import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  useOBOInfoLocalState,
  GET_ASSISTANCE_FEATURE_CODE,
} from 'store/apollo/store/hooks';
import { useQuery } from '@apollo/react-hooks';
import { SERVICE_SUBSCRIPTIONS } from 'graphql/queries/serviceSubscriptions';
import { ServiceSubscriptions } from 'graphql/queries/gqlTypes/ServiceSubscriptions';
import { PunchOutModal } from 'components';
import { GetSupportPath } from 'utils/routes';
import BottomAction from '../../components/BottomAction';

interface GetAssistanceContentProps {
  helpdeskName: string | null;
  tenantLoading: boolean;
}

const GetAssistanceContent: React.FC<GetAssistanceContentProps> = ({
  helpdeskName,
  tenantLoading,
}) => {
  const { data: subscriptionsData } = useQuery<ServiceSubscriptions>(
    SERVICE_SUBSCRIPTIONS,
  );
  const { t } = useTranslation();
  const [isSupportModalOpen, setIsSupportModalOpen] = React.useState(false);
  const oboInfoLocalState = useOBOInfoLocalState();
  const getSupportSubscription =
    subscriptionsData &&
    subscriptionsData.retrieveTenantConfig.serviceSubscriptions.getSupport;
  const isButtonEnable = Boolean(
    oboInfoLocalState.hasOBOUserRightFor(GET_ASSISTANCE_FEATURE_CODE) &&
      getSupportSubscription,
  );
  const isLink = Boolean(
    isButtonEnable &&
      getSupportSubscription &&
      getSupportSubscription.isSubscribed,
  );

  return (
    <>
      <BottomAction
        buttonId="getSupportAction"
        title={t('home:getAssistance.title')}
        message={t('home:getAssistance.subtitle', {
          helpdeskName,
        })}
        buttonLabel={
          isLink ? t('topNav:getSupport') : t('home:getAssistance.action')
        }
        onClick={() => setIsSupportModalOpen(true)}
        actionDisable={!isButtonEnable}
        linkPath={GetSupportPath}
        tenantLoading={tenantLoading}
      />
      {/* Support Unsubscribe Modal */}
      {getSupportSubscription && getSupportSubscription.punchOutLink && (
        <PunchOutModal
          isModalOpen={isSupportModalOpen}
          setIsModalOpen={setIsSupportModalOpen}
          title={t('topNav:punchOutModal.title')}
          message={t('topNav:punchOutModal.getSupportMessage')}
          url={getSupportSubscription.punchOutLink}
        />
      )}
    </>
  );
};

export default GetAssistanceContent;
