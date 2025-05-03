import mongoose from "mongoose";

mongoose.connect('mongodb+srv://Mohammed:pwkDigPkYJVNLMN9@cluster0.of4gc.mongodb.net/Edusphere');

const userSchema = new mongoose.Schema({
    username : {type : String , unique : true , require : true},
    password : {type : String ,  require : true}
})

const adminSchema = new mongoose.Schema({
    username : {type : String , unique : true , require : true},
    password : {type : String ,  require : true}
})

const courseSchema = new mongoose.Schema({
    title : String,
    description : String,
    price : Number,
    imageUrl : String,
    userId : {type : mongoose.Types.ObjectId , keyof : adminSchema}
});

const purchasedCourseSchema = new mongoose.Schema({
    userId :{ type : mongoose.Types.ObjectId , keyof : userSchema},
    courseId : {type : mongoose.Types.ObjectId , keyof : courseSchema}
})

export const userModel = mongoose.model('users' , userSchema);
export const adminModel = mongoose.model('admin' , adminSchema)
export const courseModel = mongoose.model('courses' , courseSchema);
export const purchasedCourseModel = mongoose.model('purchasedCourse' , purchasedCourseSchema)