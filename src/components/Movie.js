import React, { useState } from 'react';
import { GoPlay } from 'react-icons/go';
import Skeleton from 'react-loading-skeleton';

import './Movie.css';

function Movie({ src, onClick, onMouseLeave, onMouseOver, name }) {
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  return (
    <div className='movie-container'>
      <img
        src={isError ? 'img-placeholder.jpg' : src}
        alt={name}
        className='movie-img'
        onClick={onClick}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        style={{
          display: loading ? 'none' : 'block',
        }}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setIsError(true);
        }}
      />
      <div className='movie-overlay'>
        <div>
          <GoPlay />
        </div>
      </div>
      {loading && (
        <Skeleton width={166.66} height={250} className='movie-img-loader' />
      )}
    </div>
  );
}

export default Movie;
