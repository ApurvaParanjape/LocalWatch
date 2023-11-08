import { Container, Paper, Avatar, Grid, Typography, List, ListItem, Box, Button } from '@mui/material';
import { dark } from '@mui/material/styles/createPalette';
import React from 'react'
import { useNavigate } from 'react-router-dom';
const UserDetails = ({darkMode}) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const navigate= useNavigate()
  return (
    <Container maxWidth='xs' >
      <Paper elevation={3}
        sx={{
          marginTop: '4rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1rem',
          backgroundColor: `${darkMode? '#091e47': 'white'}`,
          color: `${darkMode? 'white': 'black'}`

        }}>
        <Avatar
          sx={{
            margin: '1rem',
            backgroundColor: 'primary',
          }}
        >
          {user.result.name.slice(0, 1)}
        </Avatar>

          <Box  alignContent='center'>

            {/* <Typography>{user.result.name}</Typography>
            <br/>
            <br/>
            <br/>
            <Typography>{user.result.email}</Typography> */}

            <List >
              <ListItem>Name: {user.result.name}</ListItem>
              <ListItem>Email: {user.result.email}</ListItem>
            </List>
        
          </Box>
            <Button variant='contained' marginTop='1rem' color={`${darkMode? 'secondary': 'primary'}`} onClick={()=> navigate("/posts")}>Back To Home</Button>

      </Paper>

    </Container>
  )
}

export default UserDetails
