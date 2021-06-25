import React, { useState } from "react";
import "../Control.css";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { deleteCategoryById } from "../../../redux/actions/categoryActions";

function Categories() {
  const [showDetails, setShowDetails] = useState(false);
  const [dataCate, setDataCate] = useState({
    id: "",
    cateName: "",
    history: "",
    createdAt: "",
  });
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  //edit panigation for product panel
  const [page, setPage] = useState({
    currentPage: Number(1),
    productPerPage: 4,
  });
  const { currentPage, productPerPage } = page;
  const indexOfLastPr = currentPage * productPerPage; // 10
  const indexOfFirstPr = indexOfLastPr - productPerPage; // 0
  const currentCates = categories.slice(indexOfFirstPr, indexOfLastPr);

  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(categories.length / productPerPage); i++) {
    pageNumber.push(i);
  }
  const choosePage = (e) => {
    setPage({ ...page, currentPage: Number(e.target.id) });
  };
  //edit panigation for product panel close
  const handleDeleteCate = (id) => {
    const accept = window.confirm("Are you sure?");
    if (accept) {
      console.log("delete now");
      dispatch(deleteCategoryById(id));
    } else {
      console.log("Please dont");
    }
  };

  const MultiShow = (id) => {
    setShowDetails(!showDetails);
    setEditCate(id);
  };
  const setEditCate = (id) => {
    const getSingleCate = categories.find((c) => c._id === id);

    setDataCate({
      id: getSingleCate._id,
      cateName: getSingleCate.cateName,
      history: getSingleCate.history,
      createdAt: getSingleCate.createdAt,
    });
  };

  //HANDLE UPDATE PRODUCT
  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("id", dataCate.id);
    form.append("name", dataCate.cateName);
    form.append("description", dataCate.history);
    console.log({ dataCate });
  };
  return (
    <div className="panel-prs">
      <h1 className="panel-title">Products</h1>
      <table className="tb-prds">
        <thead>
          <tr className="banner-fixed">
            <td>ID</td>
            <td>Name</td>
            <td>History</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {currentCates
            ? currentCates.map((c) => {
                return (
                  <tr key={c._id}>
                    <td>{c ? c._id.substring(17, 26) : ""}</td>

                    <td>{c.cateName}</td>
                    <td>{c ? c.history.substring(0, 30) + "..." : ""}</td>

                    <td className="prd-control">
                      <button
                        className="prd-edit"
                        onClick={() => MultiShow(c._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="prd-delete"
                        onClick={() => handleDeleteCate(c._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            : "products not found"}
          <tr>
            <td>ID</td>

            <td>Name</td>

            <td>History</td>
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
            Product #{dataCate.id.substring(17, 26)}
            <AiOutlineCloseSquare
              className="close-modal"
              onClick={() => setShowDetails(!showDetails)}
            />
          </div>
          <div className="order-date">
            <p className="order-status">
              Created:{" "}
              {dataCate
                ? `${
                    new Date(dataCate.createdAt).getDate() < 10
                      ? "0" + new Date(dataCate.createdAt).getDate()
                      : new Date(dataCate.createdAt).getDate()
                  } / ${
                    new Date(dataCate.createdAt).getMonth() + 1 < 10
                      ? "0" + (new Date(dataCate.createdAt).getMonth() + 1)
                      : new Date(dataCate.createdAt).getMonth() + 1
                  } / ${new Date(dataCate.createdAt).getFullYear()} at
                    ${new Date(dataCate.createdAt).getHours()}: ${new Date(
                    dataCate.createdAt
                  ).getMinutes()}`
                : ""}
            </p>
          </div>
          <form
            method="post"
            action={`/products/update-product`}
            className="add-p"
            encType="multipart/form-data"
            onSubmit={handleUpdateProduct}
          >
            <div className="inpt-wrap">
              <span>Name Product</span>
              <input
                type="text"
                name="name"
                value={dataCate.cateName}
                onChange={(e) =>
                  setDataCate({ ...dataCate, cateName: e.target.value })
                }
              />
            </div>

            <div className="inpt-wrap">
              <span>Decription Product</span>
              <textarea
                name="history"
                value={dataCate.history}
                onChange={(e) =>
                  setDataCate({
                    ...dataCate,
                    history: e.target.value,
                  })
                }
              />
            </div>

            <input type="submit" name="sub" value="update category" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Categories;
