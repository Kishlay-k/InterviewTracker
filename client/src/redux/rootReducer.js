import { combineReducers } from "redux";
import problemSetReducer from '../redux/problemset/problemSetReducer';
import questionReducer from '../redux/question/questionReducer';
import topicwiseReducer from '../redux/topicwise/topicwiseReducer';

const rootReducer = combineReducers({
    problemset: problemSetReducer,
    question: questionReducer,
    topicWise: topicwiseReducer
});

export default rootReducer;