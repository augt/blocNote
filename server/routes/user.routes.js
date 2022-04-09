const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controllers");
//const auth = require("../middlewares/auth.middlewares");

router.post(
  "/signup",
  userCtrl.emailCheck,
  userCtrl.passwordCheck,
  userCtrl.signup
);

router.post(
  "/login",
  userCtrl.emailCheck,
  userCtrl.passwordCheck,
  userCtrl.login
);


module.exports = router;
