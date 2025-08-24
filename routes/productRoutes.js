const express = require("express");
const router = express.Router();
const { getProducts,getProduct,addProduct,updateStock,deleteProduct } = require("../controllers/productController");

router.route("/").get(getProducts).post(addProduct);
router.route("/:name").get(getProduct).put(updateStock).delete(deleteProduct);


module.exports = router;