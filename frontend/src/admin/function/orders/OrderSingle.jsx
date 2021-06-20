import React from "react";

const OrderSingle = ({ od, handleDeleteOrder, MultiShow, formatter }) => {
  return (
    <tr>
      <td>{od ? od._id.substring(0, 5) : ""}</td>

      <td>{od.username}</td>
      <td>{od.email}</td>
      <td>{formatter.format(od.totalOrder)}</td>
      <td
        style={{
          color: od.status === "new" ? "#EA2027" : "#009432",
          textTransform: "capitalize",
        }}
      >
        {od.status}
      </td>
      <td className="prd-control">
        <button className="prd-edit" onClick={() => MultiShow(od._id)}>
          Details
        </button>
        <button
          className="prd-delete"
          onClick={() => handleDeleteOrder(od._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default OrderSingle;
