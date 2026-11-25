// @ts-nocheck
import moment from 'moment-timezone';

const DateUtils = {
  getFormatedStringFromDays: (numberOfDays: any, shortShow: Boolean) => {
    if (Number.isInteger(+numberOfDays)) {
      const years = Math.floor(numberOfDays / 365),
        months = Math.floor((numberOfDays % 365) / 30),
        days = Math.floor((numberOfDays % 365) % 30);
      shortShow = shortShow || true;
      var yearsDisplay =
        years > 0
          ? years + (shortShow ? 'y, ' : years === 1 ? 'year, ' : 'years, ')
          : '';
      var monthsDisplay =
        months > 0
          ? months + (shortShow ? 'm, ' : months === 1 ? 'month, ' : 'months, ')
          : '';
      var daysDisplay =
        days > 0 ? days + (shortShow ? 'd' : days === 1 ? 'day' : 'days') : '';
      return yearsDisplay + monthsDisplay + daysDisplay;
    } else {
      return null;
    }
  },
  formatDate: (val: String) => {
    if (val != null) {
      return val.split(' ').reduce((b, c) => {
        let temp = c.split('-');

        if (temp.length > 1) b += temp[2] + '-' + temp[0] + '-' + temp[1];
        else b += 'T' + c;
        return b;
      }, '');
    } else {
      return 'not valued';
    }
  },
  timetoXbyUTC: (startDate: any, timezone: any) => {
    let checkInvalid = moment().to(moment.tz(startDate, timezone));
    if (
      startDate === undefined ||
      startDate === null ||
      startDate === '' ||
      checkInvalid === 'Invalid date'
    ) {
      return null;
    }
    return checkInvalid;
  },
  timetoXbyGMT: (startDate: any) => {
    let stillUtc = moment.utc(startDate).toDate();
    let localDate = moment(stillUtc)
      .local()
      .format('YYYY-MM-DD HH:mm:ss');
    return moment().to(localDate);
  },
  countDate: (
    secretKeyExpiredDays: any,
    secretKeyReminderDays: any,
    secretKeyLastestChangeDate: any,
  ) => {
    let reminderDays =
      secretKeyExpiredDays - moment.utc().diff(moment(secretKeyLastestChangeDate), 'days');

    return {
      reminderSecretKeyExpired:
        reminderDays <= secretKeyReminderDays && reminderDays > 0 ? true : false,
      reminderDays: reminderDays,
    };
  },
};
export default DateUtils;
