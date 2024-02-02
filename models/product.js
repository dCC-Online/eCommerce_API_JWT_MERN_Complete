const { Schema, model } = require("mongoose");
const Joi = require("joi");

const productSchema = new Schema({
  name: String,
  description: String,
  price: Number,
});

const Product = model("Product", productSchema);

const validateProduct = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
  });

  return schema.validate(data);
};

module.exports = {
  Product,
  validateProduct,
};
