import { useEffect, useState } from 'react'
import axios from 'axios'
import Movie from './Movie'

const getPosterURL = (posterpath) => {
  return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterpath}`
}

export default function useMovieSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [films, setFilms] = useState([])
  const [hasMore, setHasMore] = useState(false)

  const [watchlist, setWatchlist] = useState([]);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);

  useEffect(() => {
    setFilms([])
  }, [query])

  const toggleWatchlist = () => {
    setIsWatchlistOpen(!isWatchlistOpen);
    if (!isWatchlistOpen) {
      axios
        .get('/watchlist')
        .then(response => setWatchlist(response.data))
        .catch(error => console.log(error));
    }
  };

  const addToWatchlist = async (movie) => {
    setWatchlist([...watchlist, movie.title]);
    try {
      await axios.post('/watchlist', { movie });
      toggleWatchlist();
    } catch (error) {
      console.log(error);
    }
  };

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
      setFilms(prevFilms => {
        // console.log(res);
        return [...new Set([...prevFilms, ...res.data.results.map((film) => {
          return (
            <>
            
            <div className="card" key={film.id}>
      <img
        src={getPosterURL(film.poster_path)}
        alt={film.poster_path}
        style={{ maxWidth: '90%', maxHeight: '90%' }}
      />
      <h3>{film.title}</h3>
      <p>{film.release_date}</p>
      <p>{film.overview}</p>
      <p>Score: {film.vote_average}</p>
      <button onClick={() => addToWatchlist(film)}>
                Add to Watchlist
              </button>
      </div>
      
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

  return { loading, error, films, hasMore }
}