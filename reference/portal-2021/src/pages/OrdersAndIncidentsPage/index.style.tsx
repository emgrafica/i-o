import { Description } from '@material-ui/icons';
import styled from 'styled-components';
import { Box, Tabs } from '@lumos/core';
import {
  CardsContainer,
  CardsFullContainer,
} from 'components/WideCardListSkeleton/Repeater';

export const IncidentIcon = styled(Description)`
  font-size: 42px !important;
  color: #053362;
`;

export const SlimCardHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xxs}) {
    flex-direction: column;
    & > *:last-child {
      text-align: left;
    }
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    & > *:last-child {
      min-width: 180px;
      text-align: right;
    }
  }
`;

export const PageTabs = styled(Tabs)`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-wrap: nowrap;
`;

export const TabsContainer = styled(Box)`
  width: 100%;
  display: flex;
`;

export const PanelContainer = styled(Box)`
  flex: 1 1 auto;

  & > ${CardsFullContainer}, & > ${CardsFullContainer} > ${CardsContainer} {
    height: 100%;
  }
`;
