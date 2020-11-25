import React, { useEffect } from 'react';
import Typed from 'typed.js';

import './Welcome.css';

export default function Welcome({ setWelcome }) {
  useEffect(() => {
    var typed = new Typed('.text', {
      strings: [
        'Coded by Lafen Lesley ^1000',
        'with <span>💖</span> ^1000',
        '😃 ^1000',
      ],
      typeSpeed: 15,
      backSpeed: 15,
      onComplete: () => setWelcome(false),
    });

    return () => typed.destroy();
  }, [setWelcome]);

  return (
    <div className='welcome'>
      <h4 className='text'></h4>
    </div>
  );
}
