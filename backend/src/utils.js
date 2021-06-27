const metaData = {
    apiKey: '3d97e93f74df6d3dd759d238a7b8564c',
    getPopularURL(page = 1) {
        return `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=en-US&page=${page}`
    }
}


module.exports = metaData