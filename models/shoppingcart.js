const { Schema, model } = require("mongoose");
const Joi = require("joi");

const shoppingCartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product" },
});

const ShoppingCart = model("ShoppingCart", shoppingCartSchema);

const validateShoppingCart = (data) => {
  const schema = Joi.object({
    user: Joi.string().required(),
    product: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports = {
  ShoppingCart,
  validateShoppingCart,
};
