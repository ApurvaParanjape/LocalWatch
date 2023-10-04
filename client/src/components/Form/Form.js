import React, { useEffect, useState } from 'react'
import { TextField, Button, Typography, Paper} from '@mui/material'
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost , updatePost } from '../../actions/posts';

const Form = ({currentId, setCurrentId}) => {
  const [postData, setPostData]= useState({
    creator: '',
    title: '',
    description: '',
    location: '',
    image: ''
  })
  const dispatch = useDispatch();
  const post = useSelector((state)=> currentId ? state.posts.find((p)=> p._id === currentId): null);

  useEffect(()=>{
    if(post) setPostData(post);
  },[post])

  const handleSubmit = (e)=>{
    e.preventDefault();

    if(currentId){
      dispatch(updatePost(currentId, postData))
    }else{
      dispatch(createPost(postData))
    }
    clear();

  }
  const clear = () =>{
    setCurrentId(null);
    setPostData({
      creator: '',
      title: '',
      description: '',
      location: '',
      image: ''
    })
    
  }

  return (
    <Paper sx={{
      width: "25rem",
      padding: "2rem",
      margin: "2rem"
    }}>
    <form autoComplete='off' noValidate onSubmit={handleSubmit} style={{ display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',}}>
      <Typography variant='h6'>{currentId? 'Edit' : 'Create'} a Post</Typography>
      <TextField sx={{marginBottom: '0.5rem'}} name='creator' variant='outlined' label='Creator' fullWidth value={postData.creator} 
      onChange={(e)=> setPostData({...postData, creator: e.target.value})}/>

      <TextField sx={{marginBottom: '0.5rem'}} name='title' variant='outlined' label='Title' fullWidth value={postData.title} 
      onChange={(e)=> setPostData({...postData, title: e.target.value})}/>

      <TextField sx={{marginBottom: '0.5rem'}} name='description' variant='outlined' label='Description' fullWidth value={postData.description} 
      onChange={(e)=> setPostData({...postData, description: e.target.value})}/>

      <TextField sx={{marginBottom: '0.5rem'}} name='location' variant='outlined' label='Location' fullWidth value={postData.location} 
      onChange={(e)=> setPostData({...postData, location: e.target.value})}/>

      <div style={{marginLeft: '1rem'}}>
        <FileBase  type="file"  multiple={false} onDone={({ base64 }) => setPostData({ ...postData, image: base64 })}/>
      </div>
      <Button sx={{marginBottom: "1rem", marginTop: "2rem"}} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
      <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>  
    </Paper>
  )
}



export default Form
