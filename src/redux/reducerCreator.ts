import { configureStore, combineReducers } from 'redux';
import headLineReducer from './reducer/newsHeadLineReducer';

import NewsAppStore from './store';

const combinedReducers = combineReducers(headLineReducer);

const store = configureStore(combinedReducers);

NewsAppStore.setInstance(store);

export type Store = ReturnType<typeof combinedReducers>;
