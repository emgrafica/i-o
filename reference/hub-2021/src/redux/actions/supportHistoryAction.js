import { createActions } from 'reduxsauce';
const { Types, Creators } = createActions({
  loadSupportHistoryAction: ['queryParams'],
  setSupportHistoryAction: ['supportHistory'],
  fetchTopKnowledgeArticleItem:[],
  fetchTopKnowledgeArticleItemSuccess:['dataArticle'],
  fetchWhatsnewsItem:['paramObj','maxItem'],
  fetchWhatsnewsItemSuccess:['whatsNews'],
  setErrorAction: ['error'],
});
export const SupportHistoryTypes = Types;
export default Creators;

