import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { SiGoogle, SiInstagram, SiTwitter } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa";
import "./Login.css";
import { checkLoginUser } from "../../redux/actions/userActions";

function Login() {
  const dispatch = useDispatch();
  //get user from useSelector
  const user = useSelector((state) => state.user);
  //check input
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const { email, password } = login;
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(checkLoginUser(login));
    if (!email || !password) {
      toast.error("Please checkout your information!!!");
      return false;
    } else if (password.length < 8) {
      toast.error("At least 8 characters for password!!!");
      return false;
    }
    if (user.err !== null) {
      toast.error(user.err.message);
      return false;
    }
  };
  return (
    <form className="l-l" onSubmit={handleLogin}>
      <h1>B-shop</h1>
      <p>Popular Animes Art Banners</p>
      <div className="icons">
        <Link to="/" className="icon">
          <SiGoogle />
        </Link>
        <Link to="/" className="icon">
          <FaFacebookF />
        </Link>
        <Link to="/" className="icon">
          <SiTwitter />
        </Link>
        <Link to="/" className="icon">
          <SiInstagram />
        </Link>
      </div>
      <p>Login</p>
      {/* {user.err !== null ? (
        <span
          className="show-errLogin"
          style={{ color: "red", marginBottom: "20px", fontSize: "18px" }}
        >
          
          {user.err.message}!
        </span>
      ) : (
        <div></div>
      )} */}

      <input
        type="email"
        placeholder="Your Email"
        onChange={(e) => {
          setLogin({ ...login, email: e.target.value });
        }}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => {
          setLogin({ ...login, password: e.target.value });
        }}
      />

      <div className="btn-action">
        <button type="submit" name="login">
          Sign In
        </button>
      </div>
      <p className="sl-auth">
        Create an account? <a href="/register">Register</a>
      </p>
    </form>
  );
}

export default Login;
