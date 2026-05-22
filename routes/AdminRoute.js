const express=require("express");
const { AdminLogin } = require("../controllers/adminLogin");
const adminRouter=express.Router();

adminRouter.post("/adminLogin",AdminLogin);


module.exports=adminRouter;