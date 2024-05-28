const express = require("express");
const router = express.Router();
const { apkStorage,mediaStorage } = require("../services/multer");
const multer = require("multer");
const passport = require("passport");
const { devDetails, devAccount, getDevDetails, createApp, allApps, appsByCategory, appDetailsById, updateApp, deleteApp } = require("../controllers/app.controller");
const appUpload = multer({ storage: apkStorage });
const mediaUpload = multer({ storage: mediaStorage });

router.use(passport.authenticate('jwt',{session:false}));

router.route('/paymentProfile')
.post(devDetails)
.get(getDevDetails)

router.route('/devAccount')
.post(devAccount)

router.route('/app')
.post(mediaUpload.any(),createApp)

router.route('/apps')
.get(allApps)

router.route("/app/:id")
.get(appDetailsById)
.put(mediaUpload.any(),updateApp)
.delete(deleteApp)

router.route('/apps/:category')
.get(appsByCategory)

module.exports = router;