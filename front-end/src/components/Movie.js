import React from "react";

const Movie = (props) => {
  return (
    <>
      <img
        src={props.movie.poster}
        alt={props.movie.poster}
        style={{ maxWidth: '50%', maxHeight: '50%' }}
      />
      <h3>{props.movie.title}</h3>
      <p>{props.movie.released}</p>
      <p>{props.movie.plot}</p>
    </>
  );
};

export default Movie;