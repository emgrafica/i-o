import styled from 'styled-components';

/** Displays a horizontal line */
const HorizontalLine = styled.div`
  margin: 7px 0px;
  height: 1px;
  background-color: ${props => props.theme.colors.secondary[3]};
`;

export default HorizontalLine;
