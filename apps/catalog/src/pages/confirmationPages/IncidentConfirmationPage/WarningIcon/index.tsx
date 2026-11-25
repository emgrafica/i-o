import { ReportProblemOutlined } from '@material-ui/icons';
import styled from 'styled-components';

/** Warning icon for the Incident confirmation page to render next to a failed file*/
export const WarningIcon = styled(ReportProblemOutlined)`
  ${({ theme }) => `
    color: ${theme.colors.state.warning};
    margin-right: 12px;
  `}
`;
