import { LanguageCode } from 'components/LanguageSelector';
import { KnowledgeArticleLanguageCode } from 'gqlTypes/globalTypes';
import { Cart } from './Cart';
import { ReportMissingInfo } from './ReportMissingInfo';
import { CatalogStatus, initialCatalogStatus } from './CatalogStatus';
import i18n from 'i18n';
import { subscribe } from 'utils/eventManager';
import {
  initGlobalState,
  initPersistentGlobalState,
  setGlobalState,
} from 'utils/globalState';

// Please find documentation on how to manage global state
// in the file docs/global-state-management.md

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
subscribe('contentLanguage', contentLanguage => {
  if (contentLanguage === null) {
    setGlobalState('contentLanguage', 'en');
    return;
  }
  i18n.changeLanguage(contentLanguage);

  let knowledgeArticlesLanguage = contentLanguage;
  if (contentLanguage === 'pt') knowledgeArticlesLanguage = 'pt_BR';
  if (contentLanguage === 'zh-Hans') knowledgeArticlesLanguage = 'zh';
  setGlobalState('knowledgeArticlesLanguage', knowledgeArticlesLanguage);
});

/** Report Missing */
export const useReportMissingInfo = initGlobalState<ReportMissingInfo | null>(
  'reportMissingInfo',
);

/* Cart */
export const useCart = (userId: string) => {
  return initPersistentGlobalState<Cart>('cart', userId, { items: [] })();
};

/** Catalog selection status */
export const useCatalogStatus = initGlobalState<CatalogStatus>(
  'CatalogStatus',
  initialCatalogStatus,
);
