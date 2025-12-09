import Joi from "joi";

const signupValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(3).max(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(10).required(),
    });

    const { error } = schema.validate();
    if (error) {
      return res
        .status(400)
        .json({ message: "Bad Requrst", success: false, error: error.message });
    }
    next();
  } catch (error) {
    res
      .status(404)
      .json({ message: "Bad Requrst", success: false, error: error.message });
  }
};

const loginValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(3).max(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(10).required(),
    });

    const { error } = schema.validate();
    if (error) {
      return res
        .status(400)
        .json({ message: "Bad Requrst", success: false, error: error.message });
    }
    next();
  } catch (error) {
    res
      .status(404)
      .json({ message: "Bad Requrst", success: false, error: error.message });
  }
};

export { signupValidation, loginValidation };
