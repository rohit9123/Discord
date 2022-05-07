const router = require("express").Router();
const authController = require("../controlers/auth/authControllers");

router.post("/register", authController.controllers.postRegister);
router.post("/login", authController.controllers.postLogin);

module.exports = router;
