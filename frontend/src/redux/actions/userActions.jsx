import {
  ADD_CART_FAIL,
  ADD_CART_REQUEST,
  ADD_CART_SUCCESS,
  CART_ACTIONS,
  CHECK_CLEAR_ERR,
  CHECK_USER_INFOR_FAIL,
  CHECK_USER_INFOR_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
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
    dispatch({ type: USER_LOGIN_REQUEST });
    const { data } = await userLogin(inforLogin);
    console.log(data);
    localStorage.setItem("token", data.accessToken);
    setAuhToken(localStorage["token"]);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error.response.data);
    localStorage.removeItem("token");
    setAuhToken();
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data,
    });
    setTimeout(() => {
      dispatch({
        type: CHECK_CLEAR_ERR,
      });
    }, 3000);
  }
};

export const checkInforUser = () => async (dispatch) => {
  setAuhToken(localStorage["token"]);
  try {
    const { data } = await userInfor();

    dispatch({
      type: CHECK_USER_INFOR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHECK_USER_INFOR_FAIL,
      payload: error.response && error.response.data,
    });
  }
};
export const checkClearErr = () => (dispatch) => {
  dispatch({
    type: CHECK_CLEAR_ERR,
  });
};
export const checkRegisterUser = (registerForm) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const { data } = await userRegister(registerForm);
    console.log(data);
    localStorage.setItem("token", data.accessToken);
    setAuhToken(localStorage["token"]);

    dispatch({
      type: USER_REGISTER_SUCCESS,
    });
    window.location = "/";
  } catch (error) {
    localStorage.removeItem("token");
    setAuhToken();
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data,
    });
    setTimeout(() => {
      dispatch({
        type: CHECK_CLEAR_ERR,
      });
    }, 3000);
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
    dispatch({ type: ADD_CART_REQUEST });
    const { data } = await userAddToCart(productInfor);

    dispatch({
      type: ADD_CART_SUCCESS,
      payload: data,
    });
    setTimeout(() => {
      dispatch({
        type: CHECK_CLEAR_ERR,
      });
    }, 2500);
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: ADD_CART_FAIL,
      payload: error.response && error.response.data,
    });
    setTimeout(() => {
      dispatch({
        type: CHECK_CLEAR_ERR,
      });
    }, 3000);
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
