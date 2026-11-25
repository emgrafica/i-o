import { ErrorOutline } from '@material-ui/icons';
import styled from 'styled-components';

/**
 * Icon to display on the FileSelector when there is an error with a file
 **/
export const ErrorIcon = styled(ErrorOutline)`
  ${({ theme }) => `
    color: ${theme.colors.state.warning};
  `}
`;
