import { useState } from 'react';

const Edit = ({ movie, handleEdit }) => {
  const [image, setImage] = useState(movie.image);
  const [title, setTitle] = useState(movie.title);
  const [releaseYear, setReleaseYear] = useState(movie.releaseYear);
  const [plotSummary, setPlotSummary] = useState(movie.plotSummary);
  const [notableCast, setNotableCast] = useState(movie.notableCast);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedMovie = { image, title, releaseYear, plotSummary, notableCast };
    handleEdit({ _id: movie._id, ...updatedMovie });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Movie</h2>
      <div>
        <label>Image:</label>
        <input type="text" value={image} onChange={(event) => setImage(event.target.value)} />
      </div>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
      </div>
      <div>
        <label>Release Year:</label>
        <input type="text" value={releaseYear} onChange={(event) => setReleaseYear(event.target.value)} />
      </div>
      <div>
        <label>Plot Summary:</label>
        <textarea value={plotSummary} onChange={(event) => setPlotSummary(event.target.value)}></textarea>
      </div>
      <div>
        <label>Notable Cast:</label>
        <input type="text" value={notableCast} onChange={(event) => setNotableCast(event.target.value)} />
      </div>
      <button type="submit">Submit Edit</button>
    </form>
  );
};

export default Edit;
