import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { SuccessAnimation } from '../components/Animations';
import { AudioPlayer } from '../components/AudioPlayer';
import { InteractiveAnimation, CharacterAnimation, RewardAnimation } from '../components/InteractiveAnimations';

const stories = [
  {
    id: 1,
    title: 'قصة سيدنا نوح عليه السلام',
    shortDescription: 'قصة السفينة والطوفان العظيم',
    level: 'مبتدئ',
    duration: '5 دقائق',
    mainPoints: [
      'دعوة نوح عليه السلام لقومه',
      'بناء السفينة',
      'الطوفان ونجاة المؤمنين',
      'نهاية الطوفان وبداية جديدة'
    ],
    imageUrl: '/images/stories/noah-ark.png',
    audioUrl: '/audio/stories/noah-story.mp3',
    englishWords: [
      { word: 'Ark', arabic: 'سفينة', pronunciation: 'آرك' },
      { word: 'Flood', arabic: 'طوفان', pronunciation: 'فلَد' },
      { word: 'Save', arabic: 'ينقذ', pronunciation: 'سيف' }
    ],
    moralLessons: [
      'الصبر على الدعوة إلى الله',
      'طاعة الله ورسله',
      'نصر الله للمؤمنين'
    ]
  },
  {
    id: 2,
    title: 'قصة سيدنا يوسف عليه السلام',
    shortDescription: 'قصة الصبر والحكمة',
    level: 'متوسط',
    duration: '7 دقائق',
    mainPoints: [
      'رؤيا يوسف عليه السلام',
      'إلقاؤه في البئر',
      'الحياة في مصر',
      'لقاء الأهل من جديد'
    ],
    imageUrl: '/images/stories/yusuf-story.png',
    audioUrl: '/audio/stories/yusuf-story.mp3',
    englishWords: [
      { word: 'Dream', arabic: 'حلم', pronunciation: 'دريم' },
      { word: 'Well', arabic: 'بئر', pronunciation: 'ويل' },
      { word: 'King', arabic: 'ملك', pronunciation: 'كينج' }
    ],
    moralLessons: [
      'الصبر على البلاء',
      'العفو عند المقدرة',
      'حسن التدبير'
    ]
  },
  {
    id: 3,
    title: 'قصة سيدنا موسى عليه السلام',
    shortDescription: 'قصة التحدي والمعجزات',
    level: 'متقدم',
    duration: '8 دقائق',
    mainPoints: [
      'ولادة موسى ونجاته من فرعون',
      'النشأة في قصر فرعون',
      'المعجزات التسع',
      'نجاة بني إسرائيل'
    ],
    imageUrl: '/images/stories/musa-story.png',
    audioUrl: '/audio/stories/musa-story.mp3',
    englishWords: [
      { word: 'Staff', arabic: 'عصا', pronunciation: 'ستاف' },
      { word: 'Sea', arabic: 'بحر', pronunciation: 'سي' },
      { word: 'Palace', arabic: 'قصر', pronunciation: 'بالَس' }
    ],
    moralLessons: [
      'الثقة بنصر الله',
      'الشجاعة في مواجهة الظلم',
      'قوة الإيمان'
    ]
  },
  {
    id: 4,
    title: 'قصة سيدنا إبراهيم عليه السلام',
    shortDescription: 'قصة البحث عن الحقيقة',
    level: 'متوسط',
    duration: '6 دقائق',
    mainPoints: [
      'البحث عن الخالق',
      'تحطيم الأصنام',
      'النجاة من النار',
      'بناء الكعبة'
    ],
    imageUrl: '/images/stories/ibrahim-story.png',
    audioUrl: '/audio/stories/ibrahim-story.mp3',
    englishWords: [
      { word: 'Fire', arabic: 'نار', pronunciation: 'فاير' },
      { word: 'Build', arabic: 'يبني', pronunciation: 'بيلد' },
      { word: 'Star', arabic: 'نجم', pronunciation: 'ستار' }
    ],
    moralLessons: [
      'البحث عن الحقيقة',
      'الشجاعة في إظهار الحق',
      'التوكل على الله'
    ]
  }
];

const QuranStoriesPage = () => {
  const [selectedStory, setSelectedStory] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);

  const handleStoryComplete = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-blue-50 to-green-50 min-h-screen">
      <Head>
        <title>القصص القرآنية للأطفال</title>
        <meta name="description" content="قصص قرآنية تفاعلية للأطفال مع أنشطة وألعاب تعليمية" />
      </Head>

      <div className="fixed bottom-4 right-4 z-50">
        <CharacterAnimation 
          character="teacher"
          isActive={!selectedStory}
        />
      </div>

      <h1 className="text-3xl font-bold mb-8 text-center text-green-600">
        القصص القرآنية للأطفال
      </h1>

      {!selectedStory ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div
              key={story.id}
              className="border rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer bg-white"
              onClick={() => setSelectedStory(story)}
            >
              <div className="aspect-w-16 aspect-h-9 mb-4 bg-gray-100 rounded-lg">
                {/* صورة توضيحية للقصة */}
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">صورة القصة</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-right">{story.title}</h3>
              <p className="text-gray-600 mb-2 text-right">{story.shortDescription}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {story.level}
                </span>
                <span className="text-gray-500 text-sm">{story.duration}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <button
            onClick={() => setSelectedStory(null)}
            className="mb-4 text-blue-600 hover:text-blue-800"
          >
            ← العودة للقائمة
          </button>

          <h2 className="text-2xl font-bold mb-4 text-right">{selectedStory.title}</h2>

          <div className="aspect-w-16 aspect-h-9 mb-6 bg-gray-100 rounded-lg">
            {/* صورة القصة */}
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">صورة القصة</span>
            </div>
          </div>

          <div className="space-y-6 text-right">
            <div>
              <h3 className="text-xl font-bold mb-2">النقاط الرئيسية:</h3>
              <ul className="list-disc list-inside space-y-2 mr-4">
                {selectedStory.mainPoints.map((point, index) => (
                  <li key={index} className="text-gray-700">{point}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
                onClick={handleStoryComplete}
              >
                استمع للقصة
              </button>
              <button
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => setCurrentQuiz(selectedStory.id)}
              >
                ابدأ النشاط
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <SuccessAnimation onComplete={() => setShowSuccess(false)} />
      )}
    </div>
  );
};

export default QuranStoriesPage;
