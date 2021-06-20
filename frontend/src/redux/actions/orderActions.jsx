import {
  adminDeleteOrders,
  adminOrders,
  adminUpdateOrders,
  userCheckout,
  userOrders,
} from "../../api/api";
import {
  DELETE_ORDER,
  GET_ALL_ORDERS,
  GET_ORDERS_USER,
  SET_ORDER_USER,
  UPDATE_STATUS_ORDER,
} from "./globalActions";

export const checkCheckoutUser = (dataForm) => async (dispatch) => {
  const { data } = await userCheckout(dataForm);
  console.log(data);
  dispatch({
    type: SET_ORDER_USER,
    payload: {
      user: data.user,
      isAuthenticated: true,
      err: null,
    },
  });
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
