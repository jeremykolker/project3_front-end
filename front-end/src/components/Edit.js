import { useState } from "react";

const Edit = (props) => {
  const [movie, setMovie] = useState({ ...props.movie });

  const handleChange = (event) => {
    setMovie({ ...movie, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleEdit(movie);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Movie</h2>
      <div>
        <label htmlFor="poster">Poster:</label>
        <input
          type="text"
          name="poster"
          onChange={handleChange}
          value={movie.poster}
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
        <label htmlFor="released">Released:</label>
        <input
          type="text"
          name="released"
          onChange={handleChange}
          value={movie.released}
        />
      </div>
      <div>
        <label htmlFor="plot">Plot:</label>
        <textarea
          name="plot"
          onChange={handleChange}
          value={movie.plot}
        ></textarea>
      </div>
      <input type="submit" />
    </form>
  );
};

export default Edit;
