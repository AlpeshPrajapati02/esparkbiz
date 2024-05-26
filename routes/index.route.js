const {Router} = require("express")
const userRoutes = require("./user.route")
const appRoutes = require('./app.route')
const router = Router();
router.use('/', userRoutes);
router.use('/dev',appRoutes)
module.exports = router;
