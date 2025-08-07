import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { AudioPlayer } from '../components/AudioPlayer';
import { RewardAnimation } from '../components/InteractiveAnimations';

const DailyReview = () => {
  const [todayTasks, setTodayTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showReward, setShowReward] = useState(false);

  useEffect(() => {
    // توليد مهام المراجعة اليومية
    generateDailyTasks();
  }, []);

  const generateDailyTasks = () => {
    const tasks = [
      {
        id: 1,
        type: 'letter',
        title: 'مراجعة الحروف',
        items: ['A', 'B', 'C', 'D'],
        completed: false
      },
      {
        id: 2,
        type: 'word',
        title: 'مراجعة الكلمات',
        items: ['Book', 'Cat', 'Dog'],
        completed: false
      },
      {
        id: 3,
        type: 'quran',
        title: 'مراجعة السور القصيرة',
        items: ['الفاتحة', 'الإخلاص', 'الفلق'],
        completed: false
      }
    ];
    setTodayTasks(tasks);
  };

  const handleTaskCompletion = (taskId) => {
    setTodayTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
    setCompletedTasks(prev => [...prev, taskId]);
    
    if (completedTasks.length + 1 === todayTasks.length) {
      setShowReward(true);
      setTimeout(() => setShowReward(false), 3000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-green-50 to-blue-50 min-h-screen">
      <Head>
        <title>المراجعة اليومية</title>
      </Head>

      <h1 className="text-4xl font-bold text-center text-green-800 mb-8">
        المراجعة اليومية
      </h1>

      <div className="max-w-3xl mx-auto">
        {/* تقدم اليوم */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">تقدم اليوم</h2>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-green-600 h-4 rounded-full transition-all"
              style={{
                width: `${(completedTasks.length / todayTasks.length) * 100}%`
              }}
            />
          </div>
          <p className="text-center mt-2">
            {completedTasks.length} من {todayTasks.length} مهام مكتملة
          </p>
        </div>

        {/* قائمة المهام */}
        <div className="grid gap-6">
          {todayTasks.map(task => (
            <div
              key={task.id}
              className={`bg-white rounded-xl p-6 shadow-lg transition-all ${
                task.completed ? 'opacity-75' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{task.title}</h3>
                {task.completed ? (
                  <span className="text-green-600">✓ تم</span>
                ) : (
                  <button
                    onClick={() => handleTaskCompletion(task.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
                  >
                    إكمال
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {task.items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg text-center"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showReward && (
        <RewardAnimation
          points={50}
          message="أحسنت! أكملت كل مهام اليوم! 🌟"
        />
      )}
    </div>
  );
};

export default DailyReview;
