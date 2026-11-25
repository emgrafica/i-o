import { createActions } from 'reduxsauce';
const { Types, Creators } = createActions({
  fetchKnowledgeDetailByKBNumber: ['kbNumber','userName'],
  fetchKnowledgeDetailByKBNumberSuccess: ['KBDetail', 'mostViewedArt', 'isEmpty'],
  knowledgeDetailProvideFeedback: ['rateState','kbNumber','userName','feedbackType', 'pageState'],
  knowledgeDetailProvideFeedbackSuccess: ['KBDetail', 'feedbackType', 'comments','totalCount'],
  fetchKnowledgeDetailUserFeedback: ['params'],
  fetchKnowledgeDetailUserFeedbackSuccess: ['comments','totalCount', 'currentCommentPageIndex'],
  fetchLatestFeedbacksByKBNumber: ['params'],
  fetchLatestFeedbacksByKBNumberSuccess: ['result'],
  setCurrentCommentPageIndex: ['pageNumber'],
  setKnowledgeErrorAction: ['error'],
  setCommentLoading: ['loading'],
});
export const KnowledgeDetailTypes = Types;
export default Creators;
