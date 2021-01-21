const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt =require('jsonwebtoken');
const {JWT_SECRET}=require('../config/keys')
const User=mongoose.model("Users");
const Menu=require('../models/menu')
// const requiredLogin=require('../middleware/requireLogin')


  router.get('/auth',(req,res)=>{
      res.send('Auth Route')
  })

router.post('/signup',(req,res)=>{

    const{emp_id,name,org_name,mobile,email,password,id_pic}=req.body;

    if(!email||!password||!name||!emp_id||!org_name||!mobile)
    {
       return res.status(422).json({
           status:0,
            message:"Please fill al the fields"
        })
    }

    User.findOne({email:email})
    .then(savedUser=>{
        
        if(savedUser){
            return res.json({status:0,message:"Already Exist"});
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{

            const user=new User({
                email,
                password:hashedpassword,
                name,
                org_name,
                emp_id,
                mobile,
                id_pic
            })
            user.save()
            .then(user=>{
                res.json({status:1,message:"Successfully saved",data:user})
            })
            .catch(err=>{
                console.log(err)
            })
        })
    })
    .catch(err=>{
        console.log(err)
    })
})


router.post("/signin",(req,res)=>{

    const{email,password}=req.body;

    if(!email||!password){
        return res.status(422).json({status:0,message:"Please fill all the  fields are required"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser)
        {
            return res.status(422).json({status:0,message:"Invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){

                // res.json({message:"Successfull Logged In !!!!!!!"});
                const token =jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,emp_id,name,org_name,mobile,email,id_pic}=savedUser
                res.json({status:1,token,user:{_id,emp_id,name,org_name,mobile,email,id_pic}})

            }
            else{
                return res.status(422).json({status:0,message:"Invalid password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
    .catch(err=>{
        console.log(err)
    })
})



module.exports=router;