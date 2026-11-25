import React, { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal, Typography } from '@lumos/core';
import { ModalProps } from 'components/ModalProps';

const HelpMeDecideModal: React.FC<ModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const { t } = useTranslation();

  /**
   * Layout Effects
   */
  useLayoutEffect(() => {
    Modal.setAppElement('body');
  });

  /**
   * Todo - This is from the current Lumos Modal limitation,
   *  I think it should be handled in the Lumos side at least
   *  expose an option to disabled the background overflow,
   *  otherwise when the modal over contains overflown
   *  content, it would not be possible with a hack like this.
   */
  useLayoutEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.removeAttribute('style');
    };
  }, [isModalOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const displayProductOptions = () => {
    const productOptions = [
      'teamsDialtone',
      'analogLine',
      'deskPhone',
      'conferenceRoomPhone',
      'predefinedSku',
      'specialRequest',
    ];
    return productOptions.map(product => (
      <Typography key={product} kind="body2" marginBottom="20px">
        {t(`pages:request.gcom.helpMeDecide.${product}`)}
      </Typography>
    ));
  };

  return (
    <Modal
      id="helpMeDecideModal"
      kind="primary"
      heading={t('pages:request.gcom.helpMeDecide.title')}
      closeButtonAriaLabel={t('common:close')}
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      shouldFocusAfterRender={false}
    >
      <Modal.Body>{displayProductOptions()}</Modal.Body>
      <Modal.Footer>
        <Button id="closeBtn" kind="primary" onClick={closeModal}>
          {t('common:close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default HelpMeDecideModal;
