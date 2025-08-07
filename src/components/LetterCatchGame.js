import React, { useState, useEffect, useRef } from 'react';
import { AudioPlayer } from './AudioPlayer';

export const LetterCatchGame = ({ onScore }) => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [currentLetter, setCurrentLetter] = useState(null);
  const [fallingLetters, setFallingLetters] = useState([]);
  const gameAreaRef = useRef(null);
  const animationFrameRef = useRef();

  const letters = [
    { char: 'A', sound: 'أيه', audio: '/audio/letters/a.mp3' },
    { char: 'B', sound: 'بي', audio: '/audio/letters/b.mp3' },
    { char: 'C', sound: 'سي', audio: '/audio/letters/c.mp3' },
    // ... المزيد من الحروف
  ];

  useEffect(() => {
    let lastTime = 0;
    const fps = 60;
    const interval = 1000 / fps;

    const gameLoop = (timestamp) => {
      if (timestamp - lastTime >= interval) {
        updateGame();
        lastTime = timestamp;
      }
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);
    spawnLetter();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const spawnLetter = () => {
    if (fallingLetters.length < 3) {
      const letter = letters[Math.floor(Math.random() * letters.length)];
      const x = Math.random() * (gameAreaRef.current.clientWidth - 50);
      setFallingLetters(prev => [...prev, {
        ...letter,
        id: Date.now(),
        x,
        y: -50,
        speed: 2 + Math.random() * 2
      }]);
    }
  };

  const updateGame = () => {
    if (gameOver) return;

    setFallingLetters(prev => {
      const updated = prev.map(letter => ({
        ...letter,
        y: letter.y + letter.speed
      }));

      // التحقق من الحروف التي وصلت للأسفل
      const missed = updated.filter(letter => letter.y > gameAreaRef.current.clientHeight);
      if (missed.length > 0) {
        setLives(l => {
          const newLives = l - missed.length;
          if (newLives <= 0) setGameOver(true);
          return Math.max(0, newLives);
        });
      }

      return updated.filter(letter => letter.y <= gameAreaRef.current.clientHeight);
    });

    if (Math.random() < 0.02) spawnLetter();
  };

  const handleLetterClick = (clickedLetter) => {
    if (currentLetter && clickedLetter.char === currentLetter.char) {
      setScore(s => s + 10);
      setFallingLetters(prev => prev.filter(l => l.id !== clickedLetter.id));
      if (onScore) onScore(10);
    }
  };

  return (
    <div className="relative w-full h-96 bg-blue-100 rounded-lg overflow-hidden">
      <div 
        ref={gameAreaRef}
        className="relative w-full h-full"
      >
        {fallingLetters.map(letter => (
          <div
            key={letter.id}
            className="absolute bg-white p-4 rounded-full shadow-lg cursor-pointer
                     transform hover:scale-110 transition-transform"
            style={{ left: letter.x, top: letter.y }}
            onClick={() => handleLetterClick(letter)}
          >
            <span className="text-2xl font-bold text-blue-600">{letter.char}</span>
          </div>
        ))}
      </div>

      <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-full shadow">
        <span className="font-bold">النقاط: {score}</span>
      </div>

      <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow">
        <span className="font-bold">❤️ {lives}</span>
      </div>

      {gameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">انتهت اللعبة!</h3>
            <p className="mb-4">النقاط النهائية: {score}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
            >
              العب مرة أخرى
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
