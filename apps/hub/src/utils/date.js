import moment from "moment-timezone";

const DateUtils = {
  getFormatedStringFromDays: (numberOfDays, shortShow) => {
 
    if (Number.isInteger(+numberOfDays)) {
      const years = Math.floor(numberOfDays / 365),
        months = Math.floor((numberOfDays % 365) / 30),
        days = Math.floor((numberOfDays % 365) % 30);
      shortShow = shortShow || true;
      var yearsDisplay = years > 0 ? years + (shortShow ? "y, " : years == 1 ? "year, " : "years, ") : "";
      var monthsDisplay = months > 0 ? months + (shortShow ? "m, " : months == 1 ? "month, " : "months, ") : "";
      var daysDisplay = days > 0 ? days + (shortShow ? "d" : days == 1 ? "day" : "days") : "";
      return yearsDisplay + monthsDisplay + daysDisplay;
    } else {
      return "not a number";
    }
  },
  formatDate: (val) => {
    if(val != null){
      return val.split(" ").reduce((b, c) => {
        let temp = c.split("-");

        if (temp.length > 1) b += temp[2] + "-" + temp[0] + "-" + temp[1];
        else b += "T" + c;
        return b;
      }, "");
    } else { 
      return "not valued";
    }
  },
  timetoXbyUTC: (startDate, timezone) => {
    return moment().to(moment.tz(startDate, timezone));
  },
  countDate: (pwdExpiredDays, pwdReminderDays, pwdLastestChangeDate) => {
    let reminderDays = pwdExpiredDays - moment.utc().diff(moment(pwdLastestChangeDate), "days");

    return {
      reminderPwdExpired: reminderDays <= pwdReminderDays && reminderDays > 0 ? true : false,
      reminderDays: reminderDays > 1 ? `${reminderDays} days` : `${reminderDays} day`,
    };
  },
};
export default DateUtils;
