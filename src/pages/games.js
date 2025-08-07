import React, { useState } from 'react';
import Head from 'next/head';
import { AudioPlayer } from '../components/AudioPlayer';
import { RewardAnimation } from '../components/InteractiveAnimations';

const games = [
  {
    id: 'memory',
    title: 'لعبة الذاكرة',
    description: 'طابق الكلمات الإنجليزية مع معانيها العربية',
    icon: '🎴',
    level: 'سهل',
    category: 'vocabulary'
  },
  {
    id: 'word-puzzle',
    title: 'أحجية الكلمات',
    description: 'رتب الحروف لتكوين الكلمة الصحيحة',
    icon: '🔤',
    level: 'متوسط',
    category: 'spelling'
  },
  {
    id: 'letter-catch',
    title: 'اصطياد الحروف',
    description: 'اصطد الحروف الصحيحة قبل سقوطها',
    icon: '🎯',
    level: 'سهل',
    category: 'alphabet'
  },
  {
    id: 'quran-match',
    title: 'مطابقة الآيات',
    description: 'اربط بداية الآية مع نهايتها',
    icon: '📖',
    level: 'متقدم',
    category: 'quran'
  }
];

// لعبة الذاكرة
const MemoryGame = () => {
  const [score, setScore] = useState(0);
  const [cards, setCards] = useState([
    { id: 1, english: 'Book', arabic: 'كتاب', isFlipped: false, isMatched: false },
    { id: 2, english: 'Sun', arabic: 'شمس', isFlipped: false, isMatched: false },
    { id: 3, english: 'Moon', arabic: 'قمر', isFlipped: false, isMatched: false },
    { id: 4, english: 'Star', arabic: 'نجمة', isFlipped: false, isMatched: false }
  ]);
  const [flippedCards, setFlippedCards] = useState([]);

  const handleCardClick = (cardId) => {
    const newCards = [...cards];
    const card = newCards.find(c => c.id === cardId);
    
    if (flippedCards.length === 2 || card.isMatched) return;
    
    card.isFlipped = true;
    setCards(newCards);
    
    if (flippedCards.length === 1) {
      const firstCard = cards.find(c => c.id === flippedCards[0]);
      if (
        (firstCard.english === card.arabic) || 
        (firstCard.arabic === card.english)
      ) {
        firstCard.isMatched = true;
        card.isMatched = true;
        setScore(score + 10);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          firstCard.isFlipped = false;
          card.isFlipped = false;
          setCards([...newCards]);
          setFlippedCards([]);
        }, 1000);
      }
    } else {
      setFlippedCards([cardId]);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4">النقاط: {score}</h3>
      <div className="grid grid-cols-4 gap-4">
        {cards.map(card => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`p-4 rounded-lg cursor-pointer text-center transition-all transform hover:scale-105
              ${card.isFlipped ? 'bg-blue-500 text-white' : 'bg-gray-100'}
              ${card.isMatched ? 'bg-green-500 text-white' : ''}`}
          >
            {card.isFlipped ? (card.english || card.arabic) : '?'}
          </div>
        ))}
      </div>
    </div>
  );
};

// لعبة ترتيب الكلمات
const WordPuzzle = () => {
  const [currentWord, setCurrentWord] = useState({
    word: 'APPLE',
    hint: 'فاكهة حمراء',
    letters: 'PEALP'.split('')
  });
  const [userAnswer, setUserAnswer] = useState([]);
  const [score, setScore] = useState(0);

  const handleLetterClick = (letter, index) => {
    setUserAnswer([...userAnswer, letter]);
    setCurrentWord({
      ...currentWord,
      letters: currentWord.letters.filter((_, i) => i !== index)
    });
  };

  const checkAnswer = () => {
    if (userAnswer.join('') === currentWord.word) {
      setScore(score + 10);
      // انتقل للكلمة التالية
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg text-center">
      <h3 className="text-2xl font-bold mb-4">النقاط: {score}</h3>
      <p className="text-lg mb-4">التلميح: {currentWord.hint}</p>
      
      <div className="mb-6">
        {userAnswer.map((letter, index) => (
          <span key={index} className="inline-block p-3 m-1 bg-blue-500 text-white rounded">
            {letter}
          </span>
        ))}
      </div>

      <div className="flex justify-center gap-2 mb-4">
        {currentWord.letters.map((letter, index) => (
          <button
            key={index}
            onClick={() => handleLetterClick(letter, index)}
            className="p-3 bg-gray-100 rounded hover:bg-gray-200"
          >
            {letter}
          </button>
        ))}
      </div>

      <button
        onClick={checkAnswer}
        className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
      >
        تحقق
      </button>
    </div>
  );
};

const EducationalGamesPage = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [showReward, setShowReward] = useState(false);

  const renderGame = (gameId) => {
    switch (gameId) {
      case 'memory':
        return <MemoryGame />;
      case 'word-puzzle':
        return <WordPuzzle />;
      case 'letter-catch':
        return <LetterCatchGame onScore={(points) => setShowReward(points >= 50)} />;
      case 'quran-match':
        return <QuranMatchGame onComplete={(score) => setShowReward(true)} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-yellow-50 to-orange-50 min-h-screen">
      <Head>
        <title>الألعاب التعليمية</title>
      </Head>

      <h1 className="text-4xl font-bold text-center text-orange-800 mb-8">
        الألعاب التعليمية
      </h1>

      {!selectedGame ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map(game => (
            <div
              key={game.id}
              onClick={() => setSelectedGame(game)}
              className="bg-white p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-all"
            >
              <div className="text-center">
                <span className="text-6xl mb-4 block">{game.icon}</span>
                <h2 className="text-2xl font-bold text-orange-600">{game.title}</h2>
                <p className="mt-2 text-gray-600">{game.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                    {game.level}
                  </span>
                  <span className="text-gray-500">{game.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedGame(null)}
            className="mb-6 text-orange-600 hover:text-orange-800"
          >
            ← العودة للألعاب
          </button>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">
              {selectedGame.title} {selectedGame.icon}
            </h2>
            {renderGame(selectedGame.id)}
          </div>
        </div>
      )}

      {showReward && (
        <RewardAnimation
          points={50}
          message="أحسنت! لقد أكملت اللعبة بنجاح!"
        />
      )}
    </div>
  );
};

export default EducationalGamesPage;
