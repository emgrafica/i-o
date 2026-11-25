import React, { useState } from 'react';
import { StyledWhiteBox } from '../../../general.style';
import { useTranslation } from 'react-i18next';
import { PeopleAlt } from '@material-ui/icons';
import UserLookupModal from './UserLookupModal';
import ConfirmOBOUpdateModal from './ConfirmOBOUpdateModal';
import ActionOptionCard from 'components/ActionOptionCard';
import { useOBOInfoLocalState } from 'store/apollo/store/hooks';

const OBOSection: React.FC = () => {
  const { t } = useTranslation();
  const oboInfoLocalState = useOBOInfoLocalState();
  const oboUser = oboInfoLocalState && oboInfoLocalState.user;

  /**
   * States
   */
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <StyledWhiteBox
      height={{ xxs: 108, xs: 108, sm: 79, md: 79, lg: 79, xl: 79, xxl: 79 }}
    >
      <ActionOptionCard
        icon={<PeopleAlt />}
        title={t('home:obo.title')}
        action={t('home:obo.action')}
        actionId="changeUserAction"
        onClick={openModal}
      />
      {oboUser ? (
        <ConfirmOBOUpdateModal
          currentOBOUserName={`${oboUser.firstName} ${oboUser.lastName}`}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      ) : (
        <UserLookupModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </StyledWhiteBox>
  );
};

export default OBOSection;
