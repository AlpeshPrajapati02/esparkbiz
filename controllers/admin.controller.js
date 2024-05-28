const db = require("../models");
const fs = require('fs');
const { findAllUser } = require("../repositories/admin.repository");
const { findAppById, findAppMediaByAppId, findApksByAppId, deleteAppCategories, findAppRequirementsByAppId } = require("../repositories/app.repository");

exports.allUsers = async (req,res)=>{
  try {
    const allUser = await findAllUser();

    return res.json({
      success:true,
      data:allUser
    })
  } catch (error) {
    return res.json({
      success:false,
      message:error.message
    })
  }
}

exports.deleteUser = async (req,res)=>{
  try {
    let id = req.params.id;
    let user = await db.user.findByPk(id);
    if(!user){
      return res.json({
        success:false,
        message:"User not present"
      })
    }

    await user.destroy();

    return res.json({
      success:true,
      message:"user deleted successfully"
    })

  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

exports.deleteApp = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { id } = req.params;

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