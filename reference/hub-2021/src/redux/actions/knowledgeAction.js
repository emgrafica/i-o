import {KNOWLEDGE} from '../../constants';


const loadKnowledgeAction = (params) => (
    {
    type: KNOWLEDGE.LIST_KNOWLEDGE_START,
    params
});

const setKnowledgeAction = (knowledge) =>({
    type: KNOWLEDGE.LIST_KNOWLEDGE_SUCCEEDED,
    knowledge
});

const setErrorAction  = error => ({
    type: KNOWLEDGE.LIST_KNOWLEDGE_FAILED,
    error
});

export {loadKnowledgeAction, setKnowledgeAction, setErrorAction};
