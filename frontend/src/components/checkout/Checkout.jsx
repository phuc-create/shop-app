import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import { Url } from "../../components/UrlServer";
import "./Checkout.css";
import { checkCheckoutUser } from "../../redux/actions/orderActions";
import Loading from "../layouts/Loading";

const Checkout = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cartItems = user.user.cartItems;

  const [countries, setCountries] = useState([]);
  const [expand, setExpand] = useState({
    cash: false,
    bank: false,
  });

  const totalCart = () => {
    let totalPrice = 12.99;
    cartItems.forEach((item) => (totalPrice += item.price * item.quantity));
    return totalPrice;
  };

  const [prepareOrder, setPrepareOrder] = useState({
    userId: user.user._id,
    username: user.user.username,
    email: user.user.email,
    phone: user.user.phone,
    company: user.user.company,
    country: "",
    address: user.user.address,
    payment_option: "cash",
    totalPrice: totalCart(),
    orderDetails: cartItems,
  });

  const { username, email, phone, company, country, address } = prepareOrder;
  ////////////////////////////
  const handleSetInfor = (e) => {
    setPrepareOrder({ ...prepareOrder, [e.target.name]: e.target.value });
  };
  ////////////////////////////
  const url = "https://restcountries.eu/rest/v2/region/asia";
  useEffect(() => {
    const fetchCountries = async () => {
      await fetch(url)
        .then((res) => res.json())
        .then((data) => setCountries(data));
    };

    fetchCountries();
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();
    const regEx = "/^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/im";
    if (phone.match(regEx)) {
      toast.error("phone number not valid!!!");
      return;
    } else if (phone.length > 12) {
      toast.error("phone number must contain maximum 10 numbers");
      return;
    } else if (phone.length < 9) {
      toast.error("phone number must contain at least 10 numbers");
      return;
    }
    console.log(prepareOrder);
    dispatch(checkCheckoutUser(prepareOrder));
  };
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  if (user.txt) {
    toast.success(user.txt);
  }
  return (
    <div className="main">
      {user.isLoading ? <Loading /> : <div></div>}
      <Header />
      <ToastContainer />
      <div className="checkout">
        <form className="ck__left" onSubmit={handlesubmit}>
          <div className="ck-form-wrap">
            <h1>payment details</h1>
            <p>complete your purchase by providing your peyment details</p>

            <div className="input__wrap">
              <div className="fm__input">
                <span className="title-input">Your name</span>
                <input
                  type="text"
                  name="username"
                  required
                  placeholder="Your full name"
                  value={username}
                  onChange={handleSetInfor}
                />
              </div>
              <div className="fm__input">
                <span className="title-input">Your email</span>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your email"
                  value={email}
                  onChange={handleSetInfor}
                />
              </div>
            </div>
            <div className="input__wrap">
              <div className="fm__input">
                <span className="title-input">Phone</span>
                <input
                  type="number"
                  name="phone"
                  required
                  placeholder="Your phone number"
                  value={phone}
                  onChange={handleSetInfor}
                />
              </div>
              <div className="fm__input">
                <span className="title-input">Company(optional)</span>
                <input
                  type="text"
                  name="company"
                  placeholder="Your phone number"
                  value={company}
                  onChange={handleSetInfor}
                />
              </div>
            </div>
            <div className="fm__input select">
              <span className="title-input">Select Your Country</span>
              <select
                name="country"
                value={country}
                onChange={handleSetInfor}
                required
              >
                <option value="none">--Select your country--</option>
                {countries.map((country) => {
                  return (
                    <option
                      key={country.alpha3Code}
                      value={`${country.name} - ${country.region} - ${country.subregion}`}
                    >
                      {`${country.name} - ${country.region} - ${country.subregion}`}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="fm__input textarea">
              <span className="title-input">Your address</span>
              <textarea
                name="address"
                required
                value={address}
                onChange={handleSetInfor}
              ></textarea>
            </div>
            <div className="ck-option">
              <div className={expand.cash ? "option expand" : "option"}>
                <label
                  className="op-check"
                  onClick={() => setExpand({ cash: true, bank: false })}
                >
                  <input
                    type="radio"
                    name="payment_option"
                    required
                    defaultChecked
                    value="cash"
                    onChange={handleSetInfor}
                  />
                  <div className="radio"></div>
                  <span>By Cash (default)</span>
                </label>
                <div className="bx-content">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Veritatis vel perspiciatis voluptates corrupti atque? Quas
                  perspiciatis repellat, id vero facilis mollitia, officiis
                  autem neque maxime veniam quod sequi, aperiam explicabo.
                </div>
              </div>
              <div className={expand.bank ? "option expand" : "option"}>
                <label
                  className="op-check"
                  onClick={() => setExpand({ cash: false, bank: true })}
                >
                  <input
                    type="radio"
                    name="payment_option"
                    required
                    value="bank"
                    onChange={handleSetInfor}
                  />
                  <div className="radio"></div>
                  <span>Pay By Bank Card</span>
                </label>
                <div className="bx-content">
                  <h1 style={{ color: "#e74c3c" }}>Comming soon</h1>
                  (Not available - default :payment on delivery for any order)
                </div>
              </div>
              <div className="check-submit">
                <input
                  className="submit-handle"
                  type="submit"
                  name="payment"
                  value="Checkout"
                />
              </div>
            </div>
          </div>
        </form>
        <div className="ck__right">
          <h1>Shopping cart</h1>
          <span>check again and make sure about product in your purchase!</span>
          <div className="cart">
            {cartItems.map((item) => {
              return (
                <div className="cart-single" key={item.productId}>
                  <div className="cart--infor-left">
                    <div className="img--cart">
                      <img
                        src={`${Url}/${item.productImg}`}
                        alt={item.productImg}
                      />
                    </div>
                    <div className="infor--cart">
                      <div className="name-pr">{item.name}</div>
                      <div className="qty-pr">
                        x{item.quantity} * {formatter.format(item.price)}
                      </div>
                      <div className="sub-pr-show-mobile">
                        {formatter.format(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                  <div className="cart-price">
                    <span className="line-thr">Total:</span>
                    <span className="line-hidden">
                      {formatter.format(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="order-step">
            <div className="total">
              Total Cart:<span>{formatter.format(totalCart() - 12.99)}</span>
            </div>
            <div className="total show-ship">
              Shipping: <span>$12.99</span>
            </div>
            <div className="total show-total">
              Total: <span>{formatter.format(totalCart())}</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
