import React from 'react'

const Index = (props) => {
    return (
        <>
          <img
            src={props.index.poster}
            alt={props.index.poster}
            style={{ maxWidth: '50%', maxHeight: '50%' }}
          />
          <h3>{props.index.title}</h3>
        </>
      );
}

export default Index