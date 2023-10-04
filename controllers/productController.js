const { Product } = require("../models/product");

exports.getAllProducts = async () => {
  try {
    let products = await Product.find();
    return products;
  } catch (error) {
    console.error(error);
  }
};

exports.getSingleProduct = async (id) => {
  try {
    let product = await Product.findById(id);
    return product;
  } catch (error) {
    console.log(error);
  }
};

exports.createProduct = async (body) => {
  try {
    let product = new Product(body);
    await product.save();
    return product;
  } catch (error) {
    console.log(error);
  }
};

exports.updateProduct = async (id, body) => {
  try {
    let productToUpdate = await Product.findByIdAndUpdate(id, body, {
      new: true,
    });
    await productToUpdate.save();
    return productToUpdate;
  } catch (error) {
    console.log(error);
  }
};

exports.deleteProduct = async (id) => {
  try {
    let product = await Product.findByIdAndRemove(id);
    return product;
  } catch (error) {
    console.log(error);
  }
};
