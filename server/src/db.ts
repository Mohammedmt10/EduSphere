import mongoose from "mongoose";

mongoose.connect('mongodb+srv://Mohammed:pwkDigPkYJVNLMN9@cluster0.of4gc.mongodb.net/Edusphere');

const userSchema = new mongoose.Schema({
    username : {type : String , unique : true , require : true},
    password : {type : String ,  require : true},
    type : String
})

const courseSchema = new mongoose.Schema({
    title : String,
    description : String,
    price : Number,
    imageUrl : String
})

export const userModel = mongoose.model('users' , userSchema);
export const courseModel = mongoose.model('courses' , courseSchema);