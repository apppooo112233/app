import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  { ssr: false }
);

export const AnimatedLetter = ({ letter, isActive, onComplete }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isActive && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
        if (onComplete) onComplete();
      }, 2000);
    }
  }, [isActive, onComplete]);

  return (
    <div className={`text-8xl font-bold text-center text-blue-600 transition-all duration-500 ${
      isAnimating ? 'scale-110 transform' : ''
    }`}>
      {letter}
    </div>
  );
};

export const LetterCard = ({ letter, example, audioUrl, onComplete }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-4xl font-bold mb-4 text-center">{example.word}</h3>
      <p className="text-2xl text-center text-gray-600 mb-4">{example.arabic}</p>
      <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
        {example.image ? (
          <img 
            src={example.image} 
            alt={example.word} 
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <span className="text-gray-400">No image available</span>
        )}
      </div>
      <p className="text-lg text-gray-700 mb-2 text-right">{example.sentence}</p>
      <p className="text-lg text-gray-600 text-right">{example.sentenceArabic}</p>
    </div>
  );
};

export const WritingGuide = ({ strokes, isPlaying }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="text-xl font-bold mb-4 text-center">الحرف الكبير</h4>
          <svg
            viewBox="0 0 100 100"
            className={`w-full stroke-2 ${isPlaying ? 'animate-draw' : ''}`}
          >
            <path
              d={strokes[0]}
              className="text-blue-500 fill-none stroke-current"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <h4 className="text-xl font-bold mb-4 text-center">الحرف الصغير</h4>
          <svg
            viewBox="0 0 100 100"
            className={`w-full stroke-2 ${isPlaying ? 'animate-draw' : ''}`}
          >
            <path
              d={strokes[1]}
              className="text-green-500 fill-none stroke-current"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export const RewardAnimation = ({ points, message }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl p-8 max-w-md text-center">
        <Player
          autoplay
          loop
          src="/animations/success.json"
          style={{ height: '200px', width: '200px' }}
        />
        <h3 className="text-2xl font-bold text-green-600 mb-2">{message}</h3>
        <p className="text-xl text-blue-600">+{points} نقطة</p>
      </div>
    </div>
  );
};

export const CharacterAnimation = ({ character, isActive }) => {
  return (
    <div className={`transition-all duration-500 ${isActive ? 'scale-100' : 'scale-0'}`}>
      <Player
        autoplay
        loop={isActive}
        src={`/animations/${character}.json`}
        style={{ height: '120px', width: '120px' }}
      />
    </div>
  );
};
