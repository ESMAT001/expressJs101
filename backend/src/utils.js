const metaData = {
    apiKey: '3d97e93f74df6d3dd759d238a7b8564c',
    getTrendingURL(page = 1) {
        return `https://api.themoviedb.org/3/trending/movie/week?api_key=${this.apiKey}&page=${page}`
    },
    projectionFields : {
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
}


module.exports = metaData