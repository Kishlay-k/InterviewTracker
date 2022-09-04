import {createSelector} from 'reselect';

const topicWiseData = (state) => state.topicWise;

export const topicWiseProblemSet = createSelector([topicWiseData], (data) => {
    return data.questions;
});

export const isLoaded = createSelector([topicWiseData], (data) => {
    return !!data.questions;
});