import { InMemoryCache } from 'apollo-cache-inmemory';
import CartState from './cart';
import OboState from './obo';
import ReplacementInfoState from './replacementInfo';
import ReportBrokenInfoState from './reportBrokenInfo';
import fragmentMatcher from './fragmentMatcher';

const defaultState = [
  ...CartState,
  ...OboState,
  ...ReplacementInfoState,
  ...ReportBrokenInfoState,
];

export const initCache = () => {
  const cache = new InMemoryCache({ fragmentMatcher });
  defaultState.forEach(state => cache.writeQuery<any>(state));
  return cache;
};

export default defaultState;
