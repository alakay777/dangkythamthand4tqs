
import React from 'react';
import { FormStep } from '../types';

interface StepIndicatorProps {
  currentStep: FormStep;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { label: 'Quy định', step: FormStep.Rules },
    { label: 'Quân nhân', step: FormStep.SoldierInfo },
    { label: 'Thân nhân', step: FormStep.VisitorInfo },
    { label: 'Xác nhận', step: FormStep.Review },
  ];

  return (
    <div className="flex items-center justify-between mb-8 px-2">
      {steps.map((s, idx) => (
        <React.Fragment key={s.step}>
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                currentStep >= s.step
                  ? 'bg-red-700 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {idx + 1}
            </div>
            <span className={`text-xs mt-1 font-medium ${currentStep >= s.step ? 'text-red-800' : 'text-gray-400'}`}>
              {s.label}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div className={`flex-1 h-1 mx-2 rounded-full ${currentStep > s.step ? 'bg-red-700' : 'bg-gray-200'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
