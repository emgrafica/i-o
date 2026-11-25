import { Delete } from '@material-ui/icons';
import styled from 'styled-components';

/**
 * Icon to display on the FileSelector to remove a file
 **/
export const DeleteIcon = styled(Delete).attrs(_ => ({
  role: 'button',
  id: 'deleteFile',
}))`
  ${({ theme }) => `
    color: ${theme.colors.primary[1]};
    cursor: pointer;
    :hover {
      color: ${theme.colors.primary[2]};
    }
  `}
`;
