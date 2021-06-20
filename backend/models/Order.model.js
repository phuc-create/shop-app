const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const orderSchema = new Schema(
  {
    user: Schema.Types.ObjectId,
    username: { type: String, default: "" },
    address: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    country: { type: String, default: "" },
    company: { type: String, default: "" },
    status: { type: String, default: "new" },
    totalOrder: { type: Number, required: true },
    orderDetails: { type: Array },
    payment_option: { type: String, default: "cash" },
  },
  {
    timestamps: true,
  }
);
const Orders = mongoose.model("Orders", orderSchema);
module.exports = Orders;
