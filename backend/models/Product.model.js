const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const ProductSchema = new Schema({
    name: { type: String, required: true },
    category: Schema.Types.ObjectId,
    description: { type: String, default: "not available!!!" },
    available: { type: Number, default: 10 },
    productImg: { type: String },
    price: { type: Number },
    rating: { type: Number, default: 5 },
}, { timestamps: true });

const Products = mongoose.model("products", ProductSchema);
module.exports = Products;