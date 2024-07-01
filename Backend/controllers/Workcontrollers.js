const ErrorHander=require('../utils/errorhandler');
const catchAsyncErrors=require('../middlewares/catchAsyncerrors');
const Admin=require('../models/Adminmodel');
const Work= require('../models/workmodel');
const catchAsyncerrors = require('../middlewares/catchAsyncerrors');
const path=require('path')

// create a new once
exports.createNew=catchAsyncErrors(async(req,res,next)=>{
     const {Role,description,salary,location,company,logo}=req.body;
     console.log(req.admin);
     const _id=req.admin._id;
     const work = await Work.create({
        Role,
        description,
        company,
        salary,
        location,
        logo,
        admin:_id,
        applied:[]
     });
     res.status(200).json({
        success:true,
        work,
     })
})

// update the exisiting once

exports.update=catchAsyncErrors(async(req,res,next)=>{
    const {Role,description,salary,location,logo,company,id}=req.body;
    const updateddata={
        Role,
        description,
        salary,
        company,
        location,
        logo,
    }
    const isvalid= await Work.findById(id);
    if(!isvalid){
        return next(new ErrorHander("work Not found", 401));
    }
    if(!req.admin._id.equals(isvalid.admin)){
        return next(new ErrorHander("Your are not allowed to update this..!!", 401));
    }
    const work = await Work.findByIdAndUpdate(id, updateddata, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    console.log(work);
    res.status(200).json({
        success: true,
        work,
    });
})

// show all my work's uploaded

exports.myworks=catchAsyncErrors(async(req,res,next)=>{
    const works=await Work.find({admin:req.admin._id});
    res.status(200).json({
        success:true,
        message:"Your data",
        works,
    })
})

// show total details
exports.details=catchAsyncErrors(async(req,res,next)=>{
    const id=req.headers.id;
    console.log(id);
    const isvalid=await Work.findById(id);
    console.log(isvalid);
    if(!isvalid){
        return next(new ErrorHander("Work not found", 401));
    }
    res.status(200).json({
        success:true,
        message:"Found data",
        work:isvalid,
    })
})

//users applied to a work
exports.applicantsofwork=catchAsyncErrors(async(req,res,next)=>{
    const id=req.query.id;
    const isvalid=await Work.findById(id);
    const reqapplicants=isvalid.applied;
    console.log(reqapplicants);
    res.status(200).json({
        success:true,
        message:"Found Applicants",
        applicants:reqapplicants,
    })
})
// delete the existing once

exports.deletework=catchAsyncErrors(async(req,res,next)=>{
    const _id=req.headers.id;
    const isvalid = await Work.findOne({ _id: _id });
    if(!isvalid){
        return next(new ErrorHander("Work not found", 401));
    }
    if((req.admin._id).toString()!==(isvalid.admin).toString()){
        console.log(req.headers.admin)
        console.log(isvalid.admin)

        return next(new ErrorHander("Your are not allowed to Delete this..!!", 401));
    }
    await Work.findByIdAndDelete(isvalid._id);
    res.status(200).json({
        success:true,
        message:"Work deleted successfully"
    })
})

//getting all jobs added till now
exports.getalljobs=catchAsyncerrors(async(req,res,next)=>{
    const works = await Work.find({});
        const reqworks = [];
        for (const work of works) {
            let temp=false;
            for (const application of work.applied) {
                if (application.userid.equals(req.user._id)) {
                    temp=true;
                    break;
                }
            }
            if(temp===false)reqworks.push(work);
        }
    res.status(200).json({
        success:true,
        message:"Your data",
        works:reqworks,
    })
})  

//apply to a work
exports.applywork=catchAsyncErrors(async(req,res,next)=>{
    console.log(req.file,req.body.name,req.body.skills,req.body.whyJoin,req.body.jobid);
    console.log(req.user._id);
    const work=await Work.find({_id:req.body.jobid});
    if (!work) {
        return res.status(404).json({
            success: false,
            message: "Job not found"
        });
    }
    
    console.log(work,"first")
    work[0].applied.push({
        "name":req.body.name,
        "skills":req.body.skills,
        "whyJoin":req.body.whyJoin,
        "path":req.file.path,
        "userid":req.user._id
    })
    console.log(work,"second")
    await work[0].save();
    res.status(200).json({
        success:true,
        message:"Work Applied Successfully",
    })
})


//filter jobs by salary by location by role by company
exports.byvariables=catchAsyncErrors(async(req,res,next)=>{
    const {amount,place,name,company}=req.body
     let query = {};
  

  if (amount !== undefined && amount !== null && amount !== '') {
    query.salary = { $gte: amount };
  }
  if (place !== undefined && place !== null && place !== '') {
    query.location = place;
  } else {
    // Ensure location is not empty if place is not provided
    query.location = { $ne: '' };
  }
  if (name !== undefined && name !== null && name !== '') {
    query.Role = name;
  }
  if (company !== undefined && company !== null && company !== '') {
    query.company = company;
  }

  // Log the query object for debugging
  console.log('Query:', query);

  // If no criteria specified, return all documents
  const works = await Work.find(query);
        const reqworks = [];
        for (const work of works) {
            let temp=false;
            for (const application of work.applied) {
                if (application.userid.equals(req.user._id)) {
                    temp=true;
                    break;
                }
            }
            if(temp===false)reqworks.push(work);
        }
    res.status(200).json({
        success:true,
        message:"Jobs having given specifications",
        works,
    })
})

//appied works
exports.worksapplied=catchAsyncErrors(async(req,res,next)=>{
    try {
        const works = await Work.find({});
        const reqworks = [];

        for (const work of works) {
            for (const application of work.applied) {
                if (application.userid.equals(req.user._id)) {
                    reqworks.push(work);
                    break;
                }
            }
        }

        res.status(200).json({
            message: 'Works retrieved successfully',
            works: reqworks
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred',
            error
        });
    }
})

//download pdfs

exports.downloadpdfs=catchAsyncErrors(async(req,res)=>{
    const pat = req.query.path;
    console.log(pat);
    const parentDir = path.dirname(__dirname);

const filePath = path.join(parentDir, pat);

console.log(filePath); 
    console.log(filePath);
    res.download(filePath, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error downloading file');
      }
    });
})