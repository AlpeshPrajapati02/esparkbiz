const express = require("express");
const router = express.Router();
const passport = require("passport");
const { downloadApp } = require("../controllers/download.controller");
router.use(passport.authenticate('jwt',{session:false}))

router.route("/:id")
.post(downloadApp)
  
module.exports = router;
