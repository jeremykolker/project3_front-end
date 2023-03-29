import { useState } from "react";
import axios from "axios";

const Add = (props) => {
  const [movie, setMovie] = useState({
    poster: "",
    released: "",
    title: "",
    plot: "",
  });

  const handleChange = (event) => {
    setMovie({ ...movie, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleCreate(movie);
  };

  return (

    <form onSubmit={handleSubmit}>
      <h2>Add New Movie</h2>
      <div>
        <label htmlFor="poster">Poster:</label>
        <input type="text" name="poster" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" name="title" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="released">Released:</label>
        <input type="text" name="released" onChange={handleChange} />)
      </div>
      <div>
        <label htmlFor="plot">Plot:</label>
        <textarea
          name="plot"
          onChange={handleChange}
        ></textarea>
      </div>
      <button type="submit">Add Movie</button>
    </form> 
 
  );
};

export default Add;
