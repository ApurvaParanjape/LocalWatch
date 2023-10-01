import Post from "../models/Post.js";

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