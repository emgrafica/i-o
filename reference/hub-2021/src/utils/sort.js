
export const sortByFieldNameDesc = (a, b, fieldName)=> {
    return  sortByFieldName(a, b, fieldName, 'DESC');
};

export const sortByFieldNameAsc = (a, b, fieldName)=> {
    return  sortByFieldName(a, b, fieldName, 'ASC');
};
export const sortByFieldName = (a, b, fieldName, orderType)=> {
    const first = a[fieldName] ? a[fieldName] : 0;
    const second = b[fieldName] ? b[fieldName] : 0;
    if(orderType === 'DESC') {
        return first > second ? -1 : 1;
    } else {
        return first > second ? 1 : -1;
    }
};


