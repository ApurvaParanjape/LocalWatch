import mongoose from "mongoose";


const postSchema = mongoose.Schema({
    title : {
        type: String,
        required: true,
    },
    description : String,
    creator : String,
    image : String,
    location: {
        type: String,
        required: true,
    },
    userLocation: String,
    likeCount:{
        type : Number,
        default: 0,
    },
    flagCount: {
        type : Number,
        default: 0,
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
});

const Post = mongoose.model("Post", postSchema);

export default Post;