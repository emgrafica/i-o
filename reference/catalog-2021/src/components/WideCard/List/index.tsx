import styled from 'styled-components';

/** Sets the layout for a list of wide cards that should be passed as children */
export const List = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-end;
  align-items: center;

  & > * {
    margin-bottom: 12px;
    flex: 0 0;
  }

  & > *:last-child {
    margin-bottom: 0px;
  }
`;
export default List;
