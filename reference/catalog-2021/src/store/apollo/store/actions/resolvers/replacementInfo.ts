import { Resolvers } from 'apollo-boost';
import { ApolloCache } from 'apollo-cache';
import { REPLACEMENT_INFO } from '../queries';
import {
  ReplacementInfo_replacementInfo,
  ReplacementInfo,
} from '../queries/gqlTypes/ReplacementInfo';
import { ProductInfo } from 'gqlTypes/globalTypes';

type ApolloContext = {
  cache: ApolloCache<any>;
};

const resolvers: Resolvers = {
  Query: {
    replacementInfo: (_, __, { cache }: ApolloContext) => {
      return cache.readQuery<ReplacementInfo>({ query: REPLACEMENT_INFO });
    },
  },
  Mutation: {
    setReplacementInfo: (
      _,
      { productInfo }: { productInfo?: ProductInfo | null },
      { cache }: ApolloContext,
    ): ReplacementInfo_replacementInfo | null => {
      const data: ReplacementInfo = {
        replacementInfo: productInfo
          ? {
              id: productInfo.id,
              _etag: productInfo._etag,
              productName: productInfo.productName || null,
              image: productInfo.image || null,
              serialNumber: productInfo.serialNumber || null,
              usage: productInfo.usage || null,
              expires: productInfo.expires || null,
              catalogItemId: productInfo.catalogItemId || null,
              __typename: 'ReplacementInfo',
            }
          : null,
      };

      cache.writeQuery({ query: REPLACEMENT_INFO, data });

      return data.replacementInfo;
    },
  },
};

export default resolvers;
