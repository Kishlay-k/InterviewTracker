import { combineReducers } from "redux";
import problemSetReducer from '../redux/problemset/problemSetReducer';
import questionReducer from '../redux/question/questionReducer';

const rootReducer = combineReducers({
    problemset: problemSetReducer,
    question:questionReducer
});

export default rootReducer;