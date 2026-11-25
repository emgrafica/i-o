import { useQuery } from '@apollo/react-hooks';
import { LanguageCode } from 'components/LanguageSelector';
import { useUserId } from 'containers/AuthContainer/AuthContext';
import {
  UserPreferredLanguage,
  UserPreferredLanguageVariables,
} from 'graphql/queries/gqlTypes/UserPreferredLanguage';
import { USER_PREFERRED_LANGUAGE } from 'graphql/queries/userPreferredLanguage';
import { useContentLanguage } from 'store';

export const usePreferredLanguage = () => {
  const [, setGlobalContentLanguage] = useContentLanguage();

  const userId = useUserId()!;
  useQuery<UserPreferredLanguage, UserPreferredLanguageVariables>(
    USER_PREFERRED_LANGUAGE,
    {
      variables: {
        userId,
      },
      onCompleted: data => {
        const language = data.userPreferences.preferences
          .language as LanguageCode;
        setGlobalContentLanguage(language);
      },
    },
  );
};
