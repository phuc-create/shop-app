import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
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
  const user = useSelector((state) => state.user);
  const handleRegister = (e) => {
    e.preventDefault();
    console.log("submid");
    if (!username || !password || !email) {
      toast.error("Please enter information!!!");
      return false;
    } else if (password.length < 6) {
      toast.error("At least 8 characters for password!!!");
      return false;
    } else if (password !== re_password) {
      toast.error("check again your password and confirm password!!!");
      return false;
    } else if (user.err !== null) {
      toast.error(user.err.message);
      return false;
    }
    dispatch(checkRegisterUser({ username, email, password }));
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
      {user.err !== null ? (
        <span
          className="show-errLogin"
          style={{ color: "red", marginBottom: "20px", fontSize: "18px" }}
        ></span>
      ) : (
        <div></div>
      )}
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
      {/* <div className="cb-txt">
        <input type="checkbox" name="check" id="check" />
        <label>I agree to the Terms and Privacy Policy</label>
        <p>I agree to the Terms and Privacy Policy</p> 
      </div> */}
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
