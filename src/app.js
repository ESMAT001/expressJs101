const express = require('express');
const fs = require('fs');
const path = require('path');
const axios = require("axios");

const app = express();
const publicDirectory = path.join(__dirname, "../public")

app.set('view engine', 'hbs')
app.use(express.static(publicDirectory))

app.get("", (req, res) => {
    res.render("index", {
        text: "this is text"
    })
})

app.get("/api", (req, res) => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then(resp => res.send(resp.data))
})

app.get('/help', (req, res) => {
    res.send("help")
})

app.get("*",(req,res)=>{
    res.send("<h1>404 NOT FOUND!</h1>")
})

app.listen(3000, () => {
    console.log("server started!")
})