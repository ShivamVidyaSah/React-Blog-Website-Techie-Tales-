// this is the main file for the backend - the entry point

import express from "express";
import Connection from "./database/db.js";
import dotenv from "dotenv";
//importing the dotenv dependency here and storing the files from the 
//.env file to variable that can be passed as parameters in the
// Connection() function

dotenv.config();
const app = express();
const port = 4000;


app.listen(port, function(err){
    if(err){
        console.log(err.message);
    }else{
    console.log(`Server running on port ${port}`);
    }
})

//Storing my username and password from the .env file
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

//after server started running on 4000, we call the connection function to initiate the connection to database
Connection(USERNAME,PASSWORD);