const connectToDb = require('./db')

async function main() {
    const db = await connectToDb('media')

    let data = await db.collection("movie").find({})
    let count = 0
    data.forEach(async (movie) => {
        let id = movie.id

        if (movie.poster_path === null || movie.backdrop_path === null) return;

        let poster_path = movie.poster_path.split("/").pop()
        let backdrop_path = movie.backdrop_path.split("/").pop()
        await db.collection("movie").updateOne({ id }, { $set: { poster_path, backdrop_path } })
        console.log(poster_path, backdrop_path, ++count)
    })

}




main()