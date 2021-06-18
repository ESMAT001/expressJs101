const axios = require('axios')
const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient

main("https://api.themoviedb.org/3/movie/popular?api_key=3d97e93f74df6d3dd759d238a7b8564c&language=en-US&page=1")


async function main(url) {
    const res = await axios.get(url);
    let data = res.data.results[0]
    const vidRes = await axios.get(`https://api.themoviedb.org/3/movie/${data.id}/videos?api_key=3d97e93f74df6d3dd759d238a7b8564c`)
    let videoData = vidRes.data.results
    for (let index = 0; index < videoData.length; index++) {
        videoData[index].video_link = `https://www.youtube.com/embed/${videoData[index].key}?autoplay=1&hl=en&fs=1&autohide=1`
    }
    data.video = videoData

    data.backdrop_path = "https://image.tmdb.org/t/p/w500" + data.backdrop_path;
    data.poster_path = "https://image.tmdb.org/t/p/w500" + data.poster_path;
    console.log(data)
}



