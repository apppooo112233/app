import React, { useState } from 'react';
import { AudioPlayer } from './AudioPlayer';
import { RewardAnimation } from './InteractiveAnimations';

const WordLearningCard = ({ word, arabic, pronunciation, onLearn }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLearned, setIsLearned] = useState(false);

  const handleLearn = () => {
    setIsLearned(true);
    if (onLearn) onLearn();
  };

  return (
    <div className="relative perspective-1000">
      <div 
        className={`relative w-full h-40 cursor-pointer transition-transform duration-500 transform-style-3d
                    ${isFlipped ? 'rotate-y-180' : ''}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of card */}
        <div className="absolute inset-0 bg-white rounded-xl shadow-lg p-4 backface-hidden">
          <div className="h-full flex flex-col items-center justify-center space-y-2">
            <h3 className="text-2xl font-bold text-blue-600">{word}</h3>
            <p className="text-gray-600">Click to see translation</p>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 bg-green-50 rounded-xl shadow-lg p-4 backface-hidden rotate-y-180">
          <div className="h-full flex flex-col items-center justify-center space-y-2 text-right">
            <h3 className="text-2xl font-bold text-green-600">{arabic}</h3>
            <p className="text-gray-600">النطق: {pronunciation}</p>
          </div>
        </div>
      </div>

      {!isLearned && (
        <button
          className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 
                     bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full
                     hover:bg-yellow-300 transition-colors shadow-lg"
          onClick={handleLearn}
        >
          تم الحفظ! ✓
        </button>
      )}
    </div>
  );
};

const StoryLearningModule = ({ words, onComplete }) => {
  const [learnedWords, setLearnedWords] = useState(new Set());
  const [showReward, setShowReward] = useState(false);

  const handleWordLearn = (word) => {
    const newLearned = new Set(learnedWords);
    newLearned.add(word);
    setLearnedWords(newLearned);

    if (newLearned.size === words.length) {
      setShowReward(true);
      if (onComplete) onComplete();
    }
  };

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">تعلم كلمات جديدة من القصة</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {words.map((wordObj) => (
          <WordLearningCard
            key={wordObj.word}
            {...wordObj}
            onLearn={() => handleWordLearn(wordObj.word)}
          />
        ))}
      </div>

      {showReward && (
        <RewardAnimation
          points={words.length}
          message="أحسنت! لقد تعلمت كل الكلمات!"
        />
      )}

      <div className="mt-8 text-center">
        <div className="inline-block bg-green-100 rounded-full px-4 py-2">
          <span className="text-green-800">
            تم تعلم {learnedWords.size} من {words.length} كلمات
          </span>
        </div>
      </div>
    </div>
  );
};

export default StoryLearningModule;
