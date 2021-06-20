const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const middlewareLogin = require("../middleware/athMiddleware");
//import model of product
const Products = require("../models/Product.model");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});
const upload = multer({ storage: storage });
//import Categories model
const Categories = require("../models/Category.model");
//control router of product

//show products
router.route("/").get(async (req, res) => {
  await Products.find()
    .then((products) => {
      res.json({ success: true, products });
    })
    .catch((err) =>
      res.status(400).json({ success: false, message: "product not found" })
    );
});
//add product
router
  .route("/addnew")
  .post(upload.single("productImg"), async (req, res, next) => {
    console.log(req.file);

    try {
      const { name, category, description, available, price, rating } =
        req.body;
      const newProduct = new Products({
        name,
        category,
        description,
        available,
        productImg: req.file.filename,
        price,
        rating,
      });
      await newProduct.save().then(() =>
        res.json({
          success: true,
          message: "Product added!!!",
        })
      );
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
    next();
  });
//view details by id and i will fix this later
router.route("/details/:id").get(async (req, res) => {
  const productID = req.params.id;

  try {
    await Products.aggregate([
      { $match: { _id: productID } },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "cate",
        },
      },
      { $unwind: "$cate" },
    ]).then((product) => res.json({ success: true, product }));
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});
//view product with cate
router.route("/view-both").get(async (req, res) => {
  try {
    await Products.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "cate",
        },
      },
      { $unwind: "$cate" },
    ]).then((viewProduct) => res.json({ success: true, viewProduct }));
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});
//delete product with id
router
  .route("/delete-product/:id")
  .delete(middlewareLogin, async (req, res) => {
    try {
      const idProduct = req.params.id;
      await Products.findByIdAndDelete({ _id: idProduct });
      await Products.find().then((products) => {
        res.json({ success: true, products });
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  });
router
  .route("/update-product")
  .post(upload.single("productImg"), async (req, res, next) => {
    const dataProduct = req.body;
    const { id, name, price, category, description, available } = dataProduct;
    console.log(id);
    try {
      if (req.file) {
        console.log(req.file.filename);
        await Products.findByIdAndUpdate(
          { _id: id },
          {
            $set: {
              name: name,
              price: price,
              category: category,
              description: description,
              available: available,
              productImg: req.file.filename,
            },
          },
          {
            new: true,
          }
        ).then((products) => {
          console.log(products);
        });
        await Products.aggregate([
          {
            $lookup: {
              from: "categories",
              localField: "category",
              foreignField: "_id",
              as: "cate",
            },
          },
          { $unwind: "$cate" },
        ]).then((products) => res.json({ success: true, products }));
      } else {
        console.log("not found");
        await Products.findByIdAndUpdate(
          { _id: id },
          {
            $set: {
              name: name,
              price: price,
              category: category,
              description: description,
              available: available,
            },
          },
          {
            new: true,
          }
        ).then((products) => {
          console.log(products);
        });
        await Products.aggregate([
          {
            $lookup: {
              from: "categories",
              localField: "category",
              foreignField: "_id",
              as: "cate",
            },
          },
          { $unwind: "$cate" },
        ]).then((products) => res.json({ success: true, products }));
      }
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  });
module.exports = router;
