import { SET_TOP_HEADLINES } from '../actionCreators/newAppActions';

interface IHeadlinesInitialState {
  headLines: Article[] | [];
}

const initialState: IHeadlinesInitialState = {
  headLines: [],
};

type IPayload = string | number | null;

const headLineReducer = (state = initialState, action: IAction<IPayload>) => {
  const { type, payload } = action;
  switch (type) {
    case `${SET_TOP_HEADLINES}`:
      return {
        ...state,
        headLines: payload,
      };
    default:
      return state;
  }
};

export default headLineReducer;
