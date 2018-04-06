import {
  FETCH_A_MENU,
  FETCH_A_MENU_FAIL,
  FETCH_A_ITEM,
  FETCH_A_ITEM_FAIL
} from "../actions/menu";

const initialState = {
  menu: {},
  item: {},
  isFetch: false,
  error: ""
};

export default (state = initialState, action) => {

  switch (action.type) {
    case FETCH_A_MENU:
      return {
        ...state,
        isFetch: false,
        menu: action.menu
      };

    case FETCH_A_MENU_FAIL:
      return {
        ...state,
        isFetch: false,
        error: action.message
      };
    case FETCH_A_ITEM:
      return {
        ...state,
        isFetch: false,
        item: action.item
      };

    case FETCH_A_ITEM_FAIL:
      return {
        ...state,
        isFetch: false,
        error: action.message
      };

    default:
      return state;
  }
};
