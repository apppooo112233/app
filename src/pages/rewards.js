import React, { useState } from 'react';
import Head from 'next/head';
import { RewardAnimation } from '../components/InteractiveAnimations';

const achievements = [
  {
    id: 1,
    title: 'بداية رحلة التعلم',
    description: 'أكمل أول درس في اللغة الإنجليزية',
    icon: '🎯',
    points: 10,
    category: 'english'
  },
  {
    id: 2,
    title: 'حافظ صغير',
    description: 'حفظ أول سورة كاملة',
    icon: '📖',
    points: 20,
    category: 'quran'
  },
  {
    id: 3,
    title: 'لاعب ماهر',
    description: 'فاز في 5 ألعاب تعليمية',
    icon: '🎮',
    points: 15,
    category: 'games'
  },
  {
    id: 4,
    title: 'مثابر',
    description: 'أكمل المراجعة اليومية 7 أيام متتالية',
    icon: '⭐',
    points: 30,
    category: 'streak'
  }
];

const RewardsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [points, setPoints] = useState(75); // نقاط افتراضية للعرض

  const filteredAchievements = selectedCategory === 'all'
    ? achievements
    : achievements.filter(a => a.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-yellow-50 to-orange-50 min-h-screen">
      <Head>
        <title>المكافآت والإنجازات</title>
      </Head>

      <h1 className="text-4xl font-bold text-center text-yellow-800 mb-8">
        المكافآت والإنجازات
      </h1>

      {/* عرض النقاط */}
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="text-center">
          <div className="text-6xl mb-2">🏆</div>
          <div className="text-3xl font-bold text-yellow-600">{points}</div>
          <div className="text-gray-600">نقطة مكتسبة</div>
        </div>
      </div>

      {/* تصفية الإنجازات */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === 'all'
                ? 'bg-yellow-500 text-white'
                : 'bg-white text-yellow-600'
            }`}
          >
            الكل
          </button>
          <button
            onClick={() => setSelectedCategory('english')}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === 'english'
                ? 'bg-yellow-500 text-white'
                : 'bg-white text-yellow-600'
            }`}
          >
            اللغة الإنجليزية
          </button>
          <button
            onClick={() => setSelectedCategory('quran')}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === 'quran'
                ? 'bg-yellow-500 text-white'
                : 'bg-white text-yellow-600'
            }`}
          >
            القرآن الكريم
          </button>
          <button
            onClick={() => setSelectedCategory('games')}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === 'games'
                ? 'bg-yellow-500 text-white'
                : 'bg-white text-yellow-600'
            }`}
          >
            الألعاب
          </button>
        </div>
      </div>

      {/* قائمة الإنجازات */}
      <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAchievements.map(achievement => (
          <div
            key={achievement.id}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="text-4xl mb-4">{achievement.icon}</div>
            <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
            <p className="text-gray-600 mb-4">{achievement.description}</p>
            <div className="flex items-center justify-between">
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                {achievement.points} نقطة
              </span>
              <button
                className="text-yellow-600 hover:text-yellow-800"
                title="عرض التفاصيل"
              >
                ℹ️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewardsPage;
