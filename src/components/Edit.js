import { useState } from "react";

const Edit = (props) => {
  const [movie, setMovie] = useState({ ...props.movie });

  const handleChange = (event) => {
    setMovie({ ...movie, [event.target.name]: event.target.value });
    console.log(movie)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleEdit(movie);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Movie</h2>
      <div>
        <label htmlFor="poster_path">Poster:</label>
        <input
          type="text"
          name="poster_path"
          onChange={handleChange}
          value={movie.poster_path}
        />
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={movie.title}
        />
      </div>
      <div>
        <label htmlFor="release_date">Released:</label>
        <input
          type="text"
          name="release_date"
          onChange={handleChange}
          value={movie.release_date}
        />
      </div>
      <div>
        <label htmlFor="overview">Overview:</label>
        <textarea
          name="overview"
          onChange={handleChange}
          value={movie.overview}
        ></textarea>
      </div>
      <div>
        <label htmlFor="vote_average">Score:</label>
        <input
          type="number"
          name="vote_average"
          onChange={handleChange}
          value={movie.vote_average}
        />
      </div>
      <input type="submit" />
    </form>
  );
};

export default Edit;
