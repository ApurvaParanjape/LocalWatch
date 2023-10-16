import Post from "../models/Post.js";
import express from 'express'
import mongoose from "mongoose";

export const getPosts = async(req,res)=>{
    try{

        const posts = await Post.find();

        res.status(200).json(posts);

    }catch(error){
        res.status(404).json({commemt: "Problem in getPost method", msg: error.message})
    }
}

export const createPost = async(req, res)=>{
    const post = req.body;
    const newPost = new Post({ ...post, creator: req.userId, createdAt: new Date().toISOString()});
    
    try{
        await newPost.save();
        res.status(201).json(newPost)
    }catch(error){
        res.status(409).json({commet: "Problem in createPost method", msg: error.message});
    }
}

export const updatePost = async(req, res) =>{
    const {id: _id} = req.params;
    const changedPost = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatedPost = await Post.findByIdAndUpdate(_id, changedPost, { new: true});

    res.json(updatedPost);
}

export const deletePost = async(req, res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await Post.findByIdAndRemove(id);
    // console.log('delete request')
    res.json({ message: 'post deleted successfully'});
}

export const likePost = async(req, res) =>{
    try {
        const {id} = req.params;

        if(!req.userId) return res.json({ msg: 'unauthenticated'});
    
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
    
        const post = await Post.findById(id);
      
        const index = post.likes.findIndex((id)=> id === String(req.userId));

        if(index=== -1){
            post.likes.push(req.userId);
        }else{
            post.likes = post.likes.filter((id)=> id !== String(req.userId))
        }
        const updatedPost = await Post.findByIdAndUpdate(id, post, {new : true});
    
        res.status(200).json(updatedPost);
        
    } catch (error) {
        res.status(400).json({error, comment: 'problem in likepost backend'})
    }
}

export const flagPost = async(req, res) =>{
    const {id} = req.params;
    if(!req.userId) return res.json({ msg: 'unauthenticated'});

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const post = await Post.findById(id);

    const index = post.flag.findIndex((id)=> id === String(req.userId));

        if(index=== -1){
            post.flag.push(req.userId)
        }else{
            post.flag = post.flag.filter((id)=> id !== String(req.userId))
        }

    const updatedPost = await Post.findByIdAndUpdate(id, post, {new : true});

    res.json(updatedPost);
}