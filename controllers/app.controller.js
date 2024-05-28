const db = require("../models");
const fs = require('fs')
const {
  createDevDetails,
  createDevAccount,
  createApp,
  createApk,
  CreateAppRequirement,
  createAppHasCategory,
  getAllApps,
  getAppsByCategory,
  getAppDetailsById,
  createAppMedia,
  findAppById,
  findAppRequirementsByAppId,
  deleteAppCategories,
  findAppMediaByAppId,
  findApksByAppId,
} = require("../repositories/app.repository");

exports.devAccount = async (req, res) => {
  try {
    let {
      name,
      description,
      website,
      number_of_apps,
      earning_methods,
      earning_money,
    } = req.body;

    let id = req.user.id;

    if (
      !name ||
      !description ||
      !number_of_apps ||
      !earning_methods ||
      !earning_money
    ) {
      return res.status(400).json({
        success: false,
        message: "all fields required",
      });
    }

    const developer = await createDevAccount({
      user_id: id,
      name,
      description,
      website,
      number_of_apps,
      earning_methods,
      earning_money,
    });

    return res.json({
      success: true,
      data: developer,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.devDetails = async (req, res) => {
  try {
    let { fullname, zipcode, country_id, street, city, state_id } = req.body;
    let id = req.user.id;

    if (!fullname || !zipcode || !country_id || !street || !city || !state_id) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }

    let devDetails = await createDevDetails({
      user_id: id,
      fullname,
      zipcode,
      country_id,
      street,
      city,
      state_id,
    });

    return res.json({
      success: true,
      data: devDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getDevDetails = async (req, res) => {
  try {
    const id = req.user.id;

    let details = await getPaymentProfiles(id);

    return res.json({
      success: true,
      data: details,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createApp = async (req,res)=>{
  const transaction = await db.sequelize.transaction();
  try {
    let {name,description,release_date,version,platform,release_note,categories,os_version,memory,storage,processor,graphics,addition_notes} = req.body;
    let id = req.user.id;
    let files = req.files;


    if(!name || !description || !release_date || !version || !files || !platform || !release_note || (categories && !categories.length) || !os_version || !memory || !storage || !processor){
      return res.status(400).json({
        success:false,
        message:"all fields are required"
      })
    }

    const app = await createApp({
      developer_id: id,
      name,
      description,
      release_date,
      version
    }, transaction);

    
    for (const file of files) {
      if (file.fieldname === "media") {
        await createAppMedia({
          app_id: app.id,
          filename: file.filename,
          path: file.path
        }, transaction);
      } else {
        await createApk({
          filename: file.filename,
          path: file.path,
          platform,
          version,
          filesize: file.size,
          release_note,
          app_id: app.id
        }, transaction);
      }
    }


    for (const category of categories) {
      await createAppHasCategory({
        app_id: app.id,
        category_id: category
      }, transaction);
    }

    const requirements = await CreateAppRequirement({
      app_id: app.id,
      platform,
      os_version,
      memory,
      storage,
      processor,
      graphics,
      addition_notes
    }, transaction);

    await transaction.commit();

    let appDetails = await getAppDetailsById(app.id)
    return res.json({
      success:true,
      data:appDetails
    })

  } catch (error) {
    await transaction.rollback();
    for(const file of req.files){
      fs.unlinkSync(file.path);
    }
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

exports.allApps = async (req,res)=>{
  try {
    const apps = await getAllApps();

    return res.json({
      success:true,
      data:apps
    })
  } catch (error) {
    return res.json({
      success:false,
      message:error.message
    })
  }
}

exports.appsByCategory = async (req,res)=>{
  try {
      let {category} = req.params;

      const apps = await getAppsByCategory(category);

      return res.json({
        success:true,
        data:apps
      })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

exports.appDetailsById = async (req,res)=>{
  try {
      let {id} = req.params;

      const apps = await getAppDetailsById(id);

      return res.json({
        success:true,
        data:apps
      })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

exports.updateApp = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const {name, description, release_date, version, platform, release_note, categories, os_version, memory, storage, processor, graphics, addition_notes } = req.body;
    const userId = req.user.id;
    const id = req.params.id;
    const files = req.files;

    if (!id || !name || !description || !release_date || !version || !files || !platform || !release_note || (categories && !categories.length) || !os_version || !memory || !storage || !processor) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const app = await findAppById(id, transaction);

    if (!app) {
      return res.status(404).json({
        success: false,
        message: "App not found"
      });
    }

    // Update the app details
    await app.update({
      name,
      description,
      release_date,
      version,
      developer_id: userId
    }, { transaction });

    // Update app media
    for (const file of files) {
      if (file.fieldname === "media") {
        await createAppMedia({
          app_id: app.id,
          filename: file.filename,
          path: file.path
        }, transaction);
      } else {
        await createApk({
          filename: file.filename,
          path: file.path,
          platform,
          version,
          filesize: file.size,
          release_note,
          app_id: app.id
        }, transaction);
      }
    }

    // Update app categories
    await deleteAppCategories(app.id, transaction); // First, remove existing categories
    for (const category of categories) {
      await createAppHasCategory({
        app_id: app.id,
        category_id: category
      }, transaction);
    }

    // Update app requirements
    const requirements = await findAppRequirementsByAppId(app.id, transaction);
    if (requirements) {
      await requirements.update({
        platform,
        os_version,
        memory,
        storage,
        processor,
        graphics,
        addition_notes
      }, { transaction });
    } else {
      await CreateAppRequirement({
        app_id: app.id,
        platform,
        os_version,
        memory,
        storage,
        processor,
        graphics,
        addition_notes
      }, transaction);
    }

    await transaction.commit();

    const appDetails = await getAppDetailsById(app.id);
    return res.json({
      success: true,
      data: appDetails
    });

  } catch (error) {
    await transaction.rollback();
    for(const file of req.files){
      fs.unlinkSync(file.path);
    }
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

exports.deleteApp = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "App ID is required"
      });
    }

    const app = await findAppById(id, transaction);
    if (!app) {
      return res.status(404).json({
        success: false,
        message: "App not found"
      });
    }

    // Ensure the user is authorized to delete the app
    if (app.developer_id !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this app"
      });
    }

    // Delete related app media
    const media = await findAppMediaByAppId(app.id, transaction);
    for (const item of media) {
      await item.destroy({ transaction });
      fs.unlinkSync(item.path);
    }

    // Delete related APK files
    const apks = await findApksByAppId(app.id, transaction);

    for (const apk of apks) {
      await apk.destroy({ transaction });
      fs.unlinkSync(apk.path);
    }

    // Delete app categories
    await deleteAppCategories(app.id, transaction);

    // Delete app requirements
    const requirements = await findAppRequirementsByAppId(app.id, transaction);
    if (requirements) {
      await requirements.destroy({ transaction });
    }

    // Delete the app itself
    await app.destroy({ transaction });

    await transaction.commit();

    return res.json({
      success: true,
      message: "App deleted successfully"
    });

  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
