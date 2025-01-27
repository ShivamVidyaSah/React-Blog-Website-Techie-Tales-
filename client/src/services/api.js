import axios from "axios";

//instaed of making different api 
//we will be using axios interceptors to create a common api

const API_URL = "http://localhost:4000"; // this will store the url where the backend is running

//we are creating an API using axios.create
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout:10000,
    headers:{
        "Content-Type":"application/json"
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
const processResponse = () => {
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
                code:repsonse?.code
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

    }else if(error.request){

    }else{

    }
}