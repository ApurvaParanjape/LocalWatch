import { Avatar, Button, Paper, Grid, Typography, Container, Icon } from '@mui/material'
import React, { useState } from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input';
import { GoogleLogin} from 'react-google-login'
import Gicon from './GIcon';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {signup , signin} from '../../actions/auth'

const initialState = {
    firstName:'',
    lastName:'',
    email:'',
    password: '',
    confirmPassword: '',
}

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData , setFormData] = useState(initialState);
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData);
        if(isSignUp){
            dispatch(signup(formData , navigate))
        }else{
            dispatch(signin(formData , navigate))
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const switchMode = ()=>{
        setIsSignUp((prevIsSignUp)=> !prevIsSignUp);
        setShowPassword(false)
    }

    const googleSuccess = async (res) =>{
        console.log(res)
    }
    
    const googleFailure = (error) =>{
        console.log(error);
        console.log("Unsuccessful")
    }
    return (
        <Container component='main' maxWidth='xs' >
            <Paper elevation={3}
                sx={{
                    marginTop: '4rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '1rem',
                }}
            >
                <Avatar
                    sx={{
                        margin: '1rem',
                        backgroundColor: 'primary',
                    }}
                >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form onSubmit={handleSubmit}
                    style={{
                        width: '100%',
                        marginTop: '1rem',
                    }}
                >
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                    <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignUp && <Input name='confirmPassword' label='Repeat Password' type={showPassword ? 'text' : 'password'} handleChange={handleChange} handleShowPassword={handleShowPassword}/>}
                       
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary'
                        sx={{ marginTop: '1rem' }}
                    >
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                            clientId='778182229201-cb333ju3jho3rtguakqclrh52e2ldsba.apps.googleusercontent.com'
                            render={(renderProps)=>(
                                <Button color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Gicon/>} >
                                    Google Sign In
                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy='single_host_origin'
                            />
                    <Grid container>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? 'Already have an account? Sign In': "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
