import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from './components/Movie';
import Add from './components/Add';
import Edit from './components/Edit';
import Index from './components/Index';

const App = () => {
  // STATES
  const [movies, setMovies] = useState({});
  const [display, setDisplay] = useState(false)

  // CREATE
  const handleCreate = (data) => {
    axios.post('https://api.themoviedb.org/3/discover/movie?api_key=7ad3eb0336e7d980b07099008b38c2ce&with_genres=27', data)
    .then((response) => {
      let newMovies = [...movies, response.data];
      setMovies(newMovies);
    });
  };

  // READ
  const getMovies = () => {
    axios.get('https://api.themoviedb.org/3/discover/movie?api_key=7ad3eb0336e7d980b07099008b38c2ce&with_genres=27')
    .then((response) => {
      setMovies(response.data);
      // setDisplay(false)
    })
    .catch((error) => console.log(error));
  };
  

  // UPDATE
  const handleEdit = (data) => {
    axios.put('https://api.themoviedb.org/3/discover/movie?api_key=7ad3eb0336e7d980b07099008b38c2ce&with_genres=27' + data._id, data)
    .then((response) => {
      let newMovies = movies.map((movie) => {
        return movie._id !== data._id ? movie : data
      })
      setMovies(newMovies)
    })
    .catch((error) => console.log(error));
  };

  // DELETE
  const handleDelete = (deletedMovie) => {
    axios.delete('https://api.themoviedb.org/3/discover/movie?api_key=7ad3eb0336e7d980b07099008b38c2ce&with_genres=27' + deletedMovie._id)
    .then((response) => {
      let newMovies = movies.filter((movies) => {
        return movies._id !== deletedMovie._id
      })
      setMovies(newMovies)
    })
    .catch((error) => console.log(error));
  };

  // DISPLAY TOGGLE
  const displayToggle = () => {
    setDisplay(true)
  }

  // USE EFFECT
  useEffect(() => {
    getMovies()
  }, [])

  return (
    <>
      <h1>SLASHR</h1>

      {display
  ? (
    <>

      <Add handleCreate={handleCreate} />

      {movies.map((movie) => {
        return (
          <>
            <Movie movie={movie} />
            <Edit movie={movie} handleEdit={handleEdit} />

            <button
              onClick={() => {
                handleDelete(movie)
              }}
            >DELETE</button>
          </>
        )
      })}
    </>
  )
  : movies.map((index) => {
    return ( 
      <>
  <button onClick={displayToggle}>SHOW</button>

    <Index index={index} />
    
    </>
    )
  })
}
        
    </>
  );
};

export default App;