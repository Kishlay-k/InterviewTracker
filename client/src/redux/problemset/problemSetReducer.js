import types from './actionType';

const INTIAL_STATE = {
    questions: null
}

const questionReducer = (state = INTIAL_STATE, action) => {
    switch(action.type)
    {
        case types.SET_QUESTION: return({
            ...state, 
            questions: action.payload
        });
        default: return state;
    }
}

export default questionReducer;