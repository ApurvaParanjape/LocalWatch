import * as api from '../api'
import {FETCH_ALL, CREATE, DELETE, UPDATE, FLAG, LIKE } from '../constants/actionTypes';

export const getPosts = ()=> async (dispatch) =>{
    try {
        const {data} = await api.fetchPosts();

        dispatch({type: FETCH_ALL, payload: data});
    } catch (error) {
        console.log({comment: 'something wrong in actions/posts.js/getPosts', msg: error.message})
    }
}

export const createPost =(post)=> async(dispatch)=>{
    try {
        const {data} = await api.createPost(post);

        dispatch({type: CREATE, payload: data});
    } catch (error) {
        console.log({comment: 'something wrong in actions/posts.js/createPost', msg: error.message})
    }
}

export const updatePost =(id, post)=> async(dispatch) =>{
    try {
        const {data} =await api.updatePost(id, post);
        
        dispatch({ type: UPDATE, payload: data});
    } catch (error) {
        console.log({comment: 'problem in actions/posts.js/updatepost', error: error});
    }
} 

export const deletePost = (id)=>async(dispatch) =>{
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id});
    } catch (error) {
        console.log({comment: 'error in actions/posts/deletePost', error: error});
    }
}

export const likePost = (id) => async(dispatch) =>{
    try {
        const {data} =await api.likePost(id);
        
        dispatch({ type: LIKE, payload: data});
    } catch (error) {
        console.log({comment: 'error in actions/posts/likePost', error: error});
    }
}

export const flagPost = (id) => async(dispatch) =>{
    try {
        const {data} =await api.flagPost(id);
        
        dispatch({ type: FLAG, payload: data});
    } catch (error) {
        console.log({comment: 'error in actions/posts/flagPost', error: error});
    }
}