const router = require("express").Router();
//import model of post
let Post = require("../models/Post.model");
//default
router.route("/").get(async(req, res) => {
    await Post.find()
        .then((post) => res.json(post))
        .catch((err) => res.status(400).json(err));
});
//add post
router.route("/add").post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const date = new Date();

    const newPost = new Post({
        username,
        description,
        date,
    });
    newPost
        .save()
        .then(() => res.json("Post added"))
        .catch((err) => res.status(400).json(err));
});
//view post by id and delete post by id
router.route("/:id").get(async(req, res) => {
    await Post.findById(req.params.id)
        .then((post) => res.json(post))
        .catch((err) => res.status(400).json(err));
});
router.route("/:id").delete(async(req, res) => {
    await Post.findByIdAndDelete(req.params.id)
        .then(() => res.json("post deleted!!"))
        .catch((err) => res.status(400).json(err));
});
module.exports = router;