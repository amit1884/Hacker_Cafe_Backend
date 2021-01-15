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
    id_pic:{
        type:String,
    },
   
})

mongoose.model("Users",userSchema);