const dotenv = require("dotenv");
const { getUser } = require("../repositories/user.repository");
const jwtStrategy = require("passport-jwt").Strategy;
dotenv.config();

// getToken function for passport
const getToken = (req) => {
  return (
    req.cookie?.token ||
    req.body?.token ||
    req.header("Authorization")?.replace("Bearer ", "") ||
    null
  );
};

// opts for passport-jwt
let opts = {
  jwtFromRequest: getToken,
  secretOrKey: process.env.JWT_SECRET,
};

// passport-jwt configuration logic
exports.passportConfig = (passport) => {
  passport.use(
    new jwtStrategy(opts, async (payload, next) => {
      let id = payload.id;
      const user = await getUser(payload.email);
      
      if(!user){
        return next(null,false)
      }
      // if user present then call next with payload
      return next(null,user)
    })
  );
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role_id !== 3) {
    return res.status(403).json({
      success: false,
      message: 'Access forbidden: Admins only'
    });
  }
  next();
};

