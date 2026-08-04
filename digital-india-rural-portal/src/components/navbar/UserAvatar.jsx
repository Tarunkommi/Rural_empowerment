import React from 'react';

const UserAvatar = ({ user, size = 'md' }) => {
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl'
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  if (user?.profileImage) {
    return (
      <img
        src={user.profileImage}
        alt={user.name || 'User'}
        className={`${currentSize} rounded-full object-cover border-2 border-white shadow-sm`}
      />
    );
  }

  return (
    <div 
      className={`${currentSize} rounded-full bg-primary text-white flex items-center justify-center font-bold border-2 border-white shadow-sm`}
    >
      {getInitials(user?.name)}
    </div>
  );
};

export default UserAvatar;
