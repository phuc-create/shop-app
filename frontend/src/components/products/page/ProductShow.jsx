import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiTwotoneHeart } from "react-icons/ai";
import { GiSeaStar } from "react-icons/gi";
import { Url } from "../../UrlServer";
function ProductShow({
  setFilterCLickOverlay,
  openFilter,
  products,
  categories,
}) {
  const [valueForm, setValueForm] = useState({
    nameProduct: "",
    checkbox: "",
    select: "",
  });
  const [value, setValue] = useState(500);
  const rangeValue = (e) => {
    setValue(e.target.value);
  };
  const handleChangeInputValue = (e) => {
    setValueForm({ ...valueForm, [e.target.name]: e.target.value });
  };
  const changeOverlay = () => {
    setFilterCLickOverlay();
  };
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

  //currentcy
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  return (
    <div className="showProducts">
      <div
        className={openFilter ? "overlay-mobile dark" : "overlay-mobile"}
        onClick={changeOverlay}
      ></div>
      <form className={openFilter ? "filter openFilter" : "filter"}>
        <div className="ft-search">
          <span>Search Product</span>
          <input
            type="text"
            className="search-pr"
            onChange={handleChangeInputValue}
          />
        </div>
        <div className="filter-ck">
          <h1 className="ft-ck-cate">Categories</h1>
          {categories.map((category) => {
            return (
              <div className="ft-ck-single" key={category._id}>
                <input type="checkbox" id={category._id} name="checkbox" />
                <label className="ft-cate-checkbox" htmlFor={category._id}>
                  {category.cateName}
                </label>
              </div>
            );
          })}
        </div>
        <div className="ft-c">
          <h1 className="ft-c-sort">Sort By</h1>
          <div className="sl-wrap">
            <select
              className="ft-c-select"
              name="select"
              onChange={handleChangeInputValue}
              value={valueForm.select}
            >
              <option className="op-ft">select option</option>
              <option className="op-ft">Product Name</option>
              <option className="op-ft">Product Price</option>
              <option className="op-ft">Product Rating</option>
              <option className="op-ft">Product Selling</option>
            </select>
          </div>
        </div>
        <div className="ft-range">
          <h1 className="ft-r-title" id="value-range">
            Price {value}
          </h1>
          <div className="ft-r-iput">
            <input
              type="range"
              name="range"
              min="1"
              value={value}
              max="10000"
              onChange={rangeValue}
            />
          </div>
        </div>
      </form>
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
