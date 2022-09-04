import types from "./types";

const INITIAL_STATE = {
    user: null,
    isLoading: false,
    error: undefined
};

const userReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case types.FETCHING_START : return({
            ...state,
            isLoading: true
        })
        case types.FETCH_SUCCESS: return({
            error: undefined,
            user: action.payload,
            isLoading: false
        })
        case types.FETCH_FAIL : return({
            ...state,
            isLoading: false,
            user: null,
            error: action.payload
        })

        default : return ({
            ...state
        })
    }
};
export default  userReducer;