const express=require('express');
const{
    createNew,
    update,
    details,
    myworks,
    deletework,
    getalljobs,
    byvariables
}=require('../controllers/Workcontrollers')

const {isAuthenticatedAdmin, isAuthenticated}=require('../middlewares/auth')

const router=express.Router();

router.route('/createnew').post(isAuthenticatedAdmin,createNew);

router.route('/update').post(isAuthenticatedAdmin,update);

router.route('/details').get(details);

router.route('/myuploads').get(isAuthenticatedAdmin,myworks);

router.route('/deletework').delete(isAuthenticatedAdmin,deletework);

router.route('/alljobs').get(isAuthenticated,getalljobs);

router.route('/jobsbyvariables').post(isAuthenticated,byvariables);

module.exports = router;
