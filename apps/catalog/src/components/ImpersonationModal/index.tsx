import React from 'react';
import { Button, Modal, Typography } from '@lumos/core';
import { ModalProps } from 'components/ModalProps';
import { useTranslation } from 'react-i18next';
import { SelectedUser } from 'components/UserLookup';

/**
 * Impersonation Modal Props
 */
export interface ImpersonationModalProps extends ModalProps {
  selectedUser: SelectedUser;
}

const ImpersonationModal: React.FC<ImpersonationModalProps> = ({
  setIsModalOpen,
  isModalOpen,
  selectedUser,
}) => {
  const { t } = useTranslation();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalHeading = `${t('impersonationModal:impersonate')} ${
    selectedUser.firstName
  } ${selectedUser.lastName}`;

  return (
    <Modal
      kind="warning"
      heading={modalHeading}
      closeButtonAriaLabel={t('common:close')}
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      shouldFocusAfterRender={false}
    >
      <Modal.Body>
        <Typography kind="body2">{t('impersonationModal:content')}</Typography>
      </Modal.Body>
      <Modal.Footer>
        <Button kind="text" onClick={closeModal} marginX={2}>
          {t('common:cancel')}
        </Button>
        <Button kind="warning" marginX={2}>
          {t('impersonationModal:impersonate')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImpersonationModal;
