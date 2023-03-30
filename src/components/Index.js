import React from 'react';

const Index = (props) => {
  return (
    <>
      <a href={props.index.url}>
        <img
          src={props.index.poster}
          alt={props.index.poster}
          style={{ maxWidth: '50%', maxHeight: '50%' }}
        />
        <h3>{props.index.title}</h3>
      </a>
    </>
  );
}

export default Index;
