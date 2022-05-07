const router = require("express").Router();
const authController = require("../controlers/auth/authControllers");
const Joi = require("joi");

const validator = require("express-joi-validation").createValidator({});

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  password: Joi.string().min(6).max(15).required(),
  mail: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).max(15).required(),
  mail: Joi.string().email().required(),
});

router.post(
  "/register",
  validator.body(registerSchema),
  authController.controllers.postRegister
);
router.post(
  "/login",
  validator.body(loginSchema),
  authController.controllers.postLogin
);

module.exports = router;
