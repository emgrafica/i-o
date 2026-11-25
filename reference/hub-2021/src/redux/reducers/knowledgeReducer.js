import {KNOWLEDGE} from '../../constants'


const defaultState = {
    isLoading: true,
    error: null,
    knowledge: [],
    params: [],
    action: "",
    totalCount: 0
  };

export default (state = defaultState, action) => {
    //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>KNOWLEDGE_REDUCER:state: " + state);
    //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>KNOWLEDGE_REDUCER:action: " + action);
    // const knowledgeData = action.knowledge;

    const {type, knowledge} = action;

    switch (action.type) {
        case KNOWLEDGE.LIST_KNOWLEDGE_START:
          return {
            ...state,
            isLoading: true,
            error: null,
            knowledge: [],
            params: action.params,
            action: action.type
          }
        case KNOWLEDGE.LIST_KNOWLEDGE_SUCCEEDED:
          return {
            ...state,
            isLoading: false,
            knowledge: action.knowledge.data.data,
            action: action.type,
            totalCount: action.knowledge.data.totalCount
          }
        case KNOWLEDGE.LIST_KNOWLEDGE_FAILED:
          return {
            ...state,
            isLoading: false,
            error: action.error,
            action: action.type
          }
      }
    return state;
}
