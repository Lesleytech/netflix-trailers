import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { truncate } from '../helper';
import './MovieDetails.css';

function MovieDetails({ movie, pos }) {
  const winWidth = window.innerWidth;
  const winHeight = window.innerHeight;

  if (pos.x + 300 >= winWidth) pos.x -= 300;
  if (pos.y + 250 >= winHeight) pos.y -= 250;

  const releaseYear = (movie.first_air_date || movie.release_date)?.substr(
    0,
    4
  );

  return (
    <div className='movie-details' style={{ left: pos.x, top: pos.y }}>
      <div className='title'>{truncate(movie.title || movie.name, 25)}</div>
      <div className='subtitle'>{releaseYear}</div>
      <small className='movie-details-description'>
        {truncate(movie.overview, 200)}
      </small>
      <div className='rating-container'>
        <ReactStars
          count={5}
          value={(movie.vote_average || 0) / 2}
          size={24}
          activeColor='#e50914'
          isHalf={true}
        />
        <small className='movie-details-rating'>
          {movie.vote_average} <span> / {movie.vote_count} votes</span>
        </small>
      </div>
    </div>
  );
}

export default MovieDetails;
