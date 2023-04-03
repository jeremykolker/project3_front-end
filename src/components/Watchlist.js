import React from "react";
import axios from "axios";

function WatchList({ watchList, removeFromWatchList }) {
  const removeMovieFromWatchList = async (movie) => {
    try {
      // Delete the movie from the backend
      await axios.delete(`http://localhost:3000/movies/${movie._id}`);
      // Remove the movie from the watchlist on the frontend
      removeFromWatchList(movie);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Watch List:</h2>
      <ul>
        {watchList.map((movie) => (
          <li key={movie._id}>
            <img
              src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
              alt={`${movie.title} poster`}
            />
            <div>
              <h3>{movie.title}</h3>
              <p>{movie.release_date}</p>
              <p>{movie.overview}</p>
              <p>{`Rating: ${movie.vote_average}`}</p>
            </div>
            <button onClick={() => removeMovieFromWatchList(movie)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WatchList;
