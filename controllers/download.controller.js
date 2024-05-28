const express = require("express");
const router = express.Router();
const fs = require("fs");
const db = require("../models");
const path = require("path");
const { findAppById } = require("../repositories/app.repository");
const { getAppFile } = require("../repositories/download.repository");

exports.downloadApp = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const appId = req.params.id;
    const userId = req.user.id;

    // Find the app by ID
    const app = await findAppById(appId);
    if (!app) {
      return res.status(404).json({
        success: false,
        message: "App not found",
      });
    }

    // Find the app file
    const appFile = await getAppFile(appId);

    if (!appFile) {
      return res.status(404).json({
        success: false,
        message: "App file not found",
      });
    }

    const filePath = path.join(__dirname, "../", appFile.path);
    console.log(filePath);
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: "File not found on server",
      });
    }

    await db.app.increment("download_count", {
      where: { id: appId },
      transaction,
    });

    await db.downloads.create({app_id:appId,user_id:userId},{transaction});

    // Commit the transaction
    await transaction.commit();

    // Set headers for file download
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${appFile.filename}`
    );
    res.setHeader("Content-Type", "application/octet-stream");

    // Create a read stream and pipe it to the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    await transaction.rollback();
    console.error("Error downloading app:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
