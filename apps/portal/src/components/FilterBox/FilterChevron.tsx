import * as React from 'react';
import { Chevron } from './FilterBox.style';

interface FilterChevronProps {
  selected: boolean;
  onClick: () => void;
  width?: string;
  height?: string;
}

const FilterChevron = ({
  selected,
  onClick,
  width = '24',
  height = '24',
}: FilterChevronProps): React.ReactElement<FilterChevronProps> => {
  return (
    <Chevron selected={selected} onClick={onClick}>
      <g>
        <rect fill="none" width={width} height={height} />
      </g>
      <g>
        <g>
          <polygon
            points="15.5,5 11,5 16,12 11,19 15.5,19 20.5,12"
            fill="#053362"
            stroke="#053362"
            strokeWidth="0.1"
          />
          <polygon points="8.5,5 4,5 9,12 4,19 8.5,19 13.5,12" fill="#053362" />
        </g>
      </g>
    </Chevron>
  );
};

export default FilterChevron;
