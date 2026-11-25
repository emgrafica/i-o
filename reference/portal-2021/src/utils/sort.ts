export const sortByFieldNameDesc = (a: any, b: any, fieldName: string) => {
  return sortByFieldName(a, b, fieldName, 'DESC');
};

export const sortByFieldNameAsc = (a: any, b: any, fieldName: string) => {
  return sortByFieldName(a, b, fieldName, 'ASC');
};
export const sortByFieldName = (
  a: any,
  b: any,
  fieldName: string,
  orderType: string,
) => {
  const first = a[fieldName] ? a[fieldName] : 0;
  const second = b[fieldName] ? b[fieldName] : 0;
  if (orderType === 'DESC') {
    return first > second ? -1 : 1;
  } else {
    return first > second ? 1 : -1;
  }
};
