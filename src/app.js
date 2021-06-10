const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const publicDirectory=path.join(__dirname,"../public")

app.use(express.static(publicDirectory))

app.get('/', (req, res) => {
    // const indexPage = fs.readFileSync(path.join(__dirname, '../public/index.html'), {
    //     encoding: "utf-8"
    // })
    res.send("<h1>index</h1>")
})

app.listen(3000, () => {
    console.log("server started!")
})