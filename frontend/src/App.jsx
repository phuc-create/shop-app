import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Admin from "./admin/Admin";
import { useDispatch } from "react-redux";
import "./App.css";
import AboutPage from "./components/about/AboutPage";
import Auth from "./components/auth/Auth";
import Main from "./components/main/Main";
import Details from "./components/products/details/Details";
import ProductPage from "./components/products/ProductPage";
//import GlobalState from "./global/GlobalState";
import ProtectedRoute from "./protected-route/ProtectedRoute";
import { checkInforUser } from "./redux/actions/userActions";
import Cart from "./components/cart/Cart";
import Checkout from "./components/checkout/Checkout";
import User from "./components/user/User";
import ScrollToTop from "./protected-route/ScrollToTop";
import Loading from "./components/layouts/Loading";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkInforUser());
  }, [dispatch]);

  return (
    //<GlobalState>
    <div>
      <Router>
        <ScrollToTop />
        <Switch>
          <ProtectedRoute exact path="/" component={Main} />
          <Route path="/shop" component={ProductPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/details/:productId" component={Details} />
          <Route exact path="/load" component={Loading} />
          <ProtectedRoute path="/cart" component={Cart} />
          <ProtectedRoute path="/checkout" component={Checkout} />
          <ProtectedRoute path="/user" component={User} />
          <Route
            path="/login"
            exact
            render={(props) => <Auth {...props} authRoute="login" />}
          />
          <Route
            path="/register"
            exact
            render={(props) => <Auth {...props} authRoute="register" />}
          />
          <Route path="/admin" exact component={Admin} />
        </Switch>
      </Router>
    </div>
    //</GlobalState>
  );
}
export default App;
