import axios from "axios";
import { Url } from "../components/UrlServer";
//PRODUCTS API
export const fetchProducts = () => axios.get(`${Url}/products/view-both`);
export const deleteProduct = (id) =>
  axios.delete(`${Url}/products/delete-product/${id}`);
export const updateProduct = (form) =>
  axios.post(`${Url}/products/update-product`, form);
//CATEGORIES API
export const fetchCategories = () => axios.get(`${Url}/cate`);
export const deleteCategory = (id) => axios.delete(`${Url}/cate/${id}`);
export const addCategory = (form) => axios.post(`${Url}/cate`, form);
//USER API
export const userLogin = (payload) => axios.post(`${Url}/ath/login`, payload);
export const userInfor = () => axios.get(`${Url}/ath/infor`);
export const userRegister = (payload) =>
  axios.post(`${Url}/ath/register`, payload);
export const userLogout = () => axios.delete(`${Url}/ath/logout`);
export const userAddToCart = (payload) =>
  axios.post(`${Url}/ath/add-to-cart`, payload);
export const userRemoveToCart = (payload) =>
  axios.get(`${Url}/ath/cart-delete?id=${payload}`);
export const userUpdateToCart = (id, type) =>
  axios.get(`${Url}/ath/update?id=${id}&type=${type}`);
export const userCheckout = (data) => axios.post(`${Url}/order/checkout`, data);
//ORDER API
export const userOrders = () => axios.get(`${Url}/order/orders`);
export const adminOrders = () => axios.get(`${Url}/order/get-all-orders`);
export const adminDeleteOrders = (id) =>
  axios.delete(`${Url}/order/delete-order/${id}`);
export const adminUpdateOrders = (status) =>
  axios.post(`${Url}/order/update-status`, status);
