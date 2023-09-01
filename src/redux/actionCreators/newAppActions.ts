import promiseCreator from './promiseCreator';

export const SET_TOP_HEADLINES = 'SET_TOP_HEADLINES';

export const setTopHeadLines = (data: any) => {
  promiseCreator({
    type: SET_TOP_HEADLINES,
    payload: data,
  });
};
