import React, { useState } from 'react';
import Head from 'next/head';
import { SuccessAnimation, StarReward, TrophyAnimation } from '../components/Animations';

const QuranMemorizationPage = () => {
  const [currentLevel, setCurrentLevel] = useState('beginner');
  const [currentSurah, setCurrentSurah] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showTrophy, setShowTrophy] = useState(false);
  const [stars, setStars] = useState(0);

  const levels = {
    beginner: {
      title: 'المستوى المبتدئ',
      surahs: ['الفاتحة', 'الإخلاص', 'الفلق', 'الناس']
    },
    intermediate: {
      title: 'المستوى المتوسط',
      surahs: ['العصر', 'الكوثر', 'النصر', 'المسد']
    },
    advanced: {
      title: 'المستوى المتقدم',
      surahs: ['الضحى', 'الشرح', 'التين', 'العلق']
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 text-right">
      <Head>
        <title>تحفيظ القرآن الكريم للأطفال</title>
      </Head>

      <h1 className="text-3xl font-bold mb-8 text-green-600">تحفيظ القرآن الكريم</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(levels).map(([levelKey, level]) => (
          <div 
            key={levelKey}
            className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-bold mb-4">{level.title}</h2>
            <ul className="space-y-2">
              {level.surahs.map((surah) => (
                <li 
                  key={surah}
                  className="cursor-pointer hover:text-green-500 transition-colors"
                  onClick={() => setCurrentSurah(surah)}
                >
                  {surah}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {currentSurah && (
        <div className="mt-8 p-6 border rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold mb-4">سورة {currentSurah}</h3>
            <div className="flex items-center">
              <span className="text-xl ml-2">{stars}</span>
              <StarReward />
            </div>
          </div>
          {/* هنا سيتم إضافة محتوى السورة والأنشطة التفاعلية */}
          <div className="space-y-4">
            <button 
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              onClick={() => {
                // عند الاستماع للسورة
                setStars(prev => prev + 1);
                setShowSuccess(true);
              }}
            >
              استمع للسورة
            </button>
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mr-4"
              onClick={() => {
                // عند إتمام الحفظ
                setStars(prev => prev + 5);
                setShowTrophy(true);
              }}
            >
              ابدأ التحفيظ
            </button>
          </div>
        </div>
      )}

      {showSuccess && (
        <SuccessAnimation onComplete={() => setShowSuccess(false)} />
      )}

      {showTrophy && (
        <TrophyAnimation onComplete={() => setShowTrophy(false)} />
      )}
    </div>
  );
};

export default QuranMemorizationPage;
