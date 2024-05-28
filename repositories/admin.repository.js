const db = require("../models/index");
const {
  other_detail,
  developer,
  app,
  app_file,
  app_media,
  app_has_category,
  app_requirement,
  rating_and_review,
  category,
  user,
} = db;


const findAllUser = async()=>{
  try {
    const users = await user.findAll();
    return users;
  } catch (error) {
    throw error;
  }
}


module.exports = {
  findAllUser
}