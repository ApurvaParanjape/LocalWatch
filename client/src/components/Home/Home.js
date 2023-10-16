import React from 'react';
import {useDispatch} from 'react-redux'
import { useEffect, useState } from 'react';
import {getPosts} from '../../actions/posts.js';
import Posts from '../../components/Posts/Posts';
import Form from '../../components/Form/Form';
import {Container, Grow, Grid } from "@mui/material"


const Home = () => {
    const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(()=>{
    dispatch(getPosts())
  }, [currentId, dispatch]);
  return (
    <div>
      <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
              <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId}/>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId}/>
              </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  )
}

export default Home
