const db = require("../models/index");
const { app_file } = db;

const getAppFile = async (appId) => {
  try {
    const appFile = await app_file.findOne({
      where: { app_id: appId, is_active: true }, // Adjust the condition as necessary
    });

    return appFile
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAppFile,
};
