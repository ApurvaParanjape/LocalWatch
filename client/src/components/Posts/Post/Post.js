import React from 'react'
import { Card,CardHeader, CardActions, CardContent, CardMedia, Button, Typography, TextField } from '@mui/material'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAltOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import moment from 'moment'
const Post = ({post}) => {
  return (
    <Card sx={{height: 'fit-content', marginTop: "2rem", width: '34rem', backgroundColor: '#f9fce3'}}>
      <div style={{display: 'flex', justifyContent:'space-between'}}>
      <CardHeader
      title={post.creator}
      subheader={moment(post.createdAt).format("MMM Do YY")}
      />
      <Button>
        <MoreHorizIcon/>
      </Button>
      </div>
      <CardContent>
        <Typography>{post.title}</Typography>
        <Typography>Location: {post.location}</Typography>
      </CardContent>
<CardMedia
        component="img"
        height="194"
        image={post.image}
        alt=""
      />
      <CardContent>
        <Typography color="text.secondary" variant='body2'>
          {post.description}
        </Typography>
      </CardContent>

      <CardActions>
        <Button>
        <ThumbUpAltIcon/>
        UpVote
        {post.likeCount}
        </Button>

        <Button>
        <FlagOutlinedIcon/>
        Flag
        {post.flagCount}
        </Button>

        <Button>
        <DeleteIcon/>
        Delete
        </Button>
      </CardActions>
      
    </Card>
  )
}

export default Post
