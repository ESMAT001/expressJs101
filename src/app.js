const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();



app.get('/', (req, res) => {
    const indexPage = fs.readFileSync(path.join(__dirname, '../public/index.html'), {
        encoding: "utf-8"
    })
    res.send(indexPage)
})

app.listen(3000, () => {
    console.log("server started!")
})