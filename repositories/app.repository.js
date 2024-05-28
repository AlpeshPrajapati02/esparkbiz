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

const createApp = async (details, transaction) => {
  try {
    const categoryDetails = await app.create(details, { transaction });
    return categoryDetails;
  } catch (error) {
    console.log("error while creating an app", error);
    throw error;
  }
};

const createApk = async (details, transaction) => {
  try {
    const app = await app_file.create(details, { transaction });
    return app;
  } catch (error) {
    console.log("error while creating an app", error);
    throw error;
  }
};

const createAppMedia = async (details, transaction) => {
  try {
    const media = await app_media.create(details, { transaction });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createAppHasCategory = async (details, transaction) => {
  try {
    const app = await app_has_category.create(details, { transaction });
    return app;
  } catch (error) {
    console.log("error while creating an app", error);
    throw error;
  }
};

const CreateAppRequirement = async (details, transaction) => {
  try {
    const appRequirement = await app_requirement.create(details, {
      transaction,
    });
    return appRequirement;
  } catch (error) {
    console.log("error while creating an app", error);
    throw error;
  }
};

const getAllApps = async () => {
  try {
    const apps = await app.findAll({
      attributes: [
        "id",
        "name",
        "description",
        "download_count",
        [
          db.Sequelize.fn("AVG", db.Sequelize.col("rating_and_reviews.rating")),
          "avgRating",
        ],
      ],
      include: [
        {
          model: rating_and_review,
          attributes: [],
        },
        {
          model: app_media,
          attributes: ["filename", "path"], // Adjust the attributes based on your AppMedia model
        },
        {
          model: app_has_category,
          attributes: ["id"],
          include: [
            {
              model: category,
              attributes: ["id", "name"],
            },
          ], // Adjust the attributes based on your Category model
        },
      ],
      group: ["app.id", "app_media.id", "app_has_categories.id"],
    });

    return apps;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAppsByCategory = async (categoryName) => {
  try {
    const apps = await app.findAll({
      attributes: [
        "id",
        "name",
        "description",
        "download_count",
        [
          db.Sequelize.fn("AVG", db.Sequelize.col("rating_and_reviews.rating")),
          "avgRating",
        ],
      ],
      include: [
        {
          model: rating_and_review,
          attributes: [],
        },
        {
          model: app_media,
          attributes: ["filename", "path"], // Adjust the attributes based on your AppMedia model
        },
        {
          model: app_has_category,
          attributes: ["id"],
          include: [
            {
              model: category,
              attributes: ["id", "name"],
              where: {
                name: categoryName,
              },
            },
          ], // Adjust the attributes based on your Category model
        },
      ],
      group: [
        "app.id",
        "app_media.id",
        "app_has_categories.id",
        "app_has_categories->category.id",
      ],
    });

    return apps;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAppDetailsById = async (appId) => {
  try {
    const appDetails = await app.findOne({
      where: { id: appId },
      attributes: [
        "id",
        "name",
        "description",
        "download_count",
        [
          db.Sequelize.fn("AVG", db.Sequelize.col("rating_and_reviews.rating")),
          "avgRating",
        ],
      ],
      include: [
        {
          model: rating_and_review,
          attributes: ["id", "rating", "review"],
          include: [
            {
              model: user,
              required: true,
              attributes: ["id", "fname", "lname", "username", "email"],
            },
          ],
        },
        {
          model: app_media,
          attributes: ["id", "filename", "path"],
        },
        {
          model: app_has_category,
          attributes: ["id"],
          include: [
            {
              model: category,
              attributes: ["id", "name"],
            },
          ],
        },
        {
          model: app_file,
          required: true,
          attributes: [
            "id",
            "filename",
            "path",
            "platform",
            "version",
            "filesize",
            "release_note",
          ],
          where: { is_active: 1 },
        },
        {
          model: app_requirement,
          attributes: [
            "id",
            "platform",
            "os_version",
            "memory",
            "storage",
            "processor",
            "graphics",
            "addition_notes",
          ],
        },
        {
          model: user,
          attributes: ["id", "fname", "lname"],
        },
      ],
      group: [
        "app.id",
        "rating_and_reviews.id",
        "app_media.id",
        "app_has_categories.id",
        "app_has_categories->category.id",
        "app_files.id",
        "app_requirements.id",
        "user.id",
      ],
    });

    return appDetails;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const findAppById = async (id,transaction) => {
  try {
    const appDetail = await app.findByPk(id,{transaction});

    return appDetail;
  } catch (error) {
    throw error;
  }
};

const deleteAppCategories = async (appId, transaction) => {
  try {
    const deletedCategories = await app_has_category.destroy({
      where: { app_id: appId },
    },{transaction});
    return deletedCategories;
  } catch (error) {
    throw error;
  }
};

const findAppRequirementsByAppId = async (appId,transaction) => {
  try {
    const appRequirements = await app_requirement.findOne({
      where: { app_id: appId },
    },{transaction});
    return appRequirements;
  } catch (error) {
    throw error;
  }
};

const findAppMediaByAppId = async (appId, transaction) => {
  try {
    const appMedia = await app_media.findAll({ where: { app_id: appId } },{transaction});

    return appMedia;
  } catch (error) {
    throw error;
  }
};

const findApksByAppId = async (appId, transaction) => {
  try {
    const appMedia = await app_file.findAll({ where: { app_id: appId } },{transaction});

    return appMedia;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createDevDetails,
  createDevAccount,
  getPaymentProfiles,
  createApp,
  createApk,
  createAppMedia,
  createAppHasCategory,
  CreateAppRequirement,
  getAllApps,
  getAppsByCategory,
  getAppDetailsById,
  findAppById,
  deleteAppCategories,
  findAppRequirementsByAppId,
  findAppMediaByAppId,
  findApksByAppId,
};
