
import './App.css'
import {Container, AppBar, Typography, Grow, Grid } from "@mui/material"
import localwatch from './images/localwatch.png'
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
function App() {
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
        <Typography variant='h2' align='center'
        sx={{
          color: 'black'
        }}>LocalWatch</Typography>
        <img src={localwatch} alt="LocalWatch" height="60"
        style={{marginLeft: '15px'}}/>
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
