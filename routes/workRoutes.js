const express=require("express");
const { upload } = require("../util/fileUpload");
const { createWork, getAllWork, removeWork, getWorkById } = require("../controllers/workControllers");
const workRouter=express.Router();

workRouter.post(
    "/addwork", 
    upload.fields([
        { name: "images", maxCount: 10 },      
        { name: "thumbnail", maxCount: 1 },    
        { name: "video", maxCount: 1 }        
    ]), 
    createWork
);
workRouter.get("/getall",getAllWork);
workRouter.delete("/removeWork/:workID",removeWork);
workRouter.get("/workDetails/:id",getWorkById);

module.exports=workRouter;