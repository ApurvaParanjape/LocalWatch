import React from 'react'
import Pagination from '@mui/material/Pagination';
import { PaginationItem } from '@mui/material';
import {Link} from 'react-router-dom';

const Paginate = () => {
  return (
    <Pagination component="ul" 
        sx={{ justifyContent: 'space-around'}}
        count={5}
        page={1}
        variant='outlined'
        color='primary'
        renderItem={(item)=>(
            <PaginationItem {...item} component={Link} to={`/posts?page${1}`}/>
        )}
    />
  );
};

export default Paginate
