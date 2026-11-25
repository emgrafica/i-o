import React from 'react';
import { Modal, Typography, Button } from '@lumos/core';
import { useTranslation } from 'react-i18next';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ModalProps } from 'components/ModalProps';
import {
  useReplacementInfo,
  useReportBrokenInfo,
  useSetReplacementInfo,
  useSetReportBrokenInfo,
} from 'store/apollo/store/hooks';

export type CheckoutCancelModalProps = ModalProps &
  RouteComponentProps & { relevantPath: string; returnTo: string };

const CheckoutCancelModal: React.FC<CheckoutCancelModalProps> = props => {
  const { t } = useTranslation();
  const replacementInfo = useReplacementInfo();
  const reportBrokenInfo = useReportBrokenInfo();
  const setReplacementInfo = useSetReplacementInfo();
  const setReportBrokenInfo = useSetReportBrokenInfo();

  const exitWorkflow = () => {
    if (replacementInfo) {
      setReplacementInfo(null);
    }
    if (reportBrokenInfo) {
      setReportBrokenInfo(null);
    }
  };

  return (
    <Modal
      closeButtonAriaLabel={t('common:close')}
      heading={t('pages:request.checkout.modal.cancel.header')}
      kind="warning"
      isOpen={props.isModalOpen}
      shouldFocusAfterRender={false}
      onRequestClose={() => {
        props.setIsModalOpen(false);
      }}
    >
      <Modal.Body>
        <Typography kind="body1">
          {t('pages:request.checkout.modal.cancel.message', {
            returnTo: props.returnTo,
          })}
        </Typography>
      </Modal.Body>
      <Modal.Footer>
        <Button
          kind="text"
          onClick={() => {
            props.setIsModalOpen(false);
          }}
          marginX={2}
        >
          <Typography kind="button" color="secondary.1" fontWeight="normal">
            {t('pages:request.checkout.modal.cancel.stayOnPage')}
          </Typography>
        </Button>
        <Button
          kind="primary"
          onClick={() => {
            props.history.push(props.relevantPath, {
              force: true,
            });
            exitWorkflow();
          }}
          data-testid="modal-cancel-action"
          marginX={2}
        >
          {t('pages:request.checkout.modal.cancel.cancelOrder')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default withRouter(CheckoutCancelModal);
