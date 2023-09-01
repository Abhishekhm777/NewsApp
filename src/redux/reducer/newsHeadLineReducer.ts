import { SET_TOP_HEADLINES } from "../actionCreators/newAppActions";

const initialState: any{

}

type IPayload = string | number | null;

const headLineReducer = (state = initialState, action: IAction<IPayload>) => {
  const { type, payload } = action;
  switch (type) {
    case `${SET_TOP_HEADLINES}`:
      return {
        ...state,
        lobbyData: payload,
      };
  }
};

export default headLineReducer;

