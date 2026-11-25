import { useTranslation } from 'react-i18next';

type FormatOptions = 'date' | 'datetime' | 'time';

/**
 * Custom hook that applies configured locale date and time formatting
 * @param date The date or time you wish to format. If not `undefined` or `null`, it should be a valid input to the Date Constructor
 * @param format The format you wish to apply. Options are `'date' | 'datetime' | 'time'`. Default is `'date'`.
 */
const useLocaleDate = (
  date?: string | number | null,
  format: FormatOptions = 'date',
): string => {
  const { t } = useTranslation('locale');
  return t(format, { date: date && new Date(date) });
};

export default useLocaleDate;
