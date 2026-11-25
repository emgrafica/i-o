import React from 'react';
import { ShadowBox, Background, Label } from './index.style';

/** Props type for Badge component */
interface BadgeProps {
  /** Text to be displayed in badge */
  text: string;
}
/** Badge component*/
const Badge: React.FC<BadgeProps> = ({ text }) => (
  <ShadowBox>
    <Background>
      <Label>{text}</Label>
    </Background>
  </ShadowBox>
);

export default Badge;
