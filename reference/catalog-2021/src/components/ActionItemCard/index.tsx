import React from 'react';
import { Grid, Box } from '@lumos/core';
import { Link } from 'react-router-dom';
import {
  StyledActionButton,
  StyledActionLink,
  StyledStats,
  StyledStatus,
  StyledSubTitle,
  StyledContainer,
} from './index.style';

/**
 * Allowed {size} values
 */
export type TypeSize = 'bg' | 'sm';

/**
 * Allowed {kind} values
 */
type TypeKind = 'button' | 'link';

/**
 * Props for the ActionItemCard component
 */
interface ActionItemProps {
  /**
   * The title of the action
   */
  title: string;
  /**
   * The subtitle of the action
   */
  subtitle: string;
  /**
   * The action id
   */
  actionId?: string;
  /**
   * The action name
   */
  action: string;
  /**
   * The stats id of the card
   */
  statsId?: string;
  /**
   * The stats of the card
   */
  stats?: string;
  /**
   * The status id of the card
   */
  statusId?: string;
  /**
   * The status that describe the {stats}
   */
  status?: string;
  /**
   * The size of the text
   */
  size?: TypeSize;
  /**
   * Action ui type.
   * button - renders as a button and triggers actions.
   * link - renders as a hyperlink and navigate to the path provided in
   * prop {to}
   */
  kind?: TypeKind;
  /**
   * Path that is navigated to when {link} kind is used.
   */
  to?: string;
  /**
   * Function is called when {button} kind is used.
   */
  onClick?: () => void;
}

/**
 * ActionItemCard - the action item card on the home page
 */
const ActionItemCard: React.FC<ActionItemProps> = ({
  size = 'bg',
  kind = 'button',
  to = '#',
  onClick = () => {},
  title,
  subtitle,
  action,
  actionId,
  stats,
  statsId,
  status,
  statusId,
}) => {
  const actionComponent =
    kind === 'button' ? (
      <StyledActionButton id={actionId} onClick={onClick}>
        {action}
      </StyledActionButton>
    ) : (
      <Link to={to}>
        <StyledActionLink>{action}</StyledActionLink>
      </Link>
    );

  return (
    <StyledContainer>
      <Grid>
        {stats && status && (
          <Box flexBasis="84px">
            <StyledStats id={statsId}>{stats}</StyledStats>
            <StyledStatus id={statusId}>{status}</StyledStatus>
          </Box>
        )}
        <Grid flexDirection="column">
          <Box flexGrow={1}>
            <StyledSubTitle>{subtitle}</StyledSubTitle>
          </Box>
          <Box marginTop={4} alignSelf="flex-end">
            {actionComponent}
          </Box>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

ActionItemCard.displayName = 'ActionItemCard';

export default ActionItemCard;
