import { useState } from 'react';

const Add = ({ handleCreate }) => {
  const [poster_path, setposter_path] = useState('');
  const [title, setTitle] = useState('');
  const [release_date, setrelease_date] = useState('');
  const [overview, setoverview] = useState('');
  const [vote_average, setvote_average] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newMovie = { poster_path, title, release_date, overview, vote_average };
    handleCreate(newMovie);
    setposter_path('');
    setTitle('');
    setrelease_date('');
    setoverview('');
    setvote_average('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Movie</h2>
      <div>
        <label>Poster:</label>
        <input type="text" value={poster_path} onChange={(event) => setposter_path(event.target.value)}/>
      </div>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}/>
      </div>
      <div>
        <label>Release Date:</label>
        <input type="text" value={release_date} onChange={(event) => setrelease_date(event.target.value)}/>
      </div>
      <div>
        <label>Plot Summary:</label>
        <textarea value={overview} onChange={(event) => setoverview(event.target.value)}></textarea>
      </div>
      <div>
        <label>Voter Average Score:</label>
        <input type="number" value={vote_average} onChange={(event) => setvote_average(event.target.value)}/>
      </div>
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default Add;