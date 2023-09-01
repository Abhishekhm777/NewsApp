import { Store } from 'redux';

export default class NewsAppStore {
  static StoreInstance: Store;

  static setInstance(store: Store) {
    NewsAppStore.StoreInstance = store;
  }

  static getInstance() {
    return NewsAppStore.StoreInstance;
  }
}
