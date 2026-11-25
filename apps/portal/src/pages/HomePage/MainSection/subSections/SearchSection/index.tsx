import React from 'react';
import { StyledWhiteBox } from '../../../general.style';
import ActionOptionCard from 'components/ActionOptionCard';
import { useTranslation } from 'react-i18next';
import { Storage } from '@material-ui/icons';
import { SearchPath } from 'utils/routes';
import { showWipSearchCard } from 'utils/showWorkInProgress';
import { useHistory } from 'react-router';

export const SearchAction = 'searchAction';

const SearchSection: React.FC = () => {
  const { t } = useTranslation();
  const h = useHistory();
  const handleNavigation = () => {
    h.push({
      pathname: SearchPath,
    });
  };

  return (
    <StyledWhiteBox id="searchSection" height="100%">
      <ActionOptionCard
        icon={<Storage />}
        title={t('home:search.title')}
        action={t('home:search.action')}
        actionId={SearchAction}
        buttonType="outline"
        onClick={handleNavigation}
        showWip={showWipSearchCard}
      />
    </StyledWhiteBox>
  );
};

export default SearchSection;
