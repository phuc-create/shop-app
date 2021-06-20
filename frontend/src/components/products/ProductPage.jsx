import React from "react";
import { useSelector } from "react-redux";
import "./Products.css";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import ProductHeader from "./page/ProductHeader";
import ProductShow from "./page/ProductShow";

function ProductPage() {
  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);

  return (
    <div className="main">
      <Header />
      <ProductHeader />
      <h1 className="productGreeting"> Products </h1>
      <ProductShow categories={categories} products={products} />
      <Footer />
    </div>
  );
}

export default ProductPage;
