const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require:[true,"Please add name"],
    },
    stock: {
        type: Number,
        require:[true,"Please add stock or add 0"]
    },
    price: {
        type: Number,
        require:[true,"Please add price"]
    }
},
{
    versionKey: false  
})

module.exports = mongoose.model("Product", productSchema);