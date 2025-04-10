const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(0),
    image: Joi.object({
      url: Joi.string().required(),
      filename: Joi.string().allow("", null),
    }).required(),
    category: Joi.string()
      .valid(
        "Trending",
        "Mountains",
        "Lake",
        "Beach",
        "Camping",
        "City",
        "Hotel",
        "Cabin"
      )
      .required(),
    capacity: Joi.number().required().min(1),
    rooms: Joi.number().required().min(1),
    phone: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required(),
    email: Joi.string().email().allow("", null),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});
