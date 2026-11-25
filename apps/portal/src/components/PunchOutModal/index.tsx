import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Typography, Button } from '@lumos/core';
import { ModalProps } from 'components/ModalProps';

export interface PunchOutModalProps extends ModalProps {
  /** The title of the modal */
  title: string;

  /** Allows users to pass content to modal */
  message: string;

  /** href path for punch out */
  url: string;

  /** The text to display on the call to action, if
   * no text is provided the string "Continue" will
   * be used as default
   */
  callToAction?: string;
}

/**
 * Dialog modal to take user to an external service when tenant is unsubscribed
 * @param props
 */
const PunchOutModal: React.FC<PunchOutModalProps> = ({
  title,
  message,
  url,
  callToAction,
  isModalOpen,
  setIsModalOpen,
}) => {
  const { t } = useTranslation();
  useEffect(() => {
    Modal.setAppElement('body');
  });

  return (
    <>
      <Modal
        kind="primary"
        heading={title}
        closeButtonAriaLabel={t('common:close')}
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
        }}
      >
        <Modal.Body>
          <Typography kind="body1">{message}</Typography>
        </Modal.Body>
        <Modal.Footer>
          <Button kind="text" onClick={() => setIsModalOpen(false)} marginX={2}>
            {t('common:close')}
          </Button>
          <a target="_blank" rel="noopener noreferrer" href={url}>
            <Button
              kind="primary"
              onClick={() => setIsModalOpen(false)}
              marginX={2}
            >
              {callToAction || t('common:continue')}
            </Button>
          </a>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default PunchOutModal;
