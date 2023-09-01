import PokerLobbyStore from '../store';

const promiseCreator = <T>(action: IAction<T>) => {
  const { payload } = action;
  return new Promise((resolve) => {
    PokerLobbyStore.getInstance().dispatch(action);
    resolve(payload);
  });
};

export default promiseCreator;
