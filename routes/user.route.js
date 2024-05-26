const express = require("express");
const { user, login, getUser, updateUser } = require("../controllers/user.controller");
const router = express.Router();
const { imgStorage } = require("../services/multer");
const multer = require("multer");
const passport = require("passport");
const imgUpload = multer({ storage: imgStorage });
router.route("/register").post(imgUpload.single("profile"), user);

router.route("/login").post(login);

router
  .route("/user")
  .get(passport.authenticate("jwt", { session: false }), getUser);

router.route('/update')
.put(passport.authenticate('jwt',{session:false}),imgUpload.single('profile'),updateUser)  
module.exports = router;
