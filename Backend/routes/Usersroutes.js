const express=require('express');
const {
   registerUser,
   loginUser,
   getUserdatails,
   deleteUser,
   getAllUsers,
   getSingleUser,
   updateUser,
   logoutuser
} =require('../controllers/Usercontrollers')

const {isAuthenticated}= require("../middlewares/auth");

const router=express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/me").get(isAuthenticated,getUserdatails);

router.route("/allusers").get(isAuthenticated,getAllUsers);

router.route("/singleuser").get(isAuthenticated,getSingleUser);

router.route("/update").put(isAuthenticated,updateUser);

router.route("/delete").delete(isAuthenticated,deleteUser);

router.route("/logout").get(isAuthenticated,logoutuser);

module.exports = router;