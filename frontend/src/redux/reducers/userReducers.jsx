import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  CART_ACTIONS,
  CHECK_USER_INFOR_SUCCESS,
  CHECK_USER_INFOR_FAIL,
  CHECK_CLEAR_ERR,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_CHECKOUT_REQUEST,
  USER_CHECKOUT_SUCCESS,
  USER_CHECKOUT_FAIL,
  ADD_CART_REQUEST,
  ADD_CART_SUCCESS,
  ADD_CART_FAIL,
} from "../actions/globalActions";
const initialState = {
  isLoading: false,
  user: null,
  isAuthenticated: false,
  err: null,
  txt: null,
};
const userReducers = (user = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGIN_REQUEST: {
      return {
        ...user,
        isLoading: true,
      };
    }
    case USER_LOGIN_SUCCESS: {
      return {
        isLoading: false,
        user: payload.user,
        isAuthenticated: true,
        err: null,
      };
    }
    case USER_LOGIN_FAIL: {
      return {
        ...user,
        isLoading: false,
        err: payload,
      };
    }
    case CHECK_USER_INFOR_SUCCESS: {
      return { ...user, user: payload.user, isAuthenticated: true };
    }
    case CHECK_USER_INFOR_FAIL: {
      return {
        ...user,
        isAuthenticated: false,
        err: payload,
      };
    }
    case CHECK_CLEAR_ERR:
      return {
        ...user,
        txt: null,
        err: null,
      };
    case USER_REGISTER_REQUEST:
      return {
        ...user,
        isLoading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...user,
        isLoading: false,
        isAuthenticated: true,
      };
    case USER_REGISTER_FAIL:
      return {
        ...user,
        isLoading: false,
        isAuthenticated: false,
        err: payload,
      };
    case ADD_CART_REQUEST:
      return {
        ...user,
        isLoading: true,
      };
    case ADD_CART_SUCCESS:
      return {
        ...user,
        isLoading: false,
        isAuthenticated: true,
        txt: payload.txt,
        user: payload.message,
      };
    case ADD_CART_FAIL:
      return {
        ...user,
        isLoading: false,
        err: payload,
      };
    case USER_LOGOUT: {
      return payload;
    }
    case CART_ACTIONS: {
      return payload;
    }

    case USER_CHECKOUT_REQUEST:
      return {
        ...user,
        isLoading: true,
      };
    case USER_CHECKOUT_SUCCESS:
      return {
        ...user,
        user: payload.user,
        isAuthenticated: true,
        err: null,
        isLoading: false,
        txt: payload.txt,
      };
    case USER_CHECKOUT_FAIL:
      return {
        ...user,
        isLoading: false,
        err: payload,
      };
    default:
      return user;
  }
};

export default userReducers;
