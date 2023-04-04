import React, { useState, useEffect } from "react";
import axios from "axios";
import Movie from "./components/Movie";
// import Pagination from "./components/Pagination";
// import Add from "./components/Add";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(100);
  const [prevDisplay, setPrevDisplay] = useState(false);
  const [watchlist, setWatchlist] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  

  const getMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=7ad3eb0336e7d980b07099008b38c2ce&with_genres=27&page=${currentPage}`
      )
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
  const indexOfLastMovies = currentPage * moviesPerPage;
  const indexOfFirstMovies = indexOfLastMovies- moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovies, indexOfLastMovies);
  const nPages = Math.ceil(movies.length / moviesPerPage);

  const prevPage = () => {
    let prev = currentPage - 1;
    if (prev < 2) {
      setPrevDisplay(false);
    } else {
      setPrevDisplay(true);
    }
    setCurrentPage(prev);
    getMovies();
  };

  const nextPage = () => {
    let next = (currentPage + 1)
    setCurrentPage(next)
    setPrevDisplay(true)
    getMovies()
  }

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
        <div className="search-field">
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
      </div>
      <div className="dropdown-container">

      <div className="watchlist"
        style={{ display: isWatchlistOpen ? "block" : "none" }}>
        <h2 className="watchlist-h2">Watchlist</h2>

        {watchlist.length > 0 ? (
          <ul>
            {watchlist.map((movie, index) => (
              <li key={index}>
                {movie}
                <button className="delete" onClick={() => deleteFromWatchlist(index)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your watchlist is empty.</p>
        )}
      </div>
   
      <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
      ≡
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <div className="watchlist-button">
            <button className="button1" onClick={toggleWatchlist}>
              Watchlist
            </button>
          </div>
          <div className="sort-buttons">
            <button className="button2" onClick={() => handleSort("release_date")}>
              Sort by Date
            </button>
            <button className="button3" onClick={() => handleSort("title")}>Sort by Title</button>
            <button className="button4"onClick={() => handleSort("review")}>Sort by Score</button>
          </div>
          
        </div>
      )}
    </div>

      <div className="cards-container">
        {movies.map((movie) => {
          return (
            <div className="card" key={movie.id}>
              <Movie movie={movie} />
              <button onClick={() => addToWatchlist(movie)}>Add to Watchlist</button>
            </div>
          );
        })}
      </div>
    </div>

    {prevDisplay ? <button className="prevnext" onClick={prevPage}>Prev</button> : null}
    <button className="prevnext" onClick={nextPage}>Next</button>

  </>

);

}   
export default App