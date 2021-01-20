const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Menu=require('../models/menu')
const requiredLogin=require('../middleware/requireLogin')
const User=mongoose.model("Users");

router.get('/menu',requiredLogin,(req,res)=>{
    Menu.find({})
    .then(menu=>{
        res.send({
            status:1,
            data:menu
        })
    })
    .catch(err=>console.log(err))
})
router.get('/user/:id',requiredLogin,(req,res)=>{
    const userId=req.params.id;
    console.log(userId)
    User.findById(userId)
    .then(foundUser=>{
        res.send({user:foundUser})
    })
    .catch(err=>console.log(err))
})
router.post('/addorder',requiredLogin,(req,res)=>{
    var time;
    const Orders=req.body.currOrder;
    if(Orders.length<=2)
    time='15 minutes'
    else if(Orders.length<=5)
    time='30 minutes'
    else
    time='1 hour'
    console.log(Orders)
    User.findByIdAndUpdate(req.user._id,{
        $push:{
            orders:{order:Orders}
        }
    },{
        new:true
    },(err,orderAdded)=>{
        if(err)
        console.log(err)
        else res.send({data:orderAdded,time:time})
    })

})
module.exports=router