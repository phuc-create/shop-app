import {
  ADD_NEW_PRODUCT,
  DELETE_PRODUCT,
  GET_ALL_PRODUCTS,
  UPDATE_PRODUCT,
} from "../actions/globalActions";

const productReducers = (products = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_PRODUCTS: {
      return payload.viewProduct;
    }
    case ADD_NEW_PRODUCT: {
      return products;
    }
    case DELETE_PRODUCT: {
      return payload;
    }
    case UPDATE_PRODUCT: {
      return payload;
    }
    default:
      return products;
  }
};

export default productReducers;
