const {Router} = require("express")
const userRoutes = require("./user.route")
const appRoutes = require('./app.route')
const adminRoutes = require('./admin.route')
const downloadRoutes = require('./download.route')
const router = Router();
router.use('/', userRoutes);
router.use('/dev',appRoutes);
router.use('/admin',adminRoutes);
router.use("/download",downloadRoutes)
module.exports = router;
