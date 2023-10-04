import React from 'react'
import Post from './Post/Post'
import {useSelector} from 'react-redux'
import { CircularProgress, Grid, Container } from '@mui/material'

const Posts = ({setCurrentId}) => {
  const posts = useSelector((state)=> state.posts);

  console.log(posts)
  return (
    !posts.length ? <CircularProgress/> : (
      <Container sx={{height: 'fit-content'}}>
        {posts.map((post)=>(
          <Container key={post._id}>
          <Post post={post} setCurrentId={setCurrentId}/>
          </Container>
        ))}
      </Container>
    )
  )
}

export default Posts
