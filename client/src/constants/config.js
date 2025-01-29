//We can store all our API NOTIFICATION MESSAGES

export const API_NOTIFICATION_MESSAGE = {
    loading:{
        title:"loading...",
        meaasge:"Your data is being loaded"
    },
    success:{
        title:'success',
        message:'data successfully loaded'
    },
    responseFailure:{
        title:'Error',
        message:'An error occur while fetching from the server, please try again'
    },
    requestFailure:{
        title:'Error',
        message:'Error occured while parsing data'
    },
    networkError:{
        title:'Error',
        message:'Unable to connect with the server, please check internet connectivity and try again later'
    }
}

//we can also store our API service calls
// while making a service call, we need to provide the url and end point
// fr eg. url endpoint:- '/signup' and method:- ['POST','GET','PUT','DELETE'], 
//can be any one of the 4 methods
// we can params as well with values ['true','false'] and
// query with value ['true','false']
export const SERVICE_URLS ={
    userSignup: { url:"/signup", method:'POST'}
}