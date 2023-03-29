import React from "react";

const Movie = (props) => {
  return (
    <>
      <img
        src={props.movie.image}
        alt={props.movie.image}
        style={{ maxWidth: '50%', maxHeight: '50%' }}
      />
      <h3>{props.movie.title}</h3>
      <p>{props.movie.releaseYear}</p>
      <p>{props.movie.plotSummary}</p>
      <p>{props.movie.notableCast}</p>
    </>
  );
};

export default Movie;

  
  