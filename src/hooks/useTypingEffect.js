import { useState, useEffect } from 'react';

export const useTypingEffect = (text, speed = 100, delay = 1000) => {
  const [displayText, setDisplayText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let timeout;
    if (displayText.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayText(text.substring(0, displayText.length + 1));
      }, speed);
    } else {
      setIsDone(true);
    }

    return () => clearTimeout(timeout);
  }, [displayText, text, speed]);

  return { displayText, isDone };
};
