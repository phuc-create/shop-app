import React, { useState } from "react";
import { Url } from "../../components/UrlServer";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";

const CartItem = ({ item, handleRemoveProduct, decreaseQty, increaseQty }) => {
  const [qty, setQty] = useState(item.quantity);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  const decQty = () => {
    qty === 1 ? setQty(1) : setQty(qty - 1);
    decreaseQty(item.productId, "dec");
  };
  const incQty = () => {
    qty === 10 ? setQty(10) : setQty(qty + 1);
    increaseQty(item.productId, "inc");
  };
  return (
    <tr key={item._id}>
      <td className="cart__v1 trash">
        <BsTrash
          className="trash-control"
          onClick={() => handleRemoveProduct(item.productId)}
        />
      </td>
      <td className="cart__v2">
        <div className="img-wraper">
          <img src={`${Url}/${item.productImg}`} alt={item.productImg} />
        </div>
        <p>
          <span className="v2--show-mobile">Pr-Name: </span>
          {item.name}
        </p>
      </td>
      <td className="cart__v3">
        <div className="v3--single price">
          <span className="v3-mobile">Price:</span>
          <div>{formatter.format(item.price)}</div>
        </div>
        <div className="v3--single quantity ">
          <span className="v3-mobile">Quantity:</span>
          <div className="qty-set">
            <button
              className="middle-check"
              disabled={qty === 1 ? true : false}
              onClick={decQty}
            >
              <FiMinusCircle className="quantity-control" />
            </button>
            {qty}
            <button
              className="middle-check"
              disabled={qty === 10 ? true : false}
              onClick={incQty}
            >
              <FiPlusCircle className="quantity-control" />
            </button>
          </div>
        </div>
        <div className="v3--single subtotal">
          <span className="v3-mobile">Subtotal:</span>
          <div>{formatter.format(item.price * qty)}</div>
        </div>
      </td>
    </tr>
  );
};

export default CartItem;
