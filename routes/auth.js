const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const crypto=require('crypto')
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

// function seed()
// {
//     const MenuData=[
//         {
//             type:1,
//             title:'Mixed Chowmin',
//             details:'Hakka noodles, cabbage, soy sauce, chicken breasts, ginger',
//             price:'120',
//             img:'/images/noodles.jpg',
//             qty:0
//         },
//         {
//             type:1,
//             title:'Grilled Chicken',
//             details:'This Simple Grilled Chicken Recipe has a lemon, garlic, and herb marinade',
//             price:'180',
//             img:'/images/GrilledChicken.jpg',
//             qty:0
//         },
//         {
//             type:1,
//             title:'Soup',
//             details:'This Vegetable Soup has become one of my most popular soup recipes and for good reason!',
//             price:'110',
//             img:'/images/soup.jpg',
//             qty:0
//         },
//         {
//             type:1,
//             title:'Grilled Chicken Sandwich',
//             details:'This grilled chicken sandwich with pesto is a gourmet take on a favorite with smoked mozzarella',
//             price:'130',
//             img:'/images/chickensandwich.jpg',
//             qty:0
//         },
//         {
//             type:1,
//             title:'Idli',
//             details:'Soft, fluffy idlis made with rice rava rava or idli rava or cream of rice.',
//             price:'120',
//             img:'/images/idli.jpg',
//             qty:0
//         },
//         {
//             type:1,
//             title:'Omlet',
//             details:'Egg ,vegetables',
//             price:'50',
//             img:'/images/omlet.jpg',
//             qty:0
//         },
//         {
//             type:2,
//             title:'Paneer Butter Masala',
//             details:'Creamy Restaurant Style Paneer Butter Masala',
//             price:'270',
//             img:'/images/paneerbutter.jpg',
//             qty:0
//         },
//         {
//             type:2,
//             title:'Paneer Lababdar',
//             details:'Paneer Lababdar is paneer cooked in an aromatic spicy gravy.',
//             price:'270',
//             img:'/images/paneerlababdar.jpg',
//             qty:0
//         },
//         {
//             type:2,
//             title:'Chicken Butter Masala',
//             details:'A Fabulous Rich and Perfectly Balanced North Indian Chicken Curry made with Ripe and Plump Tomatoes',
//             price:'380',
//             img:'/images/chickenbutter.jpg',
//             qty:0
//         },
//         {
//             type:2,
//             title:'Mashroom Kadhai',
//             details:'A flavorful mushroom dish made with onion tomato base, bell peppers and freshly ground kadai masala.',
//             price:'250',
//             img:'/images/mushroomkadhai.jpg',
//             qty:0
//         },
//         {
//             type:2,
//             title:'Chicken Kadhai',
//             details:'Kadai Chicken is a delicious Indian chicken curry',
//             price:'320',
//             img:'/images/chickenkadhai.jpg',
//             qty:0
//         },
//         {
//             type:2,
//             title:'Mixed Veg',
//             details:'Dry mix vegetables is an all-time favorite. There are so many different ways to make Mix Vegetables:',
//             price:'180',
//             img:'/images/mixveg.jpg',
//             qty:0
//         },
//         {
//             type:3,
//             title:'Juice',
//             details:'Orange,Pineapple,Mango,Melon,Strawberry',
//             price:'150',
//             img:'/images/juice.jpg',
//             qty:0
//         },
//         {
//             type:3,
//             title:'Milk Shakes',
//             details:'Aplle,Banana,Strawberry',
//             price:'180',
//             img:'/images/shakes.jpg',
//             qty:0
//         },
//         {
//             type:3,
//             title:'Cold Drinks',
//             details:'Pepsi,Coca-Cola,Sprite,Slice,Mountain Dew',
//             price:'120',
//             img:'/images/colddrinks.jpg',
//             qty:0
//         },
//         {
//             type:4,
//             title:'Naan',
//             details:'Soft, pillowy, homemade naan is easier to make than you think and its great for sandwiches, pizza,',
//             price:'45',
//             img:'/images/naan.jpg',
//             qty:0
//         },
//         {
//             type:4,
//             title:'Latcha Paratha',
//             details:'Crisp, flaky flatbreads with multiple layers ideal for lunch or dinner.',
//             price:'50',
//             img:'/images/latchaparatha.jpg',
//             qty:0
//         },
//         {
//             type:4,
//             title:'Tandoori Roti',
//             details:'Crispy and Yummy Tandoori Roti is commonly prepared bread in India and is also known as phulka ',
//             price:'30',
//             img:'/images/tandoori.jpg',
//             qty:0
//         },
//         {
//             type:5,
//             title:'Vanilla Icecream',
//             details:'Enjoy homemade vanilla ice cream without cooking the eggs',
//             price:'80',
//             img:'/images/vanilla.jpg',
//             qty:0
//         },
//         {
//             type:5,
//             title:'Chocolate Ice Cream',
//             details:'Rich, ultra-creamy, and chocolatey, this is the best homemade chocolate ice cream recipe ever!',
//             price:'90',
//             img:'/images/chocolate.jpg',
//             qty:0
//         },
//         {
//             type:5,
//             title:'Tutti Frutti',
//             details:'With a fresh peach base and plenty of fresh cherries, strawberries, ',
//             price:'150',
//             img:'/images/tuttifutti.jpg',
//             qty:0
//         },
//         {
//             type:5,
//             title:'Gulab Jamun',
//             details:'The popular Indian sweet, gulab jamun made with khoya',
//             price:'40',
//             img:'/images/gulab.jpg',
//             qty:0
//         },
    
//     ]

//     for(let i=0;i<MenuData.length;i++)
//     {
//         let menuItem=new Menu(MenuData[i])
//         menuItem.save()
//         .then(savedMenu=>{
//             console.log(savedMenu)
//         })
//         .catch(err=>console.log(err))
//     }
// }

module.exports=router;