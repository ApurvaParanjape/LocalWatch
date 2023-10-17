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

function App() {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <Router>
    <Container maxWidth='xl'>
      <Navbar/>
      <Routes>
      <Route path='/' exact Component={()=> <Navigate to='/posts'/>}/>
      <Route path='/posts' exact Component={Home}/>
      <Route path='/posts/search' exact Component={Home}/>
      <Route path='/user/:id' exact Component={UserDetails}/>
      <Route path='/auth' exact Component={()=>(!user ? <Auth/> : <Navigate to="/posts"/>)}/>

      </Routes>
    </Container>
    </Router>
  );
}

export default App;
