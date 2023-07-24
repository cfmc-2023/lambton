const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");

router.post("/userSignup", UserController.user_signup);
router.post("/login", UserController.user_login);
router.get("/getallusers", UserController.getallusers);
// router.patch("/updateuser/:id", UserController.updateuser);

module.exports = router;
