import './App.css'
import {Container} from "@mui/material"
import localwatch from './images/localwatch.png'
import Navbar from './components/Navbar/Navbar';
import{ 
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

function App() {
  return (
    <Router>
    <Container maxWidth='100%'>
      <Navbar/>
      <Routes>
      <Route path='/' exact Component={Home}/>
      <Route path='/auth' exact Component={Auth}/>

      </Routes>
    </Container>
    </Router>
  );
}

export default App;
