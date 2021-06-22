import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiTwotoneHeart } from "react-icons/ai";
import { GiSeaStar } from "react-icons/gi";
import { Url } from "../../UrlServer";

import "../Products.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../redux/actions/productActions";
function ProductsRecommend({ proFetch }) {
  const dispatch = useDispatch();
  const [recommend, setRecommend] = useState([]);
  const products = useSelector((state) => state.products);
  // const { products } = useContext(Ctx);

  useEffect(() => {
    const recommendProducts = products.filter(
      (product) => product._id === proFetch
    );
    const fetchCate = () => {
      const cateArr = products.filter(
        (arr) =>
          arr.category === recommendProducts[0].category &&
          arr._id !== recommendProducts[0]._id
      );
      return setRecommend(cateArr);
    };
    fetchCate();
  }, [products, proFetch]);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <div className="products-recommend">
      <div className="prd">
        <div className="product-s">
          {recommend
            ? recommend.map((product) => {
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
                      <span className="prdPrice">{product.price} $</span>
                      <button>View</button>
                    </div>
                  </Link>
                );
              })
            : "product not found"}
        </div>
      </div>
    </div>
  );
}

export default ProductsRecommend;
