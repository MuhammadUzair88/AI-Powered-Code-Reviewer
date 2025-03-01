const express =require('express');
require('dotenv').config();
const aiRoutes=require('./routes/ai.routes')
const cors=require('cors');
const app=express();

app.use(express.json());

app.use(cors());

app.use('/ai',aiRoutes);

app.listen(3000,()=>{
    console.log(process.env.GOOGLE_GEMINI_KEY)
    console.log('Server is running on http://localhost:3000');
})



app.get('/',(req,res)=>{
    res.send('Hello World')
})