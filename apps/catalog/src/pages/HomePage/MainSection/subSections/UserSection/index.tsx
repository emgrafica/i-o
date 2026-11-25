import React from 'react';
import { StyledWhiteBox } from '../../../general.style';
import UserProfile from './UserProfile';

const UserSection: React.FC = () => {
  return (
    <StyledWhiteBox
      height={{
        xxs: 112,
        xs: 112,
        sm: 324,
        md: 324,
        lg: 324,
        xl: 324,
        xxl: 324,
      }}
    >
      <UserProfile />
    </StyledWhiteBox>
  );
};

export default UserSection;
