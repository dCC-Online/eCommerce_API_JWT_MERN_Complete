const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");
const {
  validateShoppingCart,
  ShoppingCart,
} = require("../models/shoppingcart");

router.post("/", auth, async (req, res) => {
  try {
    let user = req.user._id;
    req.body.user = user;
    let { error } = validateShoppingCart(req.body);
    if (error) return res.status(404).send("Invalid body for post request!");
    let shoppingCart = new ShoppingCart(req.body);
    shoppingCart.save();
    return res.status(201).send(shoppingCart);
  } catch (error) {
    return res.status(500).send(`Internal Server Error ${error}`);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    let userId = req.user._id;
    let cartItems = await ShoppingCart.find({ user: userId }).populate("product");
    return res.status(200).send(cartItems);
  } catch (er) {
    console.log(er);
    return res.status(500).send(er);
  }
});

module.exports = router;
