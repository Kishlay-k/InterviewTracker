import { getQuestions } from '../../api/index';
import types from './actionType';

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

export const fetchQuestions = (page,questionPerPage) => {
    return async dispatch => {
        dispatch(fetchStart());
        const res = await getQuestions(page,questionPerPage);
        dispatch(fetchingSuccess(res.data.data.question));
    }
};