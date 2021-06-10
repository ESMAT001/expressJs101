const express = require('express');

const app = express();

app.get('/', (req,res)=>{
    res.send("hello world!")
    // console.log(req)
})

app.listen(3000,()=>{
    console.log("server started!")
})