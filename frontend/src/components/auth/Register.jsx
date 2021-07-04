import React, { useState } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { SiGoogle, SiInstagram, SiTwitter } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa";
import "./Login.css";
import { checkRegisterUser } from "../../redux/actions/userActions";

function Register() {
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
  });
  const { username, email, password, re_password } = register;
  const handleValue = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const handleRegister = (e) => {
    e.preventDefault();
    console.log("submid");
    dispatch(checkRegisterUser({ username, email, password, re_password }));
  };
  return (
    <form className="l-l" onSubmit={handleRegister}>
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
      <p>create an account</p>
      <input
        type="text"
        name="username"
        placeholder="Your Full Name"
        value={username}
        onChange={handleValue}
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={email}
        onChange={handleValue}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={handleValue}
      />
      <input
        type="password"
        name="re_password"
        placeholder="Confirm Your Password"
        value={re_password}
        onChange={handleValue}
      />
      <div className="btn-action">
        <button type="submit" name="regis">
          Sign Up
        </button>
      </div>
      <p className="sl-auth">
        Already have an account? <a href="/login">Login</a>
      </p>
    </form>
  );
}

export default Register;
