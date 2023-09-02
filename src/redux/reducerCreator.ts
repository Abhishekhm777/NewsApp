import { createStore, combineReducers } from 'redux';
import newsAppHeadlineReducer from './reducer';

import NewsAppStore from './store';

const combinedReducers = combineReducers(newsAppHeadlineReducer);

const appStore = createStore(combinedReducers);

NewsAppStore.setInstance(appStore);
export default appStore;
