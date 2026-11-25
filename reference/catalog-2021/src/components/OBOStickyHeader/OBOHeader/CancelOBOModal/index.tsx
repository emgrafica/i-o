import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal, Typography } from '@lumos/core';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ModalProps } from 'components/ModalProps';
import { HomePath } from 'utils/routes';
import { useSetOBOInfoLocalState } from 'store/apollo/store/hooks';

/**
 * OBO Cancel Modal Props
 */
export type CancelOBOModalProps = ModalProps & RouteComponentProps;
/**
 * OBO Cancel Modal Component
 *
 */
const CancelOBOModal: React.FC<CancelOBOModalProps> = props => {
  const { t } = useTranslation();
  const setOBOInfoLocalState = useSetOBOInfoLocalState();

  const closeModal = () => {
    props.setIsModalOpen(false);
  };

  const handleSubmit = () => {
    setOBOInfoLocalState(null, null);

    // Navigate to Home page
    props.history.push(HomePath);
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <Modal
      kind="warning"
      heading={t('oboStickyHeader:cancel')}
      closeButtonAriaLabel={t('common:close')}
      isOpen={props.isModalOpen}
      onRequestClose={closeModal}
      shouldFocusAfterRender={false}
    >
      <Modal.Body>
        <Typography kind="body2">
          {t('oboStickyHeader:cancelDescription')}
        </Typography>
      </Modal.Body>
      <Modal.Footer>
        <Button kind="text" onClick={closeModal} marginX={2}>
          {t('common:cancel')}
        </Button>
        <Button kind="warning" onClick={handleSubmit} marginX={2}>
          {t('common:submit')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default withRouter(CancelOBOModal);
