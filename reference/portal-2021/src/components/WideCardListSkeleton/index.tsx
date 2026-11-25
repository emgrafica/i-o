import React from 'react';
import Repeater from './Repeater';
import { WideCardSkeleton } from './WideCardSkeleton';

/** Renders as many WideCardSkeletons that can fit in the available space */
const WideCardListSkeleton: React.FC = () => (
  <Repeater component={WideCardSkeleton} componentHeight={120} full />
);

export default WideCardListSkeleton;
