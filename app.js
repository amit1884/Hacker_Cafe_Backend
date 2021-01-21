const express =require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const { MONGOURI } = require('./config/keys');
const PORT=process.env.port||5000;
//Local Database Connection
// mongoose.connect(MONGOURI,{ useNewUrlParser: true,useUnifiedTopology: true })

// mongoose.connection.on('connected',()=>{
//     console.log('connected to mongo !!')
// })

// mongoose.connection.on('error',(err)=>{
//     console.log('error connecting to mongo ???',err);
// })
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
app.use(require('./routes/user'))
app.get('/',(req,res)=>{
    seed();
    res.send('Welcom to Hacker Cafe Api')
})


app.listen(PORT,()=>{
    console.log('server running...........')
})