import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiTwotoneHeart } from "react-icons/ai";
import { GiSeaStar } from "react-icons/gi";
import { Url } from "../../UrlServer";
function ProductShow({ products, categories }) {
  const [value, setValue] = useState(500);
  //set navigation for product//////////
  const [page, setPage] = useState({
    currentPage: Number(1),
    productPerPage: 8,
  });
  const { currentPage, productPerPage } = page;
  const indexOfLastPr = currentPage * productPerPage; // 10
  const indexOfFirstPr = indexOfLastPr - productPerPage; // 0
  const currentProducts = products.slice(indexOfFirstPr, indexOfLastPr);

  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(products.length / productPerPage); i++) {
    pageNumber.push(i);
  }
  const choosePage = (e) => {
    setPage({ ...page, currentPage: Number(e.target.id) });
  };
  ////////////////////////////////
  const handleChangeRange = (e) => {
    setValue(e.target.value);
  };
  //currentcy
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  return (
    <div className="showProducts">
      <div className="filter">
        <div className="btn-mobile"></div>
        <form>
          <input
            type="text"
            name="search_product"
            className="search"
            placeholder="Find product"
          />
          <div className="filter_ cate" id="cateFill">
            <h1>Categories_</h1>
            <label className="cate-fill">
              <input
                type="radio"
                className="radio__filter"
                name="cate"
                value=""
              />
              <div className="radio__radio"></div>
              All Products
            </label>
            {categories.map((category) => {
              return (
                <label
                  className="cate-fill"
                  key={category._id}
                  // onClick={() => filterProduct(category.cateName)}
                >
                  <input
                    type="radio"
                    className="radio__filter"
                    name="cate"
                    value={category._id}
                  />
                  <div className="radio__radio"></div>
                  {category.cateName}
                </label>
              );
            })}
          </div>

          <div className="rangeInput">
            <h1>Filter by price_</h1>
            <input
              className="range__filter"
              type="range"
              min="1"
              max="100000"
              value={value}
              onChange={handleChangeRange}
            />
            <span>From: 1$ to {value}$</span>
          </div>
          <div className="selectInput">
            <h1>Sort by_</h1>
            <div style={{ position: "relative" }}>
              <select className="select__filter">
                <option value="name">Name</option>
                <option value="name">Price</option>
                <option value="name">Rating</option>
                <option value="name">Popular</option>
              </select>
              <div className="abs-dropSelect"></div>
            </div>
          </div>
        </form>
      </div>
      <div className="prd">
        <div className="product-s">
          {currentProducts.map((product) => {
            const str = product.description;
            return (
              <Link
                to={`/details/${product._id}`}
                className="prdBx"
                key={product._id}
              >
                <AiTwotoneHeart className="editPrd" />
                <div className="img-wraper">
                  <img src={`${Url}/${product.productImg}`} alt="" />
                </div>
                <h2>{product.name}</h2>
                <span> {product.cate.cateName}</span>
                <div className="rating">
                  <GiSeaStar />
                  <GiSeaStar />
                  <GiSeaStar />
                  <GiSeaStar />
                  <GiSeaStar />
                </div>
                <div className="prdDecription">
                  {str < 17 ? str : str.slice(0, 90) + "..."}
                </div>
                <div className="prdBot">
                  <span className="prdPrice">
                    {formatter.format(product.price)}
                  </span>
                  <button>View</button>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="accordion-navigation">
          <ul>
            {pageNumber.map((number) => {
              if (currentPage === number) {
                return (
                  <li
                    key={number}
                    id={number}
                    className="active"
                    onClick={choosePage}
                  >
                    {number}
                  </li>
                );
              } else {
                return (
                  <li key={number} id={number} onClick={choosePage}>
                    {number}
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductShow;
