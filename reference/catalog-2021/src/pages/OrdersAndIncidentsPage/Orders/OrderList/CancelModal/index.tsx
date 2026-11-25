import React, { useLayoutEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Box, Button, Form, Modal } from '@lumos/core';
import { useMutation } from '@apollo/react-hooks';
import { CancelCatalogRequest } from '../../../mutations/gqlTypes/CancelCatalogRequest';
import { CANCEL_CATALOG_REQUEST } from '../../../mutations';
import { MAX_ITEMS_PER_PAGE, useRequestContext } from '../../../index';
import { ActionTypes } from '../../../types';
import {
  MyRequests,
  MyRequestsVariables,
} from 'graphql/queries/gqlTypes/MyRequests';
import { MY_REQUESTS } from '../../../../../graphql/queries';
import {
  FilterVars,
  mapCategoriesToCatalogItemClass,
  mapRequestedFor,
  mapStatusToRequestStatus,
} from '../../index';
import { getFilters } from '../../../utils';
import {
  ClosingStatus,
  RequestStageType,
  RequestStatusType,
} from '../../../../../gqlTypes/globalTypes';
import LoadingScreen from 'components/LoadingScreen';

/**
 * Props for CancelModal
 * @prop isOpen - is modal open
 * @prop setIsCancelModalOpen - function to set isCancelModalOpen state
 * @prop cancelRequest - function to call cancel request mutation -- CANCEL_CATALOG_REQUEST
 */
export interface CancelModalProps {
  isOpen: boolean;
  onUpdateOrder: (orderId: string) => void;
  setIsCancelModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const charLimit = 250;

/**
 * Modal that shows when a user is attempting to cancel a request
 * @param props
 */
const CancelModal: React.FC<CancelModalProps> = ({
  setIsCancelModalOpen,
  onUpdateOrder,
  isOpen,
}) => {
  const { t } = useTranslation();
  const [cancelRequest, { loading }] = useMutation<CancelCatalogRequest>(
    CANCEL_CATALOG_REQUEST,
  );
  const { state, dispatch } = useRequestContext();

  const [cancelReason, setCancelReason] = React.useState('');

  const handleFailure = () => {
    dispatch({
      type: ActionTypes.REQUEST_CANCEL_FAILURE,
    });
  };

  const handleSuccess = () => {
    dispatch({
      type: ActionTypes.REQUEST_CANCEL_SUCCESS,
    });
  };

  const handleSubmit = async () => {
    const {
      orderData,
      sortOrder,
      dateRange,
      keywords,
      filterState,
      pageNumber,
    } = state;

    if (!orderData) return null;

    const {
      id,
      request: { workflowId },
      _etag,
    } = orderData;
    try {
      const { errors } = await cancelRequest({
        variables: {
          requestId: id,
          workflowId,
          reason: cancelReason,
          etag: _etag,
        },
        update: store => {
          const filterVars: FilterVars = {
            categories: [],
            requestedFor: [],
            requestStatus: [],
          };

          for (const f of filterState.filters) {
            if (f.filterName === 'Category') {
              filterVars.categories = getFilters(
                f,
                mapCategoriesToCatalogItemClass,
              );
            }
            if (f.filterName === 'Status') {
              filterVars.requestStatus = getFilters(
                f,
                mapStatusToRequestStatus,
              );
            }
            if (f.filterName === 'Requested For') {
              filterVars.requestedFor = getFilters(f, mapRequestedFor);
            }
          }

          const query = {
            query: MY_REQUESTS,
            variables: {
              sortOrder,
              refine: keywords,
              dateRange,
              pageNumber,
              pageSize: MAX_ITEMS_PER_PAGE,
              ...filterVars,
            },
          };

          const result = store.readQuery<MyRequests, MyRequestsVariables>(
            query,
          );

          if (result) {
            const order = result.myRequests.items.find(x => x.id === id);

            if (order) {
              onUpdateOrder(id);
              order.request = {
                ...order.request,
                status: RequestStatusType.Cancelled,
                closingInformation: {
                  date: Date.now(),
                  reason: cancelReason,
                  status: ClosingStatus.Cancelled,
                  __typename: 'ClosingInformation',
                },
                actions: {
                  ...order.request.actions,
                  cancelable: false,
                },
                progress: {
                  ...order.request.progress,
                  currentStage: RequestStageType.Cancelled,
                },
              };
            }
            store.writeQuery({
              ...query,
              data: result,
            });
            setTimeout(() => {
              onUpdateOrder('');
            }, 2000);
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
    } finally {
      setCancelReason('');
      setIsCancelModalOpen(false);
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
      onRequestClose={() => {
        setCancelReason('');
        setIsCancelModalOpen(false);
      }}
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
          </Modal.Body>
          <Modal.Footer>
            <Button
              kind="text"
              onClick={() => {
                setCancelReason('');
                setIsCancelModalOpen(false);
              }}
              marginX={2}
            >
              {t('common:close')}
            </Button>
            <Button
              kind="primary"
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
