import cartResolvers from './cart';
import oboResolvers from './obo';
import replacementInfo from './replacementInfo';
import reportBrokenInfo from './reportBrokenInfo';
import { Resolvers } from 'apollo-boost';

const resolvers: Resolvers = {
  Query: {
    ...cartResolvers.Query,
    ...oboResolvers.Query,
    ...replacementInfo.Query,
    ...reportBrokenInfo.Query,
  },
  Mutation: {
    ...cartResolvers.Mutation,
    ...oboResolvers.Mutation,
    ...replacementInfo.Mutation,
    ...reportBrokenInfo.Mutation,
  },
};

export default resolvers;
