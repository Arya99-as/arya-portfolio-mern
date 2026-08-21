import { useState, useEffect } from 'react';

export function useTypingEffect(words = [], typingSpeed = 90, deleteSpeed = 40, pauseDuration = 2000) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setText(words[0]);
      return;
    }

    const currentWord = words[wordIndex % words.length];

    let timer;
    if (!isDeleting) {
      if (text.length < currentWord.length) {
        timer = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => {
          setText(currentWord.slice(0, text.length - 1));
        }, deleteSpeed);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deleteSpeed, pauseDuration]);

  return text;
}
