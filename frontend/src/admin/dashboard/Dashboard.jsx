import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { checkLogoutUser } from "../../redux/actions/userActions";
import "./Dashboard.css";

function Dashboard({ url }) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(checkLogoutUser());
    window.location = "/";
  };
  return (
    <div className="panel--header">
      <Link to="/admin" className="logoAdmin">
        B-shop Panel
      </Link>
      <ul>
        <li>
          <Link to={`${url}/products`}>Products</Link>
        </li>
        <li>
          <Link to={`${url}/new-product`}>Add Product</Link>
        </li>
        <li>
          <Link to={`${url}/cate`}>Categories</Link>
        </li>
        <li>
          <Link to={`${url}/new-cate`}>Add Category</Link>
        </li>
        <li>
          <Link to={`${url}/orders`}>Orders</Link>
        </li>
        <li>
          <Link to="/logout" onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Dashboard;
