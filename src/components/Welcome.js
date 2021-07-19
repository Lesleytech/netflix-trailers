import React, { useEffect } from 'react';
import Typed from 'typed.js';

import './Welcome.css';

export default function Welcome({ setWelcome }) {
  useEffect(() => {
    var typed = new Typed('.text', {
      strings: [
        'Coded by ^700Lafen Lesley ^800 with <span>💖</span>^300.',
        '^300😃^700',
      ],
      typeSpeed: 25,
      fadeOut: true,
      onComplete: () => setWelcome(false),
    });

    return () => typed.destroy();
  }, [setWelcome]);

  return (
    <div className='welcome'>
      <p className='text' style={{ color: 'white' }}></p>
    </div>
  );
}
