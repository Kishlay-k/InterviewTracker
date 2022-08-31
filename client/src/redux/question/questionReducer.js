import types from './actionType'

const INITIAL_STATE = {
    question:null,
    isLoading:false,
    errorMessage:undefined
}

const questionReducer = (state = INITIAL_STATE,action)=>{
    switch(action.type){
        case types.FETCHING_START: return({
            ...state,
            isLoading:true,
        })
        case types.FETCH_SUCCESS: return({
            ...state,
            question: action.payload,
            isLoading: false
        });
        case types.FETCH_FAIL: return({
            ...state,
            error: action.payload,
            isLoading: false,
            questions: null
        });
        default: return state;
    }
}

export default questionReducer;