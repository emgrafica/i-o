import { Description } from '@material-ui/icons';
import styled from 'styled-components';

/**
 * Icon to display on the KnowledgeArticleCard
 **/
export const ArticleIcon = styled(Description).attrs(_ => ({
  fontSize: 'small',
}))`
  ${({ theme }) => `
    color: ${theme.colors.secondary[0]};
    margin: 2px 5px;
  `}
`;
