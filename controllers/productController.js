const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
//show all products
//@desc Get all products
//@route GET /api/products
//@access public
const getProducts= asyncHandler(async (req, res) => {
    const product = await Product.find();
    res.status(200).json(product);
});

//show a products
//@desc Get a products
//@route GET /api/products/id
//@access public

const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findOne({ name: req.params.name });
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    res.status(200).json(product);
})
//add new product

//@desc add new product
//@route POST /api/products
//@access public
const addProduct = asyncHandler(async (req, res) => {
    console.log("The body is",req.body);
    const { name , stock ,price} = req.body;
    if (!name || !stock ||!price) {
        res.status(400);
        throw new Error("All fields mandatory");
    }
    const product = await Product.create({
        name,
        stock,
        price
    })
    res.status(201).json(product);
});

const updateStock = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    const updatedStock = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedStock); 
});

const deleteProduct=asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedProduct);
});

module.exports = {
    getProducts,
    getProduct,
    addProduct,
    deleteProduct,
    updateStock
};