import mongoose from "mongoose";


const postSchema = mongoose.Schema({
    title : {
        type: String,
        required: true,
    },
    description : String,
    name: String,
    creator : String,
    image : String,
    location: {
        type: String,
        required: true,
    },
    userLocation: String,
    likes:{
        type : [String],
        default: [],
    },
    flag: {
        type : [String],
        default: [],
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
});

const Post = mongoose.model("Post", postSchema);

export default Post;