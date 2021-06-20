import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import BgUser from "../../img/bg.jpg";
import "./User.css";
import { Url } from "../UrlServer";
const User = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [detailThis, setDetailThis] = useState(null);
  const user = useSelector((state) => state.user);
  const orders = useSelector((state) => state.orders);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  const orderDetail = (idOrder) => {
    const getSingleOrder = orders.find((order) => order._id === idOrder);
    setDetailThis(getSingleOrder);
  };

  const multiCheck = (id) => {
    setShowDetails(!showDetails);
    orderDetail(id);
  };
  const totalCart = () => {
    let totalPrice = 12.99;
    detailThis
      ? detailThis.orderDetails.forEach(
          (item) => (totalPrice += item.price * item.quantity)
        )
      : (totalPrice = 12.99);
    return totalPrice;
  };
  return (
    <div className="main">
      <Header />
      <div className="user-wrapper">
        <div className="user">
          <div className="user__infor">
            <div className="user__infor--bx">
              <div className="__infor picture">
                <img src={BgUser} alt="user" />
              </div>
              <p className="title-infor">Information user</p>
              <div className="__infor fm__input name">
                <span> Name: </span>
                {user.user.username}
              </div>
              <div className="__infor fm__input phone">
                <span> Phone: </span>
                {user.user.phone}
              </div>
              <div className="__infor fm__input email">
                <span> Email: </span>
                {user.user.email}
              </div>
              <div className="__infor fm__input address">
                <span> Address: </span>
                {user.user.address}
              </div>
              <div className="__infor fm__input company">
                <span> Company: </span>
                {user.user.company}
              </div>
              <div className="__infor fm__input region">
                <span> Region: </span>
                Viet Nam
              </div>
              <div className="__infor">
                <button className="user--edit-infor">Edit</button>
              </div>
            </div>
          </div>
          <div className="user__orders">
            <table className="__orders">
              <thead>
                <tr className="__orders--header">
                  <th>Orders</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  return (
                    <tr className="__orders--view" key={order._id}>
                      <td>Order: #{order._id.substring(17, 23)}</td>
                      <td className="od--flex-bw">
                        <div className="__order--txt">Total:</div>
                        <div className="__order--result">
                          {formatter.format(order.totalOrder)}
                        </div>
                      </td>
                      <td className="od--flex-bw">
                        <div className="__order--txt">Status:</div>
                        <div
                          className="__order--status"
                          style={{
                            color:
                              detailThis && detailThis.status === "new"
                                ? "#e84118"
                                : "#009432",
                            textTransform: "capitalize",
                            fontWeight: "600",
                          }}
                        >
                          {order.status}
                        </div>
                      </td>
                      <td>
                        <button
                          className="vw-detail-order"
                          onClick={() => multiCheck(order._id)}
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className={showDetails ? "order-details overlay" : "order-details"}
          onClick={() => setShowDetails(!showDetails)}
        >
          <div className={showDetails ? "details active" : "details"}>
            <h1 className="order--id">
              Order #{detailThis ? detailThis._id.substring(17, 23) : ""}
            </h1>
            <div className="order-date">
              <p className="order-status">
                Status:
                <span
                  className="__status"
                  style={{
                    color:
                      detailThis && detailThis.status === "New"
                        ? "#e84118"
                        : "#009432",
                    textTransform: "capitalize",
                    fontWeight: "700",
                  }}
                >
                  {detailThis ? detailThis.status : ""}
                </span>
              </p>
              <p className="order-status">
                Created At :{" "}
                {detailThis
                  ? `${detailThis.createdAt.substring(0, 10)} at
                    ${detailThis.createdAt.substring(11, 16)}`
                  : ""}
              </p>
            </div>
            <div className="products--list">
              <h1 className="order--header">Product Listing</h1>
              {detailThis
                ? detailThis.orderDetails.map((item) => {
                    return (
                      <div className="__list-single" key={item._id}>
                        <div className="__list-single-img">
                          <img
                            src={`${Url}/${item.productImg}`}
                            alt={item.productImg}
                          />
                          <div className="__list-np">
                            <p className="lname">
                              {item.name.length < 11
                                ? item.name
                                : `${item.name.substring(0, 8)}...`}
                            </p>
                            <span className="lprice">
                              {formatter.format(item.price)}
                            </span>
                          </div>
                        </div>
                        <div className="__list-qty">
                          <p className="-qty">{item.quantity}</p>
                          <p className="-qty-txt">Quantity</p>
                        </div>
                        <div className="__list--subtotal">
                          <p className="--subtotal">
                            {formatter.format(item.price * item.quantity)}
                          </p>
                          <p className="-subtt-txt">Subtotal</p>
                        </div>
                      </div>
                    );
                  })
                : ""}
              {/* <div className="__list-single">
                <div className="__list-single-img">
                  <img src="./img/bg.jpg" alt="asdasd" />
                  <div className="__list-np">
                    <p className="lname">Product Name</p>
                    <span className="lprice">10000$</span>
                  </div>
                </div>
                <div className="__list-qty">
                  <p className="-qty">2</p>
                  <p className="-qty-txt">Quantity</p>
                </div>
                <div className="__list--subtotal">
                  <p className="--subtotal">12000$</p>
                  <p className="-subtt-txt">Subtotal</p>
                </div>
              </div>
              <div className="__list-single">
                <div className="__list-single-img">
                  <img src="./img/bg.jpg" alt="asdasd" />
                  <div className="__list-np">
                    <p className="lname">Product Name</p>
                    <span className="lprice">10000$</span>
                  </div>
                </div>
                <div className="__list-qty">
                  <p className="-qty">2</p>
                  <p className="-qty-txt">Quantity</p>
                </div>
                <div className="__list--subtotal">
                  <p className="--subtotal">12000$</p>
                  <p className="-subtt-txt">Subtotal</p>
                </div>
              </div>
              <div className="__list-single">
                <div className="__list-single-img">
                  <img src="./img/bg.jpg" alt="asdasd" />
                  <div className="__list-np">
                    <p className="lname">Product Name</p>
                    <span className="lprice">10000$</span>
                  </div>
                </div>
                <div className="__list-qty">
                  <p className="-qty">2</p>
                  <p className="-qty-txt">Quantity</p>
                </div>
                <div className="__list--subtotal">
                  <p className="--subtotal">12000$</p>
                  <p className="-subtt-txt">Subtotal</p>
                </div>
              </div> */}
            </div>
            <div className="order-total">
              <div className="l-f-order">
                <p>
                  Subtotal: <span>{formatter.format(totalCart() - 12.99)}</span>
                </p>
                <p>
                  Shipping: <span>12.99$</span>
                </p>
              </div>
              <div className="r-f-order">
                <p>Total:</p>
                <h1>{formatter.format(totalCart())}</h1>
              </div>
            </div>
            <div className="sh-address">
              Ship to:
              <br /> {detailThis ? detailThis.address : ""}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default User;
