import React, { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal, Form, Alert, Box } from '@lumos/core';
import { useMutation } from '@apollo/react-hooks';
import { useRequestContext } from 'pages/OrdersAndIncidentsPage';
import { CANCEL_INCIDENT } from 'graphql/mutations/cancelIncident';
import {
  CancelIncident,
  CancelIncidentVariables,
} from 'graphql/mutations/gqlTypes/CancelIncident';
import { ActionTypes } from 'pages/OrdersAndIncidentsPage/types';
import { INCIDENTS_FOR_LOGGED_IN_USER } from 'graphql/queries/incidents';
import {
  IncidentsForLoggedInUser,
  IncidentsForLoggedInUserVariables,
} from 'graphql/queries/gqlTypes/IncidentsForLoggedInUser';
import { IncidentClosingStatus, IncidentStatus } from 'gqlTypes/globalTypes';
import { IncidentFilterVars, mapStatusToRequestStatus } from '../..';
import { getFilters } from 'pages/OrdersAndIncidentsPage/utils';
import LoadingScreen from 'components/LoadingScreen';

/**
 * Props for CancelModal
 * @prop isOpen - is modal open
 * @prop setIsCancelModalOpen - function to set isCancelModalOpen state
 */
export interface CancelModalProps {
  isOpen: boolean;
  onUpdateIncident: (incidentId: string) => void;
  setIsCancelModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const charLimit = 250;

/**
 * Modal that shows when a user is attempting to cancel a incident
 * @param props
 */
const CancelModal: React.FC<CancelModalProps> = ({
  setIsCancelModalOpen,
  isOpen,
  onUpdateIncident,
}) => {
  const { t } = useTranslation();
  const [cancelIncident, { loading }] = useMutation<
    CancelIncident,
    CancelIncidentVariables
  >(CANCEL_INCIDENT);
  const { state, dispatch } = useRequestContext();

  const [cancelReason, setCancelReason] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleFailure = () => {
    setHasError(true);
  };

  const handleClose = () => {
    setCancelReason('');
    setIsCancelModalOpen(false);
    setHasError(false);
  };

  const handleSuccess = () => {
    handleClose();
    dispatch({
      type: ActionTypes.INCIDENT_CANCEL_SUCCESS,
    });

    setTimeout(() => {
      dispatch({
        type: ActionTypes.TOAST_SHOWN,
      });
    }, 5000);
  };

  const handleSubmit = async () => {
    const { incidentData } = state;

    if (!incidentData) return null;

    const { incidentId, incidentNumber } = incidentData;
    try {
      const { errors } = await cancelIncident({
        variables: {
          incidentId,
          incidentNumber,
          reason: cancelReason,
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
              incident.closingDetails = {
                date: Date.now(),
                reason: cancelReason,
                status: IncidentClosingStatus.cancelled,
                closedBy: incident.requestedFor,
                __typename: 'ClosingDetails',
              };
              incident.status = IncidentStatus.cancelled;
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
      heading={t('requests:cancelModal.title')}
      contentLabel={t('requests:cancelModal.contentLabel')}
      closeButtonAriaLabel={t('requests:cancelModal.closeButton')}
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
            <Form m={0} p={0} name="Cancel Reason">
              <Form.Item
                htmlFor="requestReasonTextArea"
                label={t('requests:cancelModal.subtitle')}
                labelId="requestReason"
                margin={1}
              >
                <Form.TextArea
                  id="requestReasonTextArea"
                  maxLength={charLimit}
                  maximum={charLimit}
                  height={110}
                  placeholder={t('requests:cancelModal.placeHolder')}
                  onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setCancelReason(event.currentTarget.value);
                  }}
                  value={cancelReason}
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
              data-testid="modal-close"
              marginX={2}
            >
              {t('common:close')}
            </Button>
            <Button
              kind="accent"
              disabled={cancelReason.length === 0}
              onClick={handleSubmit}
              marginX={2}
            >
              {t('common:confirm')}
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default CancelModal;
