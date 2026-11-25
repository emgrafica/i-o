import React, { useLayoutEffect } from 'react';
import { Modal, Typography, Button } from '@lumos/core';
import { useTranslation } from 'react-i18next';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ModalProps } from '../../ModalProps';
import { LogoutModalWrapper } from './LogoutModal.style';
import UserService from 'services/userServices';
export type LogoutModalProps = ModalProps & RouteComponentProps;

const LogoutModal: React.FC<LogoutModalProps> = props => {
  const { t } = useTranslation();
  useLayoutEffect(() => {
    Modal.setAppElement('body');
  });
  let dataUser: any = UserService.getCurrentUser();

  function onClickSignOut() {
    (async () => {
      const res = await UserService.clearAllByUser(dataUser.user_name);
      if (props.signOutFC && res.status === 200) {
        props.signOutFC();
      }
    })();
  }
  return (
    <LogoutModalWrapper
      closeButtonAriaLabel={t('common:close')}
      kind="primary"
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
          kind="primary"
          onClick={() => {
            props.setIsModalOpen(false);
          }}
          marginX={2}
        >
          {t('common:cancel')}
        </Button>
        <Button kind="primary" marginX={2} onClick={() => onClickSignOut()}>
          {t('topNav:logOut')}
        </Button>
      </Modal.Footer>
    </LogoutModalWrapper>
  );
};

export default withRouter(LogoutModal);
