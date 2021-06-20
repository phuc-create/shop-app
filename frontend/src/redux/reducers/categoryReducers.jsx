import {
  ADD_CATEGORIES,
  DELETE_CATEGORY,
  GET_ALL_CATEGORIES,
} from "../actions/globalActions";

const categoryReducers = (categories = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_CATEGORIES: {
      return payload.categories;
    }
    case DELETE_CATEGORY: {
      return payload;
    }
    case ADD_CATEGORIES: {
      return payload;
    }
    default:
      return categories;
  }
};
export default categoryReducers;
