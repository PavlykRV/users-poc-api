const Joi = require('joi');

const userSchema = Joi.object({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
});

function validateUser(data) {
  return userSchema.validate(data);
}

module.exports = validateUser;
