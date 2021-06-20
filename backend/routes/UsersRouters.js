require("dotenv").config();
const router = require("express").Router();
const Users = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const middlewareLogin = require("../middleware/athMiddleware");

//create accesstoken and refreshtoken
const createAccessToken = (user) =>
  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
const createRefreshToken = (user) =>
  jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
//register account
router.route("/register").post(async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const emailCheck = await Users.findOne({ email });
    // if (!username || !password || !email)
    //   return res.status(400).json({
    //     success: false,
    //     message: "username,email and password is required!",
    //   });
    if (password.length < 6)
      return res.status(400).json({
        success: false,
        message: "At least 8 characters for password",
      });
    if (emailCheck)
      return res
        .status(400)
        .json({ success: false, message: "Email already taken!" });

    const newPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({
      username,
      email,
      password: newPassword,
    });
    await newUser.save();
    const accessToken = createAccessToken({ id: newUser._id });
    const refreshToken = createRefreshToken({ id: newUser._id });

    return res.json({
      success: true,
      message: "register successfully!",
      accessToken: accessToken,
      email,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err });
  }
});
//refresh Token
router.route("/refresh_token").get((req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token)
      return res
        .status(400)
        .json({ message: "Please Login or register to get token" });
    jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({ message: err });
      const accessToken = createAccessToken({ id: user.id });
      res.json({ success: true, user, accessToken });
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
});
//login account
router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email === "" || password === "") {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }
    const checkEmail = await Users.findOne({ email: email });
    if (!checkEmail) {
      return res.status(400).json({
        success: false,
        message: "Your email or password does not match",
      });
    }
    const match = await bcrypt.compare(password, checkEmail.password);
    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Your email or password does not match",
      });
    }

    const accessToken = createAccessToken({ id: checkEmail._id });
    const refreshToken = createRefreshToken({ id: checkEmail._id });
    return res.status(200).json({ success: true, accessToken, refreshToken });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

router.route("/infor").get(middlewareLogin, async (req, res) => {
  try {
    console.log(req.id);
    const user = await Users.findById(req.id.id).select("-password");
    if (!user) return res.status(400).json({ message: "User not found" });
    return res.json({ success: true, user });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});
router.route("/logout").delete(middlewareLogin, (req, res) => {
  try {
    const user = Users.find((user) => user._id === req.id.id);

    //res.clearCookie("refreshtoken", { path: "/ath/refresh_token" });

    return res.json({ message: "Log Out" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

router.route("/add-to-cart").post(middlewareLogin, async (req, res) => {
  //all we want to have is [name,price,quantity,img,]
  const product = req.body;
  const { _id, name, productImg, price } = product;
  Users.findById({ _id: req.id.id }).exec((err, user) => {
    if (err)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    if (user) {
      const isProductAdded = user.cartItems.find(
        (pr) => pr.productId == product._id
      );
      if (isProductAdded) {
        // Users.findOneAndUpdate(
        //   { _id: req.id.id, "cartItems.productId": isProductAdded.productId },
        //   {
        //     $set: {
        //       "cartItems.$": {
        //         productId: isProductAdded.productId,
        //         name: isProductAdded.name,
        //         productImg: isProductAdded.productImg,
        //         price: isProductAdded.price,
        //         quantity: isProductAdded.quantity + 1,
        //       },
        //     },
        //   },
        //   { new: true }
        // ).exec((error, cart) => {
        //   if (error)
        //     return res
        //       .status(400)
        //       .json({ success: false, message: error.message });
        //   if (cart)
        //     return res.status(200).json({ success: true, message: cart });
        // });
        return res.status(400).json({
          success: true,
          message: user,
          text: "Product Added To Cart!",
        });
      } else {
        Users.findByIdAndUpdate(
          { _id: req.id.id },
          {
            $push: {
              cartItems: {
                productId: product._id,
                name: name,
                productImg: productImg,
                price: price,
              },
            },
          },
          { new: true }
        ).exec((error, cart) => {
          if (error)
            return res
              .status(400)
              .json({ success: false, message: error.message });
          if (cart)
            return res.status(200).json({ success: true, message: cart });
        });
      }
    }
  });
});
router.route("/cart-delete").get(middlewareLogin, (req, res) => {
  const idPr = req.query.id;

  Users.findByIdAndUpdate(
    { _id: req.id.id },
    {
      $pull: {
        cartItems: { productId: idPr },
      },
    },
    { new: true },
    (err, cart) => {
      if (err)
        return res.status(400).json({ success: false, message: err.message });
      if (cart) return res.status(200).json({ success: true, message: cart });
    }
  );
});
router.route("/update-qty").get(middlewareLogin, (req, res) => {
  const id = req.query.id;
  const type = req.query.type;
  if (type == "inc") {
    Users.findOneAndUpdate(
      { _id: req.id.id, "cartItems.productId": id },
      {
        $set: {
          "cartItems.$.quantity": {
            quantity: quantity + 1,
          },
        },
      },
      { new: true }
    ).exec((err, cart) => {
      if (cart)
        return res.status(200).json({
          success: true,
          message: cart,
          text: "10 is maximum",
        });
    });
  } else {
    Users.findOneAndUpdate(
      { _id: req.id.id, "cartItems.productId": id },
      {
        $set: {
          "cartItems.$.quantity": {
            quantity: product.quantity - 1,
          },
        },
      },
      { new: true }
    ).exec((err, cart) => {
      if (cart)
        return res
          .status(200)
          .json({ success: true, message: cart, text: "1 is minimum" });
    });
  }
});
router.route("/update").get(middlewareLogin, (req, res) => {
  const id = req.query.id;
  const type = req.query.type;
  try {
    Users.findById({ _id: req.id.id }).exec((err, user) => {
      if (user) {
        const product = user.cartItems.find((pr) => pr.productId == id);

        if (product && type == "inc") {
          if (product.quantity == 10)
            return res.status(400).json({
              success: false,
              message: user,
              text: "between 1 to 10",
            });
          Users.findOneAndUpdate(
            { _id: req.id.id, "cartItems.productId": product.productId },
            {
              $set: {
                "cartItems.$": {
                  productId: product.productId,
                  name: product.name,
                  productImg: product.productImg,
                  price: product.price,
                  quantity: product.quantity + 1,
                },
              },
            },
            { new: true }
          ).exec((err, cart) => {
            if (err)
              return res
                .status(400)
                .json({ success: false, message: user, err: err });
            if (cart)
              return res.status(200).json({
                success: true,
                message: cart,
                text: "10 is maximum",
              });
          });
        } else {
          if (product.quantity == 1)
            return res.status(400).json({
              success: false,
              message: user,
              text: "between 1 to 10",
            });
          Users.findOneAndUpdate(
            { _id: req.id.id, "cartItems.productId": product.productId },
            {
              $set: {
                "cartItems.$": {
                  productId: product.productId,
                  name: product.name,
                  productImg: product.productImg,
                  price: product.price,
                  quantity: product.quantity - 1,
                },
              },
            },
            { new: true }
          ).exec((err, cart) => {
            if (err)
              return res
                .status(400)
                .json({ success: false, message: user, err: err });
            if (cart)
              return res
                .status(200)
                .json({ success: true, message: cart, text: "1 is minimum" });
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
