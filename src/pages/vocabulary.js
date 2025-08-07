import React, { useState } from 'react';
import Head from 'next/head';
import { AudioPlayer } from '../components/AudioPlayer';
import { RewardAnimation } from '../components/InteractiveAnimations';

const categories = [
  {
    id: 1,
    name: 'عائلتي',
    icon: '👪',
    words: [
      { 
        english: 'Father',
        arabic: 'أب',
        pronunciation: 'فاذر',
        image: '/images/vocabulary/father.png',
        audioUrl: '/audio/vocabulary/father.mp3',
        example: 'My father is kind - أبي طيب'
      },
      { 
        english: 'Mother',
        arabic: 'أم',
        pronunciation: 'ماذر',
        image: '/images/vocabulary/mother.png',
        audioUrl: '/audio/vocabulary/mother.mp3',
        example: 'I love my mother - أنا أحب أمي'
      }
    ]
  },
  {
    id: 2,
    name: 'الألوان',
    icon: '🎨',
    words: [
      {
        english: 'Red',
        arabic: 'أحمر',
        pronunciation: 'ريد',
        image: '/images/vocabulary/red.png',
        audioUrl: '/audio/vocabulary/red.mp3',
        example: 'The apple is red - التفاحة حمراء'
      },
      {
        english: 'Blue',
        arabic: 'أزرق',
        pronunciation: 'بلو',
        image: '/images/vocabulary/blue.png',
        audioUrl: '/audio/vocabulary/blue.mp3',
        example: 'The sky is blue - السماء زرقاء'
      }
    ]
  },
  {
    id: 3,
    name: 'الحيوانات',
    icon: '🦁',
    words: [
      {
        english: 'Cat',
        arabic: 'قط',
        pronunciation: 'كات',
        image: '/images/vocabulary/cat.png',
        audioUrl: '/audio/vocabulary/cat.mp3',
        example: 'The cat is sleeping - القط نائم'
      },
      {
        english: 'Dog',
        arabic: 'كلب',
        pronunciation: 'دوج',
        image: '/images/vocabulary/dog.png',
        audioUrl: '/audio/vocabulary/dog.mp3',
        example: 'The dog is playing - الكلب يلعب'
      }
    ]
  }
];

const WordCard = ({ word, onLearn }) => {
  const [showExample, setShowExample] = useState(false);
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-transform hover:scale-105">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-blue-600 mb-2">{word.english}</h3>
        <p className="text-xl text-gray-700 mb-2">{word.arabic}</p>
        <p className="text-gray-500 mb-4">النطق: {word.pronunciation}</p>

        <div className="mb-4 h-40 bg-gray-100 rounded-lg flex items-center justify-center">
          {/* هنا ستكون صورة الكلمة */}
          <span className="text-gray-500">صورة {word.english}</span>
        </div>

        <AudioPlayer audioUrl={word.audioUrl} />

        <button
          className="mt-4 px-4 py-2 bg-yellow-400 text-yellow-900 rounded-full hover:bg-yellow-300"
          onClick={() => setShowExample(!showExample)}
        >
          {showExample ? 'إخفاء المثال' : 'عرض المثال'}
        </button>

        {showExample && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800">{word.example}</p>
          </div>
        )}

        <button
          className="mt-4 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
          onClick={onLearn}
        >
          تم الحفظ! ✓
        </button>
      </div>
    </div>
  );
};

const VocabularyPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [learnedWords, setLearnedWords] = useState(new Set());
  const [showReward, setShowReward] = useState(false);

  const handleWordLearn = (word) => {
    const newLearned = new Set(learnedWords);
    newLearned.add(word);
    setLearnedWords(newLearned);

    // التحقق من إكمال الفئة
    if (selectedCategory) {
      const categoryWords = selectedCategory.words;
      const categoryComplete = categoryWords.every(w => newLearned.has(w.english));
      if (categoryComplete) {
        setShowReward(true);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-purple-50 to-blue-50 min-h-screen">
      <Head>
        <title>تعلم الكلمات والجمل الإنجليزية</title>
      </Head>

      <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">
        تعلم الكلمات والجمل الإنجليزية
      </h1>

      {!selectedCategory ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(category => (
            <div
              key={category.id}
              className="bg-white p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => setSelectedCategory(category)}
            >
              <div className="text-center">
                <span className="text-6xl mb-4 block">{category.icon}</span>
                <h2 className="text-2xl font-bold text-purple-600">{category.name}</h2>
                <p className="mt-2 text-gray-600">
                  {category.words.length} كلمات
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedCategory(null)}
            className="mb-6 text-purple-600 hover:text-purple-800"
          >
            ← العودة للفئات
          </button>

          <h2 className="text-3xl font-bold mb-6 text-center">
            {selectedCategory.name} {selectedCategory.icon}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedCategory.words.map(word => (
              <WordCard
                key={word.english}
                word={word}
                onLearn={() => handleWordLearn(word.english)}
              />
            ))}
          </div>
        </div>
      )}

      {showReward && (
        <RewardAnimation
          points={50}
          message={`أحسنت! لقد أتممت تعلم فئة ${selectedCategory.name}`}
        />
      )}
    </div>
  );
};

export default VocabularyPage;
