import * as CONSTANTS from "./Constants";
import { categories } from "../Data";

// If multiple components need access to some data, in that case we store such data in redux.
const initialState = {
  cartItems: [],
  showCartDialog: false,
  showMenu: true,
  checkedOutItems: [],
  loggedInUser: null,
  createCategoryError: null,
  categories: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    //Add items to the cart -- (01)
    case CONSTANTS.ADD_ITEM_IN_CART: {
      /*
      let index = state.cartItems.findIndex(x => x.id === action.payload.id);

      // Is the item user wants to add already in the cart?
      if (index !== -1) {
        // Yes, update the quantity.
        let cloneCartItems = [...state.cartItems];
        cloneCartItems[index] = {
          ...cloneCartItems[index],
          quantity: state.cartItems[index].quantity + action.payload.quantity
        };

        return { ...state, cartItems: cloneCartItems };
      }
      */
      let index = state.cartItems.findIndex(x => x.prod_id === action.payload.prod_id);
      if (index !== -1 ) {
        let cloneCartItems = [...state.cartItems];
        cloneCartItems[index] = {
          ...cloneCartItems[index],
          quantity: state.cartItems[index].quantity + action.payload.quantity
        };

        return { ...state, cartItems: cloneCartItems };
      }
      // No, add a new item.
      return { ...state, cartItems: state.cartItems.concat(action.payload) };
    }
    //Show CartDialog -- (02)
    case CONSTANTS.SHOW_CART_DLG:
      return { ...state, showCartDialog: action.payload };
    //Delete cart item -- (03)
    case CONSTANTS.DELETE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(x => x.prod_id !== action.payload)
      };
    //Delete cart item -- (04)
    case CONSTANTS.TOGGLE_MENU:
      return { ...state, showMenu: !state.showMenu };
    //Get user login -- (05)
    case CONSTANTS.SET_LOGGED_IN_USER:
      console.log('SET_LOGGED_IN_USER')
      console.log(action.payload)
      return { ...state, loggedInUser: action.payload };
    //Get user logout -- (06)
    case CONSTANTS.LOGOUT:
      return { ...state, loggedInUser: null, checkedOutItems: [] };
    //create checkout item -- (07)
    case CONSTANTS.SET_CHECKEDOUT_ITEMS:
      return { ...state, checkedOutItems: action.payload };
    //Update cart item  quantity -- (08)
    case CONSTANTS.UPDATE_CART_ITEM_QUANTITY: {
      let index = state.cartItems.findIndex(x => x.prod_id === action.payload.id);

      // User wants to update quantity of existing item.
      if (index !== -1) {
        let cloneCartItems = [...state.cartItems];
        cloneCartItems[index] = {
          ...cloneCartItems[index],
          quantity: action.payload.quantity
        };

        return { ...state, cartItems: cloneCartItems };
      }

      // If we couldn't find such item, do nothing.
      return state;
    }
    //Store error occured on API requst to create category -- (09)
    case CONSTANTS.SET_CREATE_CATEGORY_ERROR: {
      return { ...state, createCategoryError: action.payload };
    }
    //Remove error occured on API requst to create category -- (09)
    case CONSTANTS.REMOVE_CREATE_CATEGORY_ERROR:
      return { ...state, createCategoryError: null};
<<<<<<< Updated upstream
    case CONSTANTS.REMOVE_CHECKEDOUT_ITEMS:
      return { ...state, checkedOutItems: []}
=======
    case CONSTANTS.CATEGORIES_FETCHED:
      return { ...state, categories: action.payload}
>>>>>>> Stashed changes
    default:
      return state;
  }
};

export default rootReducer;
