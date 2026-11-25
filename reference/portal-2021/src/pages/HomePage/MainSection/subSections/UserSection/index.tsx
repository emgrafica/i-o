import React from 'react';
import { StyledWhiteBox } from '../../../general.style';
import UserProfile from './UserProfile';

const UserSection: React.FC = () => {
  return (
    <StyledWhiteBox height="100%">
      <UserProfile />
    </StyledWhiteBox>
  );
};

export default UserSection;
