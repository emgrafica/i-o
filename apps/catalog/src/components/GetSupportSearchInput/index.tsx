import React, { useState } from 'react';
import LanguageSelector from '../LanguageSelector';
import SearchBar from './SearchBar';
import { useHistory } from 'react-router-dom';
import { GetSupportSearchPath } from 'utils/routes';
import { KnowledgeArticleLanguageCode } from 'gqlTypes/globalTypes';
import queryString from 'query-string';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@lumos/core';
import { useKnowledgeArticlesLanguage } from 'store';

/**
 * Props type for the GetSupportSearchInput component
 **/
interface SupportSearchInput {
  /** Initial value for the search bar **/
  initialKeywords?: string;
}

/**
 * Renders the search bar and language selector for the
 * Get Support and Get Support Search pages
 **/
const GetSupportSearchInput: React.FC<SupportSearchInput> = ({
  initialKeywords,
}) => {
  const { t } = useTranslation('getSupportSearchInput');
  const history = useHistory();
  const [
    knowledgeArticlesLanguage,
    setKnowledgeArticlesLanguage,
  ] = useKnowledgeArticlesLanguage();
  const [keywords, setKeywords] = useState(initialKeywords || '');

  /**
   * Push url query to history if `keywords` is not empty
   **/
  const pushToHistory = (
    keywords: string,
    languageCode: KnowledgeArticleLanguageCode,
  ) => {
    if (keywords) {
      const query = queryString.stringify({
        q: keywords,
        language: languageCode,
      });
      history.push(`${GetSupportSearchPath}?${query}`);
    }
  };

  return (
    <>
      <SearchBar
        keywords={keywords}
        onChange={setKeywords}
        onSearch={() => {
          pushToHistory(keywords, knowledgeArticlesLanguage);
        }}
      />
      <Grid alignItems="center">
        <Typography kind="body3">{t('searchInLanguage')}</Typography>
        <LanguageSelector
          languageCode={knowledgeArticlesLanguage}
          kind="knowledge-articles-search"
          onChange={newLanguageCode => {
            setKnowledgeArticlesLanguage(
              newLanguageCode as KnowledgeArticleLanguageCode,
            );
            pushToHistory(
              keywords,
              newLanguageCode as KnowledgeArticleLanguageCode,
            );
          }}
        />
      </Grid>
    </>
  );
};

export default GetSupportSearchInput;
