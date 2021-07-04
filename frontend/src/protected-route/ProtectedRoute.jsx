import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  console.log(user, isAuthenticated);
  return (
    <Route
      {...rest}
      render={(props) =>
        user !== null && isAuthenticated !== false ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
