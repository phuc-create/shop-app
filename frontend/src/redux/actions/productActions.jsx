import {
  DELETE_PRODUCT,
  GET_ALL_PRODUCTS,
  UPDATE_PRODUCT,
} from "./globalActions";
import { deleteProduct, fetchProducts, updateProduct } from "../../api/api";
export const getAllProducts = () => async (dispatch) => {
  try {
    const { data } = await fetchProducts();
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteProductById = (id) => async (dispatch) => {
  const { data } = await deleteProduct(id);
  console.log(data);
  dispatch({
    type: DELETE_PRODUCT,
    payload: data.products,
  });
};
export const updateProductById = (form) => async (dispatch) => {
  const { data } = await updateProduct(form);
  dispatch({
    type: UPDATE_PRODUCT,
    payload: data.products,
  });
};
