const ErrorHander = require('../utils/errorhandler');
const catchAsyncErrors=require('./catchAsyncerrors');
const jwt=require("jsonwebtoken");
const User=require('../models/usermodel');
const Admin=require('../models/Adminmodel');
require('dotenv').config();

exports.isAuthenticated=catchAsyncErrors(async(req,res,next)=>{
  if(!req.headers.authorization){
    return next(new ErrorHander("Please try Login",401));
  }
    const [bearer, token] = req.headers.authorization.split(' ');
    if(!token){ 
      return next(new ErrorHander("Please Login to continue",401));
    }
    const decodedData=jwt.verify(token,process.env.JWT_SECRET);

    if(!decodedData){
      return next(new ErrorHander("Not found",401));
    }
    currentUser=await User.findById(decodedData.id);
    if(!currentUser){
      return next(new ErrorHander("User Not found",400));
    }
    req.user=currentUser
    next();
});

exports.isAuthenticatedAdmin=catchAsyncErrors(async(req,res,next)=>{
      if(!req.headers.authorization){
        return next(new ErrorHander("Please try Login",401));
      }
      const [bearer, token] = req.headers.authorization.split(' ');
      if(!token){
        return next(new ErrorHander("Please Login to continue",401));
      }
      const decodedData=jwt.verify(token,process.env.JWT_SECRET);
      if(!decodedData){
        return next(new ErrorHander("Not found",401));
      }
      const admindetails=await Admin.findById(decodedData.id);
      req.admin=admindetails;
      if(!admindetails){
        return next(new ErrorHander("Admin Not found",400));
      }
      next();
})