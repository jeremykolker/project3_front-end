import { useState } from 'react';

const Add = ({ handleCreate }) => {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [plotSummary, setPlotSummary] = useState('');
  const [notableCast, setNotableCast] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newMovie = { image, title, releaseYear, plotSummary, notableCast };
    handleCreate(newMovie);
    setImage('');
    setTitle('');
    setReleaseYear('');
    setPlotSummary('');
    setNotableCast('');
  }

  return (

    <form onSubmit={handleSubmit}>
      <h2>Add New Movie</h2>
      <div>
        <label>Image:</label>
        <input type="text" value={image} onChange={(event) => setImage(event.target.value)}/>
      </div>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}/>
      </div>
      <div>
        <label>Release Year:</label>
        <input type="text" value={releaseYear} onChange={(event) => setReleaseYear(event.target.value)}/>
      </div>
      <div>
        <label>Plot Summary:</label>
        <textarea value={plotSummary} onChange={(event) => setPlotSummary(event.target.value)}></textarea>
      </div>
      <div>
        <label>Notable Cast:</label>
        <input type="text" value={notableCast} onChange={(event) => setNotableCast(event.target.value)}/>
      </div>
      <button type="submit">Add Movie</button>
    </form> 
 
  );
};

export default Add;
