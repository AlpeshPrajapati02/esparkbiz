const express = require("express");
const router = express.Router();
const { apkStorage } = require("../services/multer");
const multer = require("multer");
const passport = require("passport");
const { devDetails, devAccount, getDevDetails, createApp } = require("../controllers/app.controller");
const appUpload = multer({ storage: apkStorage });

router.use(passport.authenticate('jwt',{session:false}));

router.route('/paymentProfile')
.post(devDetails)
.get(getDevDetails)

router.route('/devAccount')
.post(devAccount)

router.route('/app')
.post(appUpload.single('apk'),createApp)

module.exports = router;