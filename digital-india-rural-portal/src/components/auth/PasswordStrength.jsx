import React from 'react';
import { Check, X } from 'lucide-react';

export default function PasswordStrength({ password }) {
  const requirements = [
    { label: 'Minimum 8 characters', met: password?.length >= 8 },
    { label: 'At least one uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'At least one lowercase letter', met: /[a-z]/.test(password) },
    { label: 'At least one number', met: /[0-9]/.test(password) },
    { label: 'At least one special character', met: /[^A-Za-z0-9]/.test(password) },
  ];

  const metCount = requirements.filter(req => req.met).length;
  
  let strengthColor = 'bg-gray-200';
  let strengthLabel = 'Weak';
  
  if (metCount === requirements.length) {
    strengthColor = 'bg-success';
    strengthLabel = 'Strong';
  } else if (metCount >= 3) {
    strengthColor = 'bg-accent';
    strengthLabel = 'Fair';
  }

  return (
    <div className="flex flex-col gap-2 mt-2 p-3 bg-gray-50 rounded-md border border-gray-100">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700">Password Strength</span>
        <span className="text-gray-500 font-semibold">{strengthLabel}</span>
      </div>
      
      <div className="flex gap-1 h-1.5 w-full">
        <div className={`h-full flex-1 rounded-full ${metCount >= 1 ? strengthColor : 'bg-gray-200'} transition-colors duration-300`}></div>
        <div className={`h-full flex-1 rounded-full ${metCount >= 3 ? strengthColor : 'bg-gray-200'} transition-colors duration-300`}></div>
        <div className={`h-full flex-1 rounded-full ${metCount >= 4 ? strengthColor : 'bg-gray-200'} transition-colors duration-300`}></div>
        <div className={`h-full flex-1 rounded-full ${metCount === 5 ? strengthColor : 'bg-gray-200'} transition-colors duration-300`}></div>
      </div>

      <ul className="text-xs text-gray-600 mt-2 space-y-1">
        {requirements.map((req, index) => (
          <li key={index} className="flex items-center gap-1.5">
            {req.met ? (
              <Check size={14} className="text-success" />
            ) : (
              <X size={14} className="text-gray-400" />
            )}
            <span className={req.met ? 'text-success font-medium' : 'text-gray-500'}>
              {req.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
