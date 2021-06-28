const metaData = require('../../utils')
const got = require('got');

const retryLimit = 4
const timeOutLimit = 20 * 1000

const projectionFields = {
    _id: false,
    adult: false,
    belongs_to_collection: false,
    budget: false,
    homepage: false,
    imdb_id: false,
    production_companies: false,
    production_countries: false,
    revenue: false,
    spoken_languages: false,
    video: false,
    vote_count: false,
    videos: false,
    download_links: false
}

async function apiCallForIds(movieCount) {
    let page = 1
    const movieIds = []
    do {
        let data = await got(metaData.getTrendingURL(page)).json()
        const results = data.results
        for (let index = 0; index < results.length; index++) {
            const id = results[index].id
            let movieDbData = await db.collection('movie').findOne({ id })
            if (movieDbData) movieIds.push(id)

            if (movieIds.length >= movieCount) return movieIds;
        }
        page++
    } while (movieIds.length < movieCount);
}

async function getIds(movieCount, db) {

    const dbData = await db.collection("meta_data").findOne({ name: "trending" })
    let shouldUpdateData = false;
    if (dbData) {
        const lastUpdated = new Date(dbData.last_updated)
        lastUpdated.setDate(lastUpdated.getDate() + 1)

        if (lastUpdated < new Date()) shouldUpdateData = true;

    } else {
        let date = new Date()
        date.setDate(date.getDate() + 1)
        date = date.toUTCString()
        await db.collection("meta_data").insertOne({
            name: 'trending',
            last_updated: date
        })
        shouldUpdateData = true
    }

    if (shouldUpdateData) {
        console.log('updating db for new trending data')
        const movieIds = await apiCallForIds(movieCount)
        await db.collection("meta_data").updateOne({
            name: 'trending'
        }, {
            $set: { movieIds }
        })
        return movieIds;
    } else {
        const { movieIds } = await db.collection("meta_data").findOne({ name: "trending" })
        const movieData = await db.collection("movie").find({
            $and: [{
                'id': { $in: movieIds }
            }
                ,
            {
                adult: false
            }]
        }, {
            projection: projectionFields
        }).toArray()
        return movieData
    }
}
module.exports = async function fetchData(db) {
    const movieCount = 12;
    const movieIds = await getIds(movieCount, db)
    return movieIds
}