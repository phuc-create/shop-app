import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { checkLogoutUser } from "../../redux/actions/userActions";
import "../main/Main.css";
import "./Layout.css";

function Header() {
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleLogout = () => {
    dispatch(checkLogoutUser());
  };

  return (
    <nav>
      <div className="nav-bar">
        <Link to="/" className="logo">
          B-shop
        </Link>
        <ul className={menu ? "show-menu-bar-toggle" : "jhsdgfjkhasgfkah"}>
          <div
            onClick={() => setMenu(!menu)}
            className={
              menu ? "nav-icon-bar inside open" : "nav-icon-bar inside"
            }
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <li onClick={() => setMenu(!menu)}>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Products</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/#footer">Contact</Link>
          </li>
          <li>
            <Link to="/cart">
              Cart[{user.user !== null ? user.user.cartItems.length : "X"}]
            </Link>
          </li>
          <li className="option-log hidden-for-large">
            {user.user === null ? (
              <Link to="/login">Login</Link>
            ) : (
              <Link to="/user">{user.user.username}</Link>
            )}
            <Link to="/" onClick={handleLogout}>
              Log out
            </Link>
          </li>
        </ul>
      </div>
      <div
        id="nav-icon-bar"
        onClick={() => setMenu(!menu)}
        className={menu ? "open" : "jgasdfjafjafajksd"}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="option-log pc">
        {user.user === null ? (
          <Link to="/login">Login</Link>
        ) : (
          <Link to="/user">{user.user.username}</Link>
        )}
        <Link to="/" onClick={handleLogout}>
          Log out
        </Link>
      </div>
    </nav>
  );
}
export default Header;
