import React, { useState } from 'react';
import { Button, Form, Modal, Loader, Grid, Box, Alert } from '@lumos/core';
import { useTranslation } from 'react-i18next';
import { ModalProps } from 'components/ModalProps';

/**
 * Enumerate the different potential states of the modal
 */
export enum ApprovalDeclineModalState {
  /** Normal (initial) state of the component */
  Normal,
  /** Loading the decline operation */
  Loading,
  /** The decline operation failed */
  Error,
}
export interface DeclineModalProps extends ModalProps {
  onDeclineClick: (declineReason: string) => void;
  onRequestClose: () => void;
  state: ApprovalDeclineModalState;
}

const MAX_CHARACTERS = 250;

/**
 * Modal that provides details on how to get support for broken devices
 * @param props
 */
const DeclineModal: React.FC<DeclineModalProps> = ({
  onDeclineClick,
  isModalOpen,
  onRequestClose,
  state,
}) => {
  const { t } = useTranslation();
  const [declineReason, setDeclineReason] = useState('');
  return (
    <Modal
      heading={t('approvals:declineModal.title')}
      contentLabel={t('approvals:declineModal.title')}
      kind="basic"
      isOpen={isModalOpen}
      closeButtonAriaLabel={t('common:close')}
      onRequestClose={onRequestClose}
    >
      <Modal.Body>
        {state === ApprovalDeclineModalState.Loading ? (
          <Grid height="170px" alignItems="center" justifyContent="center">
            <Box>
              <Loader size="sm" />
            </Box>
          </Grid>
        ) : (
          <Form name="declineApprovalForm">
            <Form.Item
              htmlFor="declineReason"
              label={t('approvals:declineModal.label')}
            >
              <Form.TextArea
                id="declineReasonText"
                name="declineReasonText"
                placeholder={t('approvals:declineModal.placeholder')}
                maximum={MAX_CHARACTERS}
                maxLength={MAX_CHARACTERS}
                height="100px"
                value={declineReason}
                onChange={event => setDeclineReason(event.target.value)}
              />
            </Form.Item>
          </Form>
        )}
        {state === ApprovalDeclineModalState.Error && (
          <Grid alignItems="center" justifyContent="center">
            <Box width="412px">
              <Alert
                kind="warning"
                compact
                message={t('common:submissionFailed')}
              />
            </Box>
          </Grid>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button kind="text" onClick={onRequestClose} marginX={2}>
          {t('common:cancel')}
        </Button>
        <Button
          disabled={!declineReason}
          kind="primary"
          onClick={() => onDeclineClick(declineReason)}
          marginX={2}
        >
          {t('approvals:decline')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeclineModal;
