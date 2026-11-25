import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GetSupportSearchPath } from 'utils/routes';
import queryString from 'query-string';
import { IoInput } from '@i-o/design-system';
import { useKnowledgeArticlesLanguage } from 'store';

/**
 * Props type for the GetSupportSearchInput component
 **/
interface SupportSearchInput {
  /** Initial value for the search bar **/
  initialKeywords?: string;
  startIcon?: string;
  onSearch?: Function;
  firstName?: string;
  hasAnimation?: boolean;
}



/**
 * Renders the search bar and language selector for the
 * Get Support and Get Support Search pages
 **/

const GetSupportSearchInput: React.FC<SupportSearchInput> = ({
  initialKeywords,
  startIcon,
  onSearch,
  firstName,
  hasAnimation,
}) => {
  const [knowledgeArticlesLanguage] = useKnowledgeArticlesLanguage();
  const [keywords, setKeywords] = useState(initialKeywords || '');
  const history = useHistory();

  const pushToHistory = (
    keywords: string
  ) => {
    if (keywords) {
      const query = queryString.stringify({
        q: keywords,
      });
      history.push(`${GetSupportSearchPath}?${query}`);
    }
  };

  return (
    <>
      <IoInput.SearchBox
        keywords={keywords}
        onChange={setKeywords}
        onSearch={() => {
          if(onSearch){
            onSearch(keywords);
          }else{
            pushToHistory(keywords);
          }
        }}
        placeholder={firstName}
        hasAnimation={hasAnimation}
        startIcon={startIcon}
      />
    </>
  );
};

export default GetSupportSearchInput;
