//We can store all our API NOTIFICATION MESSAGES
//and our APIs

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
// we can send params as well with values ['true','false'] and
// query with value ['true','false']
export const SERVICE_URLS ={
    
    //This API is for the signupUser function, this api sends a post request to the /signup route
    userSignup: { url:"/signup", method:'POST'},

    //This API is for the loginUser function, this api sends a post request to the /login route
    userLogin: { url:"/login", method: 'POST'},

    //This api is for image upload for the Create blog option, this api sends a post request to the /file/upload route
    uploadFile: {url:"/file/upload", method:'POST'},

    createPost: {url:"create", method:'POST'},

    getAllPosts: {url:"/posts", method:'GET', params: true},

    getPostById: { url:'/post', method:'GET', query: true},
    
    updatePost: { url:'/update', method:'PUT', query:true},

    deletePost: {url:'/delete', method:'DELETE', query: true}

}
