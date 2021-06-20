import { addCategory, deleteCategory, fetchCategories } from "../../api/api";
import {
  ADD_CATEGORIES,
  DELETE_CATEGORY,
  GET_ALL_CATEGORIES,
} from "./globalActions";

export const getAllCategories = () => async (dispatch) => {
  try {
    const { data } = await fetchCategories();
    dispatch({ type: GET_ALL_CATEGORIES, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteCategoryById = (id) => async (dispatch) => {
  try {
    const { data } = await deleteCategory(id);
    dispatch({ type: DELETE_CATEGORY, payload: data.cates });
  } catch (error) {
    console.log(error.message);
  }
};
export const addNewCategory = (form) => async (dispatch) => {
  try {
    const { data } = await addCategory(form);
    dispatch({ type: ADD_CATEGORIES, payload: data.categories });
  } catch (error) {
    console.log(error.message);
  }
};
