import styled from 'styled-components';
import React from 'react';

export const SlimCardTitleRef = styled.p<{ clamped: boolean }>`
  color: ${({ theme }) => theme.colors.secondary[0]};
  margin-top: 4px;
  margin-bottom: 8px;
  margin-right: 4px;
  overflow-y: hidden;
  word-break: ${({ clamped }) => (clamped ? 'break-all' : 'initial')};
  max-height: ${({ clamped }) => (clamped ? '1.1rem' : 'initial')};
`;

type SlimCardTitleType = React.HTMLAttributes<HTMLParagraphElement> & {
  clamped: boolean;
};

export const SlimCardTitle = React.forwardRef<
  HTMLParagraphElement,
  SlimCardTitleType
>((props, ref) => {
  return <SlimCardTitleRef {...props} ref={ref} />;
});

export const CardTitleWrapper = styled.div`
  display: flex;
`;
