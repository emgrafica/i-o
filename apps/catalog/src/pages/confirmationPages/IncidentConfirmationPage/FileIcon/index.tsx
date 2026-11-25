import { InsertDriveFile } from '@material-ui/icons';
import styled from 'styled-components';

/** File icon for the Incident confirmation page */
export const FileIcon = styled(InsertDriveFile)`
  ${({ theme }) => `
    color: ${theme.colors.secondary[0]};
    margin-right: 12px;
  `}
`;
