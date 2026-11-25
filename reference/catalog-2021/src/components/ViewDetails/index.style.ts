import styled from 'styled-components';
import { Avatar, Box, Typography } from '@lumos/core';
import { StyledXl4CenterColumn } from 'components/Layout/index.style';

export const StyledBox = styled(Box)`
  ${({ theme }) => `
    background-color: ${theme.colors.grayScale[1]};
    padding: ${theme.space[2]}px ${theme.space[2]}px
  `}
`;

export const BottomRightActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ViewDetailsContent = styled(StyledXl4CenterColumn)`
  margin-top: 60px;
  & > div {
    margin-bottom: 20px;
  }
`;
export const Header = styled(Typography).attrs({
  kind: 'h5',
})`
  margin-bottom: ${({ theme }) => theme.space[6]}px;
  color: ${({ theme }) => theme.colors.state.enabled};
`;
export const DefinitionList = styled.dl`
  display: flex;
  flex-flow: row wrap;
  margin: 0;
  & > * {
    line-height: 1.5rem;
    display: flex;
    align-items: flex-start;
    margin: 0;
    margin-bottom: calc(${({ theme }) => theme.space[3]}px - 0.5rem);
  }
`;
export const DefinitionTerm = styled.dt`
  flex-basis: 43%;
  & > * {
    margin: 1px 0;
    line-height: 1.5rem;
  }
`;
export const DefinitionDescription = styled.dd`
  flex-basis: 57%;
  flex-grow: 1;
`;

export const DefinitionListCenterAligned = styled(DefinitionList)`
  align-items: center;
  & > *,
  & > * > * > * {
    align-items: center;
  }
`;
export const InlineAvatar = styled(Avatar)`
  height: 35px;
  width: 35px;
  margin-right: ${({ theme }) => theme.space[3]}px;
`;

export const IconLabel = styled.div`
  display: flex;
  align-items: center;
  & > *:first-child {
    margin-right: ${({ theme }) => theme.space[3]}px;
  }
`;
export const IconCenterAligned = styled.div`
  width: 1rem;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
