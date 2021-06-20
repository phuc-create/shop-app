import axios from "axios";

const url = "http://localhost:5000";
//PRODUCTS API
export const fetchProducts = () => axios.get(`${url}/products/view-both`);
export const deleteProduct = (id) =>
  axios.delete(`${url}/products/delete-product/${id}`);
export const updateProduct = (form) =>
  axios.post(`${url}/products/update-product`, form);
//CATEGORIES API
export const fetchCategories = () => axios.get(`${url}/cate`);
export const deleteCategory = (id) => axios.delete(`${url}/cate/${id}`);
export const addCategory = (form) => axios.post(`${url}/cate`, form);
//USER API
export const userLogin = (payload) => axios.post(`${url}/ath/login`, payload);
export const userInfor = () => axios.get(`${url}/ath/infor`);
export const userRegister = (payload) =>
  axios.post(`${url}/ath/register`, payload);
export const userLogout = () => axios.delete(`${url}/ath/logout`);
export const userAddToCart = (payload) =>
  axios.post(`${url}/ath/add-to-cart`, payload);
export const userRemoveToCart = (payload) =>
  axios.get(`${url}/ath/cart-delete?id=${payload}`);
export const userUpdateToCart = (id, type) =>
  axios.get(`${url}/ath/update?id=${id}&type=${type}`);
export const userCheckout = (data) => axios.post(`${url}/order/checkout`, data);
//ORDER API
export const userOrders = () => axios.get(`${url}/order/orders`);
export const adminOrders = () => axios.get(`${url}/order/get-all-orders`);
export const adminDeleteOrders = (id) =>
  axios.delete(`${url}/order/delete-order/${id}`);
export const adminUpdateOrders = (status) =>
  axios.post(`${url}/order/update-status`, status);
