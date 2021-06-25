import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteOrderById,
  updateOrderStatus,
} from "../../../redux/actions/orderActions";
import OrderSingle from "./OrderSingle";
import { AiOutlineCloseSquare } from "react-icons/ai";
import "../Control.css";
const Orders = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [dt, setDt] = useState(null);
  const [st, setSt] = useState({
    status: "new",
  });
  const { status } = st;
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  //edit panigation for product panel
  const [page, setPage] = useState({
    currentPage: Number(1),
    productPerPage: 6,
  });
  const { currentPage, productPerPage } = page;
  const indexOfLastPr = currentPage * productPerPage; // 10
  const indexOfFirstPr = indexOfLastPr - productPerPage; // 0
  const currentOrders = orders.slice(indexOfFirstPr, indexOfLastPr);

  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(orders.length / productPerPage); i++) {
    pageNumber.push(i);
  }
  const choosePage = (e) => {
    setPage({ ...page, currentPage: Number(e.target.id) });
  };
  //edit panigation for product panel close
  //delete order
  const handleDeleteOrder = (id) => {
    const accept = window.confirm("Are you sure?");
    if (accept) {
      console.log("delete now");
      dispatch(deleteOrderById(id));
    } else {
      console.log("Please dont");
    }
  };
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  const orderDetail = (idOrder) => {
    const getSingleOrder = orders.find((order) => order._id === idOrder);
    setDt(getSingleOrder);
  };
  const MultiShow = (id) => {
    setShowDetails(!showDetails);
    orderDetail(id);
  };
  const totalCart = () => {
    let totalPrice = 12.99;
    dt
      ? dt.orderDetails.forEach(
          (item) => (totalPrice += item.price * item.quantity)
        )
      : (totalPrice = 12.99);
    return totalPrice;
  };
  const handleUpdateStatus = (e, id) => {
    e.preventDefault();
    setSt({ status: "new" });
    dispatch(updateOrderStatus({ status, id }));
  };
  return (
    <div className="panel-prs">
      <h1 className="panel-title">Orders</h1>
      <table className="tb-prds">
        <thead>
          <tr className="banner-fixed">
            <td>ID</td>
            <td>Name</td>
            <td>Email</td>
            <td>Price</td>
            <td>Status</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {currentOrders
            ? currentOrders.map((od) => {
                return (
                  <OrderSingle
                    key={od._id}
                    od={od}
                    handleDeleteOrder={handleDeleteOrder}
                    MultiShow={MultiShow}
                    formatter={formatter}
                  />
                );
              })
            : "orders not found"}
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Email</td>
            <td>Price</td>
            <td>Status</td>
            <td>Actions</td>
          </tr>
        </tbody>
      </table>
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
      <div className={showDetails ? "order-details overlay" : "order-details"}>
        <div className={showDetails ? "details active" : "details"}>
          <div className="order--id">
            Order #{dt ? dt._id.substring(17, 23) : ""}
            <AiOutlineCloseSquare
              className="close-modal"
              onClick={() => setShowDetails(!showDetails)}
            />
          </div>
          <div className="order-date">
            <p className="order-status">
              Status:
              <span
                className="__status"
                style={{
                  color: dt && dt.status === "new" ? "#EA2027" : "#009432",
                  textTransform: "capitalize",
                }}
              >
                {dt ? dt.status : ""}
              </span>
            </p>
            <p className="order-status">
              Created:{" "}
              {dt
                ? `${new Date(dt.createdAt).getDate()} / ${
                    new Date(dt.createdAt).getMonth() + 1 < 10
                      ? "0" + (new Date(dt.createdAt).getMonth() + 1)
                      : new Date(dt.createdAt).getMonth() + 1
                  } / ${new Date(dt.createdAt).getFullYear()} at
                    ${new Date(dt.createdAt).getHours()}: ${new Date(
                    dt.createdAt
                  ).getMinutes()}`
                : ""}
            </p>
          </div>
          <form
            className="handle-change-status"
            onSubmit={(e) => handleUpdateStatus(e, dt._id)}
          >
            <select
              name="status"
              value={st.status}
              onChange={(e) => setSt({ ...st, status: e.target.value })}
            >
              <option value="new">New</option>
              <option value="on_hold">On_hold</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
            </select>
            <button type="submit">Update</button>
          </form>
          <div className="products--list">
            <h1 className="order--header">Product Listing</h1>
            {dt
              ? dt.orderDetails.map((item) => {
                  return (
                    <div className="__list-single" key={item._id}>
                      <div className="__list-single-img">
                        <div className="__list-np">
                          <p className="lname">
                            {item.name.length < 20
                              ? item.name
                              : `${item.name.substring(0, 19)}..`}
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
            <br /> {dt ? dt.address : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
