import React, { useState, useEffect } from "react";
import axios from "axios";
import Movie from "./components/Movie";
import Add from "./components/Add";
import Edit from "./components/Edit";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showAdd, setShowAdd] = useState(false); // add state for showing/hiding Add component

  const handleCreate = (data) => {
    axios
      .post("http://localhost:3000/movies", data)
      .then((response) => {
        let newMovies = [...movies, response.results];
        setMovies(newMovies);
        setShowAdd(false); // hide Add component after creating a new movie
      })
      .catch((error) => console.log(error));
  };

  const getMovies = () => {
    axios
      .get("http://localhost:3000/movies")
      .then((response) => {
        setMovies(response.data.results);
        console.log(response.data.results);
      })
      .catch((error) => console.log(error));
  };

  const handleEdit = (data) => {
    axios
      .put("http://localhost:3000/movies/" + data._id, data)
      .then((response) => {
        let newMovies = movies.map((movie) => {
          return movie._id !== data._id ? movie : data;
        });
        setMovies(newMovies);
        toggleEdit();
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (deletedMovie) => {
    axios
      .delete("http://localhost:3000/movies/" + deletedMovie._id)
      .then((response) => {
        let newMovies = movies.filter((movie) => {
          return movie._id !== deletedMovie._id;
        });
        setMovies(newMovies);
      })
      .catch((error) => console.log(error));
  };

  const toggleEdit = (movie = null) => {
    setShowEdit(!showEdit);
    setSelectedMovie(movie);
  };

  const toggleAdd = () => {
    setShowAdd(!showAdd); // toggle showing/hiding Add component
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      <div className="toggle-menu">
        <button className="create-nav" onClick={toggleAdd}> ≡ </button>  
      </div>
      {showAdd && <Add handleCreate={handleCreate} />} 
      <h1>SLASHR</h1>
      <div className="cards-container">
        {movies.map((movie) => {
          return (
            <div className="card" key={movie._id}>
              <div onClick={() => setSelectedMovie(movie)}>
                <Movie movie={movie} />
              </div>
              {selectedMovie && selectedMovie._id === movie._id && (
                <div>
                  <button onClick={() => toggleEdit(movie)}>Edit</button>
                  <button
                    onClick={() => {
                      handleDelete(movie);
                    }}
                  >
                    Remove
                  </button>
                  {showEdit && selectedMovie && selectedMovie._id === movie._id && (
                    <Edit movie={selectedMovie} handleEdit={handleEdit} />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}



export default App;