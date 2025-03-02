
//This file returns the accessToken that is stored in the sessionStorage
export const getAccessToken = () => {
    return sessionStorage.getItem('accessToken');
}

//This fuction will be use to add elipsis to extra long string
export const addEllipsis = (str, limit) => {

    return str.length > limit ? str.substring(0,limit)+"..." : str;

}

//using this function we are checking whether we are getting params or queries
export const getType = (value,body) => {
    //If value contains a params property, the function returns an object with params set to body.
    //✅ Effect: The body will be sent as query parameters (?key=value).
    if(value.params){
        return {params:body};
    }
    //If value contains query:
     //If body is an object, return { query: body._id }.
     //Otherwise, return { query: body }.
    else if(value.query){
        if(typeof body === 'object'){
            return { query: body._id}
        }else{
            return { query: body }
        }
    }

    return {};
}