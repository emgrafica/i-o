import React, { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApolloClient } from '@apollo/react-hooks';
import { Button, Modal, Typography } from '@lumos/core';
import USER_PROFILE_REQUEST from 'graphql/queries/UserProfileRequest';
import { ModalProps } from 'components/ModalProps';
import UserLookup, { SelectedUser } from 'components/UserLookup';

interface ChangeUserProps {
  changeUser: (selectedUser: any) => void;
}

const UserLookupModal: React.FC<ModalProps & ChangeUserProps> = ({
  isModalOpen,
  setIsModalOpen,
  changeUser,
}) => {
  const { t } = useTranslation();
  const client = useApolloClient();

  /**
   * States
   */
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null);

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

  const handleSubmit = () => {
    if (selectedUser) {
      client
        .query({
          query: USER_PROFILE_REQUEST,
          variables: {
            userId: selectedUser.userId,
          },
        })
        .then(result => {
          if (result && result.data) {
            changeUser(result.data.userProfile);
          }
        })
        .then(() => closeModal())
        // This catch will need to be handled properly, once we have
        // requirements/designs from Product & UX
        .catch(() => console.log('Error fetching user profile data!'));
    }
  };

  const canSubmit = selectedUser && searchTerm !== '';

  return (
    <Modal
      id="userLookupModal"
      kind="primary"
      heading={t('pages:request.gcom.userLookup.title')}
      closeButtonAriaLabel={t('common:close')}
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      shouldFocusAfterRender={false}
    >
      <Modal.Body>
        <Typography kind="body2" marginBottom="20px">
          {t('pages:request.gcom.userLookup.description')}
        </Typography>
        <UserLookup
          onSelect={setSelectedUser}
          onChange={setSearchTerm}
          label={t('userLookup:searchLabel')}
          includeSelf={true}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button id="cancelBtn" kind="text" onClick={closeModal} marginX={2}>
          {t('common:cancel')}
        </Button>
        <Button
          id="submitBtn"
          kind="primary"
          disabled={!canSubmit}
          onClick={handleSubmit}
          marginX={2}
        >
          {t('common:submit')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserLookupModal;
