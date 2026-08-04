import React from 'react';
import * as Icons from 'lucide-react';

export const DynamicIcon = ({ name, size = 24, className = '', color = 'currentColor' }) => {
  if (!name) return null;
  const IconComponent = Icons[name] || Icons.HelpCircle;
  return <IconComponent size={size} className={className} color={color} />;
};
