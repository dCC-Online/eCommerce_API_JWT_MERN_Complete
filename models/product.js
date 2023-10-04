const { Schema, model } = require("mongoose");
const Joi = require("joi");

const productSchema = new Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 50 },
  description: { type: String, required: true, minlength: 5, maxlength: 250 },
  price: { type: Number, required: true, min: 0 },
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
