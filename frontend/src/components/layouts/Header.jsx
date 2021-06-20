import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { checkLogoutUser } from "../../redux/actions/userActions";
import "../main/Main.css";
import "./Layout.css";

function Header() {
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
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Product</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/cart">
              Cart [{user.user !== null ? user.user.cartItems.length : "X"}]
            </Link>
          </li>
        </ul>
      </div>

      <div className="option-log">
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
