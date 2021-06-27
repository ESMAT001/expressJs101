const express = require('express');
const got = require('got');
const connectToDb = require('../db')
const router = express.Router();

router.use(express.json())


async function fetchData(page = 1) {

}



router.get('/popular', async function (req, res) {
    const { page = 1 } = req.query;

    res.send(page)
    const { db, close } = await connectToDb('media')
    close()
})

// router.get('/popularpage', async function (req, res) {
//     const { page } = req.params

//     if (!page) res.redirect('/popular')

//     res.send(page)
//     const { db, close } = await connectToDb('media')
//     close()
// })

module.exports = router