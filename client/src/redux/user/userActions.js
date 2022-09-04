import {loginUser, getUser, logout, signupUser} from '../../api/index';
import types from './types';

export const fetchSuccess = (data) => {
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

export const login = (body,history) => {
    console.log(body);
    return async dispatch => {
        dispatch(fetchStart());
        try {
            const res = await loginUser(body);
            dispatch(fetchSuccess(res.data.user));
            console.log(history);
            history.replace('/problemset');
        } catch (err) {
            console.log(err);
            dispatch(fetchFail(err.message));
        }
    }
};

export const signup = (body, history) => {
    console.log(body);
    return async dispatch => {
        dispatch(fetchStart());
        try {
            const res = await signupUser(body);
            dispatch(fetchSuccess(res.data.user));
            console.log(history);
            history.replace('/problemset');
        } catch (err) {
            console.log(err);
            dispatch(fetchFail(err.message));
        }
    }
};

export const fetchUser = () => {
    return async dispatch => {
        dispatch(fetchStart());
        try {
            const res = await getUser();
            console.log(res);
            if(res.data.user === null){
                console.log('hello');
            }

            const user = res.data.user ? res.data.user : undefined;
            dispatch(fetchSuccess(user));
        } catch (err) {
            console.log(err);
            dispatch(fetchFail(err.message));
        }
    }
};

export const logoutUser = () =>{
    console.log("fjdf");
    return async dispatch => {
        await logout();
        dispatch(fetchSuccess(null));
    }
};