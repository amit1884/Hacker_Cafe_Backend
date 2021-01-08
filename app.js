const express =require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const { MONGOURI } = require('./config/keys');
const PORT=process.env.port||5000;


//Database Connection
mongoose.connect(MONGOURI,{ useNewUrlParser: true,useUnifiedTopology: true })

mongoose.connection.on('connected',()=>{
    console.log('connected to mongo !!')
})

mongoose.connection.on('error',(err)=>{
    console.log('error connecting to mongo ???',err);
})

const app=express();

app.use(cors())
//models
require('./models/user')

//Routes
app.use(express.json())
app.use(require('./routes/auth'));
app.get('/',(req,res)=>{
    res.send('Welcom to Hacker Cafe Api')
})


app.listen(PORT,()=>{
    console.log('server running...........')
})