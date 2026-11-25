import { ValidationType, ValidationCondition } from 'utils/dynamicForm';
import ShippingServices from 'services/shippingServices';
import { countryData } from './DynamicComponent/CustomComponent/addressData';
import { getCountryLabelByCode } from 'utils/function';

export const useFormControls = () => {
  const checkValidItem: any = async (
    item: any,
    value: any,
    isRunAddonValid = false,
  ) => {
    let errorMsg = [];
    if (!!item.validation) {
      switch (item.validation.type) {
        case ValidationType.CONTACT_PHONE_OBJECT:
          let isContactValid = true,
            errorContactTxt = 'Contact is invalid!';
          const requiredContactFields = ['firstName', 'lastName' , 'phoneNumber'];
          if (!value) {
            isContactValid = false;
          } else {
            requiredContactFields.forEach(e => {
              if (!value[e]) isContactValid = false;
            });
          }
          if (!isContactValid) {
            errorMsg.push(errorContactTxt);
          }
          break;
        case ValidationType.ADDRESS_OBJECT:
          let isValid = true,
            errorTxt = 'Address is invalid!';
          const requiredFields = [
            'country',
            'street',
            'city',
            'state',
            'zipCode',
          ];
          if (!value) {
            isValid = false;
          } else {
            requiredFields.forEach(e => {
              if (!value[e]) isValid = false;
            });
          }
          if (isRunAddonValid) {
            if (!isValid) {
              errorMsg.push(errorTxt);
            } else {
              const res = await ShippingServices.getValidAddress({
                street: value.street,
                city: value.city,
                state: value.state,
                zip: value.zipCode,
                country: getCountryLabelByCode(value.country, countryData),
                secondStreet: value.address2,
              });
              if (!res) {
                errorMsg.push(errorTxt);
              } else if (!res.isValid) {
                errorMsg.push(res.message);
              }
            }
          } else {
            if (!isValid) {
              errorMsg.push(errorTxt);
            }
          }
          break;

        case ValidationType.COMMON_TYPE:
          item.validation.value.forEach((element: any) => {
            if (
              element.validateCondition === ValidationCondition.REQUIRED &&
              !value
            ) {
              errorMsg.push(ValidationCondition.REQUIRED);
            }
          });
          break;
        default:
          break;
      }
    }

    return errorMsg;
  };
  return {
    checkValidItem,
  };
};
