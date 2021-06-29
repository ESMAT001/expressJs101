const express = require('express');
const got = require('got');
const connectToDb = require('../db')
const fetchData = require('./functions/trending')
const fetchMoviesRouteData = require('./functions/movies')
const fetchSingleMovieData = require('./functions/movie')

const dbName = "media"

const router = express.Router();

router.use(express.json())


router.get('/trending', async function (req, res) {
    const db = await connectToDb(dbName)
    res.send(await fetchData(db))
})

router.get('/movies', async (req, res) => {
    let { page = 1 } = req.query
    page = parseInt(page)
    if (page < 1) return res.status(400).send("Bad request!")

    const db = await connectToDb(dbName)
    const data = await fetchMoviesRouteData(db, page)

    res.send({ data })
})

router.get('/movie', async (req, res) => {

    let { id } = req.query
    if (!id || /[a-zA-Z./()$-]/g.test(id)) return res.status(400).send("Bad request!")
    id = parseInt(id)
    const db = await connectToDb(dbName)
    const data = await fetchSingleMovieData(db, id)
    if (!data) return res.status(404).send("Movie not found!")
    res.send(data)
})



module.exports = router