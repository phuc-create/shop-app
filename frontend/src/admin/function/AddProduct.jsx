import axios from "axios";
import React, { useState, Fragment } from "react";
import { Url } from "../../components/UrlServer";
import { useSelector } from "react-redux";
import "./Control.css";

function AddProduct() {
  const [productImg, setProductImg] = useState({});
  const [dataProduct, setDataProduct] = useState({
    name: "",
    description: "",
    price: 0,
    available: 1,
    category: "",
    rating: 5,
  });
  const categories = useSelector((state) => state.categories);
  const handleProductImg = (e) => {
    setProductImg(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(productImg);
    const form = new FormData();
    form.append("name", dataProduct.name);
    form.append("description", dataProduct.description);
    form.append("category", dataProduct.category);
    form.append("available", dataProduct.available);
    form.append("price", dataProduct.price);
    form.append("productImg", productImg);
    console.log(form);
    await axios
      .post(`${Url}/products/addnew`, form)
      .then((res) => console.log(res));
  };

  return (
    <Fragment>
      <form
        method="post"
        action={`/products/addnew`}
        className="add-p"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
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
              setDataProduct({ ...dataProduct, description: e.target.value })
            }
          />
        </div>
        <div className="inpt-wrap">
          <span>Image Product</span>
          <input type="file" name="productImg" onChange={handleProductImg} />
        </div>
        <input type="submit" name="sub" value="add product" />
      </form>
    </Fragment>
  );
}

export default AddProduct;
