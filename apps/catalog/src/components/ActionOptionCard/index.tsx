import React from 'react';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import {
  StyledActionGrid,
  StyledActionTitleGrid,
  StyledActionTitle,
  StyledActionButtonGrid,
  StyledActionButton,
} from './index.style';
import {
  useOBOInfoLocalState,
  SEARCH_NOW_FEATURE_CODE,
} from 'store/apollo/store/hooks';
import { SearchAction } from 'pages/HomePage/MainSection/subSections/SearchSection';

// Constants to set height and width for text skeletons
const TEXT_SKELETON_DEFAULT_HEIGHT = 16;
const TEXT_SKELETON_DEFAULT_WIDTH = 234;
const TEXT_SKELETON_ICON = 24;
const TEXT_SKELETON_BUTTON_HEIGHT = 34;
const TEXT_SKELETON_BUTTON_WIDTH = 158;

/**
 * Allowed {buttonType} values
 */
type ButtonType = 'filled' | 'outline';

/**
 * Props for the ActionOptionCard component
 */
interface ActionOptionProps {
  /**
   * The title of the action
   */
  title: string;
  /**
   * The action id
   */
  actionId?: string;
  /**
   * The action name
   */
  action: string;
  /**
   * The icon of the action
   */
  icon?: React.ReactElement;
  /**
   * The type of button
   */
  buttonType?: ButtonType;
  /**
   * Function is called when button is clicked.
   */
  onClick?: () => void;
  /**
   * The boolean if data is loading
   */
  loading?: boolean;
  /**
   * The boolean to show card if WIP
   */
  showWip?: boolean;
}

/**
 * ActionOptionCard - the action option card on the home page
 */
const ActionOptionCard: React.FC<ActionOptionProps> = ({
  buttonType,
  onClick = () => {},
  title,
  action,
  actionId,
  icon,
  loading,
  showWip = true,
}) => {
  const { t } = useTranslation('common');
  const oboInfoLocalState = useOBOInfoLocalState();
  return (
    <StyledActionGrid
      flexDirection={{ xxs: 'column', sm: 'row' }}
      justifyContent={{ xxs: 'center', sm: 'space-between' }}
      paddingRight={{ md: '25px' }}
    >
      <StyledActionTitleGrid paddingBottom={{ xxs: 3, sm: 0 }}>
        {loading ? (
          <Skeleton height={TEXT_SKELETON_ICON} width={TEXT_SKELETON_ICON} />
        ) : (
          icon
        )}
        <StyledActionTitle kind="h6" fontSize={{ xxs: 2 }} fontWeight="normal">
          {loading ? (
            <Skeleton
              height={TEXT_SKELETON_DEFAULT_HEIGHT}
              width={TEXT_SKELETON_DEFAULT_WIDTH}
            />
          ) : (
            title
          )}
        </StyledActionTitle>
      </StyledActionTitleGrid>
      <StyledActionButtonGrid>
        {loading ? (
          <Skeleton
            height={TEXT_SKELETON_BUTTON_HEIGHT}
            width={TEXT_SKELETON_BUTTON_WIDTH}
          />
        ) : (
          <StyledActionButton
            id={actionId}
            kind={buttonType === 'filled' ? 'impact2' : 'secondary'}
            backgroundColor={
              buttonType === 'filled' ? 'impact.0' : 'grayScale.0'
            }
            borderColor={buttonType === 'filled' ? 'impact.0' : 'inherit'}
            color={buttonType === 'filled' ? 'grayScale.0' : 'inherit'}
            onClick={showWip ? onClick : undefined}
            showWipHomePageActionOptionCard={showWip}
            disabled={
              actionId === SearchAction &&
              !oboInfoLocalState.hasOBOUserRightFor(SEARCH_NOW_FEATURE_CODE)
            }
          >
            {showWip ? action : t('comingSoon')}
          </StyledActionButton>
        )}
      </StyledActionButtonGrid>
    </StyledActionGrid>
  );
};

ActionOptionCard.displayName = 'ActionOptionCard';

export default ActionOptionCard;
