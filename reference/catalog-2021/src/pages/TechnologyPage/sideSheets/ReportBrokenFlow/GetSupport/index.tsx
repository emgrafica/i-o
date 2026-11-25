import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { REPORT_BROKEN_SUPPORT } from '../../../queries';
import {
  StyledContainer,
  StyledContent,
  StyledGrid,
  StyledHeader,
} from '../../WithoutOrderFlow/index.style';
import { Button } from '@lumos/core';
import { ActionTypes, AssetAction } from '../../../types';
import { useTechnologyActionsContext } from '../../../index';
import SkeletonLoader from '../../../SkeletonLoader';
import { useTranslation } from 'react-i18next';
import { ReportBrokenSupport } from '../../../queries/gqlTypes/ReportBrokenSupport';
import { openChat } from 'utils/chat';

const GetSupport: React.FC = () => {
  const { data, loading } = useQuery<ReportBrokenSupport>(
    REPORT_BROKEN_SUPPORT,
  );
  const { t } = useTranslation('common');
  const dispatch = useTechnologyActionsContext();

  const handleCancel = () => {
    dispatch({
      type: ActionTypes.SET_ASSET_DATA,
      payload: { assetData: null, assetAction: AssetAction.None },
    });
  };

  if (loading) {
    return <SkeletonLoader />;
  } else if (!data) {
    return null;
  }

  return (
    <>
      <StyledContainer>
        <StyledHeader>{data.reportBrokenSupport.header}</StyledHeader>
        <StyledContent>{data.reportBrokenSupport.supportMessage}</StyledContent>
      </StyledContainer>
      <StyledGrid>
        <Button
          data-testid="cancel"
          kind="secondary"
          marginRight="20px"
          onClick={handleCancel}
        >
          {t('cancel')}
        </Button>
        <Button data-testid="continue" onClick={openChat}>
          {t('chatNow')}
        </Button>
      </StyledGrid>
    </>
  );
};

export default GetSupport;
