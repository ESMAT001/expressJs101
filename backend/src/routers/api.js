const express = require('express');
const got = require('got');
const connectToDb = require('../db')
const metaData = require('../utils')
const router = express.Router();

router.use(express.json())

const retryLimit = 4
const timeOutLimit = 20 * 1000


async function getIds(page, movieCount, db) {

    async function apiCallForIds(count, start = 0) {
        let data = await got(metaData.getPopularURL(page)).json()
        const results = data.results
        const movieIds = []
        let index;
        for (let i = start; i < start + count; i++) {
            const id = results[i].id
            let movieDbData = await db.collection('movie').findOne({ id })
            if (movieDbData) movieIds.push(id)
            index = i
        }
        return {
            index,
            movieIds
        }
    }



    const dbData = await db.collection("meta_data").findOne({ page })
    let shouldUpdateData = true;
    if (dbData) {
        const lastUpdated = new Date(dbData.last_updated)
        lastUpdated.setDate(lastUpdated.getDate() + 1)

        if (lastUpdated < new Date()) shouldUpdateData = true;
        console.log(lastUpdated < new Date())

    } else {
        let date = new Date()
        date.setDate(date.getDate() + 1)
        date = date.toUTCString()
        await db.collection("meta_data").insertOne({
            page,
            last_updated: date
        })
        shouldUpdateData = true
    }

    if (shouldUpdateData) {


        let movieIds = []

        do {
            let { index, movieIds: ids } = await apiCallForIds(movieCount, 0)
        } while (movieCount <= ids.length);

        // let data = await got(metaData.getPopularURL(page)).json()
        // const results = data.results
        // const movieIds = []

        // results.forEach(async movie => {
        //     const id = movie.id
        //     let movieDbData = await db.collection('movie').findOne({ id })
        //     if (movieDbData) movieIds.push(id)
        // });

        return movieIds;
    } else {

    }





    return true
}


async function fetchData(page = 1, db) {
    const movieCount = page === 1 ? 8 : 12;
    const movieIds = await getIds(page, movieCount, db)



    let { body: data } = await got(metaData.getPopularURL(page))

    return movieIds
}

router.get('/popular', async function (req, res) {
    const { page = 1 } = req.query;
    const { db, close } = await connectToDb('media')
    res.send(await fetchData(page, db))
})

// router.get('/popularpage', async function (req, res) {
//     const { page } = req.params

//     if (!page) res.redirect('/popular')

//     res.send(page)
//     const { db, close } = await connectToDb('media')
//     close()
// })

module.exports = router