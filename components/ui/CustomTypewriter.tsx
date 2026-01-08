'use client';

import { useState, useEffect } from 'react';

interface CustomTypewriterProps {
  text: string;
  speed?: number;
  className?: string;
}

export function CustomTypewriter({ text, speed = 50, className = '' }: CustomTypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <p className={className}>
      {displayedText}
      {currentIndex < text.length && <span className="animate-pulse">|</span>}
    </p>
  );
}