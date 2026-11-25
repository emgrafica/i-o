import React from 'react';
import { Avatar, Box, Grid, Typography } from '@lumos/core';
import useBreakpoint, { Breakpoint } from 'utils/useBreakpoint';

/**
 * Props for UserCard
 */
export interface UserCardProps {
  firstName: string;
  lastName: string;
  userId: string;
  avatar: string | null;
  businessName: string | null;
  country: string;
}

const getBusinessLocationText = (
  businessName: string | null,
  country: string,
) => {
  if (businessName) {
    return `${businessName}, ${country}`;
  }
  return country;
};

/**
 * User card component
 */
const UserCard: React.FC<UserCardProps> = ({
  firstName,
  lastName,
  userId,
  avatar,
  businessName,
  country,
}) => {
  const breakpoint = useBreakpoint();

  return (
    <Grid
      width="100%"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="primary.0"
      borderRadius="3px"
      padding="16px 24px"
      marginBottom="32px"
      boxShadow="0 1px 1px 0 rgba(0,0,0,0.3)"
    >
      <Avatar
        imagePath={avatar as string}
        alt="Avatar"
        height="50px"
        width="50px"
      />
      <Box marginLeft="24px">
        <Grid flexDirection={breakpoint < Breakpoint.md ? 'column' : 'row'}>
          <Typography
            kind={breakpoint < Breakpoint.md ? 'body2' : 'h6'}
            fontWeight="bold"
            marginY={0}
          >
            {`${firstName} ${lastName}`}
          </Typography>
          <Typography
            kind={breakpoint < Breakpoint.md ? 'body2' : 'body1'}
            marginTop="2px"
            marginBottom={0}
            marginLeft={breakpoint < Breakpoint.md ? '0px' : '15px'}
          >
            {`(${userId})`}
          </Typography>
        </Grid>
        <Typography kind="body3" marginBottom={0}>
          {getBusinessLocationText(businessName, country)}
        </Typography>
      </Box>
    </Grid>
  );
};

export default UserCard;
