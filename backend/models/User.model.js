const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  address: { type: String, default: "" },
  phone: { type: String, default: "" },
  country: { type: String, default: "" },
  company: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  role: {
    type: Number,
    default: 0,
  },
  cartItems: [
    {
      productId: Schema.Types.ObjectId,
      name: { type: String },
      productImg: { type: String },
      price: { type: Number },
      quantity: { type: Number, default: 1 },
    },
  ],
});
const Users = mongoose.model("Users", userSchema);

module.exports = Users;
