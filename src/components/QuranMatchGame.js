import React, { useState, useEffect } from 'react';
import { AudioPlayer } from './AudioPlayer';

const versePairs = [
  {
    id: 1,
    surah: 'الفاتحة',
    first: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    second: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    audio: '/audio/verses/fatiha-1.mp3',
    translation: {
      first: 'In the name of Allah, the Most Gracious, the Most Merciful',
      second: 'All praise is due to Allah, Lord of the worlds'
    }
  },
  {
    id: 2,
    surah: 'الإخلاص',
    first: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
    second: 'اللَّهُ الصَّمَدُ',
    audio: '/audio/verses/ikhlas-1.mp3',
    translation: {
      first: 'Say, "He is Allah, [who is] One"',
      second: 'Allah, the Eternal Refuge'
    }
  }
  // ... المزيد من الآيات
];

export const QuranMatchGame = ({ onComplete }) => {
  const [pairs, setPairs] = useState([]);
  const [selectedVerse, setSelectedVerse] = useState(null);
  const [score, setScore] = useState(0);
  const [matches, setMatches] = useState(new Set());
  const [showTranslation, setShowTranslation] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // خلط الآيات وإعداد اللعبة
    const gameVerses = versePairs.flatMap(pair => ([
      { id: `${pair.id}-1`, text: pair.first, pairId: pair.id, part: 'first', audio: pair.audio },
      { id: `${pair.id}-2`, text: pair.second, pairId: pair.id, part: 'second', audio: pair.audio }
    ]));
    setPairs(shuffleArray(gameVerses));
  }, []);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleVerseClick = (verse) => {
    if (matches.has(verse.pairId)) return;

    if (!selectedVerse) {
      setSelectedVerse(verse);
    } else {
      if (selectedVerse.pairId === verse.pairId && selectedVerse.id !== verse.id) {
        // تطابق صحيح
        setMatches(prev => new Set(prev).add(verse.pairId));
        setScore(score + 10);
        setMessage('أحسنت! ✨');
        
        if (matches.size + 1 === versePairs.length) {
          onComplete && onComplete(score + 10);
        }
      } else {
        // تطابق خاطئ
        setMessage('حاول مرة أخرى 🤔');
      }
      setTimeout(() => {
        setSelectedVerse(null);
        setMessage('');
      }, 1000);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">النقاط: {score}</h3>
        <button
          onClick={() => setShowTranslation(!showTranslation)}
          className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
        >
          {showTranslation ? 'إخفاء الترجمة' : 'عرض الترجمة'}
        </button>
      </div>

      {message && (
        <div className="text-center mb-4 text-xl font-bold text-green-600 animate-bounce">
          {message}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {pairs.map(verse => (
          <div
            key={verse.id}
            onClick={() => handleVerseClick(verse)}
            className={`p-4 rounded-lg cursor-pointer text-right transition-all
              ${matches.has(verse.pairId) ? 'bg-green-100 text-green-800' : 
                selectedVerse?.id === verse.id ? 'bg-blue-100 text-blue-800' :
                'bg-gray-50 hover:bg-gray-100'}`}
          >
            <p className="text-lg mb-2">{verse.text}</p>
            {showTranslation && (
              <p className="text-sm text-gray-600">
                {versePairs.find(p => p.id === verse.pairId).translation[verse.part]}
              </p>
            )}
            {matches.has(verse.pairId) && (
              <AudioPlayer audioUrl={verse.audio} />
            )}
          </div>
        ))}
      </div>

      {matches.size === versePairs.length && (
        <div className="mt-6 text-center">
          <h3 className="text-2xl font-bold text-green-600 mb-4">
            أحسنت! لقد أكملت جميع المطابقات! 🎉
          </h3>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
            العب مرة أخرى
          </button>
        </div>
      )}
    </div>
  );
};
