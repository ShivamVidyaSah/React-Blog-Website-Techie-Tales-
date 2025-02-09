// import logo from './logo.svg';
import './App.css';
import Login from './components/account/Login';
import Home from "./components/home/Home.jsx";
import DataProvider from './context/DataProvider.jsx';

import Header from './components/header/Header.jsx';
import { useState } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


//The work of this private route will be to check whether the user is authenticated or not
// if yes only then they can access all the other components, or else they will not be allowed
const PrivateRoute = () =>{

  return isAuthenticated ? <></> : <Navigate replace to='/login'/>
  //the <Navigate/> will ensure that the if the user is someone who is not authenticated, will be navigate
  // to the login screen. <Navigate/> is a component of react router dom

}

function App() {


  const [isAuthenticated, isUserAuthenticated] = useState(false);
  //This state will have to be passes to the login.jsx as we are authenticating the user there.
  // we will pass it as props

  return (
   
      // // {/* Wrapping the component with the context */}
      // {/* in react we can pass properties inside a component in two ways. 
      // One as a "prop" and second as a "children" */}
      // {/* Anything written after the element name is prop fr. eg <DataProvider prop></DataProvider>
      // and anything written within the tags is a childer */}
      <DataProvider>
        {/* Adding browser router will enable routing throughout the application */}
        {/* After routing th entire thing wil browser router, we have to wrap the components
        where we want routing to happen with " {Routes} */}
        <BrowserRouter>
        <Header />
         <div className="App" style={{marginTop:60}}>
            {/* Here login is the children of DataProvider and that is why we have to pass children as a parameter in 
            DataPrivider function*/}
            <Routes>
              {/* after wraping the components we have to mention the route
              using {Route} */}
              {/* Follow the syntax given below */}
              <Route path ='/login' element={<Login isUserAuthenticated={isAuthenticated}/>} />
              {/* Here i am passing the isAuthenticated state to the login cuz there we have authenticated the user */}

                  {/* Now here we have to use url based routing to so that
                  when the url changes the page changes or else if we keep 
                  placing the component one after the other, they will stat displaying
                  in the same page. To implement this functionality,
                  we have to install "npm i react-router-dom". After installing that, we have to 
                  we have to enable it using  a package { BrowserRouter } */}
              <Route path='/' element={<Home/>}/>
              {/* if we have successfully logged in then we will have to navigate the user to the home package
              so from we will go to the login.jsx file and use {useNavigate}, it is custom hook from reatc-router-dom */}
            </Routes> 
        </div>
        </BrowserRouter>
      </DataProvider>
  );
}

export default App;
