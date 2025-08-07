import React from 'react';
import Lottie from 'lottie-react';
import successAnimation from '../animations/success.json';
import starAnimation from '../animations/star.json';
import trophyAnimation from '../animations/trophy.json';

export const SuccessAnimation = ({ onComplete }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 text-center">
        <div className="w-64 h-64 mx-auto">
          <Lottie
            animationData={successAnimation}
            loop={false}
            autoplay={true}
            onComplete={onComplete}
          />
        </div>
        <h3 className="text-2xl font-bold text-green-600 mt-4">أحسنت! ما شاء الله</h3>
      </div>
    </div>
  );
};

export const StarReward = () => {
  return (
    <div className="w-20 h-20">
      <Lottie
        animationData={starAnimation}
        loop={true}
        autoplay={true}
      />
    </div>
  );
};

export const TrophyAnimation = ({ onComplete }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 text-center">
        <div className="w-64 h-64 mx-auto">
          <Lottie
            animationData={trophyAnimation}
            loop={false}
            autoplay={true}
            onComplete={onComplete}
          />
        </div>
        <h3 className="text-2xl font-bold text-yellow-600 mt-4">مبروك! أتممت الحفظ</h3>
        <p className="text-lg text-gray-600 mt-2">واصل تقدمك! 🌟</p>
      </div>
    </div>
  );
};
