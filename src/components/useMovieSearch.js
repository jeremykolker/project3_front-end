import { useEffect, useState } from 'react'
import axios from 'axios'
import Movie from './Movie'

const getPosterURL = (posterpath) => {
  return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterpath}`
}

export default function useMovieSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [movies, setMovies] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setMovies([])
  }, [query])

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    axios({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/discover/movie?api_key=7ad3eb0336e7d980b07099008b38c2ce&with_genres=27',
      params: { query: query, page: pageNumber },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setMovies(prevMovies => {
        // console.log(res);
        return [...new Set([...prevMovies, ...res.data.results.map((movie) => {
          return (
            <>
      <img
        src={getPosterURL(movie.poster_path)}
        alt={movie.poster_path}
        style={{ maxWidth: '90%', maxHeight: '90%' }}
      />
      <h3>{movie.title}</h3>
      <p>{movie.release_date}</p>
      <p>{movie.overview}</p>
      <p>Score: {movie.vote_average}</p>
    </>
          )
        })])]
      })
      setHasMore(res.data.results.length > 0)
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [query, pageNumber])

  return { loading, error, movies, hasMore }
}