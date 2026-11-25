import { Description } from '@material-ui/icons';
import styled from 'styled-components';

/** File icon for the Search Articles action label */
export const FileIcon = styled(Description)`
  ${({ theme }) => `
    color: ${theme.colors.secondary[0]};
    margin-right: 8px;
    font-size: 16px !important;
  `}
`;
