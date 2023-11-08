import React from 'react'
import { Card,CardHeader, CardActions, CardContent, CardMedia, Button, Typography, TextField, Avatar } from '@mui/material'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import FlagIcon from '@mui/icons-material/Flag';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VerifiedIcon from '@mui/icons-material/Verified';
import moment from 'moment'
import {useDispatch} from 'react-redux';
import { deletePost, likePost , flagPost} from '../../../actions/posts.js'
const Post = ({post, setCurrentId,darkMode}) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon color='primary' fontSize="small" /></>
        ) : (
          <><ThumbUpAltOutlinedIcon color='primary' fontSize="small" /></>
        );
    }else{

      return <><ThumbUpAltOutlinedIcon fontSize="small" /></>
    }

  };

  const Flag = () => {
    if (post.flag.length > 0) {
      return post.likes.find((flag) => flag === (user?.result?.googleId || user?.result?._id))
        ? (
          <><FlagIcon color='error' fontSize="small" /></>
        ) : (
          <><FlagOutlinedIcon color='error' fontSize="small" /></>
        );
    }else{

       return <><FlagOutlinedIcon fontSize="small" /></>
    }

  };

  return (
    <Card raised elevation={6} sx={{height: 'fit-content', marginTop: "2rem",marginBottom: "1rem", width: '34rem',backgroundColor: `${darkMode? '#091e47': 'white'}`,
    color: `${darkMode? 'white': 'black'}`, boxShadow: 3}}>
      <div style={{display: 'flex', justifyContent:'space-between'}}>
      <CardHeader
      avatar={
        <Avatar>{post.name.slice(0,1)}</Avatar>
      }
      title={post.name}
      subheader={<Typography sx={{color: `${darkMode? 'white': 'black'}`, fontSize: '0.75rem'}} variant='body2'>{moment(post.createdAt).format("MMM Do YY")}</Typography>}
      />
      {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
      <Button onClick={()=> setCurrentId(post._id)}>
        <EditIcon />
      </Button>
      )}
      </div>
      <CardContent>
        <Typography sx={{fontWeight: 600, fontSize: '1.7pc'}}>{post.title}</Typography>
        <Typography sx={{fontSize: '1.3pc'}}>Location: {post.location}</Typography>
      </CardContent>
<CardMedia
        component="img"
        height="194"
        image={post.image}
        alt=""
      />
      <CardContent>
        <Typography variant='body' sx={{fontSize: '1.1pc',color: `${darkMode? 'white': 'black'}`}}>
          {post.description}
        </Typography>
      </CardContent>

      <CardActions sx={{display: 'flex', justifyContent:'space-between'}}>
        <div>
        <Button onClick={() => dispatch(likePost(post._id))}
        disabled={!user?.result}>
        <Likes />
        
        {post.likes.length}
        </Button>

        <Button onClick={() => dispatch(flagPost(post._id))}
        disabled={!user?.result}>
        <Flag />
        
        {post.flag.length}
        </Button>

        {
          (post.isVerified) && <Button>
            <VerifiedIcon color='success'/>
          </Button>
        }
        </div>

      {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <div>
        <Button onClick={()=> dispatch(deletePost(post._id))}>
        <DeleteIcon/>
        Delete
        </Button>
        </div>
      )}
      </CardActions>
      
    </Card>
  )
}

export default Post
