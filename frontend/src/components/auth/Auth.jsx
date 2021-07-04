import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./Login.css";
import Login from "./Login";
import Register from "./Register";
import Loading from "../layouts/Loading";
import { Fragment } from "react";
function Auth({ authRoute }) {
  const user = useSelector((state) => state.user);

  console.log(user);

  if (user.err !== null) {
    toast.error(user.err.message);
  }
  return user.user !== null && user.isAuthenticated === true ? (
    <Redirect to="/" />
  ) : (
    <Fragment>
      {user.isLoading ? <Loading /> : ""}
      <div className="login">
        <div className="main__login">
          {user.err ? <ToastContainer /> : ""}
          {authRoute === "login" && <Login />}
          {authRoute === "register" && <Register user={user} />}
          <div className="r-l"></div>
        </div>
      </div>
    </Fragment>
  );
}

export default Auth;
