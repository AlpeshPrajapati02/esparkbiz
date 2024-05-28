const express = require("express");
const router = express.Router();
const passport = require("passport");
const { isAdmin } = require("../middlewares/auth.middleware");
const { allUsers, deleteUser, deleteApp } = require("../controllers/admin.controller");
const { allApps } = require("../controllers/app.controller");

router.use(passport.authenticate('jwt',{session:false}),isAdmin) 

router.route("/users")
.get(allUsers)

router.route('/user/:id')
.delete(deleteUser)

router.route("/apps")
.get(allApps)

router.route('/app/:id')
.delete(deleteApp)

module.exports = router;
