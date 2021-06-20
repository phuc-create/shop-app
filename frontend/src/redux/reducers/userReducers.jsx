import {
  USER_LOGIN_AUTH,
  CHECK_USER_INFOR,
  SET_ERR_LOGIN,
  USER_LOGOUT,
  CART_ACTIONS,
  SET_ORDER_USER,
} from "../actions/globalActions";
const initialState = {
  user: null,
  isAuthenticated: false,
  err: { success: false, message: "Please checkout your information" },
};
const userReducers = (user = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGIN_AUTH: {
      return payload;
    }
    case CHECK_USER_INFOR: {
      return { user: payload.user, isAuthenticated: true, err: null };
    }
    case SET_ERR_LOGIN: {
      return payload;
    }
    case USER_LOGOUT: {
      return payload;
    }
    case CART_ACTIONS: {
      return payload;
    }
    case SET_ORDER_USER: {
      return payload;
    }
    default:
      return user;
  }
};

export default userReducers;
