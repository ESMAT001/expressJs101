const express = require("express")
const got = require('got')


const router = express.Router()
const url = 'https://image.tmdb.org/t/p/w500/'

router.get('/:imgId', (req, res) => {
    const { imgId } = req.params
    res.redirect(url + imgId)
})

module.exports = router