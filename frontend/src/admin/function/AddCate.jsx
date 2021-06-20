import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewCategory } from "../../redux/actions/categoryActions";

function AddCate() {
  const dispatch = useDispatch();
  const [cateForm, setCateForm] = useState({
    cateName: "",
    history: "",
  });
  const handleCateSet = (e) => {
    setCateForm({ ...cateForm, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewCategory(cateForm));
  };
  return (
    <form
      method="post"
      action={`/cate`}
      className="add-p"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <div className="inpt-wrap">
        <span>Category Name</span>
        <input
          type="text"
          name="cateName"
          value={cateForm.name}
          onChange={handleCateSet}
        />
      </div>
      <div className="inpt-wrap">
        <span>Category Description</span>
        <textarea
          name="history"
          value={cateForm.description}
          onChange={handleCateSet}
        />
      </div>

      <input type="submit" name="sub" value="add Category" />
    </form>
  );
}

export default AddCate;
