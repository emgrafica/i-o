import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal, Typography } from '@lumos/core';
import { ModalProps } from 'components/ModalProps';
import { useSetOBOInfoLocalState } from 'store/apollo/store/hooks';

/**
 * Confirm OBO update Modal Props
 */
interface ConfirmOBOUpdateModalProps extends ModalProps {
  currentOBOUserName: String;
}

/**
 * Confirm OBO update Modal Component
 *
 */
const ConfirmOBOUpdateModal: React.FC<ConfirmOBOUpdateModalProps> = props => {
  const { currentOBOUserName } = props;
  const { t } = useTranslation();
  const setOBOInfoLocalState = useSetOBOInfoLocalState();

  const closeModal = () => {
    props.setIsModalOpen(false);
  };

  const handleSubmit = () => {
    // Set OBO user as null
    setOBOInfoLocalState(null, null);
  };

  return (
    <Modal
      kind="warning"
      heading={t('oboStickyHeader:update')}
      closeButtonAriaLabel={t('common:close')}
      isOpen={props.isModalOpen}
      onRequestClose={closeModal}
      shouldFocusAfterRender={false}
    >
      <Modal.Body>
        <Typography kind="body2">
          {t('oboStickyHeader:updateDescription', {
            currentOBOUserName,
          })}
        </Typography>
      </Modal.Body>
      <Modal.Footer>
        <Button id="cancelBtn" kind="text" onClick={closeModal} marginX={2}>
          {t('common:cancel')}
        </Button>
        <Button
          id="confirmBtn"
          kind="warning"
          onClick={handleSubmit}
          marginX={2}
        >
          {t('common:confirm')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmOBOUpdateModal;
