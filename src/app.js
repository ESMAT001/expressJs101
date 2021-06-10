const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const publicDirectory=path.join(__dirname,"../public")

app.set('view engine','hbs' )
app.use(express.static(publicDirectory))

app.get("",(req,res)=>{
    res.render("index",{
        text:"this is text"
    })
})

app.get('/help',(req,res)=>{
    res.send("help")
})

app.listen(3000, () => {
    console.log("server started!")
})