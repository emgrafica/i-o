import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Button } from '@lumos/core';
import UserLookup, { SelectedUser } from 'components/UserLookup';
import { FormActionGroup, Paragraph } from '../../../index.style';
import { ActionTypes, AssetAction, ClientRequestStatus } from '../../../types';
import {
  useTechnologyActionsContext,
  useTechnologyStateContext,
} from '../../../index';
import { OrderedList } from '../index.style';
import { useMutation } from '@apollo/react-hooks';
import { REASSIGN_ASSET_REQUEST } from 'graphql/mutations/reassignAsset';
import {
  reassignAsset as reassignAssetRequest,
  reassignAssetVariables,
} from 'graphql/mutations/gqlTypes/reassignAsset';
import { useUserId } from 'containers/AuthContainer/AuthContext';
import { useOBOInfoLocalState } from 'store/apollo/store/hooks';
import { ERROR_CODES, getCodeFromGraphQLError } from 'utils/graphitiErrors';

const ReassignForm: React.FC = () => {
  const { t } = useTranslation('technology');
  const [assignTo, setAssignTo] = useState<SelectedUser | null>(null);
  const loggedInUserId = String(useUserId());
  const { userId } = useOBOInfoLocalState().user || { userId: loggedInUserId };
  const dispatch = useTechnologyActionsContext();
  const {
    assetData,
    sideSheetActionStatus,
    reassignFailureMessage,
  } = useTechnologyStateContext();
  const [reassignAsset, { loading }] = useMutation<
    reassignAssetRequest,
    reassignAssetVariables
  >(REASSIGN_ASSET_REQUEST);

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

  const handleFailure = (isInvalidAssignUserError = false) => {
    const failureMessage = isInvalidAssignUserError
      ? t('reassign.ineligibleUser')
      : t('submission.failed');

    setSideSheetActionStatus(ClientRequestStatus.Failed, {
      reassignFailureMessage: failureMessage,
    });
  };

  const handleSuccess = () => {
    if (assetData) {
      dispatch({
        type: ActionTypes.ADD_REASSIGN_OVERLAY,
        payload: { assetDataId: assetData.id },
      });
    }
    setSideSheetActionStatus(ClientRequestStatus.Succeeded);
  };

  const submit = async () => {
    if (!assetData) {
      throw new Error('Asset must exist');
    }

    if (!assignTo) {
      throw new Error('Invalid state: Submit button must be disabled.');
    }

    const { id } = assetData;

    try {
      const { errors } = await reassignAsset({
        variables: {
          data: {
            assetId: id,
            assignToId: assignTo.userId,
            onBehalfOfId: userId,
          },
        },
      });

      if (errors) {
        // This probably won't be triggered since it would only happen for partial failures
        handleFailure();
      } else {
        handleSuccess();
      }
    } catch (error) {
      // This is the more likely error scenario where the request fails entirely
      const isInvalidAssignUserError =
        getCodeFromGraphQLError(error) ===
        ERROR_CODES.REASSIGN_INVALID_TARGET_USER;

      handleFailure(isInvalidAssignUserError);
    }
  };

  useEffect(() => {
    if (loading) {
      handleLoading();
    }
    /* eslint-disable */
  }, [loading]);

  return (
    <>
      <Paragraph marginTop={6}>{t('reassign.title')}</Paragraph>
      <OrderedList>
        <li>
          <Paragraph>{t('reassign.p1')}</Paragraph>
        </li>
        <li>
          <Paragraph>{t('reassign.p2')}</Paragraph>
        </li>
        <li>
          <Paragraph>{t('reassign.p3')}</Paragraph>
        </li>
      </OrderedList>
      <UserLookup
        onSelect={setAssignTo}
        onChange={(_keyword: string) => {
          // Clear the status once the user starts performing a new search
          if (
            sideSheetActionStatus.status != ClientRequestStatus.None &&
            _keyword !== ''
          ) {
            setSideSheetActionStatus(ClientRequestStatus.None);
          }
        }}
        label={t('reassign.lookupLabel')}
        includeFunctionalUsers={true}
      />
      {assignTo && (
        <Alert
          kind="warning"
          closeable
          fullWidth
          contrast="low"
          marginTop="20px"
          message={t('reassign.warning', {
            assignedTo: `${assignTo.firstName} ${assignTo.lastName}`,
          })}
        />
      )}
      {sideSheetActionStatus.status === ClientRequestStatus.Failed && (
        <Alert
          kind="danger"
          closeable
          compact
          fullWidth
          contrast="low"
          marginTop="20px"
          message={reassignFailureMessage || t('submission.failed')}
          onClick={handleCloseAlert}
        />
      )}
      <FormActionGroup marginTop="32px">
        <Button kind="secondary" onClick={handleCancel}>
          {t('common:cancel')}
        </Button>
        <Button kind="primary" disabled={!assignTo} onClick={submit}>
          {t('common:submit')}
        </Button>
      </FormActionGroup>
    </>
  );
};

export default ReassignForm;
