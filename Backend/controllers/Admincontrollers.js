const ErrorHander=require('../utils/errorhandler');
const catchAsyncErrors=require('../middlewares/catchAsyncerrors');
const Admin=require('../models/Adminmodel');
const sendTokenAdmin=require('../utils/jwtToken');
const sendEmail=require('../utils/sendEmail');
const crypto = require("crypto");

// Admin register
exports.registerAdmin=catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password,company}=req.body;
    const isvalid=await Admin.findOne({email});
    if(isvalid){
        return next(new ErrorHander("Admin Already exist with this Email", 401));
    }
    const admin=await Admin.create({
        name,
        email,
        password,
        company
    })
    sendTokenAdmin(admin,200,res);
})

// Login Admin

exports.LoginAdmin=catchAsyncErrors(async(req,res,next)=>{
    const {email,password}=req.body;
    const admin=await Admin.findOne({email});
    if(!admin){
        return next(new ErrorHander("Admin with this Email Not exist try register", 401));
    }
    const ispasswordmatched=await admin.comparePassword(password);
    console.log(ispasswordmatched);
    if(!ispasswordmatched){
        return next(new ErrorHander("Password incorrect ", 401));
    }
    sendTokenAdmin(admin,200,res);
})

// Delete Admin
exports.deleteAdmin=catchAsyncErrors(async(req,res,next)=>{
    try {
        // Delete the Admin by ID
        await Admin.findByIdAndDelete(req.admin._id);
        const adminId = req.admin._id;
    
        // Delete all works associated with the Admin
        await Work.deleteMany({ admin: adminId });
    
        // Send success response
        res.status(200).json({
          success: true,
          message: 'Admin and associated works deleted successfully',
        });
      } catch (err) {
        // Handle any errors
        console.error('Error deleting documents:', err);
        res.status(500).json({
          success: false,
          message: 'Error deleting admin and associated works',
        });
      }
})

// Update the Admin
exports.updateAdmin=catchAsyncErrors(async(req,res,next)=>{
    const newdetails={name:req.body.name,
            password:req.body.password,
            company:req.body.company,
    }
    const admin = await Admin.findByIdAndUpdate(req.admin._id, newdetails, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        admin,
      });
})

//Log Out Admin
exports.logoutadmin=catchAsyncErrors(async(req,res)=>{
    
})