import React, { useState } from 'react';
import Head from 'next/head';
import { AudioPlayer } from '../components/AudioPlayer';
import { RewardAnimation } from '../components/InteractiveAnimations';

const interactiveStories = [
  {
    id: 1,
    title: "رحلة إلى حديقة الحيوانات",
    coverImage: "/images/stories/zoo.png",
    description: "تعلم أسماء الحيوانات باللغة الإنجليزية مع أحمد وسارة",
    level: "مبتدئ",
    duration: "10 دقائق",
    vocabulary: [
      { english: "Lion", arabic: "أسد", audio: "/audio/words/lion.mp3" },
      { english: "Elephant", arabic: "فيل", audio: "/audio/words/elephant.mp3" },
      { english: "Giraffe", arabic: "زرافة", audio: "/audio/words/giraffe.mp3" }
    ],
    scenes: [
      {
        text: "ذهب أحمد وسارة إلى حديقة الحيوانات",
        englishText: "Ahmad and Sara went to the zoo",
        image: "/images/scenes/zoo-entrance.png",
        audio: "/audio/scenes/zoo-1.mp3"
      }
    ]
  },
  {
    id: 2,
    title: "يوم في المدرسة",
    coverImage: "/images/stories/school.png",
    description: "تعلم الكلمات المدرسية مع نور",
    level: "متوسط",
    duration: "12 دقائق",
    vocabulary: [
      { english: "Book", arabic: "كتاب", audio: "/audio/words/book.mp3" },
      { english: "Teacher", arabic: "معلم", audio: "/audio/words/teacher.mp3" },
      { english: "Classroom", arabic: "فصل", audio: "/audio/words/classroom.mp3" }
    ],
    scenes: [
      {
        text: "وصلت نور إلى المدرسة باكراً",
        englishText: "Noor arrived at school early",
        image: "/images/scenes/school-entrance.png",
        audio: "/audio/scenes/school-1.mp3"
      }
    ]
  }
];

const StoryCard = ({ story, onSelect }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
      onClick={() => onSelect(story)}
    >
      <div className="h-48 bg-gray-200 relative">
        <img 
          src={story.coverImage} 
          alt={story.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white px-3 py-1 rounded-full">
          <span className="text-sm font-bold text-blue-600">{story.level}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{story.title}</h3>
        <p className="text-gray-600 mb-4">{story.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-500">⏱️ {story.duration}</span>
          <span className="text-gray-500">🔤 {story.vocabulary.length} كلمات</span>
        </div>
      </div>
    </div>
  );
};

const StoryViewer = ({ story, onBack }) => {
  const [currentScene, setCurrentScene] = useState(0);
  const [showEnglish, setShowEnglish] = useState(false);
  const [learnedWords, setLearnedWords] = useState(new Set());

  const handleWordLearn = (word) => {
    setLearnedWords(new Set([...learnedWords, word]));
  };

  return (
    <div className="space-y-8">
      <button
        onClick={onBack}
        className="text-blue-600 hover:text-blue-800"
      >
        ← العودة للقصص
      </button>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">{story.title}</h2>

        {/* عرض المشهد الحالي */}
        <div className="mb-8">
          <img 
            src={story.scenes[currentScene].image}
            alt={story.scenes[currentScene].text}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          
          <div className="space-y-4 text-center">
            <p className="text-lg">{story.scenes[currentScene].text}</p>
            {showEnglish && (
              <p className="text-blue-600">{story.scenes[currentScene].englishText}</p>
            )}
            
            <div className="flex justify-center space-x-4">
              <AudioPlayer audioUrl={story.scenes[currentScene].audio} />
              <button
                onClick={() => setShowEnglish(!showEnglish)}
                className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full hover:bg-yellow-200"
              >
                {showEnglish ? 'إخفاء الإنجليزية' : 'عرض الإنجليزية'}
              </button>
            </div>
          </div>
        </div>

        {/* قسم المفردات */}
        <div className="border-t pt-6">
          <h3 className="text-xl font-bold mb-4">تعلم الكلمات:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {story.vocabulary.map((word, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg ${
                  learnedWords.has(word.english)
                    ? 'bg-green-100'
                    : 'bg-gray-100'
                }`}
              >
                <p className="text-lg font-bold">{word.english}</p>
                <p className="text-gray-600">{word.arabic}</p>
                <div className="mt-2 flex justify-between items-center">
                  <AudioPlayer audioUrl={word.audio} />
                  <button
                    onClick={() => handleWordLearn(word.english)}
                    className={`px-3 py-1 rounded-full ${
                      learnedWords.has(word.english)
                        ? 'bg-green-500 text-white'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {learnedWords.has(word.english) ? 'تم الحفظ ✓' : 'تعلم'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const InteractiveStoriesPage = () => {
  const [selectedStory, setSelectedStory] = useState(null);

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-blue-50 to-purple-50 min-h-screen">
      <Head>
        <title>القصص التفاعلية</title>
      </Head>

      <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
        القصص التفاعلية
      </h1>

      {!selectedStory ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interactiveStories.map(story => (
            <StoryCard
              key={story.id}
              story={story}
              onSelect={setSelectedStory}
            />
          ))}
        </div>
      ) : (
        <StoryViewer
          story={selectedStory}
          onBack={() => setSelectedStory(null)}
        />
      )}
    </div>
  );
};

export default InteractiveStoriesPage;
