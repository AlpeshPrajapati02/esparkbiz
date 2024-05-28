const db = require("../models/index");
const { user, profile, rating_and_review } = db;

const getUser = async (email) => {
  try {
    const userData = await user.findOne({
      where: { email: email },
      include: [
        {
          model: profile,
          where: { is_active: 1 },
        },
      ],
    });
    return userData;
  } catch (error) {
    console.log(error);
    throw new Error("Could not retrieve users");
  }
};
const getUserById = async (id) => {
  try {
    const userData = await user.findByPk(id, {
      include: [
        {
          model: profile,
          where: { is_active: 1 },
        },
      ],
    });
    return userData;
  } catch (error) {
    console.log(error);
    throw new Error("Could not retrieve users");
  }
};

const createUser = async (userPayload) => {
  try {
    const newUser = await user.create(userPayload);
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

const createProfile = async (profilePayload) => {
  try {
    const profilePicture = await profile.create(profilePayload);
    return profilePicture;
  } catch (error) {
    console.error("Error creating profile:", error);
    throw error;
  }
};

const getProfileById = async (id) => {
  try {
    let profilePicture = await profile.findByPk(id, {
      where: { is_active: 1 },
    });

    return profilePicture;
  } catch (error) {
    console.error("Error creating profile:", error);
    throw error;
  }
};

const createRatingReview = async (details) => {
  try {
    const ratingReview = await rating_and_review.create(details);

    return ratingReview;
  } catch (error) {
    throw error;
  }
};

const findRatingReviews = async (appId) => {
  try {
    const ratingReviews = await rating_and_review.findAll({
      where: { app_id: appId },
    });

    return ratingReviews;
  } catch (error) {
    throw error;
  }
};

const findReviewById = async (reviewId) => {
  try {
    const ratingReviews = await rating_and_review.findByPk(reviewId);

    return ratingReviews;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUser,
  createUser,
  createProfile,
  getUserById,
  getProfileById,
  createRatingReview,
  findRatingReviews,
  findReviewById,
};
