import {
  GET_ALL_ORDERS,
  GET_ORDERS_USER,
  DELETE_ORDER,
  UPDATE_STATUS_ORDER,
} from "../actions/globalActions";

const orderReducers = (orders = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ORDERS_USER: {
      return payload;
    }
    case GET_ALL_ORDERS: {
      return payload;
    }
    case DELETE_ORDER: {
      return payload;
    }
    case UPDATE_STATUS_ORDER: {
      return payload;
    }
    default:
      return orders;
  }
};
export default orderReducers;
