import { LanguageCode } from 'components/LanguageSelector';
import { KnowledgeArticleLanguageCode } from 'models/globalTypes';

import {
    initGlobalState
  } from 'utils/globalState';

  /** Language for the knowledge articles search */
export const useKnowledgeArticlesLanguage = initGlobalState(
  'knowledgeArticlesLanguage',
  KnowledgeArticleLanguageCode.en,
);

/** Language for the UI content */
export const useContentLanguage = initGlobalState<LanguageCode>(
  'contentLanguage',
  'en',
);