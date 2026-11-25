import styled from 'styled-components';
import { Cancel, CheckCircle } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

export const StyledCheckCircleIcon = styled(CheckCircle)`
  color: ${props => props.theme.colors.state.success};
`;

export const StyledCancelIcon = styled(Cancel)`
  color: ${props => props.theme.colors.state.muted};
`;

export const useStyles = makeStyles({
  root: {
    fontSize: '3rem',
  },
});
