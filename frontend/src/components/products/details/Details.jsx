import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { GiSeaStar } from "react-icons/gi";
import { useParams } from "react-router-dom";
import { Url } from "../../UrlServer";
import "./Details.css";
import ProductsRecommend from "../page/ProductsRecommend";
import { checkAddToCart } from "../../../redux/actions/userActions";
import { getAllProducts } from "../../../redux/actions/productActions";
import { getAllCategories } from "../../../redux/actions/categoryActions";

function Details() {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const { productId } = useParams();
  const [details, setDetails] = useState({});
  const [show, setShow] = useState(true);
  // const [quantity, setQuantity] = useState(1);
  // const { products } = useContext(Ctx);
  // se su dung useContext de tai details sau,bay gio tam thoi su dung fetch database
  // useEffect(async () => {
  console.log(details);
  const AddToCart = (product) => {
    const checkCart = user.user.cartItems.filter(
      (x) => x.productId === product._id
    );
    checkCart.length >= 1
      ? alert("Product Added To Cart!!!")
      : dispatch(checkAddToCart(product));
  };

  //currentcy
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  useEffect(() => {
    const filterProduct = () => {
      const product = products.find((pro) => pro._id === productId);
      return setDetails(product);
    };
    filterProduct();
  }, [productId, products]);
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div className="main">
      <Header />
      {details !== null || details !== undefined ? (
        <div
          className="dtls"
          key={details ? details._id : "1"}
          style={{
            "--image": details ? `url(${Url}/${details.productImg})` : "none",
          }}
        >
          <div className="dt-img">
            <img
              src={details ? `${Url}/${details.productImg}` : `null`}
              alt={details ? details.name : ""}
            />
          </div>
          <div className="dt-infor">
            <div className="basic">
              <p>{details ? details.name : ""}</p>
              <p>
                Category:{" "}
                {details && details.cate ? details.cate.cateName : "unknowm"}
              </p>
              <div className="rating-stars">
                <GiSeaStar />
                <GiSeaStar />
                <GiSeaStar />
                <GiSeaStar />
                <GiSeaStar />
              </div>
              <p className="price">
                {details ? formatter.format(details.price) : "000"}
              </p>
              <div className="btn-group-dt">
                {/* <div className="quantity">
                    <div className="arr-l" onClick={MinusQuantity}></div>
                    {quantity}
                    <div className="arr-r" onClick={AddQuantity}></div>
                  </div> */}
                <button onClick={() => AddToCart(details)}>Add to cart</button>
              </div>
            </div>
            <div className="dt-view">
              <div className="v-ctl">
                <button
                  id="decription"
                  className={show ? "active" : ""}
                  onClick={() => setShow(true)}
                >
                  Decription
                </button>
                <button
                  id="feedback"
                  className={show ? "" : "active"}
                  onClick={() => setShow(false)}
                >
                  Story
                </button>
              </div>
              <div className={show ? "dt-view-wraper" : "dt-view-wraper show"}>
                <div className="infor-pl">
                  <p>{details ? details.description : ""}</p>
                </div>
                <div className="dt-feedback">
                  <p>{details && details.cate ? details.cate.history : ""}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        "product not found"
      )}

      <div className="recommend">
        <h1>Related Products</h1>
      </div>
      <ProductsRecommend proFetch={productId} />
      <Footer />
    </div>
  );
}

export default Details;
