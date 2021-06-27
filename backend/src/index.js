const express = require('express');
const apiRouter = require('./routers/api')

const server = express()
const port = 3000


server.use('/api', apiRouter)

server.get("*", (req, res) => {
    res.send("<h1>404 NOT FOUND!</h1>")
})


server.listen(port, function () {
    console.log("server started on port " + port)
})