import Joi from "joi";

const foodDetailsValidation = (obj: object, helpers: Joi.CustomHelpers) => {
  if (Array.isArray(obj) || Object.keys(obj).length === 0) {
    return helpers.message({ custom: "Invalid object!" });
  }
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
