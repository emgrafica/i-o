import {createActions} from 'reduxsauce';


const {Types, Creators} = createActions({
    loadBadWordsSagaAction:[],
    loadBadWordsAction: ['badWords'],
    setErrorAction: ['error'],
    applyBadWordsToFilter: []
})

export const BadWordsTypes = Types;
export default Creators;
