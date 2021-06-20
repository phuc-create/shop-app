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
      <td>
        <BsTrash
          className="trash-control"
          onClick={() => handleRemoveProduct(item.productId)}
        />
      </td>
      <td className="cart__view-both name">
        <div className="img-wraper">
          <img src={`${Url}/${item.productImg}`} alt={item.productImg} />
        </div>
        <p>{item.name}</p>
      </td>
      <td>{formatter.format(item.price)}</td>
      <td className="cart__view-both quantity ">
        <div className="qty-set">
          <button
            className="middle-check"
            disabled={qty === 1 ? true : false}
            onClick={
              decQty
              // () => decreaseQty(item.productId, "dec")
            }
          >
            <FiMinusCircle className="quantity-control" />
          </button>
          {qty}
          <button
            className="middle-check"
            disabled={qty === 10 ? true : false}
            onClick={
              incQty
              //() => increaseQty(item.productId, "inc")
            }
          >
            <FiPlusCircle className="quantity-control" />
          </button>
        </div>
      </td>
      <td>{formatter.format(item.price * qty)}</td>
    </tr>
  );
};

export default CartItem;
