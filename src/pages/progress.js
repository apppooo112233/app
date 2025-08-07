import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { RewardAnimation } from '../components/InteractiveAnimations';

const Progress = () => {
  const [progress, setProgress] = useState({
    alphabet: {
      completed: 15,
      total: 26,
      lastLetter: 'O',
      recentWords: ['Orange', 'Ocean', 'Octopus']
    },
    vocabulary: {
      learned: 45,
      total: 100,
      recentWords: ['Book', 'School', 'Teacher', 'Friend']
    },
    quran: {
      memorized: 5,
      total: 10,
      lastSurah: 'الفاتحة',
      accuracy: 90
    },
    stories: {
      completed: 3,
      total: 8,
      lastStory: 'رحلة إلى حديقة الحيوانات'
    },
    games: {
      points: 250,
      badges: ['Star Student', 'Quick Learner', 'Memory Master'],
      achievements: [
        { name: 'حافظ القرآن', icon: '📖', progress: 60 },
        { name: 'متحدث ممتاز', icon: '🗣️', progress: 75 },
        { name: 'بطل الألعاب', icon: '🎮', progress: 85 }
      ]
    }
  });

  const [showReward, setShowReward] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-indigo-50 to-purple-50 min-h-screen">
      <Head>
        <title>تتبع التقدم</title>
      </Head>

      <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">
        تقدمك في التعلم 🌟
      </h1>

      {/* نظرة عامة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">الحروف الإنجليزية</h3>
          <div className="flex items-center justify-between mb-2">
            <span>تعلمت</span>
            <span className="text-2xl font-bold text-indigo-600">
              {progress.alphabet.completed}/{progress.alphabet.total}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full"
              style={{ width: `${(progress.alphabet.completed/progress.alphabet.total)*100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">المفردات</h3>
          <div className="flex items-center justify-between mb-2">
            <span>تعلمت</span>
            <span className="text-2xl font-bold text-green-600">
              {progress.vocabulary.learned}/{progress.vocabulary.total}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: `${(progress.vocabulary.learned/progress.vocabulary.total)*100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">القرآن الكريم</h3>
          <div className="flex items-center justify-between mb-2">
            <span>حفظت</span>
            <span className="text-2xl font-bold text-yellow-600">
              {progress.quran.memorized}/{progress.quran.total}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-yellow-600 h-2.5 rounded-full"
              style={{ width: `${(progress.quran.memorized/progress.quran.total)*100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">القصص</h3>
          <div className="flex items-center justify-between mb-2">
            <span>أكملت</span>
            <span className="text-2xl font-bold text-blue-600">
              {progress.stories.completed}/{progress.stories.total}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${(progress.stories.completed/progress.stories.total)*100}%` }}
            />
          </div>
        </div>
      </div>

      {/* الإنجازات */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">الإنجازات 🏆</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {progress.games.achievements.map((achievement, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-2">{achievement.icon}</div>
              <h3 className="font-bold mb-2">{achievement.name}</h3>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-purple-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${achievement.progress}%` }}
                />
              </div>
              <span className="text-sm text-gray-600">{achievement.progress}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* آخر الأنشطة */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">آخر الأنشطة 📝</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold mb-4">آخر الكلمات المتعلمة:</h3>
            <div className="flex flex-wrap gap-2">
              {progress.vocabulary.recentWords.map((word, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4">الشارات المكتسبة:</h3>
            <div className="flex flex-wrap gap-2">
              {progress.games.badges.map((badge, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showReward && (
        <RewardAnimation
          points={progress.games.points}
          message="أحسنت! واصل التقدم!"
        />
      )}
    </div>
  );
};

export default Progress;
