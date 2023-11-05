import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material"
import localwatch from '../../images/localwatch.png'
import {Link, useNavigate, useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import decode from 'jwt-decode'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import './style.css'
const Navbar = ({darkMode, setDarkMode}) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation();
  const logout = () =>{
    dispatch({ type: 'LOGOUT'});

    navigate("/auth");

    setUser(null);
  }
  useEffect(()=>{
    const token = user?.token;

    if(token) {
      const decodedToken = decode(token);

      if(decodedToken.exp* 1000 < new Date().getTime()){
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem('profile')))
  },[location])
  return (
    <div>
      <AppBar 
      position='static' 
      sx={{
        textAlign: 'left',
        borderRadius: "1rem",
        width: "100%",
        text:'white',
        backgroundColor:`${darkMode? '#031537': 'white'}`,
        color:`${darkMode? 'white': 'black'}`,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: '0',
        marginRight: '0'
      }}>
        <div className='app_heading'>
        <img src={localwatch} alt="LocalWatch" height="60"
        style={{marginLeft: '15px'}}/>
        <Typography variant='h3' component={Link} to='/'
        sx={{
          color: `${darkMode? 'white': 'black'}`,
          textDecoration: 'none',
          marginBottom: '1rem'
        }}>LocalWatch</Typography>
        </div>

        <div>
            <Toolbar>
                {
                  user? (
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{display: 'flex'}}>
                        <DarkModeIcon sx={{marginRight: '23px', fontSize: '2rem', cursor: 'pointer', color:`${darkMode? 'white': 'black'}`}} onClick={()=> setDarkMode(!darkMode)}/>
                            <Avatar src={user.result.imageUrl} alt={user.result.name}>{user.result.name.charAt(0)}</Avatar>
                            <Typography marginLeft={1} marginTop={0.5} variant='h6' sx={{textDecoration: 'none'}}>{user.result.name}</Typography>
                        </div>
                            <Button variant='contained' color={`${darkMode? 'secondary': 'primary'}`} onClick={logout} sx={{marginLeft: '2rem'}}>Log Out</Button>
                      </div>
                    ): (
                        <Button variant='contained' component={Link} to='/auth'>Sign In</Button>
                    )   
                }
            </Toolbar>
        </div>
      </AppBar>
    </div>
  )
}

export default Navbar
