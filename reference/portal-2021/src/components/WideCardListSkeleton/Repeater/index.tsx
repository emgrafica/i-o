import styled from 'styled-components';
import { Box, Grid } from '@lumos/core';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { getOffset } from 'utils/dom';

const BOTTOM_MARGIN = 20;
const MAX_HEIGHT = 9999;

export const CardsContainer = styled(Grid)`
  flex-direction: column;
  align-items: center;
  & > *:not(:last-child) {
    margin-bottom: ${BOTTOM_MARGIN}px;
  }
`;

export const CardsFullContainer = styled(Box)`
  box-sizing: border-box;
  flex: 1 1 auto;
  overflow: hidden;
`;

interface RepeaterProps {
  /** The loader component to render */
  component: React.FC;
  /** Height of each component to repeat */
  componentHeight: number;
  /** When `full` is false or undefined, count is used to repeat the loader */
  count?: number;
  /**
   * When `full` is defined, count is ignored, loader will generate just
   * enough skeleton cards to fill the parent without overflowing it.
   */
  full?: boolean;
}

const renderCards = (count: number, component: React.FC) => {
  return (
    <CardsContainer data-testid="skeletonLoader">
      {new Array(count)
        .fill(1)
        .map((_, idx) => React.createElement(component, { key: idx }))}
    </CardsContainer>
  );
};

/** Renders component prop x number of times, where x is determined by the count prop or full prop  */
const Repeater: React.FC<RepeaterProps> = ({
  component,
  componentHeight,
  count = 1,
  full = false,
}) => {
  // assume the max height to be a very large number
  const [maxHeight, setMaxHeight] = useState(MAX_HEIGHT);
  const [fullCount, setFullCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      const offsetTopStart = getOffset(ref.current).top;
      // We use footer as the ending offset point per design needs.
      const offsetTopEnd = getOffset(document.getElementsByTagName('footer')[0])
        .top;
      const height = offsetTopEnd - offsetTopStart;
      setMaxHeight(height);
    }
  }, [setMaxHeight]);

  useEffect(() => {
    if (maxHeight !== MAX_HEIGHT) {
      setFullCount(Math.floor(maxHeight / (componentHeight + BOTTOM_MARGIN)));
    }
  }, [setFullCount, maxHeight, componentHeight]);

  if (full) {
    return (
      <CardsFullContainer ref={ref} maxHeight={maxHeight}>
        {renderCards(fullCount, component)}
      </CardsFullContainer>
    );
  }
  return renderCards(count, component);
};

export default Repeater;
