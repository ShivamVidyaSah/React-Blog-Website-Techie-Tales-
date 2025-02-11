import axios from "axios";
import { API_NOTIFICATION_MESSAGE, SERVICE_URLS } from "../constants/config.js";

//instaed of making different api 
//we will be using axios interceptors to create a common api

const API_URL = "http://localhost:4000"; // this will store the url where the backend is running

//we are creating an API using axios.create
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout:10000,
    headers:{
        "content-Type":"application/json"
    }
})

// we will use one interceptor for request 
axiosInstance.interceptors.request.use(
    function(config){ //successfull response
        return config;
    },
    function(error){ //if error
        return Promise.reject(error);
    } 
)

//and one for response
axiosInstance.interceptors.response.use(
    //we can use this to stop the global loader here
    //for either successfull response or error
    function(response){
        return processResponse(response);
    },
    function(error){
        return Promise.reject(processError(error));
    } 
)


//if response = success -> we can return { isSuccess: true, data: in the form of an object}
// if response = failed -> we can return { isFailure : true, status:string, msg:string, code:int}
const processResponse = (response) => {
    if(response?.status === 200){
        
        return { isSuccess: true, data: response.data}
    }else{
        return { isFailure:true, 
                 status:response?.status,
                 //Retrieves the status property from the response object if it exists.
                 //The ?. is the optional chaining operator, which safely accesses response.
                 // status without throwing an error if response is undefined or null.
                 msg: response?.msg,
                 //Extracts a descriptive message (msg) from the response object, if it exists.
                 //This is typically used to provide human-readable feedback about the error
                code: response?.code
                //Retrieves a specific error code from the response object, if available.
                //Error codes are often used to classify or handle errors programmatically
                //(e.g., 1001 for validation errors, 5001 for server errors).
            }
    }
}


const processError = (error) => {
    //error can of three types
    //1. we get a response in the error
    //2. we get a request in the error
    //3. or we simply get an error
    if(error.response){
        //this occurs when request is made successfully but the 
        //server responded with a status code other than the range
        //of 200
        //console.log('Error in response ', error.toJSON());
        return{
            isError:true,
            msg:API_NOTIFICATION_MESSAGE.responseFailure,
            code:error.response.status
        }

    }else if(error.request){
        //request made but no response was received
        return{
            isError:true,
            msg:API_NOTIFICATION_MESSAGE.requestFailure,
            code:"" // they do not get any status code as requet is not send to the backend
        }
    }else{
        //something happened in the setting up the request
        // that triggers an error
        return{
            isError:true,
            msg:API_NOTIFICATION_MESSAGE.networkError,
            code:"" // they do not get any status code as requet is not send to the backend
        }
    }
}

const API = {};

//this loop will give me each object of the SERVICE_URLS in the form of key value pairs
for( const [key,value] of Object.entries(SERVICE_URLS) ){
    //the showUploadProgress and showDownloadProgress is used to show the
    // progress bar that goes from 0 - 100%
    // when you call the api it shows 1% then slowly downloadsProgress increases
    //and we are using a body as this is POST request
    //with this we will be calling the "userSignup" in the config.js file
    //where "userSignup" is the key and the url and method are the values
    API[key] = (body, showUploadProgress, showDownloadProgress) => 
        // console.log("I am in api");
        axiosInstance({
            method:value.method,
            url:value.url,
            data:body,
            responseType:value.responseType,
            onUploadProgress:function(progressEvent){
                if(showUploadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100)/ progressEvent.total) 
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress:function(progressEvent){
                if(showDownloadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100)/ progressEvent.total) 
                    showDownloadProgress(percentageCompleted);
                }
            }
        })

       
    }

export { API }; 