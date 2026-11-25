import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Grid, Modal, Typography, Button, Box } from '@lumos/core';
import { ModalProps } from 'components/ModalProps';
import { ManagePersonalRequestsPath } from 'utils/routes';
import { env, variables } from 'utils/env';
import { openChat } from 'utils/chat';
import ContactInfo from './ContactInfo';
import {
  SearchIcon,
  EventIcon,
  TicketIcon,
  ChatIcon,
  OptionText,
  TextButton,
} from './index.style';

/** Modal for helping users contact the Service Desk */
const MDPModal: React.FC<ModalProps> = ({ isModalOpen, setIsModalOpen }) => {
  const { t } = useTranslation('getSupport');
  useEffect(() => {
    Modal.setAppElement('body');
  });

  return (
    <Modal
      kind="basic"
      heading={t('bottomSection.mdp.modal.header')}
      closeButtonAriaLabel={t('common:close')}
      isOpen={isModalOpen}
      onRequestClose={() => {
        setIsModalOpen(false);
      }}
      shouldReturnFocusAfterClose={false}
      style={{ content: { outline: 'none' } }}
    >
      <Modal.Body>
        <Box padding="10px">
          <Typography kind="subtitle2">
            {t('bottomSection.mdp.modal.title')}
          </Typography>
          <Grid flexDirection="column" padding="16px">
            <Grid alignItems="center" margin="6px 0">
              <SearchIcon />
              <TextButton
                onClick={() => {
                  setIsModalOpen(false);
                  const searchBar = document.getElementById('search');
                  if (searchBar) searchBar.focus();
                  else console.error('"search" id missing from page');
                }}
              >
                {t('bottomSection.mdp.modal.searchLabel')}
              </TextButton>
            </Grid>

            <Grid alignItems="center" margin="6px 0">
              <TicketIcon />
              <Link to={ManagePersonalRequestsPath}>
                <OptionText>
                  {t('bottomSection.mdp.modal.checkStatusLabel')}
                </OptionText>
              </Link>
            </Grid>

            <Grid alignItems="center" margin="6px 0">
              <ChatIcon />
              <TextButton
                onClick={() => {
                  setIsModalOpen(false);
                  openChat();
                }}
              >
                {t('bottomSection.mdp.modal.chatLabel')}
              </TextButton>
            </Grid>

            <Grid alignItems="center" margin="6px 0">
              <EventIcon />
              <a
                href={env(variables.loungeUrl)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <OptionText>
                  {t('bottomSection.mdp.modal.bookApptLabel')}
                </OptionText>
              </a>
            </Grid>
          </Grid>
          <ContactInfo />
        </Box>
      </Modal.Body>

      <Modal.Footer>
        <Button kind="primary" onClick={() => setIsModalOpen(false)}>
          {t('common:close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default MDPModal;
