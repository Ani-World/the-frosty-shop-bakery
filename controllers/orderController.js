const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");

const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find().populate("name"); 
    res.status(200).json(orders);
});


const placeOrder = asyncHandler(async (req, res) => {
    const { name, quantity } = req.body;
    // 1. Find product by name
    const formattedName = name.replace(/\s+/g, "").toLowerCase();
    // find product by normalized name
    const product = await Product.findOne({
        name: { $regex: new RegExp("^" + formattedName + "$", "i") }
    });
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    // 2. Check stock
    if (product.stock < quantity) {
        return res.status(400).json({ message: "Not enough stock" });
    }
    // 3. Calculate amount
    const amount = product.price * quantity;
    // 4. Create order
    const order = await Order.create({
        name: product._id,
        quantity,
        amount
    });
    // 5. Update stock
    product.stock -= quantity;
    await product.save();
    res.status(201).json(`${product.name} order placed`);
});

module.exports = {
    getOrders,
    placeOrder
};