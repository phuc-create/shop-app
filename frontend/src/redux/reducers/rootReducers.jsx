import { combineReducers } from "redux";
import categoryReducers from "./categoryReducers";
import orderReducers from "./orderReducers";
import productReducers from "./productReducers";
import userReducers from "./userReducers";

const rootReducers = combineReducers({
  products: productReducers,
  user: userReducers,
  categories: categoryReducers,
  orders: orderReducers,
});

export default rootReducers;
