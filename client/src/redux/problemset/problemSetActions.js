import { getQuestions } from '../../api/index';
import types from './actionType';

export const setQuestions = (data) => {
    // console.log(data);
    return {
    payload: data,
    type: types.SET_QUESTION
}}

export const fetchQuestions = () => {
    return async dispatch => {
        const res = await getQuestions();
        dispatch(setQuestions(res.data.data.question));
    }
};