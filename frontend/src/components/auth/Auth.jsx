import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./Login.css";
import Login from "./Login";
import Register from "./Register";
function Auth({ authRoute }) {
  const user = useSelector((state) => state.user);

  // useEffect(() => {
  //   dispatch(checkInforUser());
  // }, [dispatch, user.isAuthenticated]);

  return user.user !== null && user.isAuthenticated === true ? (
    <Redirect to="/" />
  ) : (
    <div className="login">
      <div className="main__login">
        <ToastContainer />
        {authRoute === "login" && <Login />}
        {authRoute === "register" && <Register />}
        <div className="r-l"></div>
      </div>
    </div>
  );
}

export default Auth;
