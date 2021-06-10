const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const publicDirectory=path.join(__dirname,"../public")

app.use(express.static(publicDirectory))

app.get('/help',(req,res)=>{
    res.send("help")
})

app.listen(3000, () => {
    console.log("server started!")
})