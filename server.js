const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");
const port = 5000 ;
connectDb();
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

app.use("/api/product", require("./routes/productRoutes"));
app.use("/api/order", require("./routes/orderRoutes"));


app.listen(port, () => {
    console.log("Server running on ", port);
});