import React from 'react';
import TrainingModules from '../components/training/TrainingModules';

const Training = () => {
  return (
    <div className="w-full overflow-x-hidden pt-12 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-6">Training Programs</h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
          Enroll in comprehensive digital literacy courses tailored for rural citizens. Track your progress, build new skills, and earn certificates upon completion.
        </p>
      </div>
      
      <TrainingModules />
    </div>
  );
};

export default Training;
