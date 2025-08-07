import React, { useState } from 'react';

const storyQuizzes = {
  1: { // نوح عليه السلام
    questions: [
      {
        id: 1,
        question: 'ماذا طلب الله من نوح عليه السلام أن يصنع؟',
        options: ['سفينة', 'بيتاً', 'مسجداً', 'حديقة'],
        correctAnswer: 'سفينة'
      },
      {
        id: 2,
        question: 'كم سنة قضى نوح عليه السلام في دعوة قومه؟',
        options: ['950 سنة', '100 سنة', '500 سنة', '1000 سنة'],
        correctAnswer: '950 سنة'
      },
      {
        id: 3,
        question: 'ما هو الحيوان الذي أرسله نوح لمعرفة وجود اليابسة؟',
        options: ['الحمامة', 'النسر', 'الغراب', 'العصفور'],
        correctAnswer: 'الحمامة'
      }
    ]
  },
  2: { // يوسف عليه السلام
    questions: [
      {
        id: 1,
        question: 'ماذا رأى يوسف عليه السلام في منامه؟',
        options: [
          'أحد عشر كوكباً والشمس والقمر',
          'حديقة جميلة',
          'بئراً عميقة',
          'قصراً كبيراً'
        ],
        correctAnswer: 'أحد عشر كوكباً والشمس والقمر'
      },
      {
        id: 2,
        question: 'ما هي الهدية التي أعطاها يعقوب ليوسف عليه السلام؟',
        options: ['قميص', 'خاتم', 'عصا', 'كتاب'],
        correctAnswer: 'قميص'
      }
    ]
  }
};

const StoryQuiz = ({ storyId, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const quiz = storyQuizzes[storyId];
  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  if (showResult) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4">
          أحسنت! لقد أكملت النشاط
        </h3>
        <p className="text-xl mb-4">
          حصلت على {score} من {quiz.questions.length} نقاط
        </p>
        <button
          onClick={onComplete}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
        >
          عودة للقصة
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg text-right">
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">
          السؤال {currentQuestionIndex + 1} من {quiz.questions.length}
        </h3>
        <p className="text-lg">{currentQuestion.question}</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className={`p-4 text-right rounded-lg transition-colors ${
              selectedAnswer === option
                ? option === currentQuestion.correctAnswer
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StoryQuiz;
