import React, { useState, useEffect } from 'react';

import requests from '../api/request';
import axios from '../api/axios';

import './Banner.css';

export default function Banner({ handleClick }) {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  return (
    <header
      className='banner'
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: 'top center',
      }}
    >
      <div className='banner_contents'>
        <h1 className='banner_title'>
          {truncate(movie?.title || movie?.name || movie?.original_name, 20)}
        </h1>
        <div className='banner_btns'>
          <button
            className='banner_btn'
            onClick={handleClick}
            title={movie?.title || movie?.name}
          >
            Play
          </button>
          <button className='banner_btn'>My List</button>
        </div>
        <h2 className='banner_description'>{truncate(movie?.overview, 150)}</h2>
      </div>
    </header>
  );
}
