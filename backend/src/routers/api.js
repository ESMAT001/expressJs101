const express = require('express');
const got = require('got');
const connectToDb = require('../db')
const fetchData = require('./functions/trending')

const router = express.Router();

router.use(express.json())


router.get('/trending', async function (req, res) {
    const db = await connectToDb('media')
    res.send(await fetchData(db))
})




module.exports = router