import React, { useState, useEffect } from 'react';
import { Grid, Typography, Form, Button, Alert } from '@lumos/core';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  useTechnologyActionsContext,
  useTechnologyStateContext,
} from 'pages/TechnologyPage';
import {
  ActionTypes,
  AssetAction,
  ClientRequestStatus,
} from 'pages/TechnologyPage/types';
import { REGISTER_ASSET_OWNERSHIP } from 'graphql/mutations/registerAssetOwnership';
import {
  registerAssetOwnership,
  registerAssetOwnershipVariables,
} from 'graphql/mutations/gqlTypes/registerAssetOwnership';
import { useMutation } from '@apollo/react-hooks';
import { useUserId } from 'containers/AuthContainer/AuthContext';
import { useOBOInfoLocalState } from 'store/apollo/store/hooks';

const StyledList = styled.ul`
  margin: 0;
  padding-left: 1em;
  list-style: none;
  position: relative;
`;

const ListItem = styled.li`
  &:before {
    content: '-';
    position: absolute;
    margin-left: -1em;
  }
`;

const CheckboxLabel = styled(Form.Item)`
  padding-left: 0;
  padding-right: 0;
  align-items: flex-start;
  margin-bottom: 60px;

  & > label {
    margin-top: 0;
    font-size: 16px;
    align-items: flex-start;
  }
`;

const StyledTypography = styled(Typography).attrs({
  kind: 'body1',
})`
  margin-top: 0;
`;

const GlobalVariation: React.FC = () => {
  const { t } = useTranslation('technology');
  const userId = useUserId();
  const oboInfo = useOBOInfoLocalState();
  const [acknowledged, setAcknowledgement] = useState(false);
  const dispatch = useTechnologyActionsContext();
  const [registerOwnership, { loading }] = useMutation<
    registerAssetOwnership,
    registerAssetOwnershipVariables
  >(REGISTER_ASSET_OWNERSHIP);
  const { assetData, sideSheetActionStatus } = useTechnologyStateContext();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setAcknowledgement(e.currentTarget.checked);
  };
  const handleCancel = () => {
    dispatch({
      type: ActionTypes.SET_ASSET_DATA,
      payload: { assetData: null, assetAction: AssetAction.None },
    });
  };

  const setSideSheetActionStatus = (
    status: ClientRequestStatus,
    data?: any,
  ) => {
    dispatch({
      type: ActionTypes.SET_SIDE_SHEET_ACTION_STATUS,
      payload: {
        status,
        data,
      },
    });
  };

  const handleCloseAlert = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // todo - may be propose to Lumos Audit
    //  Alert doesn't have a prop to observe the close event, which causing
    //  the Alert instance not able to be reused. The hack used here is based
    //  on the Lumos source code which guarantee only the close button has
    //  the 'path' as child in the svg icon.
    if (e.target && (e.target as HTMLElement).querySelector('path')) {
      setSideSheetActionStatus(ClientRequestStatus.None);
    }
  };

  const handleLoading = () => {
    setSideSheetActionStatus(ClientRequestStatus.Loading);
  };

  const handleFailure = () => {
    setSideSheetActionStatus(ClientRequestStatus.Failed);
  };

  const handleSuccess = () => {
    setSideSheetActionStatus(ClientRequestStatus.Succeeded);
    setTimeout(() => {
      setSideSheetActionStatus(ClientRequestStatus.None);
    }, 5000);
  };

  const handleRegister = async () => {
    if (!userId) {
      throw new Error('Failed to proceed: userId is undefined.');
    }
    if (!assetData || !assetData.serialNumber) {
      throw new Error('Failed to proceed: serialNumber is undefined.');
    }

    try {
      const { errors } = await registerOwnership({
        variables: {
          data: {
            createdBy: userId,
            onBehalfOf: oboInfo.user ? oboInfo.user.userId : userId,
            assetId: assetData.id,
          },
        },
      });

      if (errors) {
        handleFailure();
      } else {
        handleSuccess();
      }
    } catch (error) {
      handleFailure();
    }
  };

  useEffect(() => {
    if (loading) {
      handleLoading();
    }
    /* eslint-disable */
  }, [loading]);

  return (
    <Grid flexDirection="column">
      <Typography kind="body1" marginTop="60px" marginBottom="20px">
        {t('registerOwnership.instructions')}
      </Typography>
      <StyledTypography>
        {t('registerOwnership.alertMessage.title')}
      </StyledTypography>
      <StyledList>
        <ListItem>
          <StyledTypography>
            {t('registerOwnership.alertMessage.reportComputerMissing')}
          </StyledTypography>
        </ListItem>
        <ListItem>
          <StyledTypography>
            {t('registerOwnership.alertMessage.reportOwnershipError')}
          </StyledTypography>
        </ListItem>
        <ListItem>
          <StyledTypography>
            {t('registerOwnership.alertMessage.contactServiceDesk')}
          </StyledTypography>
        </ListItem>
      </StyledList>
      {sideSheetActionStatus.status === ClientRequestStatus.Failed && (
        <Alert
          kind="warning"
          message={t('submission.failed')}
          closeable
          compact
          marginTop="20px"
          onClick={handleCloseAlert}
        />
      )}
      <CheckboxLabel
        required
        label={t('registerOwnership.acknowledgementMessage')}
        htmlFor="registerOwnershipAcknowledgement"
        inlineLabel
      >
        <Form.Checkbox
          id="registerOwnershipAcknowledgement"
          checked={acknowledged}
          onChange={handleChange}
        />
      </CheckboxLabel>
      <Grid justifyContent="flex-end" alignContent="center">
        <Button data-testid="cancel" kind="secondary" onClick={handleCancel}>
          {t('common:cancel')}
        </Button>
        <Button
          marginLeft="20px"
          disabled={!acknowledged}
          onClick={handleRegister}
        >
          {t('common:submit')}
        </Button>
      </Grid>
    </Grid>
  );
};

export default GlobalVariation;
