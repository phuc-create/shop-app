import {
  adminDeleteOrders,
  adminOrders,
  adminUpdateOrders,
  userCheckout,
  userOrders,
} from "../../api/api";
import {
  CHECK_CLEAR_ERR,
  DELETE_ORDER,
  GET_ALL_ORDERS,
  GET_ORDERS_USER,
  UPDATE_STATUS_ORDER,
  USER_CHECKOUT_FAIL,
  USER_CHECKOUT_REQUEST,
  USER_CHECKOUT_SUCCESS,
} from "./globalActions";

export const checkCheckoutUser = (dataForm) => async (dispatch) => {
  try {
    dispatch({ type: USER_CHECKOUT_REQUEST });

    const { data } = await userCheckout(dataForm);
    console.log(data);
    dispatch({
      type: USER_CHECKOUT_SUCCESS,
      payload: data,
    });
    setTimeout(() => {
      dispatch({
        type: CHECK_CLEAR_ERR,
      });
      window.location = "/";
    }, 3000);
  } catch (error) {
    dispatch({
      type: USER_CHECKOUT_FAIL,
      payload: error.response && error.response.data,
    });
  }
};
export const getOrdersUser = () => async (dispatch) => {
  const { data } = await userOrders();
  dispatch({
    type: GET_ORDERS_USER,
    payload: data.userOrders,
  });
};
export const getOrdersAdmin = () => async (dispatch) => {
  const { data } = await adminOrders();
  console.log(data);
  dispatch({
    type: GET_ALL_ORDERS,
    payload: data.orders,
  });
};
export const deleteOrderById = (id) => async (dispatch) => {
  const { data } = await adminDeleteOrders(id);
  console.log(data);
  dispatch({
    type: DELETE_ORDER,
    payload: data.orders,
  });
};
export const updateOrderStatus = (status) => async (dispatch) => {
  const { data } = await adminUpdateOrders(status);
  console.log(data);
  dispatch({
    type: UPDATE_STATUS_ORDER,
    payload: data.orders,
  });
};
