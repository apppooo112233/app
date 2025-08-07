import React, { useState } from 'react';
import Head from 'next/head';
import { AudioPlayer } from '../components/AudioPlayer';
import { AnimatedLetter, LetterCard, RewardAnimation, WritingGuide } from '../components/InteractiveAnimations';

const alphabet = [
  { 
    letter: 'A a', 
    sound: 'أيه',
    example: { 
      word: 'Apple', 
      arabic: 'تفاحة', 
      image: '/images/letters/apple.png',
      sentence: 'An Apple a day keeps the doctor away',
      sentenceArabic: 'تفاحة في اليوم تبعد الطبيب عنك'
    },
    audioUrl: '/audio/letters/a.mp3',
    writing: {
      uppercase: 'M10 90 L50 10 L90 90 M30 50 L70 50',
      lowercase: 'M20 60 C40 0, 60 0, 60 30 C60 60, 20 60, 20 30'
    }
  },
  { 
    letter: 'B b', 
    sound: 'بي',
    example: { 
      word: 'Ball', 
      arabic: 'كرة', 
      image: '/images/letters/ball.png',
      sentence: 'The blue Ball is bouncing',
      sentenceArabic: 'الكرة الزرقاء تتدحرج'
    },
    audioUrl: '/audio/letters/b.mp3',
    writing: {
      uppercase: 'M20 10 L20 90 M20 10 C90 10, 90 50, 20 50 M20 50 C90 50, 90 90, 20 90',
      lowercase: 'M20 30 L20 90 C20 60, 60 60, 60 45 C60 30, 20 30, 20 45'
    }
  },
  { 
    letter: 'C c', 
    sound: 'سي',
    example: { 
      word: 'Cat', 
      arabic: 'قط', 
      image: '/images/letters/cat.png',
      sentence: 'The Cat catches the mouse',
      sentenceArabic: 'القط يمسك الفأر'
    },
    audioUrl: '/audio/letters/c.mp3',
    writing: {
      uppercase: 'M80 20 C0 20, 0 80, 80 80',
      lowercase: 'M60 40 C20 40, 20 60, 60 60'
    }
  },
  { 
    letter: 'D d', 
    sound: 'دي',
    example: { 
      word: 'Dog', 
      arabic: 'كلب', 
      image: '/images/letters/dog.png',
      sentence: 'The Dog plays in the garden',
      sentenceArabic: 'الكلب يلعب في الحديقة'
    },
    audioUrl: '/audio/letters/d.mp3',
    writing: {
      uppercase: 'M20 10 L20 90 C90 90, 90 10, 20 10',
      lowercase: 'M20 30 L20 90 C20 60, 60 60, 60 45 C60 30, 20 30, 20 45'
    }
  }
];

const AlphabetPage = () => {
  const [currentLetter, setCurrentLetter] = useState(0);
  const [showWritingGuide, setShowWritingGuide] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [points, setPoints] = useState(0);

  const handleNextLetter = () => {
    if (currentLetter < alphabet.length - 1) {
      setCurrentLetter(currentLetter + 1);
      setShowWritingGuide(false);
      setPoints(prev => prev + 5);
    } else {
      setShowReward(true);
      setPoints(prev => prev + 50);
      setTimeout(() => setShowReward(false), 3000);
    }
  };

  const handlePreviousLetter = () => {
    if (currentLetter > 0) {
      setCurrentLetter(currentLetter - 1);
      setShowWritingGuide(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-blue-50 to-purple-50 min-h-screen">
      <Head>
        <title>تعلم الحروف الإنجليزية</title>
        <meta name="description" content="تعلم الحروف الإنجليزية بطريقة تفاعلية وممتعة" />
      </Head>

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800">
            تعلم الحروف الإنجليزية
          </h1>
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
            النقاط: {points}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <AnimatedLetter
                letter={alphabet[currentLetter].letter}
                isActive={!showWritingGuide}
                onComplete={() => setPoints(prev => prev + 5)}
              />
              <div className="text-center mt-4">
                <p className="text-2xl text-gray-600 mb-4">
                  النطق: {alphabet[currentLetter].sound}
                </p>
                <AudioPlayer
                  audioUrl={alphabet[currentLetter].audioUrl}
                  onPlay={() => setIsPlaying(true)}
                  onComplete={() => setIsPlaying(false)}
                />
              </div>
            </div>

            <div>
              {showWritingGuide ? (
                <WritingGuide
                  strokes={[
                    alphabet[currentLetter].writing.uppercase,
                    alphabet[currentLetter].writing.lowercase
                  ]}
                  isPlaying={isPlaying}
                />
              ) : (
                <LetterCard
                  letter={alphabet[currentLetter].letter}
                  example={alphabet[currentLetter].example}
                  audioUrl={alphabet[currentLetter].audioUrl}
                  onComplete={() => setPoints(prev => prev + 5)}
                />
              )}
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setShowWritingGuide(!showWritingGuide)}
              className="bg-purple-500 text-white px-6 py-3 rounded-full hover:bg-purple-600"
            >
              {showWritingGuide ? 'عرض المثال' : 'تعلم الكتابة'}
            </button>
            <button
              onClick={handlePreviousLetter}
              disabled={currentLetter === 0}
              className={`px-6 py-3 rounded-full ${
                currentLetter === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              السابق
            </button>
            <button
              onClick={handleNextLetter}
              className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600"
            >
              التالي
            </button>
          </div>
        </div>

        <div className="bg-white rounded-full h-4 shadow-inner overflow-hidden">
          <div
            className="bg-blue-500 h-full transition-all duration-500"
            style={{ width: `${((currentLetter + 1) / alphabet.length) * 100}%` }}
          />
        </div>
        <div className="text-center mt-2 text-gray-600">
          {currentLetter + 1} من {alphabet.length}
        </div>
      </div>

      {showReward && (
        <RewardAnimation
          points={50}
          message="رائع! لقد تعلمت كل الحروف! 🌟"
        />
      )}
    </div>
  );
};

export default AlphabetPage;
