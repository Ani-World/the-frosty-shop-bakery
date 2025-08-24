const express = require("express");
const router = express.Router();
const { getOrders ,placeOrder} = require("../controllers/orderController");

router.route("/").get(getOrders).post(placeOrder);

module.exports = router;