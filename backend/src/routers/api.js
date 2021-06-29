const express = require('express');
const got = require('got');
const connectToDb = require('../db')
const fetchData = require('./functions/trending')
const fetchMoviesRouteData = require('./functions/movies')

const router = express.Router();

router.use(express.json())


router.get('/trending', async function (req, res) {
    const db = await connectToDb('media')
    res.send(await fetchData(db))
})

router.get('/movies', async (req, res) => {
    let { page = 1 } = req.query
    page = parseInt(page)
    if (page < 1) return res.redirect("/api/movies")

    const db = await connectToDb('media')
    const data = await fetchMoviesRouteData(db, page)

    res.send({ data })
})


module.exports = router