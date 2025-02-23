
//This file returns the accessToken that is stored in the sessionStorage
export const getAccessToken = () => {
    return sessionStorage.getItem('accessToken');
}