import React, { useState } from 'react';
import Head from 'next/head';

const ParentReport = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  
  // بيانات افتراضية للعرض
  const statistics = {
    week: {
      totalTime: '5 ساعات',
      completedLessons: 12,
      quranVerses: 15,
      vocabulary: 25,
      games: 8,
      streak: 5
    },
    month: {
      totalTime: '20 ساعة',
      completedLessons: 48,
      quranVerses: 60,
      vocabulary: 100,
      games: 32,
      streak: 22
    }
  };

  const currentStats = statistics[selectedPeriod];

  const learningAreas = [
    {
      name: 'الحروف الإنجليزية',
      progress: 75,
      color: 'blue'
    },
    {
      name: 'المفردات',
      progress: 60,
      color: 'green'
    },
    {
      name: 'القرآن الكريم',
      progress: 80,
      color: 'purple'
    },
    {
      name: 'الألعاب التعليمية',
      progress: 90,
      color: 'yellow'
    }
  ];

  const recentActivities = [
    {
      date: '2025-08-07',
      activity: 'أكمل درس الحروف A-E',
      duration: '30 دقيقة',
      type: 'lesson'
    },
    {
      date: '2025-08-07',
      activity: 'حفظ سورة الإخلاص',
      duration: '20 دقيقة',
      type: 'quran'
    },
    {
      date: '2025-08-06',
      activity: 'لعب لعبة مطابقة الكلمات',
      duration: '15 دقيقة',
      type: 'game'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-indigo-50 to-purple-50 min-h-screen">
      <Head>
        <title>تقرير الوالدين</title>
      </Head>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">
          تقرير الوالدين
        </h1>

        {/* اختيار الفترة */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setSelectedPeriod('week')}
            className={`px-6 py-2 rounded-full ${
              selectedPeriod === 'week'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-indigo-600'
            }`}
          >
            هذا الأسبوع
          </button>
          <button
            onClick={() => setSelectedPeriod('month')}
            className={`px-6 py-2 rounded-full ${
              selectedPeriod === 'month'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-indigo-600'
            }`}
          >
            هذا الشهر
          </button>
        </div>

        {/* الإحصائيات العامة */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">وقت التعلم</h3>
            <div className="text-3xl font-bold text-indigo-600">
              {currentStats.totalTime}
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">الدروس المكتملة</h3>
            <div className="text-3xl font-bold text-green-600">
              {currentStats.completedLessons}
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">أيام المتابعة المتتالية</h3>
            <div className="text-3xl font-bold text-yellow-600">
              {currentStats.streak}
            </div>
          </div>
        </div>

        {/* تقدم مجالات التعلم */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-6">تقدم مجالات التعلم</h2>
          <div className="space-y-6">
            {learningAreas.map((area, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{area.name}</span>
                  <span className="text-gray-600">{area.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`bg-${area.color}-600 h-2 rounded-full`}
                    style={{ width: `${area.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* النشاطات الأخيرة */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">النشاطات الأخيرة</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <div className="font-medium">{activity.activity}</div>
                  <div className="text-sm text-gray-600">{activity.date}</div>
                </div>
                <div className="text-indigo-600">{activity.duration}</div>
              </div>
            ))}
          </div>
        </div>

        {/* زر تحميل التقرير الكامل */}
        <div className="text-center mt-8">
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700">
            تحميل التقرير الكامل (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParentReport;
