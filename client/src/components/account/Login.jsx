import { useState } from "react";
//We will using Material Ui for design components
//Website -> mui.com, then we install
//importing "Box" from "Material UI"

// We will be working with functional components
// and not class based components


import { Box, TextField, Button, styled, Typography } from "@mui/material";

//Handling styling in Material UI is a little complex.
// We have to use the "styled" component. First we import the "styled" component
//Then use the following type example to implement it

//See how in the following example we declare it like we are calling a function
//"Styledbox" store all the necessary css that we are applying to the desired component, 
//in this case it is "Box", after we apply our css we have to change the name of the component
//with the name of the variable storing the css, like in this case "Box" gets replace by "StyledBox"
// Remember to start the variable name with an uppercase letter

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


//Now to store the values of username, name and password coming from the form, we have to create an object that will
//store the values and will have to store this object in a state
const signUpInitialValues = {
    name:'',
    username:'',
    password:''
}

const Login = () =>{

    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';


    const [account, toggleAccount] = useState("login");
    //a state is read-only, you cannot directly change it from anywhere
    // you have to use the states function, in this case it is "toggleAccount"


    const [signup,  setSignUp] = useState(signUpInitialValues);

    const toggleSignUp = (bool) =>{
        
        if(bool){
            toggleAccount("signup");
        }else{
            toggleAccount("login");
        }
    }

    // the onInputchange function is accepting an event "e" and we can access the values
    // using e.target.name for the names and e.target.value for the values.
    //we will pass the values in key value pairs to the signUpInitialValues object
    // and to prevent it from overriding previous value we will pass "...signup" before the key and values
    // as show in the code below
    //[e.target.name] = key and e.target.value=value.
    //the key has to be in square brakets
    const onInputchange = (e) =>{
            signUpInitialValues({...signup,[e.target.name]:e.target.value});
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
                            <TextField variant="standard" onChange={(e) => onInputchange(e)} name="username" label="Enter UserName"/>
                            <TextField variant="standard" onChange={(e) => onInputchange(e)} name="password" label="Enter Password"/>
                            <Loginbtn variant="contained" >Login</Loginbtn>
                            {/* Typography renders a <p> tag by deafult, can he changed to h1,h2 etc */}
                            <Typography style={{textAlign:"center",color:878787, fontSize:12}}>OR</Typography> 
                            <SignUpBtn variant="text" onClick={()=>toggleSignUp(true)}>Sign Up</SignUpBtn>
                        </FormStyle>
                    :
                        
                        <FormStyle>
                            <TextField variant="standard" onChange={(e) => onInputchange(e)} name="name" label="Enter Name"/>
                            <TextField variant="standard" onChange={(e) => onInputchange(e)} name="username" label="Enter Username"/>
                            <TextField variant="standard" onChange={(e) => onInputchange(e)} name="password" label="Enter Password"/>
                            <SignUpBtn variant="contained">Signup</SignUpBtn>
                            {/* Typography renders a <p> tag by deafult, can he changed to h1,h2 etc */}
                            <Typography style={{textAlign:"center",color:878787, fontSize:12}}>OR</Typography> 
                            <Loginbtn variant="text" onClick={() => toggleSignUp(false)}>Already have an account?</Loginbtn>
                        </FormStyle>
                }
            </Box>
        </Styledbox>
    )
}

export default Login;