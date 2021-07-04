import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Main.css";
import Categories from "../categories/Categories";
import Page from "../layouts/Page";
import BlogPart from "../blog/BlogPart";
import AboutPart from "../about/AboutPart";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { getAllProducts } from "../../redux/actions/productActions";
import { getAllCategories } from "../../redux/actions/categoryActions";
import { Redirect } from "react-router-dom";
import { getOrdersUser } from "../../redux/actions/orderActions";
function Main() {
  const dispatch = useDispatch();
  //GET ALL PRODUCT
  //GET ALL CATEGORIES WHEN LOGIN TO SHOW
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
    dispatch(getOrdersUser());
  }, [dispatch]);
  const user = useSelector((state) => state.user);
  //CHECK USER LOGGON AND REDIRECT TO LOGIN PAGE IF NOT LOGIN
  //const token = localStorage.getItem('token');

  return user.user.role === 0 ? (
    <div className="main">
      <Header />
      <Page />
      <section className="introduce">
        <div className="img-transform"></div>
        <h1>best banner for you</h1>
      </section>
      <Categories />
      <h1
        style={{ fontSize: "40px", textAlign: "center", marginBottom: "20px" }}
      >
        What's news today ?
      </h1>

      <BlogPart />
      <AboutPart />
      <Footer />
    </div>
  ) : (
    <Redirect to="/admin" />
  );
}

export default Main;
