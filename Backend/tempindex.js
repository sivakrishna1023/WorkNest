const express = require("express");
const multer  = require('multer')
const app=express();
const path=require("path");
const connectDatabase=require('./config/database');
const cors=require('cors')
connectDatabase();
app.use(express.urlencoded({extended:false}));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix+file.originalname)
    }
  })
  const uploaded = multer({ storage: storage });

app.use(cors({
    origin:"http://localhost:3001",
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
    },{
    origin:"https://work-nest-omega.vercel.app",
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
    },{
        origin:"http://localhost:5173",
        methods:["GET","POST","PUT","DELETE"],
        credentials:true
    }
));

app.post("/upload", uploaded.single("file"), async (req, res) => {
  console.log(req.file);
  console.log(req.name);
  console.log(req.whyJoin);
  console.log("feuf");
  // const title = req.body.title;
  // const fileName = req.pdfFile.filename;
  // try {
  //   await PdfSchema.create({ title: title, pdf: fileName });
  //   res.send({ status: "ok" });
  // } catch (error) {
  //   res.json({ status: error });
  // }
  // console.log(req);
  console.log("vcekfck");
});



app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;