import React from 'react';
import { User, Phone, Mail, Calendar, MapPin, Briefcase, GraduationCap, Edit3 } from 'lucide-react';

export default function PersonalInformation({ user, onEdit }) {
  if (!user) return null;

  const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-bg transition-colors duration-200">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-gray-900 font-medium mt-1">{value || <span className="text-gray-400 italic">Not Provided</span>}</p>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
          <p className="text-gray-500 mt-1">Manage your personal details and contact information.</p>
        </div>
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-blue-800 transition-colors shadow-sm"
        >
          <Edit3 className="w-4 h-4" />
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <InfoItem icon={User} label="Full Name" value={user.name} />
        <InfoItem icon={Mail} label="Email Address" value={user.email} />
        <InfoItem icon={Phone} label="Mobile Number" value={`+91 ${user.phone}`} />
        <InfoItem icon={User} label="Gender" value={user.gender} />
        <InfoItem 
          icon={Calendar} 
          label="Date of Birth" 
          value={user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString('en-IN') : null} 
        />
        <InfoItem icon={Briefcase} label="Occupation" value={user.occupation} />
        <InfoItem icon={GraduationCap} label="Education Level" value={user.educationLevel} />
      </div>

      <div className="mt-8 pt-8 border-t border-border">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Address Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <InfoItem icon={MapPin} label="Full Address" value={user.address} />
          <InfoItem icon={MapPin} label="Village/City" value={user.village} />
          <InfoItem icon={MapPin} label="District" value={user.district} />
          <InfoItem icon={MapPin} label="State" value={user.state} />
          <InfoItem icon={MapPin} label="PIN Code" value={user.pincode} />
        </div>
      </div>
    </div>
  );
}
