import { TFunction } from 'i18next';

/**
 * Helper function the get the name of a month from
 * its number. The function supports internationalization.
 *
 * @param t Internationalization function.
 * @param monthNumber The number of the month.
 */
const getMonthName = (t: TFunction, monthNumber: number): string => {
  return t('common:months', { returnObjects: true })[monthNumber];
};

export { getMonthName };
