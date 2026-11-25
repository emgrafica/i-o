import React from 'react';
import { Box } from '@lumos/core';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

const Container = styled(Box)`
  line-height: 22px;
  margin-top: 20px;
  box-sizing: border-box;
  height: 500px;
  width: 100%;
  border: 1px solid #f0f3f7;
  border-radius: 3px;
  position: relative;

  & > span:first-child {
    position: absolute;
    top: 65px;
    left: 0;
    display: block;
    padding: 10px;
    width: 100%;
  }

  & > span:first-child > span:last-child {
    max-width: 115px;
  }
`;

const SkeletonLoader = () => (
  <Container>
    <Skeleton height="16px" count={2} duration={2} />
  </Container>
);

export default SkeletonLoader;
