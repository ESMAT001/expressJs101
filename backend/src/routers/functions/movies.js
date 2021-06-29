const { projectionFields } = require('../../utils')

async function fetchMoviesRouteData(db, page, limit = 12) {
    const skip = (page - 1) * limit
    const data = await db.collection('movie')
        .find({ status: "Released" }, { projection: projectionFields })
        .sort({ release_date: -1 })
        .skip(skip)
        .limit(limit)
        .toArray()

    const totalResult = await db.collection('movie')
        .find({ status: "Released" })
        .count()

    const totalPages = Math.ceil(totalResult / limit)

    return { page, totalResult, totalPages, data }
}

module.exports = fetchMoviesRouteData