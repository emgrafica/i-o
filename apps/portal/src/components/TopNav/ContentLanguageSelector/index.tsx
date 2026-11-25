import { Language } from '@material-ui/icons';
import LanguageSelector from 'components/LanguageSelector';
import React from 'react';
import { useContentLanguage } from 'store';
import { ContentLanguageSelectorWrapper } from './ContentLanguageSelector.style';

const ContentLanguageSelector: React.FC = () => {

  const [
    globalContentLanguage,
    setGlobalContentLanguage,
  ] = useContentLanguage();

  return (
    <>
      <Language />
      <ContentLanguageSelectorWrapper>
        <LanguageSelector
          languageCode={globalContentLanguage}
          onChange={language => {
            setGlobalContentLanguage(language);
          }}
          kind="app-content"
        />
      </ContentLanguageSelectorWrapper>
    </>
  );
};

export default ContentLanguageSelector;
