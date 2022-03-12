import Joi from "joi";

const foodDetailsValidation = (obj: object, helpers: Joi.CustomHelpers) => {
  for (const d of Object.values(obj)) {
    if (!d.unit || !d.amount) {
      return helpers.message({
        custom: "Invalid object format: unit && amount keys are required!",
      });
    }
  }
  return obj;
};

const create = Joi.object({
  name: Joi.string().required(),
  details: Joi.object().custom(foodDetailsValidation),
});

export default { create };
