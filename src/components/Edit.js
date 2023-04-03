import React, { useState } from "react";

function Edit(props) {
  const [formData, setFormData] = useState({
    title: props.movie.title,
    release_date: props.movie.release_date,
    overview: props.movie.overview,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleEdit(props.movie.id, formData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Release Date:
        <input
          type="text"
          name="release_date"
          value={formData.release_date}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Overview:
        <textarea
          name="overview"
          value={formData.overview}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default Edit;
