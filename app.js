const express =require('express');
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv').config()
const PORT=process.env.PORT||5000;
// Remote db connection
mongoose.connect(process.env.MONGOURI,{useNewUrlParser: true,useUnifiedTopology: true })
.then(()=>{
    console.log('databse connected')
})
.catch(()=>{
    console.log(' database not connected')
});

const app=express();

app.use(cors())
//models
require('./models/user')

//Routes
app.use(express.json())
app.use(require('./routes/auth'));
app.use(require('./routes/user'));
app.get('/',(req,res)=>{
    res.send('Welcom to Hacker Cafe Api')
})


app.listen(PORT,(err)=>{
    if(err)
    console.log(err)
    else
    console.log('server running...........')
})
