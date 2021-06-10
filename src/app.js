const express = require('express');
const fs = require('fs');

const app = express();

const indexPage=fs.readFileSync(__dirname+'/index.html',{
    encoding:"utf-8"
})

app.get('/', (req,res)=>{
    res.send(indexPage)
})

app.listen(3000,()=>{
    console.log("server started!")
})