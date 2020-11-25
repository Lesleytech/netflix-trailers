import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import axios from '../api/axios';

import './Row.css';

const base_url = 'https://image.tmdb.org/t/p/original/';

const responsive = {
  largeDesktop: {
    breakpoint: { max: 3000, min: 1380 },
    items: 7,
    slidesToSlide: 3,
  },
  desktop: {
    breakpoint: { max: 1380, min: 1150 },
    items: 6,
    slidesToSlide: 3,
  },
  largeTablet: {
    breakpoint: { max: 1150, min: 980 },
    items: 5,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 980, min: 780 },
    items: 4,
    slidesToSlide: 2,
  },
  smallTablet: {
    breakpoint: { max: 780, min: 580 },
    items: 3,
    slidesToSlide: 2,
  },
};

export default function Row({
  title,
  fetchUrl,
  isLargeRow,
  handleClick,
  isMobile,
}) {
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
    <img
      src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
      alt={movie.name}
      title={movie.name || movie.title}
      className={`row_poster ${isLargeRow && 'row_poster_lg'}`}
      key={index}
      onClick={handleClick}
    />
  ));

  return (
    <div className='row'>
      <h2>{title}</h2>

      {isMobile ? (
        <div className='row_posters'>{_movies}</div>
      ) : (
        <Carousel responsive={responsive} partialVisible={true}>
          {_movies}
        </Carousel>
      )}
    </div>
  );
}
