import React, { useLayoutEffect } from 'react';
import { Modal, Typography, Button } from '@lumos/core';
import { useTranslation } from 'react-i18next';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ModalProps } from '../../ModalProps';

export type LogoutModalProps = ModalProps & RouteComponentProps;

const LogoutModal: React.FC<LogoutModalProps> = props => {
  const { t } = useTranslation();
  useLayoutEffect(() => {
    Modal.setAppElement('body');
  });
  return (
    <Modal
      closeButtonAriaLabel={t('common:close')}
      kind="warning"
      isOpen={props.isModalOpen}
      heading={t('topNav:logOut')}
      onRequestClose={() => {
        props.setIsModalOpen(false);
      }}
    >
      <Modal.Body>
        <Typography kind="body1">{t('topNav:logOutMessage')}</Typography>
      </Modal.Body>
      <Modal.Footer>
        <Button
          kind="text"
          onClick={() => {
            props.setIsModalOpen(false);
          }}
          marginX={2}
        >
          {t('common:cancel')}
        </Button>
        <Button kind="warning" marginX={2}>
          {t('topNav:logOut')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default withRouter(LogoutModal);
