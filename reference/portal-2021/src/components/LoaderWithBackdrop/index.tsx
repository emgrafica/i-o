import React from 'react';
import { LoaderBackdrop, LoaderContainer } from './styled';
import { Loader } from '@lumos/core';

type LoaderWithBackdropProps = {
  /**
   * Controls the height/width of <Loader />
   */
  size?: 'lg' | 'md' | 'sm';
  /**
   * Helper text for <Loader />
   * @default 'Loading...'
   */
  caption?: string;
  /**
   * Hides <Loader /> for `{delay}`ms.
   */
  delay?: number;
};

const LoaderWithBackdrop: React.FC<LoaderWithBackdropProps> = props => (
  <LoaderBackdrop>
    <LoaderContainer>
      <Loader {...props} />
    </LoaderContainer>
  </LoaderBackdrop>
);

export default LoaderWithBackdrop;
