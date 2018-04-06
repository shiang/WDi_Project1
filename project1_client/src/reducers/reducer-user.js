import { SAVE_USER, SAVE_TOKEN } from "../actions/user";

const initialState = {
  user: {},
  token: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        user: action.user
      };

    case SAVE_TOKEN:
      return {
        ...state,
        token: action.token
      };

    default:
      return state;
  }
};
