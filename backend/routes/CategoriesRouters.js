const router = require("express").Router();
const Categories = require("../models/Category.model");

router.route("/").post(async (req, res) => {
  try {
    const { cateName, history } = req.body;
    const newCate = new Categories({
      cateName,
      history,
    });
    await newCate.save();
    await Categories.find().then((categories) =>
      res.json({ success: true, categories })
    );
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});
router.route("/").get(async (req, res) => {
  try {
    await Categories.find().then((categories) =>
      res.json({ success: true, categories })
    );
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});
router.route("/:id").delete(async (req, res) => {
  try {
    const id = req.params.id;

    await Categories.findByIdAndDelete({ _id: id });
    await Categories.find().then((cates) => {
      return res.status(200).json({ success: true, cates });
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});
module.exports = router;
