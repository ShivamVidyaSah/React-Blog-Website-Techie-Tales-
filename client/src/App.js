// import logo from './logo.svg';
import './App.css';
import Login from './components/account/Login';
import Home from "./components/home/Home.jsx";
import DataProvider from './context/DataProvider.jsx';

import Header from './components/header/Header.jsx';
import { useState } from 'react';

import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import CreatePost from './components/create/CreatePost.jsx';
import DetailView from './components/details/DetailsView.jsx';
import Update from './components/create/Update.jsx';
import Profile from './components/Profile/Profile.jsx';
import About from './components/about/About.jsx';
import Contact from './components/contact/Contact.jsx';


//The work of this private route will be to check whether the user is authenticated or not
// if yes only then they can access all the other components, or else they will not be allowed
const PrivateRoute = ({isAuthenticated, ...props}) => {

  // This will check whether the user is authenticated or not, if not then redirect the use to login page
  // otherwise redirect the user is redireted to the home page

  return isAuthenticated ?
   <>
    <Header /> 
    {/* moving this only ensures that the header will appear when the user logs in or else it will not be shown */}

    <Outlet />
   </> 
   : 
   <Navigate replace to='/login'/>
  //the <Navigate/> will ensure that the if the user is someone who is not authenticated, will be navigate
  // to the login screen. <Navigate/> is a component of react router dom

}

function App() {


  const [isAuthenticated, isUserAuthenticated] = useState(false);

  // console.log(isAuthenticated);
  //This state will have to be passes to the login.jsx as we are authenticating the user there.
  // we will pass it as props
  //how this will work, when we refresh the value of isAuthenticated changes to false and we are redirected to the 
  //login page or when we try to type a url and fetch a page, the same thing will happen

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
        {/* we have moved the header component to the private route function because we only 
        want to show the header whn the user is autheticated */}
         <div className="App" style={{marginTop:60}}>
            {/* Here login is the children of DataProvider and that is why we have to pass children as a parameter in 
            DataPrivider function*/}
            <Routes>
              {/* after wraping the components we have to mention the route
              using {Route} */}
              {/* Follow the syntax given below */}
              <Route path ='/login' element={<Login isUserAuthenticated={isUserAuthenticated}/>} />
              {/* Here i am passing the isUserAuthenticated prop to the login cuz there we have authenticated the user */}

                  {/* Now here we have to use url based routing to so that
                  when the url changes the page changes or else if we keep 
                  placing the component one after the other, they will stat displaying
                  in the same page. To implement this functionality,
                  we have to install "npm i react-router-dom". After installing that, we have to 
                  we have to enable it using  a package { BrowserRouter } */}

                  {/* apart from the login route, every route will be a private route. Meaning users should not be able to access those routes directly */}

              <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >


                  {/* The home route is the main route, we will first check whether they are authenticated or not, if authenticated then
                  it will redirect it to home page, that is redirect it to child element <Outlet/>
                   */}
                     <Route path='/' element={<Home/>}/>{/* This route is the main route */}
                    {/* if we have successfully logged in then we will have to navigate the user to the home package
                    so from we will go to the login.jsx file and use {useNavigate}, it is custom hook from reatc-router-dom */}

              </Route>

              <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >

                     <Route path='/create' element={<CreatePost/>}/>{/* This route is the main route */}
                 
              </Route>

              {/* we are passing /details/:id because we want to identify each blog uniquely for it to be displayed,
              hence we arw passing the id */}
              <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
                     <Route path='/details/:id' element={<DetailView/>}/>{/* This route is the main route */}
              </Route>

              {/* we will be updating each blog and to recognize the blog, we need to identify it using the id   */}
              <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
                     <Route path='/update/:id' element={<Update/>}/>{/* This route is the main route */}
              </Route>

              <Route path='/about' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
                     <Route path='/about' element={<About/>}/>{/* This route is the main route */}
              </Route>

              <Route path='/contact' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
                     <Route path='/contact' element={<Contact/>}/>{/* This route is the main route */}
              </Route>


              <Route path='/profile/:username' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
                     <Route path='/profile/:username' element={<Profile />}/>{/* This route is the main route */}
              </Route>



            </Routes> 
        </div>
        </BrowserRouter>
        
      </DataProvider>

  );
}

export default App;
