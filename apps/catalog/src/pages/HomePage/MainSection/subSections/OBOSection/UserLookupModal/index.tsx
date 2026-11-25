import React, { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal, Typography } from '@lumos/core';
import { useApolloClient } from '@apollo/react-hooks';
import { OBO_USER_RIGHTS } from 'graphql/queries';
import { ModalProps } from 'components/ModalProps';
import { useSetOBOInfoLocalState } from 'store/apollo/store/hooks';
import UserLookup, { SelectedUser } from 'components/UserLookup';
import ImpersonationModal from 'components/ImpersonationModal';
import { useCanImpersonate } from 'utils/useCanImpersonate';

const UserLookupModal: React.FC<ModalProps> = props => {
  const { t } = useTranslation();
  const client = useApolloClient();

  /**
   * States
   */
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null);
  const [
    showImpersonationConfirmation,
    setShowImpersonationConfirmation,
  ] = useState(false);
  const canImpersonate = useCanImpersonate();

  /**
   * Mutations
   */
  const setOBOInfoLocalState = useSetOBOInfoLocalState();

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
    if (props.isModalOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.removeAttribute('style');
    };
  }, [props.isModalOpen]);

  const closeModal = () => {
    props.setIsModalOpen(false);
  };

  const handleSubmit = () => {
    if (selectedUser) {
      // Fetch OBO User Rigths
      client
        .query({
          query: OBO_USER_RIGHTS,
        })
        .then(result => {
          // Set selected User and rigths in OBOInfo global state
          if (result && result.data) {
            const { oboActiveGeExpFeatures } = result.data;
            setOBOInfoLocalState(selectedUser, oboActiveGeExpFeatures).then(
              closeModal,
            );
          }
        });
    }
  };

  const canSubmit = selectedUser && searchTerm !== '';

  return showImpersonationConfirmation && selectedUser ? (
    <ImpersonationModal
      selectedUser={selectedUser}
      isModalOpen={showImpersonationConfirmation}
      setIsModalOpen={setShowImpersonationConfirmation}
    />
  ) : (
    <Modal
      id="userLookupModal"
      kind="primary"
      heading={t('home:userLookup.title')}
      closeButtonAriaLabel={t('common:close')}
      isOpen={props.isModalOpen}
      onRequestClose={closeModal}
      shouldFocusAfterRender={false}
    >
      <Modal.Body>
        <Typography kind="body2" marginBottom="20px">
          {t('home:userLookup.description')}
        </Typography>
        <UserLookup
          onSelect={setSelectedUser}
          onChange={setSearchTerm}
          label={t('userLookup:searchLabel')}
          includeSelf={false}
        />
      </Modal.Body>
      <Modal.Footer>
        {canImpersonate && (
          <div style={{ flex: '1 1 auto' }}>
            <Button id="impersonateBtn" kind="secondary" disabled={!canSubmit}>
              {t('impersonationModal:impersonate')}
            </Button>
          </div>
        )}
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
