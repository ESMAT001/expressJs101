const express = require('express');
const apiRouter = require('./routers/api')
const imageRouter = require('./routers/image')

const server = express()
const port = 3000


server.use('/api', apiRouter)
server.use('/image',imageRouter)


server.get("*", (req, res) => {
    res.send("<h1>404 NOT FOUND!</h1>")
})


server.listen(port, function () {
    console.log("server started on port " + port)
})