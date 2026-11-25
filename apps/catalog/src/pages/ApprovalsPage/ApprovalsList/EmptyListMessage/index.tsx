import { Typography } from '@lumos/core';
import React from 'react';
import useDevice, { Device } from 'utils/useDevice';

interface EmptyListMessageProps {
  message: string;
}
/**
 * Render message to display when a list is empty
 */
const EmptyListMessage: React.FC<EmptyListMessageProps> = props => {
  const device = useDevice();
  const kind = device === Device.Desktop ? 'h5' : 'body1';
  return (
    <Typography
      kind={kind as any}
      marginTop={{ xxs: '47px', xs: '72px', md: '200px' }}
      textAlign={['center', 'start']}
    >
      {props.message}
    </Typography>
  );
};

export default EmptyListMessage;
