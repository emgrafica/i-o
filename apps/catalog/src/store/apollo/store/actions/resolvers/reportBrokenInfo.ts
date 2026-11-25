import { Resolvers } from 'apollo-boost';
import { ApolloCache } from 'apollo-cache';
import { REPORT_BROKEN_INFO } from '../queries';
import { ReportBrokenInfo } from '../queries/gqlTypes/ReportBrokenInfo';
import { ReportBrokenInput } from 'gqlTypes/globalTypes';

type ApolloContext = {
  cache: ApolloCache<any>;
};

const resolvers: Resolvers = {
  Query: {
    reportBrokenInfo: (_, __, { cache }: ApolloContext) => {
      return cache.readQuery<ReportBrokenInfo>({ query: REPORT_BROKEN_INFO });
    },
  },
  Mutation: {
    setReportBrokenInfo: (
      _,
      { reportBrokenInput }: { reportBrokenInput?: ReportBrokenInput | null },
      { cache }: ApolloContext,
    ): any | null => {
      const data: ReportBrokenInfo = {
        reportBrokenInfo: reportBrokenInput
          ? {
              id: reportBrokenInput.id,
              productName: reportBrokenInput.productName || null,
              image: reportBrokenInput.image || null,
              serialNumber: reportBrokenInput.serialNumber || null,
              usage: reportBrokenInput.usage || null,
              expires: reportBrokenInput.expires || null,
              catalogItemId: reportBrokenInput.catalogItemId,
              incidentNumber: reportBrokenInput.incidentNumber,
              details: reportBrokenInput.details,
              _etag: reportBrokenInput._etag,
              __typename: 'ReportBrokenInfo',
            }
          : null,
      };

      cache.writeQuery({ query: REPORT_BROKEN_INFO, data });

      return data.reportBrokenInfo;
    },
  },
};

export default resolvers;
