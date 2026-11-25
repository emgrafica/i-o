import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Form, Button, Box, Alert } from '@lumos/core';
import { EDIT_USAGE_REASONS, UPDATE_ASSET_USAGE } from '../../../queries';
import { EditUsageGlobal } from '../../../queries/gqlTypes/EditUsageGlobal';
import { FormActionGroup, AlignCenter } from '../../../index.style';
import SkeletonLoader from '../../../SkeletonLoader';
import LoadingScreen from 'components/LoadingScreen';
import ErrorScreen from 'components/ErrorScreen';
import {
  AssetAction,
  ActionTypes,
  ClientRequestStatus,
} from 'pages/TechnologyPage/types';
import {
  useTechnologyActionsContext,
  useTechnologyStateContext,
} from 'pages/TechnologyPage';
import {
  updateComputerUsageVariables,
  updateComputerUsage,
} from 'pages/TechnologyPage/queries/gqlTypes/updateComputerUsage';

/**
 * parse EditUsage Options parses data to dropdown options
 */
const parseEditUsageOptions = (data: EditUsageGlobal | undefined) =>
  data
    ? data.editUsageGlobal.usageTypes.map((category: string) => ({
        label: category,
        value: category,
      }))
    : [];

const EditUsageForm: React.FC = () => {
  const { t } = useTranslation('technology');
  const [editUsageCategory, setEditUsage] = useState('');
  const dispatch = useTechnologyActionsContext();
  const { assetData, sideSheetActionStatus } = useTechnologyStateContext();
  const { data, loading, error } = useQuery<EditUsageGlobal>(
    EDIT_USAGE_REASONS,
  );

  const [updateEditUsage, { loading: editUsageLoading }] = useMutation<
    updateComputerUsage,
    updateComputerUsageVariables
  >(UPDATE_ASSET_USAGE);

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

  const handleSuccess = () => {
    setSideSheetActionStatus(ClientRequestStatus.Succeeded);
  };

  const handleFailure = () => {
    setSideSheetActionStatus(ClientRequestStatus.Failed);
  };

  const submit = async () => {
    if (!assetData) {
      throw new Error('Asset must exist');
    }

    const { id, _etag } = assetData;

    try {
      const { errors } = await updateEditUsage({
        variables: {
          assetId: id,
          _etag: _etag,
          usage: editUsageCategory,
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
  }, [editUsageLoading]);

  let content;
  if (loading) {
    content = <SkeletonLoader />;
  } else if (editUsageLoading) {
    content = (
      <AlignCenter>
        <LoadingScreen />
      </AlignCenter>
    );
  } else if (error) {
    content = (
      <AlignCenter>
        <ErrorScreen />
      </AlignCenter>
    );
  } else {
    content = (
      <>
        {data && (
          <Box paddingTop={9}>
            <Form.Item
              required
              htmlFor="editUsageInput"
              label={t('editUsage.label')}
              padding="0px"
              labelId="editUsageOptionsLabelId"
              tooltip={t('common:availableOptionsReasonTooltip')}
            >
              <Form.Dropdown
                data-testid="edit-usage-input"
                id="editUsageInput"
                aria-labelledby="editUsageOptionsLabelId"
                buttonLabel={t('editUsage.buttonLabel')}
                onChange={setEditUsage}
                options={parseEditUsageOptions(data)}
              />
            </Form.Item>

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
            <FormActionGroup marginTop="60px">
              <Button
                data-testid="cancel"
                kind="secondary"
                onClick={handleCancel}
              >
                {t('common:cancel')}
              </Button>
              <Button
                data-testid="submit"
                kind="primary"
                disabled={!editUsageCategory}
                onClick={submit}
              >
                {t('editUsage.update')}
              </Button>
            </FormActionGroup>
          </Box>
        )}
      </>
    );
  }
  return content;
};

export default EditUsageForm;
