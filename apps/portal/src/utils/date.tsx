import { TFunction } from 'i18next';
import moment from 'moment-timezone';

/**
 * Helper function the get the name of a month from
 * its number. The function supports internationalization.
 *
 * @param t Internationalization function.
 * @param monthNumber The number of the month.
 */
const DateUtils = {
  getMonthName: (t: TFunction, monthNumber: number): string => {
    return t('common:months', { returnObjects: true })[monthNumber];
  },

  timetoXbyUTC: (startDate: number, timezone: string) => {
    let checkInvalid = moment().to(moment.tz(startDate, timezone));
    if (
      startDate == undefined ||
      startDate == null ||
      startDate == 0 ||
      checkInvalid == 'Invalid date'
    ) {
      return null;
    }
    return moment().to(moment.tz(startDate, timezone));
  },
};
export { DateUtils };
