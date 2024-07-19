const express=require('express');
const {
    registerAdmin,
    LoginAdmin,
    deleteAdmin,
    updateAdmin,
    getDetails,
    logoutadmin
}=require('../controllers/Admincontrollers');

const {isAuthenticatedAdmin}=require('../middlewares/auth')

const router=express.Router();

router.route('/register').post(registerAdmin);

router.route('/login').post(LoginAdmin);

router.route('/me').get(isAuthenticatedAdmin,getDetails);

router.route('/delete').delete(isAuthenticatedAdmin,deleteAdmin);

router.route('/update').put(isAuthenticatedAdmin,updateAdmin);

router.route('/logout').get(isAuthenticatedAdmin,logoutadmin);

module.exports = router;