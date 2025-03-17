//Making connection with MongoDB database using mongoose

import mongoose from "mongoose";



// this function will help us connect to the database using the in-built 
// function of mongoose called "mongoose.connect"
// the username & password are coming from the file where the file was saved
const Connection = async (URL) => {

    //but directly sharing my databases username and password in the url is not a good practice at all
    //to prevent that we will use "dotenv" dependency

    try{
        
        // the .connect function is an async function which returns a promise.
        // thus we have to use "async and await"
        // the .connect function takes two parameter
        // 1. connection string that is the url
        // 2. "useNewUrlParser: true" which tell mongodb that your old parseUrl
        // got depricated and please use this new parser 
        await mongoose.connect(URL, {useNewUrlParser:true});
        console.log("Database connected successfully");
    }catch(error){
        console.log("Error while connecting ", error);
    }
}


export default Connection;