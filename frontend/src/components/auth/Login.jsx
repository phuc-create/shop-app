import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { SiGoogle, SiInstagram, SiTwitter } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa";
import "./Login.css";
import { checkLoginUser } from "../../redux/actions/userActions";

function Login() {
  const dispatch = useDispatch();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(checkLoginUser(login));
    setLogin({
      email: "",
      password: "",
    });
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
      <input
        value={login.email}
        type="email"
        placeholder="Your Email"
        onChange={(e) => {
          setLogin({ ...login, email: e.target.value });
        }}
      />

      <input
        value={login.password}
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
