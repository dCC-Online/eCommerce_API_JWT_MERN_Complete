const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { validateProduct } = require("../models/product");

router.get("/", async (req, res) => {
  try {
    let products = await getAllProducts();
    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send(`Internal Server Error ${error}`);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let product = await getSingleProduct(req.params.id);
    return res.status(200).send(product);
  } catch (error) {
    return res.status(500).send(`Internal Server Error ${error}`);
  }
});

router.post("/", async (req, res) => {
  try {
    let { error } = validateProduct(req.body);
    if (error) return res.status(404).send("Invalid body for post request!");
    let product = await createProduct(req.body);
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send(`Internal Server Error ${error}`);
  }
});

router.put("/:id", async (req, res) => {
  try {
    let { error } = validateProduct(req.body);
    if (error) return res.status(404).send("Invalid body for post request!");
    let product = await updateProduct(req.params.id, req.body);
    return res.status(200).send(product);
  } catch (error) {
    return res.status(500).send(`Internal Server Error ${error}`);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await deleteProduct(req.params.id);
    return res
      .status(204)
      .json({ message: `Product with id of ${req.params.id} deleted!` });
  } catch (error) {
    return res.status(500).send(`Internal Server Error ${error}`);
  }
});

module.exports = router;
