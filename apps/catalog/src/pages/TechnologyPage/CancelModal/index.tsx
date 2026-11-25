import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal, Typography } from '@lumos/core';
import { useHistory } from 'react-router-dom';
import { ModalProps } from 'components/ModalProps';
import { ManagePersonalTechnologyPath } from 'utils/routes';

export interface CancelModalProps extends ModalProps {}

/**
 * @param {*} props
 * Cancel Modal for Return Device Checkout Flow
 */

const CancelModal: React.FC<CancelModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const { t } = useTranslation('technology');
  const history = useHistory();

  const handleRedirect = () => {
    history.push({
      pathname: ManagePersonalTechnologyPath,
      state: {
        force: true,
      },
    });
  };

  const close = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        kind="warning"
        heading={t('checkout.cancelModal.title')}
        closeButtonAriaLabel={t('common:close')}
        isOpen={isModalOpen}
        onRequestClose={close}
      >
        <Modal.Body>
          <Typography kind="body1">
            {t('checkout.cancelModal.content')}
          </Typography>
        </Modal.Body>
        <Modal.Footer>
          <Button kind="text" onClick={close} marginX={2}>
            {t('common:stayOnPage')}
          </Button>
          <Button
            kind="primary"
            onClick={handleRedirect}
            data-testid="modal-cancel-action"
            marginX={2}
          >
            {t('common:cancelOrder')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CancelModal;
