require("dotenv").config();
const express = require("express");
const app = express();

const product = require("./routes/product");
const shoppingcart = require("./routes/shoppingcart")
const auth = require("./routes/auth")


const connectDb = require("./db/db");

const cors = require('cors');

connectDb();
app.use(cors());
app.use(express.json());
app.use("/api/products", product);
app.use("/api/shoppingcarts", shoppingcart);
app.use("/api/auth", auth);


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
