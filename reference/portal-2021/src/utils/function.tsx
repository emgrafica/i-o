import { AnyAaaaRecord } from 'dns';

export function getAvatarName(name: String) {
  const name_arr = name.split(' ');
  const avatar_name =
    name_arr.length > 2
      ? `${name_arr[name_arr.length - 2]} ${name_arr[name_arr.length - 1]}`
      : name;
  return avatar_name;
}

export const getCountryLabelByCode = (code: string, countryData: any) => {
  return countryData.find(function(element: any) {
    return element.value === code;
  })?.name;
};

export const generateAddressStr = (addressObj: any, contactObj: any) => {
  return (
    `${contactObj.firstName} ${contactObj.lastName}, ` +
    `${
      contactObj.phoneNumber
        ? contactObj.phoneType + ' : ' + contactObj.phoneNumber
        : ''
    },` +
    ` ${addressObj.street} ${!!addressObj.address2? addressObj.address2: ''} ,${addressObj.city}, ${addressObj.state} ${addressObj.zipCode}, ${addressObj.country}`
  );
};
