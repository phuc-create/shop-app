import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import "../admin/style.css";
import Dashboard from "./dashboard/Dashboard";
import AddCate from "./function/AddCate";
import AddProduct from "./function/AddProduct";
import Products from "./function/Products";
import Auth from "../components/auth/Auth";
import { useSelector, useDispatch } from "react-redux";
import ProtectedRoute from "../protected-route/ProtectedRoute";
import { getAllProducts } from "../redux/actions/productActions";
import { getAllCategories } from "../redux/actions/categoryActions";
import { getOrdersAdmin } from "../redux/actions/orderActions";
import Orders from "./function/orders/Orders";
import Categories from "./function/categories/Categories";

function Admin() {
  let { path, url } = useRouteMatch();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
    dispatch(getOrdersAdmin());
  }, [dispatch]);
  return (
    <Router>
      <div className="admin">
        <Dashboard url={url} />
        <h1 style={{ marginTop: "20px", marginBottom: "20px" }}>
          Wellcome {user.user ? user.user.username : "anonymous"}
        </h1>
        <Switch>
          <Route path="/logout" exact component={Auth} />
          <ProtectedRoute
            path={`${path}/products`}
            exact
            component={Products}
          />
          <ProtectedRoute
            path={`${path}/new-product`}
            exact
            component={AddProduct}
          />
          <ProtectedRoute path={`${path}/new-cate`} exact component={AddCate} />
          <Route path={`${path}/orders`} exact component={Orders} />
          <Route path={`${path}/cate`} exact component={Categories} />
        </Switch>
      </div>
    </Router>
  );
}

export default Admin;
