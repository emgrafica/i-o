import { Switch } from "react-router";
import { BadWordsTypes } from "redux/actions/badWordsAction";


const defaultState = {
    isLoading: true,
    error: null,
    data: [],
    isAddedWordFilter: false,
}

export default (state = defaultState, action) => {
    const {type, badWords, error} = action;
    switch(type) {
        case BadWordsTypes.LOAD_BAD_WORDS_ACTION:
            return {
                ...state,
                isLoading: false,
                data: badWords,

            }
        case BadWordsTypes.APPLY_BAD_WORDS_TO_FILTER:
            return {
                ...state,
                isAddedWordFilter: true
            }
        case BadWordsTypes.SET_ERROR_ACTION:
            return {
                ...state,
                error: error,
            }
    }

    return state;
}