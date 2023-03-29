import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from './components/Movie';
import Add from './components/Add';
import Edit from './components/Edit';

const App = () => {
  // STATES
  const [movies, setMovies] = useState([]);

  // CREATE
  const handleCreate = (data) => {
    axios.post('http://localhost:3000/movies/', data)
    .then((response) => {
      let newMovies = [...movies, response.data];
      setMovies(newMovies);
    });
  };

  // READ
  const getMovies = () => {
    axios.get('http://localhost:3000/movies/')
    .then((response) => {
      setMovies(response.data);
    })
    .catch((error) => console.log(error));
  };
  

  // UPDATE
  const handleEdit = (data) => {
    axios.put(`http://localhost:3000/movies/${data._id}`, data)
    .then((response) => {
      let newMovies = movies.map((movie) => {
        if (movie._id === response.data._id) {
          return response.data;
        } else {
          return movie;
        }
      });
      setMovies(newMovies);
    })
    .catch((error) => console.log(error));
  };

  // DELETE
  const handleDelete = (deletedMovie) => {
    axios.delete(`http://localhost:3000/movies/${deletedMovie._id}`)
    .then((response) => {
      let newMovies = movies.filter((movie) => {
        return movie._id !== deletedMovie._id;
      });
      setMovies(newMovies);
    })
    .catch((error) => console.log(error));
  };

  // USE EFFECT
  useEffect(() => {
    getMovies();
  }, []); 

  return (
    <>
      <h1>SLASHR</h1>

      <Add handleCreate={handleCreate} />

      {movies.map((movie) => { 
        return (
          <div key={movie._id}>
            <Movie movie={movie} />
            <Edit movie={movie} handleEdit={handleEdit} />
            <button 
              onClick={() => {
                handleDelete(movie);
              }}
            >DELETE</button>
          </div>
        );
      })}
    </>
  );
};

export default App;
