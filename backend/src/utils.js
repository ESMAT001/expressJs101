const metaData = {
    apiKey: '3d97e93f74df6d3dd759d238a7b8564c',
    getTrendingURL(page = 1) {
        return `https://api.themoviedb.org/3/trending/movie/week?api_key=${this.apiKey}&page=${page}`
    }
}


module.exports = metaData