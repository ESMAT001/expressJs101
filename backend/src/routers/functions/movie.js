module.exports = async function fetchSingleMovieData(db, id) {
    const data = await db.collection('movie').findOne({ id })
    return data
}