const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Please add product name"],
    },
    quantity: {
        type: Number,
        required: [true, "Please quantity stock "]
    },
    amount: {
        type: Number,
        required: true,
    }
    

});

module.exports = mongoose.model("Order", orderSchema);