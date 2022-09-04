import types from './actionType';
import {getTopicwiseQuestion} from '../../api/index';

export const fetchingSuccess = (data) => {
    return {
    payload: data,
    type: types.FETCH_SUCCESS
}};

export const fetchFail = (err) => {
    return {
    payload: err,
    type: types.FETCH_FAIL
}};

export const fetchStart = () => {
    console.log('I am here');
    return {
    type: types.FETCHING_START
}};

export const fetchTopicwise = (topic) => {
    return async dispatch => {
        dispatch(fetchStart());
        const res = await getTopicwiseQuestion(topic);
        console.log(res);
        dispatch(fetchingSuccess(res.data.data.questions));
    }
};