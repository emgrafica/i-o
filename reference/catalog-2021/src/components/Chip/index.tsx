import React from 'react';
import {
  ChipContainer,
  ChipText,
  CloseIcon,
  IconContainer,
} from './index.styled';

type ChipProps = {
  onClose: () => void;
};

const Chip: React.FC<ChipProps> = ({ onClose, children }) => {
  return (
    <ChipContainer>
      <ChipText>{children}</ChipText>
      <IconContainer role="button" onClick={onClose}>
        <CloseIcon />
      </IconContainer>
    </ChipContainer>
  );
};

export default Chip;
