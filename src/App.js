import React, { useState, useEffect } from "react";
import axios from "axios";
import Movie from "./components/Movie";
import Pagination from "./components/Pagination";
import Add from "./components/Add";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(100);
  const [prevDisplay, setPrevDisplay] = useState(false);

  const getMovies = () => {
    axios
      .get(`https://api.themoviedb.org/3/discover/movie?api_key=7ad3eb0336e7d980b07099008b38c2ce&with_genres=27&page=${currentPage}`)
      .then((response) => {
        setMovies(response.data.results);
        console.log(response.data.results);
      })
      .catch((error) => console.log(error));
  };

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
    } else if (order === "review") {
      sortedMovies.sort((a, b) => {
        return b.vote_average - a.vote_average;
      });
    }
  
    setMovies(sortedMovies);
  };
  

  //Pagination
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  const nPages = Math.ceil(movies.length / moviesPerPage);

 
  const prevPage = () => {
    let prev = currentPage - 1;
    if (prev > 0) {
      setCurrentPage(prev);
      setPrevDisplay(true);
      getMovies(prev);
    } else {
      setPrevDisplay(false);
    }
  };
  
  const nextPage = () => {
    let next = currentPage + 1;
    setCurrentPage(next);
    setPrevDisplay(true);
    getMovies(next);
  };
  

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

  const deleteFromWatchlist = (index) => {
    const updatedWatchlist = [...watchlist];
    updatedWatchlist.splice(index, 1);
    setWatchlist(updatedWatchlist);
  };

  useEffect(() => {
    getMovies();
  }, [currentPage]);

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
        <button onClick={() => handleSort("rating")}>Sort by Review</button>
      </div>
  
      <div className="cards-container">
        {currentMovies.map((movie) => {
          return (
            <div className="card" key={movie.id}>
              <Movie movie={movie} />
              <button onClick={() => addToWatchlist(movie)}>
                Add to Watchlist
              </button>
            </div>
          );
        })}
      </div>
    </div>
  
    {prevDisplay ? <button onClick={prevPage}>Prev</button> : null}
    <button onClick={nextPage}>Next</button>
  </>
  )  
}  
  export default App