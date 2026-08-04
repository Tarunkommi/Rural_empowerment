import React, { useState, useEffect } from 'react';
import { GraduationCap, PlayCircle, Award, Loader2 } from 'lucide-react';
import userService from '../../services/userService';

export default function TrainingPrograms() {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await userService.getTrainings();
        if (response.success) {
          setTrainings(response.data);
        }
      } catch (err) {
        setError(err.message || 'Failed to load trainings');
      } finally {
        setLoading(false);
      }
    };
    fetchTrainings();
  }, []);

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>;
  }

  if (error) {
    return <div className="text-error p-4 bg-error/10 rounded-xl">{error}</div>;
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <GraduationCap className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Training Programs</h2>
          <p className="text-gray-500 mt-1">Track your progress and continue learning.</p>
        </div>
      </div>

      {trainings.length === 0 ? (
        <div className="text-center py-12 bg-bg rounded-2xl border border-dashed border-gray-300">
          <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900">No programs enrolled</h3>
          <p className="text-gray-500 mt-1">You haven't enrolled in any training programs yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trainings.map((course) => (
            <div key={course.id} className="border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow group bg-white">
              <div className="h-40 overflow-hidden relative">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-lg mb-1">{course.title}</h3>
                <p className="text-sm text-gray-500 mb-4">By {course.trainer}</p>
                
                <div className="mb-2 flex justify-between text-sm font-medium">
                  <span className="text-gray-700">Progress</span>
                  <span className="text-primary">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  {course.hasCertificate ? (
                    <span className="flex items-center gap-1.5 text-success text-sm font-medium">
                      <Award className="w-4 h-4" /> Certificate Ready
                    </span>
                  ) : (
                    <span className="text-sm text-gray-500">In Progress</span>
                  )}
                  <button className="text-primary text-sm font-medium hover:underline">
                    {course.progress === 100 ? 'Review Course' : 'Continue'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
