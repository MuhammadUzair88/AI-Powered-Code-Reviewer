const express=require('express');
const { generateContent } = require('../services/ai.service');

const router=express.Router();

router.post('/get-review', async (req,res)=>{
   const code=req.body.prompt; // if we dont want to use query we have to first write app.use(express.json()) in server.js then we can use req.body

   if(!code){
   return  res.status(400).send('code is required');
   }

   const response=await generateContent(code)

   res.send(response);
})

module.exports=router;