const Post = require("../models/Post.model");

const getAllPost = async(req, res) => {
    await Post.find()
        .then((post) => res.json(post))
        .catch((err) => res.status(400).json(err));
};

const getPostById = async(req, res) => {
    await Post.findById(req.params.id)
        .then((post) => res.json(post))
        .catch((err) => res.status(400).json(err));
};

const deletePostById = async(req, res) => {
    await Post.findByIdAndDelete(req.params.id)
        .then(() => res.json("post deleted!!"))
        .catch((err) => res.status(400).json(err));
};