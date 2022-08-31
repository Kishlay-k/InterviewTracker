import types from './actionType';
import {getQuestion} from '../../api/index';

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
    return {
    type: types.FETCHING_START
}};

export const fetchQuestion = (id) => {
    return async dispatch => {
        dispatch(fetchStart());
        const res = await getQuestion(id);
        console.log(res.data.data.question);
        dispatch(fetchingSuccess(res.data.data.question));
    }
};