const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
    cateName: { type: String, required: true, trim: true },
    history: { type: String, required: true, default: "comming soon" },
}, {
    timestamps: true,
});

const Categories = mongoose.model("Categories", categorySchema);
module.exports = Categories;