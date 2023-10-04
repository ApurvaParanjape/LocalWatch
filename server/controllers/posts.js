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
    const newPost = new Post(post);
    
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