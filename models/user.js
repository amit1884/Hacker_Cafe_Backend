const mongoose =require('mongoose')
const {ObjectId} =mongoose.Schema.Types
const userSchema=new mongoose.Schema({
    emp_id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    org_name:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    // id_pic:{
    //     type:String,
    //     default:"https://res.cloudinary.com/webarts/image/upload/v1598703774/default_jya5m4.jpg"
    // },
   
})

mongoose.model("Users",userSchema);