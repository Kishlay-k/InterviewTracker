import { combineReducers } from "redux";
import questionReducer from '../redux/problemset/problemSetReducer';

const rootReducer = combineReducers({
    problemset: questionReducer
});

export default rootReducer;