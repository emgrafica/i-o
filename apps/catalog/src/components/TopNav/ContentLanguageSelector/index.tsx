import { useMutation } from '@apollo/react-hooks';
import { Language } from '@material-ui/icons';
import LanguageSelector from 'components/LanguageSelector';
import { useUserId } from 'containers/AuthContainer/AuthContext';
import {
  UpdateUserPreferredLanguage,
  UpdateUserPreferredLanguageVariables,
} from 'graphql/mutations/gqlTypes/UpdateUserPreferredLanguage';
import { UPDATE_USER_PREFERRED_LANGUAGE } from 'graphql/mutations/UpdateUserPreferredLanguage';
import React from 'react';
import { useContentLanguage } from 'store';

const ContentLanguageSelector: React.FC = () => {
  const [
    globalContentLanguage,
    setGlobalContentLanguage,
  ] = useContentLanguage();
  const userId = useUserId()!;

  const [updateUserPreferredLanguage] = useMutation<
    UpdateUserPreferredLanguage,
    UpdateUserPreferredLanguageVariables
  >(UPDATE_USER_PREFERRED_LANGUAGE);

  return (
    <>
      <Language />
      <LanguageSelector
        languageCode={globalContentLanguage}
        onChange={language => {
          setGlobalContentLanguage(language);
          updateUserPreferredLanguage({
            variables: {
              userId,
              language,
            },
          });
        }}
        kind="app-content"
      />
    </>
  );
};

export default ContentLanguageSelector;
