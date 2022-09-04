import {combineReducers} from "redux";
import problemSetReducer from '../redux/problemset/problemSetReducer';
import questionReducer from '../redux/question/questionReducer';
import userReducer from '../redux/user/userReducer';

const rootReducer = combineReducers({
    problemset: problemSetReducer,
    question: questionReducer,
    user: userReducer,
});

export default rootReducer;