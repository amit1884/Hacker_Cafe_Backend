const mongoose =require('mongoose')
const {ObjectId} =mongoose.Schema.Types
const menuSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true
    },
    type:{
        type:Number,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    qty:{
        type:Number,
       default:0
    },
})

module.exports=mongoose.model("Menus",menuSchema);