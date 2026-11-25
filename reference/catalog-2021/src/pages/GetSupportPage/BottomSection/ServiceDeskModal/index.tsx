import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Modal, Typography, Button } from '@lumos/core';
import { ModalProps } from 'components/ModalProps';
import RecommendedCard from './RecommendedCard';
import ContactInfo from './ContactInfo';

/** Modal for helping users contact the Service Desk */
const ServiceDeskModal: React.FC<ModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const { t } = useTranslation('getSupport');
  useEffect(() => {
    Modal.setAppElement('body');
  });

  return (
    <Modal
      kind="basic"
      heading={t('bottomSection.serviceDesk.modal.header')}
      closeButtonAriaLabel={t('common:close')}
      isOpen={isModalOpen}
      onRequestClose={() => {
        setIsModalOpen(false);
      }}
      shouldReturnFocusAfterClose={false}
      style={{ content: { outline: 'none' } }}
    >
      <Modal.Body>
        <Typography kind="subtitle2" margin="10px">
          {t('bottomSection.serviceDesk.modal.title')}
        </Typography>

        <Grid
          justifyContent="space-between"
          flexDirection={{ xxs: 'column', sm: 'row' }}
        >
          <RecommendedCard
            type="search"
            closeModal={() => setIsModalOpen(false)}
          />
          <RecommendedCard
            type="chat"
            closeModal={() => setIsModalOpen(false)}
          />
        </Grid>
        <ContactInfo />
      </Modal.Body>

      <Modal.Footer>
        <Button
          kind="primary"
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          {t('common:close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ServiceDeskModal;
