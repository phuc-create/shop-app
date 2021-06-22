import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Products.css";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import ProductHeader from "./page/ProductHeader";
import ProductShow from "./page/ProductShow";

function ProductPage() {
  const [openFilter, setOpenFiler] = useState(false);
  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);
  const setFilterOpen = () => { setOpenFiler(!openFilter) }
  const setFilterCLickOverlay = () => { setOpenFiler(!openFilter) }
  return (
    <div className="main">
      <Header />
      <ProductHeader />
      <div className="productGreeting"><div className="p-title"> Products </div>
        <button onClick={setFilterOpen}>Filter</button>
      </div>
      <ProductShow setFilterCLickOverlay={setFilterCLickOverlay} openFilter={openFilter} categories={categories} products={products} />
      <Footer />
    </div>
  );
}

export default ProductPage;
