import { Joi, Segments } from "celebrate";
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
export default {
  register: {
    [Segments.BODY]: {
      first_name: Joi.string().required(),
      //   middle_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().email().required(),
      //   password: Joi.string().min(6).max(32).required(),
      // confirm_password: Joi.string().min(6).max(32).required(),
      password: Joi.string().regex(passwordRegex).required(),
      confirm_password: Joi.string().regex(passwordRegex).required(),
      mobile: Joi.string().required(),
      role: Joi.string().required(),
      // status: Joi.number().required()
    },
    // [Segments.HEADERS]:Joi.object({
    //     "tenant-id": Joi.string().required()
    // }).unknown()
  },
  login: {
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
    // [Segments.HEADERS]:Joi.object({
    //     "tenant-id": Joi.string().required()
    // }).unknown()
  },
};
