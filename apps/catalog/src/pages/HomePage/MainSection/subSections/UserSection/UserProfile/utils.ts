import { useTranslation } from 'react-i18next';

/**
 * Returns the correct greeting based on the user's system time
 */
export const useUserGreeting = () => {
  const { t } = useTranslation('home');
  const hour = new Date().getHours();
  if (hour >= 3 && hour < 12) return `${t('greeting.morning')}`;
  if (hour >= 12 && hour < 18) return `${t('greeting.afternoon')}`;
  if (hour >= 18 || hour < 3) return `${t('greeting.evening')}`;
};
