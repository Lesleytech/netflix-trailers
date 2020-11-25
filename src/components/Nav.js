import React, { useEffect, useState } from 'react';

import './Nav.css';

export default function Nav({ isVideo, isVideoLoading, handleClick }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else setShow(false);
    });
  }, []);
  return (
    <div className={`nav ${(show || isVideo) && 'nav_black'}`}>
      <img
        src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'
        alt='Netflix Logo'
        className='nav_logo'
      />

      {isVideo &&
        (isVideoLoading ? (
          <img src='loading.svg' alt='' className='loading' />
        ) : (
          <button onClick={handleClick}>Close trailer</button>
        ))}
    </div>
  );
}
