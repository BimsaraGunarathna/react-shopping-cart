import * as CONSTANTS from "./Constants";

import axios from 'axios';

//Add an item to the CartDialog.
export const addItemInCart = item => ({
  type: CONSTANTS.ADD_ITEM_IN_CART,
  payload: item
});
//show the CartDialog
export const showCartDlg = cartDialogStatus => ({
  type: CONSTANTS.SHOW_CART_DLG,
  payload: cartDialogStatus
});
//show the Alert Dialog
export const showAlertDialog = alertStatus => ({
  type: CONSTANTS.SHOW_ALERT_DIALOG,
  payload: alertStatus
});
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
export const removeCheckoutItems = () => ({
  type: CONSTANTS.REMOVE_CHECKEDOUT_ITEMS
});

//fetch categories
export const fetchCategories = () => {
  return (dispatch) => {
    axios.get(
      'https://giga-fashion.herokuapp.com/open/getcategories'
    )
      .then((response) => {
        console.log('Success : fetchCategories');
        console.log(response.data);
        dispatch({ type: CONSTANTS.CATEGORIES_FETCHED, payload: response.data });
      }, (err) => {
        console.log('Error : occurred at fetching Categories');
        console.log(err);
      });
  }
}

/*
//post checkout items to server
export const postCheckoutItems = () => {
  return (dispatch) => {
    console.log("PLACE ORDER");
    axios.post(
      'https://giga-fashion.herokuapp.com/user/placeorder',
      {
        user_Id: userId,
	      products: [ 
          {
            prod_Id: 4, 
            quantity: 4
          }, 
          {
            prod_Id: 7,
            quantity: 3
          } 
        ],
	      paymentMethod: Card,
	      paymentRefID: 1213214,
	      deliveryMethod: Starndard Mail
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ('Bearer ' + accessToken)
        }
      }
    )
      .then((response) => {
        console.log('Posting Single Commnent');
        console.log(response.data);
        this.setState({ commenting: true });
        window.location.reload(false);
      }, (err) => {
        console.log('Error occurred at Single Product posting');
        console.log(err);
      });
  }
}
*/