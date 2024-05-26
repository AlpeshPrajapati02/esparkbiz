const db = require("../models");
const {
  createDevDetails,
  createDevAccount,
  createApp,
  createApk,
  CreateAppRequirement,
  createAppHasCategory,
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
    let apk = req.file;


    if(!name || !description || !release_date || !version || !apk || !platform || !release_note || (categories && !categories.length) || !os_version || !memory || !storage || !processor){
      return res.status(400).json({
        success:false,
        message:"all fields are required"
      })
    }

    const app = await createApp({developer_id:id,name,description,release_date,version,},transaction);

    const apkFile = await createApk({filename:apk.filename,path:apk.path,platform:platform,version:version,filesize:apk.size,release_note:release_note,app_id:app.id},transaction);

    categories.forEach(async(category)=>{
      createAppHasCategory({app_id:app.id,category_id:category},transaction)
    })

    await Promise.all(categories);

    const requirements = await CreateAppRequirement({app_id:app.id,platform:platform,os_version:os_version,memory:memory,storage:storage,processor:processor,graphics:graphics,addition_notes:addition_notes},transaction);

    await transaction.commit();

    return res.json({
      success:true,
      data:{app,apkFile,requirements}
    })

  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}
