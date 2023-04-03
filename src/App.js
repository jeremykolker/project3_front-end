import React, { useState, useRef, useCallback, useEffect } from 'react'
import useMovieSearch from './components/useMovieSearch'
import axios from 'axios'
import Movie from './components/Movie'
import "./App.css"

export default function App() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)

  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // const [moviesPerPage] = useState(100);
  // const [prevDisplay, setPrevDisplay] = useState(false);

  const {
    films,
    hasMore,
    loading,
    error
  } = useMovieSearch(query, pageNumber)

  // const getMovies = () => {
  //   axios
  //     .get(`https://api.themoviedb.org/3/discover/movie?api_key=7ad3eb0336e7d980b07099008b38c2ce&with_genres=27&page=${currentPage}`)
  //     .then((response) => {
  //       setMovies(response.data.results);
  //       console.log(response.data.results);
  //     })
  //     .catch((error) => console.log(error));
  // };

  const searchMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=7ad3eb0336e7d980b07099008b38c2ce&query=${searchQuery}`
      )
      .then((response) => {
        setMovies(response.data.results);
        console.log(response.data.results);
      })
      .catch((error) => console.log(error));
  };

  const observer = useRef()
  const lastFilmElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        // console.log('Visible');
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  const handleSort = (order) => {
    setSortOrder(order);
    let sortedMovies = [...movies];
  
    if (order === "release_date") {
      sortedMovies.sort((a, b) => {
        return new Date(b.release_date) - new Date(a.release_date);
      });
    } else if (order === "title") {
      sortedMovies.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    } else if (order === "vote_average") {
      sortedMovies.sort((a, b) => {
        return b.vote_average - a.vote_average;
      });
    }
  
    setMovies(sortedMovies);
  };

  const toggleWatchlist = () => {
    setIsWatchlistOpen(!isWatchlistOpen);
    if (!isWatchlistOpen) {
      axios
        .get('/movies')
        .then(response => setWatchlist(response.data))
        .catch(error => console.log(error));
    }
  };


  const addToWatchlist = async (movie) => {
    setWatchlist([...watchlist, movie.title]);
    try {
      await axios.post('/movies', { movie });
      toggleWatchlist();
    } catch (error) {
      console.log(error);
    }
  };


  const deleteFromWatchlist = (index) => {
    const updatedWatchlist = [...watchlist];
    updatedWatchlist.splice(index, 1);
    setWatchlist(updatedWatchlist);
  };


  // function handleSearch(event) {
  //   setQuery(event.target.value)
  //   setPageNumber(1)
  // }

  // useEffect(() => {
  //   getMovies();
  // }, [currentPage]);

  return (
    <>
    <div>
      <h1>SLASHR</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-btn" onClick={searchMovies}>
          Search
        </button>
      </div>


      <div className="watchlist-button">
        <button className="button1" onClick={toggleWatchlist}>
          Watchlist
        </button>
      </div>

      <div
        className="watchlist"
        style={{ display: isWatchlistOpen ? "block" : "none" }}
      >
        <h2>Watchlist</h2>
        {watchlist.length > 0 ? (
          <ul>
            {watchlist.map((movie, index) => (
              <li key={index}>
                {movie}
                <button onClick={() => deleteFromWatchlist(index)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your watchlist is empty.</p>
        )}
      </div>

      <div className="sort-buttons">
        <button onClick={() => handleSort("release_date")}>Sort by Release Date</button>
        <button onClick={() => handleSort("title")}>Sort by Title</button>
        <button onClick={() => handleSort("rating")}>Sort by Score</button>
      </div>


      {/* <input type="text" value={query} onChange={handleSearch}></input> */}
      <div className="cards-container">
      {films.map((film, index) => {
        if (films.length === index + 1) {
          return (
            <>
          <div ref={lastFilmElementRef} key={film}>{film}</div>
          <button onClick={() => addToWatchlist(film)}>
                Add to Watchlist
              </button>
          </>
          )
        } else {
          return (
            <>
          <div key={film}>{film}</div>
          
          </>
          )
        }
      })}
      </div>
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>


      </div>
    </>
  )
}