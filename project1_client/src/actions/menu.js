import axios from "axios";
export const FETCH_A_MENU = "FETCH_A_MENU";
export const FETCH_A_ITEM = "FETCH_A_ITEM";
export const FETCH_A_MENU_FAIL = "FETCH_A_MENU_FAIL";
export const FETCH_A_ITEM_FAIL = "FETCH_A_ITEM_FAIL";


export const updateMenu = (data, menuId) => async dispatch => {
  const url = `https://restaurantportal.herokuapp.com/api/v1/menus/${menuId}`;
  const token = localStorage.getItem("token");

  try {
    let resData = await axios({
      method: "put",
      url,
      data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    //console.log(data);
    if (resData) {
      dispatch(fetchedMenu(resData.data.data));
    }
  } catch (e) {
    dispatch(fetchMenuFail(e.message));
  }
};

export const updateItem = (data, itemId) => async dispatch => {
  const url = `https://restaurantportal.herokuapp.com/api/v1/menu_items/${itemId}`;
  const token = localStorage.getItem("token");

  try {
    let resData = await axios({
      method: "put",
      url,
      data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    //console.log(data);
    if (resData) {
      dispatch(fetchedItem(resData.data.data));
    }
  } catch (e) {
    dispatch(fetchItemFail(e.message));
  }
};

export function fetchedMenu(menu) {
  return {
    type: FETCH_A_MENU,
    menu
  };
}

export function fetchedItem(item) {
  return {
    type: FETCH_A_ITEM,
    item
  };
}

function fetchMenuFail(error) {
  return {
    type: FETCH_A_MENU_FAIL,
    message: error.message
  };
}

function fetchItemFail(error) {
  return {
    type: FETCH_A_ITEM_FAIL,
    message: error.message
  };
}
