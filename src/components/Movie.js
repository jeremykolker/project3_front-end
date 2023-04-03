import React from "react";

const getPosterURL = (posterpath) => {
  return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterpath}`
}

const Movie = (props) => {
  return (
    <>
      <img
        src={getPosterURL(props.movie.poster_path)}
        // alt={props.movie.poster_path}
        style={{ maxWidth: '90%', maxHeight: '90%' }}
      />
      <h3>{props.movie.title}</h3>
      <p>{props.movie.release_date}</p>
      <p>{props.movie.overview}</p>
      <p>Score: {props.movie.vote_average}</p>
    </>
  );
};

export default Movie;