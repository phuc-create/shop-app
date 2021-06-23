//BASIC SETUP
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
app.use(express.json());

//CONNECT DATABASE FROM FILE
const connectDB = require("./config/db");
connectDB();

//SET UP PORT
const PORT = process.env.PORT || 5100;

//TEST

app.use(express.static(path.join(__dirname, "uploads")));
//PROCESS OF POST ROUTER
const postsRouters = require("./routes/PostsRouters");
app.use("/posts", postsRouters);

//PROCESS OF USER ROUTER
const usersRouters = require("./routes/UsersRouters");
app.use("/ath", usersRouters);
//PROCESS OF ORDER ROUTER
const ordersRouters = require("./routes/OrdersRouters");
app.use("/order", ordersRouters);

//PROCESS OF PRODUCT ROUTER
const productsRouters = require("./routes/ProductsRoutes");
app.use("/products", productsRouters);
//PROCESS OF CATEGORIES ROUTER
const categoriesRouters = require("./routes/CategoriesRouters");
app.use("/cate", categoriesRouters);
//CHECK CONNECT FROM LOCALHOST
app.listen(PORT, (req, res) => {
  console.log(`server listening at port ${PORT}`);
});
