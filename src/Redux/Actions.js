import * as CONSTANTS from "./Constants";

//Add an item to the CartDialog.
export const addItemInCart = item => ({
  type: CONSTANTS.ADD_ITEM_IN_CART,
  payload: item
});
//show the CartDialog
export const showCartDlg = status => ({
  type: CONSTANTS.SHOW_CART_DLG,
  payload: status
});
//remove a cart item.
export const deleteCartItem = id => ({
  type: CONSTANTS.DELETE_CART_ITEM,
  payload: id
});
export const toggleMenu = () => ({
  type: CONSTANTS.TOGGLE_MENU,
  payload: null
});
export const updateCartItemQnt = obj => ({
  type: CONSTANTS.UPDATE_CART_ITEM_QUANTITY,
  payload: obj
});
export const setCheckedOutItems = items => ({
  type: CONSTANTS.SET_CHECKEDOUT_ITEMS,
  payload: items
});
export const setLoggedInUser = user => ({
  type: CONSTANTS.SET_LOGGED_IN_USER,
  payload: user
});
export const logout = () => ({
  type: CONSTANTS.LOGOUT,
});
export const setCreateCategoryError = (error) => ({
  type: CONSTANTS.SET_CREATE_CATEGORY_ERROR,
  payload: error
});
export const removeCreateCategoryError = () => ({
  type: CONSTANTS.REMOVE_CREATE_CATEGORY_ERROR
});
