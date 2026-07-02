'use client';

import React, { useEffect, useState } from 'react';

export default function Typewriter() {
  const words = [
    "Scalable Backend APIs",
    "Intelligent AI Agents",
    "Real-time Video Processing",
    "High-Performance Code",
    "Distributed Systems"
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(120);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleType = () => {
      const fullWord = words[currentWordIndex];
      
      if (isDeleting) {
        // Deleting characters
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        setTypingSpeed(50); // Deleting is faster
      } else {
        // Typing characters
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        setTypingSpeed(120);
      }

      // Check transitions
      if (!isDeleting && currentText === fullWord) {
        // Finished typing, pause
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      } else if (isDeleting && currentText === '') {
        // Finished deleting, move to next word
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setTypingSpeed(500); // Pause before typing next word
      } else {
        timer = setTimeout(handleType, typingSpeed);
      }
    };

    timer = setTimeout(handleType, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, typingSpeed]);

  return (
    <>
      <span id="typewriter" className="typewriter">{currentText}</span>
      <span className="cursor">|</span>
    </>
  );
}
