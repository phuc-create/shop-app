const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const postSchema = new Schema({
    username: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
}, {
    timestamps: true,
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;