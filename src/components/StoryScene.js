import React, { useState, useEffect } from 'react';

const backgrounds = {
  noah: '/backgrounds/ark-scene.jpg',
  yusuf: '/backgrounds/palace-scene.jpg',
  default: '/backgrounds/default-scene.jpg'
};

const StoryScene = ({ story, isPlaying, onComplete }) => {
  const [currentScene, setCurrentScene] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const scenes = [
    {
      text: story.mainPoints[0],
      animation: 'scene1',
      hint: 'انقر على الشخصيات للتفاعل معها!'
    },
    {
      text: story.mainPoints[1],
      animation: 'scene2',
      hint: 'اكتشف ما يحدث في القصة'
    },
    // يمكن إضافة المزيد من المشاهد هنا
  ];

  useEffect(() => {
    if (isPlaying && currentScene < scenes.length - 1) {
      const timer = setTimeout(() => {
        setCurrentScene(currentScene + 1);
      }, 10000); // تغيير المشهد كل 10 ثواني
      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentScene]);

  return (
    <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-2xl">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ 
          backgroundImage: `url(${backgrounds[story.id] || backgrounds.default})`,
          filter: isPlaying ? 'none' : 'blur(5px)'
        }}
      />

      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="text-white text-center p-8 max-w-2xl">
          <h3 className="text-2xl font-bold mb-4 animate-fade-in">
            {scenes[currentScene].text}
          </h3>
          {showHint && (
            <p className="text-yellow-300 text-sm animate-bounce">
              {scenes[currentScene].hint}
            </p>
          )}
        </div>
      </div>

      <button
        className="absolute bottom-4 right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full
                   hover:bg-yellow-300 transition-colors shadow-lg"
        onClick={() => setShowHint(!showHint)}
      >
        💡 تلميح
      </button>
    </div>
  );
};

export default StoryScene;
