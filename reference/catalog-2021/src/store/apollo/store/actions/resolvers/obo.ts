import { ApolloCache } from 'apollo-cache';
import { OboUser, OboUserRights } from 'gqlTypes/globalTypes';
import { OBO_INFO } from '../queries';
import { OboInfo } from '../queries/gqlTypes/OboInfo';

const resolvers = {
  Query: {
    oboInfo: (_: any, __: any, { cache }: { cache: ApolloCache<any> }) => {
      return cache.readQuery({ query: OBO_INFO });
    },
  },

  Mutation: {
    submitOboInfo: (
      _: any,
      { user, userRights }: { user: OboUser; userRights: OboUserRights[] },
      { cache }: { cache: ApolloCache<any> },
    ) => {
      const previous = cache.readQuery<OboInfo>({
        query: OBO_INFO,
      });

      const data = {
        ...previous,
        oboInfo: {
          ...(previous && previous.oboInfo),
          __typename: 'OboInfo',
          user: user
            ? {
                ...user,
                __typename: 'User',
              }
            : null,
          userRights: userRights
            ? userRights.map(item => ({
                ...item,
                __typename: 'UserRights',
              }))
            : null,
        },
      };

      cache.writeQuery({ query: OBO_INFO, data });

      return data.oboInfo;
    },
  },
};

export default resolvers;
