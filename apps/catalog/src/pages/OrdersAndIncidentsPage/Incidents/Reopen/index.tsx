import React, { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal, Form, Box, Alert } from '@lumos/core';
import { useMutation } from '@apollo/react-hooks';
import { useRequestContext } from 'pages/OrdersAndIncidentsPage';
import { ActionTypes } from 'pages/OrdersAndIncidentsPage/types';
import {
  reopenIncident,
  reopenIncidentVariables,
} from 'graphql/mutations/gqlTypes/reopenIncident';
import { REOPEN_INCIDENT_REQUEST } from 'graphql/mutations/reopenIncident';
import LoadingScreen from 'components/LoadingScreen';
import { IncidentFilterVars, mapStatusToRequestStatus } from '..';
import { getFilters } from 'pages/OrdersAndIncidentsPage/utils';
import {
  IncidentsForLoggedInUser,
  IncidentsForLoggedInUserVariables,
} from 'graphql/queries/gqlTypes/IncidentsForLoggedInUser';
import { INCIDENTS_FOR_LOGGED_IN_USER } from 'graphql/queries/incidents';
import { IncidentStatus, IncidentStage } from 'gqlTypes/globalTypes';

/**
 * Props for ReopenModal
 * @prop isOpen - is modal open
 * @prop setIsReopenModalOpen - function to set isReopenModalOpen state
 */
export interface ReopenModalProps {
  isOpen: boolean;
  onUpdateIncident: (incidentId: string) => void;
  setIsReopenModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const charLimit = 500;

/**
 * Modal that shows when a user is attempting to reopen a incident
 * @param props
 */
const ReopenModal: React.FC<ReopenModalProps> = ({
  setIsReopenModalOpen,
  onUpdateIncident,
  isOpen,
}) => {
  const { t } = useTranslation('requests');
  const [reopenRequest, { loading }] = useMutation<
    reopenIncident,
    reopenIncidentVariables
  >(REOPEN_INCIDENT_REQUEST);
  const { state, dispatch } = useRequestContext();

  const [reopenReason, setReopenReason] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleFailure = () => {
    setHasError(true);
  };

  const handleClose = () => {
    setReopenReason('');
    setIsReopenModalOpen(false);
    setHasError(false);
  };

  const handleSuccess = () => {
    handleClose();
    dispatch({
      type: ActionTypes.INCIDENT_REOPEN_SUCCESS,
    });
  };

  const handleSubmit = async () => {
    const { incidentData } = state;

    if (!incidentData) return null;

    const { incidentId, incidentNumber } = incidentData;
    try {
      const { errors } = await reopenRequest({
        variables: {
          incidentId,
          incidentNumber,
          reason: reopenReason,
        },
        update: store => {
          const filterVars: IncidentFilterVars = {
            status: [],
          };

          for (const f of state.filterState.filters) {
            if (f.filterName === 'Status') {
              filterVars.status = getFilters(f, mapStatusToRequestStatus);
            }
          }
          const result = store.readQuery<
            IncidentsForLoggedInUser,
            IncidentsForLoggedInUserVariables
          >({
            query: INCIDENTS_FOR_LOGGED_IN_USER,
            variables: {
              refine: state.keywords,
              sortOrder: state.sortOrder,
              dateRange: state.dateRange,
              ...filterVars,
            },
          });

          if (result) {
            const incident = result.incidentsSearch.items.find(
              i => i.incidentId === incidentId,
            );

            if (incident) {
              onUpdateIncident(incidentId);
              incident.closingDetails = null;
              incident.status = IncidentStatus.inProgress;
              incident.progress.currentStage = IncidentStage.inProgress;
              incident.actions.canBeReopened = false;
              incident.actions.cancellable = true;
              store.writeQuery({
                query: INCIDENTS_FOR_LOGGED_IN_USER,
                variables: {
                  refine: state.keywords,
                  sortOrder: state.sortOrder,
                  dateRange: state.dateRange,
                  ...filterVars,
                },
                data: result,
              });
              setTimeout(() => {
                onUpdateIncident('');
              }, 2000);
            }
          }
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

  useLayoutEffect(() => {
    Modal.setAppElement('body');
  }, []);

  return (
    <Modal
      heading={t('reopenModal.title')}
      contentLabel={t('reopenModal.contentLabel')}
      closeButtonAriaLabel={t('reopenModal.closeButton')}
      kind="basic"
      isOpen={isOpen}
      onRequestClose={handleClose}
    >
      {loading ? (
        <Box marginTop="80px" marginBottom="80px">
          <LoadingScreen />
        </Box>
      ) : (
        <>
          <Modal.Body>
            <Form m={0} p={0} name="Reopen Reason">
              <Form.Item
                htmlFor="requestReasonTextArea"
                label={t('reopenModal.subtitle')}
                labelId="requestReason"
                margin={1}
              >
                <Form.TextArea
                  id="requestReasonTextArea"
                  maxLength={charLimit}
                  maximum={charLimit}
                  height={110}
                  placeholder={t('reopenModal.placeHolder')}
                  onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setReopenReason(event.currentTarget.value);
                  }}
                  value={reopenReason}
                />
              </Form.Item>
            </Form>
            {hasError && (
              <Alert
                kind="warning"
                compact
                fullWidth
                closeable
                closeButtonAriaLabel={t('common:close')}
                message={t('common:submissionFailure')}
                onClick={() => setHasError(false)}
              />
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              kind="secondary"
              onClick={handleClose}
              data-testid="modal-cancel"
              marginX={2}
            >
              {t('common:cancel')}
            </Button>
            <Box marginLeft="20px">
              <Button
                kind="accent"
                disabled={reopenReason.length === 0}
                onClick={handleSubmit}
                data-testid="modal-confirm"
                marginX={2}
              >
                {t('common:confirm')}
              </Button>
            </Box>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default ReopenModal;
