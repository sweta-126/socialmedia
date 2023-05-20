const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://socialmedia-app-mern-application.netlify.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const multer = require("multer");
const path = require("path");
const PORT = process.env.PORT || 8800;

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to mongodb");
}).catch((err)=>{
    console.log("error while connecting to mongodb");
});

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "public/images");
    },
    filename : (req, file, cb) =>{
        cb(null, req.body.name);
    }
})

const upload = multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    try{
        return res.status(200).json("File uploaded successfully");
    }catch(err){
        console.log(err);
    }
    
});


app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);


app.listen(PORT,()=>{
    console.log("backend server is running");
})
