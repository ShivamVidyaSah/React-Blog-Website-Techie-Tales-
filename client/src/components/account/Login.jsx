import { useState, useContext } from "react";
//useContext is a React Hook that lets you read and subscribe to context from your component.

//We will using Material Ui for design components
//Website -> mui.com, then we install
//importing "Box" from "Material UI"

// We will be working with functional components
// and not class based components


import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { API } from "../../services/api.js"

import { DataContext } from "../../context/DataProvider.jsx";
//Handling styling in Material UI is a little complex.
// We have to use the "styled" component. First we import the "styled" component
//Then use the following type example to implement it

//See how in the following example we declare it like we are calling a function
//"Styledbox" store all the necessary css that we are applying to the desired component, 
//in this case it is "Box", after we apply our css we have to change the name of the component
//with the name of the variable storing the css, like in this case "Box" gets replace by "StyledBox"
// Remember to start the variable name with an uppercase letter


import { useNavigate } from "react-router-dom";
//this will help us in navigating throughout the app using routes

const Styledbox = styled(Box)`
    width:400px;
    margin:auto;
    box-shadow:6px 6px 6px 2px rgb(0 0 0/ 0.3)
`;

// but suppose you wanna style an html element, 
// then you have to pass it as a string or you'll get an error
// and for the css, you will have to pass it as an object and not under backtik
// we can use backtik only with the Material UI components
const Image = styled("img")({
    width: 100, // we do not have to write 'px', it is taken by default
    margin:'auto', //works only with display: flex
    display:'flex',
    padding:'50px 0 0'
});

const FormStyle = styled(Box)`
    padding:25px 35px;
    display:flex;
    flex:1;
    flex-direction:column;
    justify-content:space-between;

    // if we want to enter css in the child via parent, we have to do
    // we will be rendering directly into the html element that will be rendered
    // on the front-end part and not on the Material UI components, or else we will 
    //have to individually apply css to each material ui components
    & > div, & > button, & > p{
        margin-top:20px;
    },
`;

const Loginbtn = styled(Button)`
    text-transform:none;
    height:48px;
    background:#574964;
    color:#fff;
`;

const SignUpBtn = styled(Button)`
    text-transform:none;
    height:48px;
    background-color:#fff;
    color:black;
    box-shadow: 0 2px 2px 0 rgb(0 0 0/20%);
`

const Error = styled(Typography)`
    font-size:10px;
    color:#ff6161;
    line-height:0;
    margin-top:10px;
    font-weight:600;
`

//Now to store the values of username, name and password coming from the form, we have to create an object that will
//store the values and will have to store this object in a state
const signUpInitialValues = {
    name:'',
    username:'',
    password:''
}

//Now to store the values of username, name and password coming from the form, we have to create an object that will
//store the values and will have to store this object in a state
const loginInitiatlValue = {
    username:'',
    password:''
}

const Login = () =>{

    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';


    const [account, toggleAccount] = useState("login");
    //a state is read-only, you cannot directly change it from anywhere
    // you have to use the states function(toogleAccount), in this case it is "toggleAccount"


    const [signup,  setSignUp] = useState(signUpInitialValues);

    const [login, setLogin] = useState(loginInitiatlValue);

    const [error, setError] = useState("");
    //This will keep a track of the error while signing up to display 
    //it to the user

    const {setAccount} = useContext(DataContext);
    // useContext returns an object containing the values that were provided in DataContext.Provider.
    // { setAccount } is destructuring this object to extract only the setContext function.

    const navigate = useNavigate(); // here we are initializing the useNavigate hook

    const toggleSignUp = (bool) =>{
        
        if(bool){
            toggleAccount("signup");
        }else{
            toggleAccount("login");
        }
    }

    // the onInputchange function is accepting an event "e" and we can access the values
    // using e.target.name for the names and e.target.value for the values.
    //we will pass the values in key value pairs to the setSignUp state function 
    // and to prevent it from overriding previous value we will pass "...signup" before the key and values
    // as show in the code below
    //[e.target.name] = key and e.target.value=value.
    //the key has to be in square brakets
    const onInputchange = (e) =>{
            setSignUp({...signup,[e.target.name]:e.target.value});
    }

    // using the below function we will call the api file located in services
    const signupUser = async() => {
        try{
        //i am calling the api from here and passing the the state that stores 
        // the signup values and the storing the value in a variable
        let response = await API.userSignup(signup);
        //[NOTE: Whenever we hit the sign up button we will get a cors error,
        //we get that error when server and client are running on different server ports
        // to handle that, we need to install a dependency called "cors" and 
        // use it as a function in the "server/index.js" file]
        if(response.isSuccess){
            //if we get the response as success the we are assigning 
            //the "signup" state the initial values of "signUpInitialValues"
            setSignUp(signUpInitialValues);
            //and changing the signup screen to login screen
            toggleAccount("login");
        }else{
            //but incase of an error we are using a new state named "error"
            setError("Something went wrong, please try again later");
        } 
        }
        catch(error){
            console.log("Error occured while signing up");
            setError("Something went wrong, please try again later");
        }
    }

    //This onValuechange will handle the login part
    const onValuechange = (e) => {
            setLogin({...login, [e.target.name]:e.target.value});
    }

    //All the functionality will be similar to signupUser function with some
    //necessary changes as this function is for the login purpose
    const loginUser = async() => {
        try{

            let response = await API.userLogin(login);

            if(response.isSuccess){
                //if login is a success, then we have to empty the error state
                //so that no error gets displayed
                setError(' ');
               
                //whatever repsonse(accessToken or refreshToken) we are getting, we will be storing it in sessionStorage
                // we are getting this form the processResponse in api.js
                sessionStorage.setItem('accessToken' , `Bearer ${response.data.accessToken}`);
                sessionStorage.setItem('refreshToken' , `Bearer ${response.data.refreshToken}`);

                //the processResponse also sends us name and username, we will have to store them as well
                // so that we can use them inside the project whenever we need, we will use context api for that
                // with the help fo context api we can store the informatioin globally and pass it within  components
                // whenever required

                setAccount({username: response.data.username, name: response.data.name});
                //Now that we are setting the response data to Account state in DataProvider.jsx, we can use it globally without an issues 
                // we just have to import and use
            }

        }catch(error){
            setError("Something went wrong, please try again later");
        }
    }

        return (
        //In mui, Box act as replacement for Div
        //Box are similar to div in functionality and renders 
        // a div in the front-end
        <Styledbox>
            <Box>
                <Image src={imageURL} alt="Brand Image" />
                
                        {/* TextField and Button is another component from Material UI
                        Allows us to take input from the user. Material UI has
                        different types of text field, visit mui.com to know more  */}

                {
                    account === "login" ?
                        
                        <FormStyle>
                            {/* with the onchange event, we are trying to catch any changes to the input field */}
                            {/*we are also making this a controlled component using values={login.username} and the same for password*/}
                            <TextField variant="standard" values={login.username} onChange={(e) => onValuechange(e)} name="username" label="Enter UserName"/>
                            <TextField variant="standard" values={login.password} onChange={(e) => onValuechange(e)} name="password" label="Enter Password"/>
                            <Loginbtn variant="contained" onClick={()=>loginUser()}>Login</Loginbtn>
                            {/* Typography renders a <p> tag by deafult, can he changed to h1,h2 etc */}
                            {error && <Error>{error}</Error>}
                            <Typography style={{textAlign:"center",color:878787, fontSize:12}}>OR</Typography> 
                            <SignUpBtn variant="text" onClick={()=>toggleSignUp(true)}>Sign Up</SignUpBtn>
                        </FormStyle>
                    :
                        
                        <FormStyle>
                            <TextField variant="standard" onChange={(e) => onInputchange(e)} name="name" label="Enter Name"/>
                            <TextField variant="standard" onChange={(e) => onInputchange(e)} name="username" label="Enter Username"/>
                            <TextField variant="standard" onChange={(e) => onInputchange(e)} name="password" label="Enter Password"/>
                            <SignUpBtn onClick={()=>signupUser()}variant="contained">Signup</SignUpBtn>
                            {/* this onclick will call the function which inturn will call the api for signup */}
                            {/* Typography renders a <p> tag by deafult, can he changed to h1,h2 etc */}
                            {error && <Error>{error}</Error>}
                            {/*The above code will check, whether there is an error whiling signing up or not
                            if there is, it will then only show the desired message */}
                            <Typography style={{textAlign:"center",color:878787, fontSize:12}}>OR</Typography> 
                            <Loginbtn variant="text" onClick={() => toggleSignUp(false)}>Already have an account?</Loginbtn>
                        </FormStyle>
                }
            </Box>
        </Styledbox>
    )
}

export default Login;