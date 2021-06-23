import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import "./Cart.css";
import { Link } from "react-router-dom";
import {
  checkRemoveToCart,
  checkUpdateToCart,
} from "../../redux/actions/userActions";
import CartItem from "./CartItem";

function Cart() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // const [quantity, setQuantity] = useState(0);
  const cartItems = user.user.cartItems;

  const totalCart = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => (totalPrice += item.price * item.quantity));
    return totalPrice;
  };
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  const handleRemoveProduct = (itemId) => {
    const confirmDel = window.confirm("delete this product from cart ?");
    if (confirmDel) dispatch(checkRemoveToCart(itemId));
    else return;
  };
  const increaseQty = (idpr, type) => {
    // const cartCheck = cartItems.find((c) => c.productId === idpr);
    // if (cartCheck.quantity === 10) {
    //   alert("Value from 1 to 10");
    //   return;
    // } else {
    dispatch(checkUpdateToCart(idpr, type));
    // }
  };
  const decreaseQty = (idpr, type) => {
    // const cartCheck = cartItems.find((c) => c.productId === idpr);
    // if (cartCheck.quantity === 1) {
    //   alert("Value from 1 to 10");
    //   return;
    // } else {
    dispatch(checkUpdateToCart(idpr, type));
    // }
  };
  return (
    <div className="main">
      <Header />

      <div className="cart-main">
        <h1 className="yourcart">Your cart</h1>
        {cartItems.length >= 1 ? (
          <div className="cart">
            <div className="cart__infor">
              <table>
                <thead>
                  <tr>
                    <td className="hidden-for-medium-only">Remove</td>
                    <td>Product in cart</td>
                    <td className="hidden-for-medium-only">View</td>
                  </tr>
                </thead>

                <tbody>
                  {cartItems.map((item, index) => {
                    return (
                      <CartItem
                        key={index}
                        item={item}
                        handleRemoveProduct={handleRemoveProduct}
                        decreaseQty={decreaseQty}
                        increaseQty={increaseQty}
                      />
                    );
                  })}
                </tbody>

                <tfoot>
                  <tr>
                    <td className="hidden-for-medium-only">Remove</td>
                    <td>Product in cart</td>
                    <td className="hidden-for-medium-only">View</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <Link className="backShop" to="/shop">
              shopping now!
            </Link>
            <div className="cart__ck">
              <div className="__ck--wrap">
                <p>cart total : {formatter.format(totalCart())}</p>
                <p>Shoping & taxex caculated at checkout</p>
                <Link to="/checkout" className="cart__ck--send">
                  check out
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h1 className="yourcart">EMPTY</h1>

            <h1 className="yourcart">
              <Link className="backShop" to="/shop">
                shopping now!
              </Link>
            </h1>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Cart;
