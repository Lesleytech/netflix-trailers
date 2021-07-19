import React, { useState, useEffect, useCallback } from 'react';
import Youtube from 'react-youtube';

import Row from './components/Row';
import Banner from './components/Banner';
import Nav from './components/Nav';

import './App.css';

import request from './api/request';
import youtube from './api/youtube';
import { YT_API_KEY } from './api/keys';
import MovieDetails from './components/MovieDetails';

const categories = [
  {
    title: 'NETFLIX ORIGINALS',
    fetchUrl: request.fetchNetflixOriginals,
  },
  {
    title: 'Trending Now',
    fetchUrl: request.fetchTrending,
  },
  {
    title: 'Top Rated',
    fetchUrl: request.fetchTopRated,
  },
  {
    title: 'Action Movies',
    fetchUrl: request.fetchActionMovies,
  },
  {
    title: 'Romance Movies',
    fetchUrl: request.fetchRomanceMovies,
  },
  {
    title: 'Comedy Movies',
    fetchUrl: request.fetchComedyMovies,
  },
  {
    title: 'Horror Movies',
    fetchUrl: request.fetchHorrorMovies,
  },
  {
    title: 'Documentaries',
    fetchUrl: request.fetchDocumentaries,
  },
];

export default function App() {
  const [movieBox, setMovieBox] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [isMobile, setIsMobile] = useState(
    window.innerWidth > 600 ? false : true
  );

  const handleClick = async (movieTitle) => {
    setIsVideo(true);
    setIsVideoLoading(true);
    const response = await youtube.get('search', {
      params: {
        part: 'snippet',
        maxResults: 1,
        key: YT_API_KEY,
        q: movieTitle + ' trailer',
      },
    });

    setTrailerUrl(response.data.items[0].id.videoId);
  };

  const handleHover = useCallback(
    ({ hover, movie }, event) => {
      if (!hover || !movie || isMobile) return setMovieBox(null);

      const position = { x: event.clientX, y: event.clientY };

      setMovieBox({ movie, position });
    },
    [isMobile]
  );

  const opts = {
    height: isMobile ? '230' : '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 580) {
        setIsMobile(false);
      } else {
        setIsMobile(true);
      }
    });
  }, []);

  return (
    <div className='app'>
      <div>
        <Nav
          isVideo={isVideo}
          isVideoLoading={isVideoLoading}
          handleClick={() => {
            setTrailerUrl('');
            setIsVideo(false);
          }}
        />
        <Banner onClick={handleClick} />
        {categories.map(({ fetchUrl, title }, key) => (
          <Row
            title={title}
            fetchUrl={fetchUrl}
            onClick={handleClick}
            onHover={handleHover}
            isMobile={isMobile}
            key={key}
          />
        ))}
        {trailerUrl && (
          <Youtube
            videoId={trailerUrl}
            className='movie_trailer'
            opts={opts}
            onEnd={() => {
              setTrailerUrl('');
              setIsVideo(false);
            }}
            onReady={() => setIsVideoLoading(false)}
            onError={() => setIsVideoLoading(false)}
            onStateChange={() => setIsVideoLoading(false)}
            containerClassName='youtube_player'
          />
        )}
        {movieBox && (
          <MovieDetails movie={movieBox.movie} pos={movieBox.position} />
        )}
      </div>
    </div>
  );
}
