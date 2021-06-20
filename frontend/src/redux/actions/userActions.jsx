import {
  CART_ACTIONS,
  CHECK_USER_INFOR,
  SET_ERR_LOGIN,
  USER_LOGIN_AUTH,
  USER_LOGOUT,
} from "./globalActions";
import {
  userAddToCart,
  userInfor,
  userLogin,
  userRegister,
  userRemoveToCart,
  userUpdateToCart,
} from "../../api/api";
import setAuhToken from "../../utils/setAuhToken";

export const checkLoginUser = (inforLogin) => async (dispatch) => {
  try {
    const { data } = await userLogin(inforLogin);

    localStorage.setItem("token", data.accessToken);
    setAuhToken(localStorage["token"]);

    dispatch({
      type: USER_LOGIN_AUTH,
      payload: {
        user: null,
        isAuthenticated: true,
        err: null,
      },
    });
    window.location = "/";
  } catch (error) {
    localStorage.removeItem("token");
    setAuhToken();
    dispatch({
      type: USER_LOGIN_AUTH,
      payload: {
        user: null,
        isAuthenticated: false,
        err: error.response.data,
      },
    });
  }
};
export const checkInforUser = () => async (dispatch) => {
  setAuhToken(localStorage["token"]);
  try {
    const { data } = await userInfor();

    dispatch({
      type: CHECK_USER_INFOR,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SET_ERR_LOGIN,
      payload: { user: null, isAuthenticated: false, err: null },
    });
  }
};
export const checkRegisterUser = (registerForm) => async (dispatch) => {
  try {
    const { data } = await userRegister(registerForm);
    console.log(data);

    localStorage.setItem("token", data.accessToken);
    setAuhToken(localStorage["token"]);

    dispatch({
      type: USER_LOGIN_AUTH,
      payload: {
        user: null,
        isAuthenticated: true,
        err: null,
      },
    });
    window.location = "/";
  } catch (error) {
    localStorage.removeItem("token");
    setAuhToken();
    dispatch({
      type: USER_LOGIN_AUTH,
      payload: {
        user: null,
        isAuthenticated: false,
        err: error.response.data,
      },
    });
  }
};
export const checkLogoutUser = () => (dispatch) => {
  setAuhToken();
  localStorage.removeItem("token");
  dispatch({
    type: USER_LOGOUT,
    payload: { user: null, isAuthenticated: false, err: null },
  });
};
export const checkAddToCart = (productInfor) => async (dispatch) => {
  try {
    const { data } = await userAddToCart(productInfor);

    dispatch({
      type: CART_ACTIONS,
      payload: {
        user: data.message,
        isAuthenticated: true,
        err: null,
      },
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: CART_ACTIONS,
      payload: {
        user: error.response.data.message,
        isAuthenticated: true,
        err: error.response.data.text,
      },
    });
  }
};
export const checkRemoveToCart = (id) => async (dispatch) => {
  try {
    const { data } = await userRemoveToCart(id);
    dispatch({
      type: CART_ACTIONS,
      payload: {
        user: data.message,
        isAuthenticated: true,
        err: null,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const checkUpdateToCart = (idpr, type) => async (dispatch) => {
  try {
    const { data } = await userUpdateToCart(idpr, type);

    dispatch({
      type: CART_ACTIONS,
      payload: {
        user: data.message,
        isAuthenticated: true,
        err: data.text,
      },
    });
  } catch (error) {
    dispatch({
      type: CART_ACTIONS,
      payload: {
        user: error.response.data.message,
        isAuthenticated: true,
        err: error.response.data.text,
      },
    });
  }
};
export const checkOut = () => async (dispatch) => {
  console.log("haha");
};
