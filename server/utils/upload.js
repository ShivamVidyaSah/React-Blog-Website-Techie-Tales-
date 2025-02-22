//Everthing in this file will be used as middle ware

//We have to install to npm packages under server folder,
//1. is "Multer" - Multer is a node.js middleware for handling multipart/form-data, 
// which is primarily used for uploading files.
//2. is "Multer's Gridfs storage engine" - helps to store uploaded files directly to mongodb
import express from "express"
import pkg from "multer-gridfs-storage";
const { GridFsStorage } = pkg ;

import fs from "fs";

import path from "path";
import dotenv from 'dotenv'
import multer from "multer";
import cors from 'cors';

dotenv.config();// initializing dotenv

import { fileURLToPath } from "url";

import mongoose from "mongoose";

const app = express();
app.use(cors());
//app.use('/file', express.static(path.join(__dirname, 'uploads')));

// ✅ Manually define `__dirname` in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const mongoURI = `mongodb://${username}:${password}@blogapp-shard-00-00.5bqhp.mongodb.net:27017,blogapp-shard-00-01.5bqhp.mongodb.net:27017,blogapp-shard-00-02.5bqhp.mongodb.net:27017/?ssl=true&replicaSet=atlas-bhtjoj-shard-0&authSource=admin&retryWrites=true&w=majority&appName=BlogApp`;

// ✅ Ensure MongoDB connection is established before GridFS initialization
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ MongoDB Connected");
}).catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
});

//this grid-fs-stirage is treated as a function and it accepts some arguments inside of it
// const storage = new GridFsStorage({
//     //in here the first thing we pass is the mongodb url, and  since it is an object we will have
//     //to pass it as a key value pair
//     //and the second thing is an options: {} 
//     url : mongoURI,
//     // options: {useNewUrlParser:true, useUnifiedTopology: true},
//     file:(req,file)=>{

//         if(!file){
//            console.log("No file in middleware");
//            return null;
//         }

//         console.log("Procesing the uploaded file ", file);

//        const match = ['image/png', 'image/jpg', 'image/jpeg'];
//         //the above array help us checking/specifying the types of file we want to accept as a img file
//         // we are writing like 'image/png' because we are using mimetype
//         //This represents 'the type of the image/extension of the image'


//         if(match.indexOf(file.mimetype) === -1){
//             // console.log("I am here");
//             return `${Date.now()}-blog-${file.originalname} `; 
//             //The return function returns the name of the file along with the date of upload to avoid dublication
//         }
        
//         return {
//             bucketName : "photos",
//             filename : `${Date.now()}-blog-${file.originalname}`
//         }
//         //bucketName = This specifies the name of the bucket where the uploaded file will be stored.
//         //In GridFS (MongoDB's file storage system), files are stored in buckets (which are like folders).

//         //fileName: \${Date.now()}-blog-${file.originalname}``
//         //This dynamically generates a unique file name for the uploaded file.

//     }
// })

// Ensure the 'uploads' directory exists
//const uploadDir = path.join(__dirname, "uploads");


// ✅ File Filter for Allowed Types
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // ✅ Accept the file
    } else {
        cb(new Error("Invalid file type. Only JPG, JPEG, and PNG are allowed."), false);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync('uploads/')) {
            fs.mkdirSync('uploads/', { recursive: true }); // Create directory if it doesn't exist
        }
        cb(null, 'uploads/'); // Save files to 'uploads/' directory
    },
    filename: (req, file, cb) => {
        
        //cb(null,file.fieldname+"-"+Date.now() + path.extname(file.originalname)); // Rename file with timestamp
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});


const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter, // ✅ Restrict file types
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    });

export default upload;
//export default multer({ storage });
//multer is a middleware for handling file uploads in Express.
//It takes an options object, where storage specifies where and how files should be stored.