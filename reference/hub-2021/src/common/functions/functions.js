export function getAvatarName(name) {
  const name_arr = name.split(" ");
  const avatar_name = name_arr.length > 2 ? `${name_arr[name_arr.length - 2]} ${name_arr[name_arr.length - 1]}` : name;
  return avatar_name;
}

export function getSingleDateFromNow(strDate) {
  let res = "";

  if(strDate.indexOf('a few seconds') !== -1) return strDate;
  switch (strDate.split(" ")[0]) {
    case "a":
      res = strDate.replace("a ", "1 ");
      break;
    case "an":
      res = strDate.replace("an ", "1 ");
      break;
    default:
      res = strDate
      break;
  }
  const tmp = res.split(" ");
  switch (tmp[1]) {
    case "hour":
    case "hours":
      res = res.replace(" " + tmp[1], "h");
      break;
    case "day":
    case "days":
      res = res.replace(" " + tmp[1], "d");
      break;
    case "minute":
    case "minutes":
      res = res.replace(" " + tmp[1], "m");
      break;
    default:
      // res = res.replace(" ", "");
      break;
  }
  return res;
}