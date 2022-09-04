import {combineReducers} from "redux";
import problemSetReducer from '../redux/problemset/problemSetReducer';
import questionReducer from '../redux/question/questionReducer';
import topicwiseReducer from '../redux/topicwise/topicwiseReducer';
import userReducer from '../redux/user/userReducer';

const rootReducer = combineReducers({
    problemset: problemSetReducer,
    question: questionReducer,
    topicWise: topicwiseReducer,
    user: userReducer,
});

export default rootReducer;