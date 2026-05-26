const express = require("express");
const { upload } = require("../util/fileUpload");
const { createWork, getAllWork, removeWork, getWorkById } = require("../controllers/workControllers");
const workRouter = express.Router();

// Multer error handler
const handleMulterError = (err, req, res, next) => {
    if (err) {
        return res.status(400).json({
            success: false,
            message: err.message || "File upload error",
        });
    }
    next();
};

workRouter.post(
    "/addwork",
    (req, res, next) => {
        // upload.any() accepts files under ANY field name — no more Unexpected field errors
        upload.any()(req, res, (err) => handleMulterError(err, req, res, next));
    },
    createWork
);

workRouter.get("/getall", getAllWork);
workRouter.delete("/removeWork/:workID", removeWork);
workRouter.get("/workDetails/:id", getWorkById);

module.exports = workRouter;
