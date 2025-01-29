// this is the main file for the backend - the entry point

import express from "express";
import Connection from "./database/db.js";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
//importing the dotenv dependency here and storing the files from the 
//.env file to variable that can be passed as parameters in the
// Connection() function
import Router from "./routes/routes.js";
//importing the routes.js file to use it


const app = express();
dotenv.config(); //Config. config will read your .env file, 
// parse the contents, assign it to process.env , and return 
// an Object with a parsed key containing the loaded content 
// or an error key if it failed

const port = 4000;

app.use(cors()); 
//the above line helps us handle any cors errors

app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

app.use("/", Router);
// the app.use adds a  middleware to the application request.
//the flows go like if there is no specified route give (eg: "/")
// then it will call the Router. This will call the "router" in routers.js
//and then router.post("/signup", signupUser) route --> which will pass
//the request to user-controller's signupUser function to perform some task

app.listen(port, function(err){
    if(err){
        console.log(err.message);
    }else{
    console.log(`Server running on port ${port}`);
    }
})

//Storing my username and password from the parsed .env file
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

//after server started running on 4000, we call the connection function to initiate the connection to database
Connection(USERNAME,PASSWORD);