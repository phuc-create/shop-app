const jwt = require("jsonwebtoken");

const middlewareLogin = (req, res, next) => {
  try {
    const athHeader = req.headers["authorization"];
    const token = athHeader && athHeader.split(" ")[1];
    if (token == null) return res.status(401).json("please Login to continue");
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, id) => {
      console.log(err);
      if (err) {
        return res.status(403).json(err);
      }
      req.id = id;
      next();
    });
  } catch (err) {
    return res.status(400).json({ err });
  }
};
module.exports = middlewareLogin;
