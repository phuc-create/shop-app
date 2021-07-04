const router = require("express").Router();
const middlewareLogin = require("../middleware/athMiddleware");
const Orders = require("../models/Order.model");
const Users = require("../models/User.model");

router.route("/checkout").post(middlewareLogin, async (req, res) => {
  try {
    const prepareOrder = req.body;
    const {
      userId,
      address,
      phone,
      company,
      country,
      email,
      orderDetails,
      payment_option,
      totalPrice,
      username,
    } = prepareOrder;
    const newOrder = new Orders({
      user: userId,
      username: username,
      address: address,
      email: email,
      phone: phone,
      country: country,
      company: company,
      status: "new",
      totalOrder: totalPrice,
      orderDetails: orderDetails,
      payment_option: payment_option,
    });
    await newOrder.save();
    await Users.findByIdAndUpdate(
      {
        _id: userId,
      },
      {
        $set: {
          username: username,
          address: address,
          phone: phone,
          country: country,
          company: company,
        },
        $pull: {
          cartItems: { $exists: true },
        },
      }
    ).exec((err, user) => {
      if (err)
        return res
          .status(400)
          .json({ success: false, message: err, text: "somthing happen 50" });
      if (user)
        return res.status(202).json({
          success: true,
          user,
          txt: "Payment processing and completely",
        });
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
      text: "somthing happen 59",
    });
  }
});
//GET ORDER BY ID OF USER
router.route("/orders").get(middlewareLogin, async (req, res) => {
  //const userId = req.id.id;
  try {
    await Orders.find(
      //[
      // { $match: { _id: req.id.id } },
      // {
      //   $lookup: {
      //     from: "orders",
      //     localField: "_id",
      //     foreignField: "user",
      //     as: "ordersUser",
      //   },
      // },
      // { $unwind: "$orders" },
      // {
      //   $lookup: {
      //     from: "orders",
      //     pipeline: [{ $match: { user: req.id.id } }],
      //     as: "ordersUser",
      //   },
      // },
      //]
      { user: req.id.id }
    ).then((userOrders) => res.json({ success: true, userOrders }));
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});
//GET ALL ORDERS
router.route("/get-all-orders").get(async (req, res) => {
  try {
    await Orders.find().then((orders) =>
      res.status(200).json({ success: true, orders })
    );
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});
//GET ALL ORDERS
router.route("/delete-order/:id").delete(async (req, res) => {
  try {
    await Orders.findByIdAndDelete({ _id: req.params.id });
    await Orders.find().then((orders) => res.json({ message: true, orders }));
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});
//UPDATE STATUS OF ORDER
router.route("/update-status").post(middlewareLogin, async (req, res) => {
  const { id, status } = req.body;
  await Orders.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        status: status,
      },
    },
    { new: true }
  );
  await Orders.find().then((orders) => res.json({ message: true, orders }));
});

module.exports = router;
