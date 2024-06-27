const express=require('express');
const multer  = require('multer')
const{
    createNew,
    update,
    details,
    myworks,
    deletework,
    getalljobs,
    byvariables,
    applywork,
    worksapplied,
    applicantsofwork,
    downloadpdfs
}=require('../controllers/Workcontrollers')

const {isAuthenticatedAdmin, isAuthenticated}=require('../middlewares/auth')

const router=express.Router();

router.use(express.urlencoded({extended:false}));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../Backend/controllers/files')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix+file.originalname)
    }
  })
const uploaded = multer({ storage: storage });

router.route('/createnew').post(isAuthenticatedAdmin,createNew);

router.route('/update').post(isAuthenticatedAdmin,update);

router.route('/details').get(details);

router.route('/myuploads').get(isAuthenticatedAdmin,myworks);

router.route('/deletework').delete(isAuthenticatedAdmin,deletework);

router.route('/alljobs').get(isAuthenticated,getalljobs);

router.route('/jobsbyvariables').post(isAuthenticated,byvariables);

router.route('/applyjobs').post(isAuthenticated, uploaded.single("file"),applywork);

router.route('/appliedworks').post(isAuthenticated, worksapplied);

router.route('/workapplicants').get(isAuthenticatedAdmin,applicantsofwork);

router.route('/download').get(isAuthenticatedAdmin, downloadpdfs);

module.exports = router;
