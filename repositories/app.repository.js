const db = require("../models/index");
const { other_detail, developer, app, app_file, app_has_category,app_requirement } = db;

const createDevDetails = async (details) => {
  try {
    let devDetails = await other_detail.create(details);
    return devDetails;
  } catch (error) {
    console.log("error in creating other details for developer", error);
    throw error;
  }
};

const createDevAccount = async (devDetails) => {
  try {
    let dev = await developer.create(devDetails);

    return dev;
  } catch (error) {
    console.log("error in creating developer", error);
    throw error;
  }
};

const getPaymentProfiles = async (id) => {
  try {
    let paymentProfiles = await other_detail.findAll({
      where: { user_id: id },
    });
    return paymentProfiles;
  } catch (error) {
    console.log("error in getting payment profiles", error);
    throw error;
  }
};

const createApp = async (details,transaction) => {
  try {
    const categoryDetails = await app.create(details,{transaction});
    return categoryDetails;
  } catch (error) {
    console.log("error while creating an app", error);
    throw error;
  }
};

const createApk = async (details,transaction) => {
  try {
    const app = await app_file.create(details,{transaction});
    return app;
  } catch (error) {
    console.log("error while creating an app", error);
    throw error;
  }
};

const createAppHasCategory = async (details,transaction) => {
  try {
    const app = await app_has_category.create(details,{transaction});
    return app;
  } catch (error) {
    console.log("error while creating an app", error);
    throw error;
  }
};

const CreateAppRequirement = async (details,transaction) => {
  try {
    const appRequirement = await app_requirement.create(details,{transaction});
    return appRequirement;
  } catch (error) {
    console.log("error while creating an app", error);
    throw error;
  }
};

module.exports = {
  createDevDetails,
  createDevAccount,
  getPaymentProfiles,
  createApp,
  createApk,
  createAppHasCategory,
  CreateAppRequirement
};
