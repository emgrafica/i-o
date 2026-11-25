import {MY_STUFF} from '../../constants';


const loadMyStuffAction = (userId) => (
    {
    type: MY_STUFF.LIST_MY_STUFF_START,
    userId
});

const setMyStuffAction = (myStuff) =>({
    type: MY_STUFF.LIST_MY_STUFF_SUCCEEDED,
    myStuff
});

const setErrorAction  = error => ({
    type: MY_STUFF.LIST_MY_STUFF_FAILED,
    error
});

const setMyStuffFinishAction = ( isFinished, isSelected) =>({
    type: MY_STUFF.SET_MY_STUFF_FINISHED_SUCCEEDED,
    isFinished: isFinished,
    isSelected: isSelected
});

export {loadMyStuffAction, setMyStuffAction, setErrorAction, setMyStuffFinishAction};
