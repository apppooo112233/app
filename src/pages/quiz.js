import React, { useState } from 'react';
import Head from 'next/head';
import { RewardAnimation } from '../components/InteractiveAnimations';
import { AudioPlayer } from '../components/AudioPlayer';

const quizzes = [
  {
    id: 1,
    title: 'اختبار الحروف الأساسية',
    description: 'تعرف على نطق وكتابة الحروف الإنجليزية',
    level: 'مبتدئ',
    questions: [
      {
        type: 'sound',
        question: 'اختر الحرف المناسب للصوت',
        audio: '/audio/letters/a.mp3',
        options: ['A', 'E', 'I', 'O'],
        correct: 'A'
      },
      {
        type: 'match',
        question: 'اختر الكلمة التي تبدأ بحرف B',
        options: ['Book', 'Cat', 'Dog', 'Fish'],
        correct: 'Book'
      }
    ]
  },
  {
    id: 2,
    title: 'اختبار المفردات الأساسية',
    description: 'اختبر معرفتك بالكلمات الإنجليزية الشائعة',
    level: 'متوسط',
    questions: [
      {
        type: 'translation',
        question: 'ما معنى كلمة "School"؟',
        options: ['مدرسة', 'بيت', 'حديقة', 'مكتبة'],
        correct: 'مدرسة'
      },
      {
        type: 'image',
        question: 'اختر الكلمة المناسبة للصورة',
        image: '/images/quiz/apple.png',
        options: ['Apple', 'Orange', 'Banana', 'Grape'],
        correct: 'Apple'
      }
    ]
  }
];

const QuizCard = ({ quiz, onSelect }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all"
      onClick={() => onSelect(quiz)}
    >
      <h3 className="text-xl font-bold mb-2">{quiz.title}</h3>
      <p className="text-gray-600 mb-4">{quiz.description}</p>
      <div className="flex justify-between items-center">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          {quiz.level}
        </span>
        <span className="text-gray-500">
          {quiz.questions.length} أسئلة
        </span>
      </div>
    </div>
  );
};

const QuizQuestion = ({ question, onAnswer }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4">{question.question}</h3>

      {question.type === 'sound' && (
        <div className="mb-4">
          <AudioPlayer audioUrl={question.audio} />
        </div>
      )}

      {question.type === 'image' && (
        <div className="mb-4">
          <img 
            src={question.image}
            alt="quiz"
            className="w-48 h-48 object-contain mx-auto"
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            className="p-4 text-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

const QuizResult = ({ score, total, onRetry }) => {
  const percentage = (score / total) * 100;
  
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">نتيجة الاختبار</h2>
      <div className="mb-6">
        <div className="text-6xl font-bold text-blue-600">
          {Math.round(percentage)}%
        </div>
        <p className="text-gray-600">
          حصلت على {score} من {total} نقطة
        </p>
      </div>

      {percentage >= 80 && (
        <div className="mb-6">
          <div className="text-4xl mb-2">🏆</div>
          <p className="text-green-600 font-bold">ممتاز! أحسنت!</p>
        </div>
      )}

      {percentage >= 50 && percentage < 80 && (
        <div className="mb-6">
          <div className="text-4xl mb-2">👍</div>
          <p className="text-blue-600 font-bold">جيد! واصل التحسن!</p>
        </div>
      )}

      {percentage < 50 && (
        <div className="mb-6">
          <div className="text-4xl mb-2">💪</div>
          <p className="text-yellow-600 font-bold">حاول مرة أخرى! أنت تستطيع!</p>
        </div>
      )}

      <button
        onClick={onRetry}
        className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
      >
        حاول مرة أخرى
      </button>
    </div>
  );
};

const QuizPage = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showReward, setShowReward] = useState(false);

  const handleQuizSelect = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  const handleAnswer = (answer) => {
    const correct = selectedQuiz.questions[currentQuestion].correct === answer;
    if (correct) {
      setScore(score + 1);
      setShowReward(true);
      setTimeout(() => setShowReward(false), 1500);
    }

    if (currentQuestion < selectedQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-blue-50 to-purple-50 min-h-screen">
      <Head>
        <title>الاختبارات القصيرة</title>
      </Head>

      <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
        الاختبارات القصيرة
      </h1>

      {!selectedQuiz ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map(quiz => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              onSelect={handleQuizSelect}
            />
          ))}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          {!showResult ? (
            <>
              <div className="mb-6">
                <button
                  onClick={() => setSelectedQuiz(null)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ← العودة للاختبارات
                </button>
              </div>

              <div className="mb-6">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{
                      width: `${(currentQuestion / selectedQuiz.questions.length) * 100}%`
                    }}
                  />
                </div>
                <div className="text-center mt-2 text-gray-600">
                  السؤال {currentQuestion + 1} من {selectedQuiz.questions.length}
                </div>
              </div>

              <QuizQuestion
                question={selectedQuiz.questions[currentQuestion]}
                onAnswer={handleAnswer}
              />
            </>
          ) : (
            <QuizResult
              score={score}
              total={selectedQuiz.questions.length}
              onRetry={() => handleQuizSelect(selectedQuiz)}
            />
          )}
        </div>
      )}

      {showReward && (
        <RewardAnimation
          points={10}
          message="أحسنت! إجابة صحيحة!"
        />
      )}
    </div>
  );
};

export default QuizPage;
