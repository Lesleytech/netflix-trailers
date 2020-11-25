import React, { useState, useEffect } from 'react';
import Youtube from 'react-youtube';

import Row from './components/Row';
import Banner from './components/Banner';
import Nav from './components/Nav';

import './App.css';

import request from './api/request';
import youtube from './api/youtube';
import { YT_API_KEY } from './api/keys';
import Welcome from './components/Welcome';

export default function App() {
  const [welcome, setWelcome] = useState(true);
  const [isVideo, setIsVideo] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [isMobile, setIsMobile] = useState(
    window.innerWidth > 600 ? false : true
  );

  const handleClick = async (e) => {
    setIsVideo(true);
    setIsVideoLoading(true);
    const response = await youtube.get('search', {
      params: {
        part: 'snippet',
        maxResults: 1,
        key: YT_API_KEY,
        q: e.target.title + ' trailer',
      },
    });

    setTrailerUrl(response.data.items[0].id.videoId);
  };

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
      {welcome ? (
        <Welcome setWelcome={setWelcome} />
      ) : (
        <>
          <Nav
            isVideo={isVideo}
            isVideoLoading={isVideoLoading}
            handleClick={() => {
              setTrailerUrl('');
              setIsVideo(false);
            }}
          />
          <Banner handleClick={handleClick} />
          <Row
            title='NETFLIX ORIGINALS'
            fetchUrl={request.fetchNetflixOriginals}
            isLargeRow
            handleClick={handleClick}
            isMobile={isMobile}
          />
          <Row
            title='Trending Now'
            fetchUrl={request.fetchTrending}
            handleClick={handleClick}
            isMobile={isMobile}
          />
          <Row
            title='Top Rated'
            fetchUrl={request.fetchTopRated}
            handleClick={handleClick}
            isMobile={isMobile}
          />
          <Row
            title='Action Movies'
            fetchUrl={request.fetchActionMovies}
            handleClick={handleClick}
            isMobile={isMobile}
          />
          <Row
            title='Comedy Movies'
            fetchUrl={request.fetchComedyMovies}
            handleClick={handleClick}
            isMobile={isMobile}
          />
          <Row
            title='Horror Movies'
            fetchUrl={request.fetchHorrorMovies}
            handleClick={handleClick}
            isMobile={isMobile}
          />
          <Row
            title='Romance Movies'
            fetchUrl={request.fetchRomanceMovies}
            handleClick={handleClick}
            isMobile={isMobile}
          />
          <Row
            title='Documentaries'
            fetchUrl={request.fetchDocumentaries}
            handleClick={handleClick}
            isMobile={isMobile}
          />

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
        </>
      )}
    </div>
  );
}
