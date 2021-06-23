import React, { useState } from "react";
import "./Control.css";
import { useSelector, useDispatch } from "react-redux";
import { Url } from "../../components/UrlServer";
import { deleteProductById } from "../../redux/actions/productActions";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { updateProductById } from "../../redux/actions/productActions";

function Products() {
  const [showDetails, setShowDetails] = useState(false);
  const [pr, setPr] = useState(null);
  const [productImg, setProductImg] = useState({});
  const [dataProduct, setDataProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    available: "",
    category: "",
    createdAt: "",
  });
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);

  //edit panigation for product panel
  const [page, setPage] = useState({
    currentPage: Number(1),
    productPerPage: 6,
  });
  const { currentPage, productPerPage } = page;
  const indexOfLastPr = currentPage * productPerPage; // 10
  const indexOfFirstPr = indexOfLastPr - productPerPage; // 0
  const currentProducts = products.slice(indexOfFirstPr, indexOfLastPr);

  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(products.length / productPerPage); i++) {
    pageNumber.push(i);
  }
  const choosePage = (e) => {
    setPage({ ...page, currentPage: Number(e.target.id) });
  };
  //edit panigation for product panel close
  const handleDeleteProduct = (id) => {
    const accept = window.confirm("Are you sure?");
    if (accept) {
      console.log("delete now");
      dispatch(deleteProductById(id));
    } else {
      console.log("Please dont");
    }
  };
  const MultiShow = (id) => {
    setShowDetails(!showDetails);
    setEditProduct(id);
  };
  const setEditProduct = (id) => {
    const getSingleProduct = products.find((prod) => prod._id === id);
    setPr(getSingleProduct);
    setDataProduct({
      id: getSingleProduct._id,
      name: getSingleProduct.name,
      description: getSingleProduct.description,
      price: getSingleProduct.price,
      available: getSingleProduct.available,
      category: getSingleProduct.category,
      createdAt: getSingleProduct.createdAt,
    });
  };
  //HANDLE UPDATE PRODUCT
  const handleProductImg = (e) => {
    setProductImg(e.target.files[0]);
  };
  //HANDLE UPDATE PRODUCT
  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("id", dataProduct.id);
    form.append("name", dataProduct.name);
    form.append("description", dataProduct.description);
    form.append("category", dataProduct.category);
    form.append("available", dataProduct.available);
    form.append("price", dataProduct.price);
    form.append("productImg", productImg);

    console.log({ dataProduct, productImg });
    dispatch(updateProductById(form));
    setProductImg({});
  };
  return (
    <div className="panel-prs">
      <h1 className="panel-title">Products</h1>
      <table className="tb-prds">
        <thead>
          <tr className="banner-fixed">
            <td>ID</td>
            <td>Image</td>
            <td>Name</td>
            <td>Available</td>
            <td>Price</td>
            <td>Category</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {currentProducts
            ? currentProducts.map((product) => {
                return (
                  <tr key={product._id}>
                    <td>{product ? product._id.substring(17, 26) : ""}</td>
                    <td>
                      <img
                        width="100px"
                        height="100px"
                        src={`${Url}/${product.productImg}`}
                        alt={`${Url}/${product.productImg}`}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.available}</td>
                    <td>{product.price}</td>
                    <td>
                      {product.cate ? product.cate.cateName : "not found"}
                    </td>
                    <td className="prd-control">
                      <button
                        className="prd-edit"
                        onClick={() => MultiShow(product._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="prd-delete"
                        onClick={() => handleDeleteProduct(product._id)}
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
            <td>Image</td>
            <td>Name</td>
            <td>Available</td>
            <td>Price</td>
            <td>Category</td>
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
            Product #{dataProduct.id.substring(17, 26)}
            <AiOutlineCloseSquare
              className="close-modal"
              onClick={() => setShowDetails(!showDetails)}
            />
          </div>
          <div className="order-date">
            <p className="order-status">
              Created:{" "}
              {pr
                ? `${
                    new Date(pr.createdAt).getDate() < 10
                      ? "0" + new Date(pr.createdAt).getDate()
                      : new Date(pr.createdAt).getDate()
                  } / ${
                    new Date(pr.createdAt).getMonth() + 1 < 10
                      ? "0" + (new Date(pr.createdAt).getMonth() + 1)
                      : new Date(pr.createdAt).getMonth() + 1
                  } / ${new Date(pr.createdAt).getFullYear()} at
                    ${new Date(pr.createdAt).getHours()}: ${new Date(
                    pr.createdAt
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
                value={dataProduct.name}
                onChange={(e) =>
                  setDataProduct({ ...dataProduct, name: e.target.value })
                }
              />
            </div>
            <div className="inpt-wrap">
              <span>Price </span>
              <input
                type="number"
                min="1"
                max="100000"
                name="price"
                value={dataProduct.price}
                onChange={(e) =>
                  setDataProduct({ ...dataProduct, price: e.target.value })
                }
              />
            </div>
            <div className="inpt-wrap">
              <span>Available Product</span>
              <input
                type="number"
                min="1"
                max="100000"
                name="available"
                value={dataProduct.available}
                onChange={(e) =>
                  setDataProduct({ ...dataProduct, available: e.target.value })
                }
              />
            </div>
            <div className="inpt-wrap">
              <span>Categories</span>
              <select
                name="category"
                value={dataProduct.category}
                onChange={(e) =>
                  setDataProduct({ ...dataProduct, category: e.target.value })
                }
              >
                <option>--select--</option>
                {categories.map((category) => {
                  return (
                    <option key={category._id} value={category._id}>
                      {category.cateName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="inpt-wrap">
              <span>Decription Product</span>
              <textarea
                name="description"
                value={dataProduct.description}
                onChange={(e) =>
                  setDataProduct({
                    ...dataProduct,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="inpt-wrap">
              <span>Image Product(Default if you do not change here)</span>
              <input
                type="file"
                name="productImg"
                onChange={handleProductImg}
              />
            </div>
            <input type="submit" name="sub" value="update product" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Products;
