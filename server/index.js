import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv'
import postRoutes from "./routes/posts.js"
import userRoutes from "./routes/users.js"

/* Configuration */
const app = express();


app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
dotenv.config();

// routes
app.use('/posts',postRoutes);
app.use('/users',userRoutes);

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3001;


mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> app.listen(PORT, console.log(PORT,`Server running on port ${PORT}`)))
.catch((error)=>{console.log(`Something wrong in mongoose setup : `+ error)})

