import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material"
import localwatch from '../../images/localwatch.png'
import {Link, useNavigate, useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import decode from 'jwt-decode'
import './style.css'
const Navbar = () => {
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
        backgroundColor:"white",
        color:'black',
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
        <Typography variant='h2' align='center' component={Link} to='/'
        sx={{
          color: 'black'
        }}>LocalWatch</Typography>
        </div>

        <div>
            <Toolbar>
                {
                    user? (
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{display: 'flex'}}>
                            <Avatar src={user.result.imageUrl} alt={user.result.name}>{user.result.name.charAt(0)}</Avatar>
                            <Typography marginLeft={1} marginTop={0.5} variant='h5' sx={{textDecoration: 'none'}}>{user.result.name}</Typography>
                        </div>
                            <Button variant='contained' color='secondary' onClick={logout} sx={{marginLeft: '2rem'}}>Log Out</Button>
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
