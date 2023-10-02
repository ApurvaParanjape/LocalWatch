
import './App.css'
import {Container, AppBar, Typography, Grow, Grid } from "@mui/material"
import localwatch from './images/localwatch.png'
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import {useDispatch} from 'react-redux'
import { useEffect } from 'react';
import {getPosts} from './actions/posts.js'

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getPosts())
  }, [dispatch]);

  
  return (
    <Container maxWidth="100%">
      <AppBar 
      position='static' 
      
      sx={{
        width: "100%",
        text:'white',
        backgroundColor:"white",
        color:'black',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <img src={localwatch} alt="LocalWatch" height="60"
        style={{marginLeft: '15px'}}/>
        <Typography variant='h2' align='center'
        sx={{
          color: 'black'
        }}>LocalWatch</Typography>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
              <Grid item xs={12} sm={7}>
                <Posts/>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form/>
              </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
