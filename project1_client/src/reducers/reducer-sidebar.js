import { TOGGLE_SIDEBAR } from "../actions/sidebar";

const initialState = {
  isOpened: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isOpened: action.isOpened
      };

    default:
      return state;
  }
};
