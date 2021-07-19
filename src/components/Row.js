import React, { useState, useEffect } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import axios from '../api/axios';
import Movie from './Movie';
import './Row.css';

const base_url = 'https://image.tmdb.org/t/p/original/';

export default function Row({ title, fetchUrl, onClick, onHover, isMobile }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, [fetchUrl]);

  const _movies = movies.map((movie, index) => (
    <Movie
      src={`${base_url}${movie.poster_path}`}
      key={index}
      onClick={() => onClick(movie.name || movie.title)}
      onMouseOver={(e) => onHover({ hover: true, movie }, e)}
      onMouseLeave={() => onHover({ hover: false })}
      name={movie.name || movie.title}
    />
  ));

  return (
    <div className='row'>
      <h2>{title}</h2>

      {isMobile ? (
        <div className='row_posters'>{_movies}</div>
      ) : (
        <ScrollMenu
          data={_movies}
          arrowLeft={
            <button className='arrow-left arrow'>
              <FaChevronLeft />
            </button>
          }
          arrowRight={
            <button className='arrow-right arrow'>
              <FaChevronRight />
            </button>
          }
          wheel={false}
        />
      )}
    </div>
  );
}
