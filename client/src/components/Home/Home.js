import React from 'react';
import {useDispatch} from 'react-redux'
import { useEffect, useState } from 'react';
import {getPostBySearch, getPosts} from '../../actions/posts.js';
import Posts from '../../components/Posts/Posts';
import Form from '../../components/Form/Form';
import Paginate from '../Pagination/Paginate.js';
import {Container, Grow, Grid,Paper, AppBar, TextField, Button, Stack } from "@mui/material"
import { useLocation, useNavigate} from 'react-router-dom';
import Chip from '@mui/material/Chip';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = ({darkMode}) => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get('page') || 1;
  const searchQuery =  query.get('searchQuery');
  const [search, setSearch] = useState('');
  const [locations, setLocations] = useState([]);
  const [currPincode, setCurrPincode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  useEffect(()=>{
    dispatch(getPosts())
  }, [currentId, dispatch]);

  const searchPost = () => {
    // e.preventDefault();
    if(search.trim() || locations){
      dispatch(getPostBySearch({ search, locations: locations.join(',')}));
      navigate(`/posts/search?searchQuery=${search || 'none'}&locations=${locations.join(',')}`);
    } else{
      navigate('/')
    }
  }
  const handleKeyPress = (e) =>{
    if(e.keyCode === 13){
      searchPost();
    }
  }

  const handleAdd = (loc) => setLocations(...locations, loc);

  const handleDelete = (locToDelete) => setLocations(locations.filter((loc)=> loc !== locToDelete))
  return (
    <div>
      <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
              <Grid item xs={12} sm={6} >
                <Posts setCurrentId={setCurrentId} isVerified={isVerified} darkMode={darkMode}/>
              </Grid>
              <Grid item xs={12} sm={4}>
                <AppBar
                sx={{
                  marginTop: '1rem',
                  borderRadius: 4,
                  marginBottom: '1rem',
                  display: 'flex',
                  padding: '16px',
                  backgroundColor: `${darkMode? '#091e47': 'white'}`,
                    color: `${darkMode? 'white': 'black'}`
                }}
                position='static'
                color='inherit'
                >
                  <TextField 
                  name='search' 
                  variant='outlined' 
                  label='Search by location'
                  sx={{
                    marginBottom: '1rem',
                    backgroundColor: `${darkMode? '#091e47': 'white'}`,
                    input: {color: `${darkMode? 'white': 'black'}`},
                    label: {color: `${darkMode? 'white': 'black'}`}
                  }}
                  onKeyDown={handleKeyPress}
                  fullWidth
                  value={search}
                  onChange={(e)=>{setSearch(e.target.value)}}
                  />
                  {/* <Stack label='Search locations'>
                  <Chip
                    style={{ margin: '10px 0'}}
                    value={locations}
                    onAdd={handleAdd}
                    onDelete={handleDelete}
                    variant='outlined'
                  />
                  </Stack> */}
                  <Button variant='contained' onClick={searchPost} color={`${darkMode? 'secondary': 'primary'}`}>Search</Button>
                </AppBar>
                <Form currentId={currentId} setCurrentId={setCurrentId} currPincode={currPincode} setCurrPincode={setCurrPincode} setIsVerified={setIsVerified} darkMode={darkMode}/>
                {/* <Paper
                sx={{
                  borderRadius: 4,
                  padding: '16px',
                  marginLeft: '0rem',
                  marginTop: '1rem'
                }}
                elevation={6}
                >
                  <Paginate/>
                </Paper> */}
              </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  )
}

export default Home
