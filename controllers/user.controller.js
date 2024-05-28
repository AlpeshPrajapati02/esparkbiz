const bcrypt = require("bcrypt");
const {
  createUser,
  createProfile,
  getUser,
  getUserById,
  getProfileById,
  createRatingReview,
  findRatingReviews,
  findReviewById,
} = require("../repositories/user.repository");
const JWT = require("jsonwebtoken");
const { findAppById } = require("../repositories/app.repository");
require("dotenv").config();

exports.user = async (req, res) => {
  try {
    console.log("first");
    let { fname, lname, username, email, password, confirmPassword } = req.body;

    let profile = req?.file || "";

    if (
      !fname.trim() ||
      !lname.trim() ||
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are required!",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password and confirm password doesn't match !",
      });
    }

    let data = await getUser(email);

    if (data) {
      return res.json({
        success: false,
        message: "User already exists!",
      });
    }

    let hashPassword;
    try {
      let salt = bcrypt.genSaltSync(10);
      hashPassword = bcrypt.hashSync(password, salt);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    const user = await createUser({
      fname,
      lname,
      username,
      email,
      password: hashPassword,
      role_id: 1,
    });

    let profilePicture;
    if (profile && user) {
      profilePicture = await createProfile({
        filename: profile.filename,
        path: profile.path,
        user_id: user.id,
      });
    }

    return res.json({
      success: true,
      message: "user created successfully",
      data: { user, profile: profilePicture.filename },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email.trim() || !password.trim()) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let user = await getUser(email);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not registered!",
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({
        success: false,
        message: "email or password doesn't match",
      });
    }

    let payload = {
      id: user.id,
      username: user.username,
      role_id: user.role_id,
      email: user.email,
    };

    let token = JWT.sign(payload, process.env.JWT_SECRET, { expiresIn: "2d" });

    return res
      .cookie("token", token, {
        maxAge: 4 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .json({
        success: true,
        user: user,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    let id = req.user.id;
    let user = await getUserById(id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "404 BAD Request",
      });
    }

    return res.json({
      success: true,
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    let { fname, lname } = req.body;
    let id = req.user.id;
    let profile = req.file;

    let user = await getUserById(id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    await user.update({ fname: fname, lname: lname });
    let profilePicture = await getProfileById(id);

    if (profile && profile.filename) {
      await profilePicture.update({ is_active: 0 });
      await createProfile({
        filename: profile.filename,
        path: profile.path,
        user_id: id,
      });
    }

    user = await getUserById(id);

    return res.json({
      success: true,
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.ratingAndReview = async (req, res) => {
  try {
    let { rating, review } = req.body;
    let userId = req.user.id;
    let appId = req.params.id;

    if (!rating || !review) {
      return res.json({
        success: false,
        message: "all fields required",
      });
    }

    const ratingReview = await createRatingReview({
      rating,
      review,
      user_id: userId,
      app_id: appId,
    });

    return res.json({
      success:true,
      message:ratingReview
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllReviewOfApp = async(req,res)=>{
  try {
    let appId = req.params.id;

    const app = await findAppById(appId);

    if(!app){
      return res.json({
        success:false,
        message:"app not found"
      })
    }

    const ratingReviews = await findRatingReviews(appId);

    return res.json({
      success:true,
      data:ratingReviews
    })

  } catch (error) {
    return res.json({
      success:false,
      message:error.message
    })
  }
}

exports.UpdateReviewById = async(req,res)=>{
  try {
    const {rating,review} = req.body;
    const reviewId = req.params.id;

    if(!rating || !review){
      return res.json({
        success:false,
        message:"all fields are required"
      })
    }

    const reviewById= await findReviewById(reviewId);

    if(!reviewById){
      return res.json({
        success:false,
        message:"review not found"
      })
    }

    await reviewById.update({rating:rating,review:review});

    const updatedReview = await findReviewById(reviewId);


    return res.json({
      success:true,
      data:updatedReview
    })

  } catch (error) {
    return res.json({
      success:false,
      message:error.message
    })
  }
}
