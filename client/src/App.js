import './App.css'
import {Container} from "@mui/material"
import localwatch from './images/localwatch.png'
import Navbar from './components/Navbar/Navbar';
import{ 
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import UserDetails from './components/UserDetails/UserDetails';
import { useState } from 'react';

function App() {
  const user = JSON.parse(localStorage.getItem('profile'));
  console.log("User")
  console.log(user)
  const [darkMode, setDarkMode] = useState(false)
  return (
    <Router>
    <Container maxWidth='xl' sx={{backgroundColor: `${darkMode? '#04163a': '#e6e6ff'}`, minHeight: "100vh"}}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode}/>
      <Routes>
      <Route path='/' exact Component={()=> <Navigate to='/posts'/>}/>
      <Route path='/posts' exact element={<Home darkMode={darkMode}/>}/>
      <Route path='/posts/search' exact element={<Home darkMode={darkMode}/>}/>
      <Route path='/userDetails' exact element={<UserDetails darkMode={darkMode}/>}/>
      <Route path='/auth' exact Component={()=>(!user ? <Auth/> : <Home/>)}/>

      </Routes>
    </Container>
    </Router>
  );
}

export default App;
