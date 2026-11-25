import { CheckCircleOutline } from '@material-ui/icons';
import styled from 'styled-components';

/**
 * Icon to display on the FileSelector when the file was successfully selected
 **/
export const CheckIcon = styled(CheckCircleOutline)`
  ${({ theme }) => `
    color: ${theme.colors.state.success};
  `}
`;
