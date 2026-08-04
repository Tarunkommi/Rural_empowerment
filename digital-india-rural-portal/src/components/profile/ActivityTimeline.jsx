import React, { useState, useEffect } from 'react';
import { Activity, Loader2, Clock, CheckCircle2, Bookmark, User as UserIcon } from 'lucide-react';
import userService from '../../services/userService';

export default function ActivityTimeline() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await userService.getActivity();
        if (response.success) {
          setActivities(response.data);
        }
      } catch (err) {
        setError(err.message || 'Failed to load activity history');
      } finally {
        setLoading(false);
      }
    };
    fetchActivity();
  }, []);

  const getIcon = (action) => {
    const act = action.toLowerCase();
    if (act.includes('log')) return <Clock className="w-4 h-4 text-gray-500" />;
    if (act.includes('updat')) return <UserIcon className="w-4 h-4 text-primary" />;
    if (act.includes('complet')) return <CheckCircle2 className="w-4 h-4 text-success" />;
    if (act.includes('bookmark')) return <Bookmark className="w-4 h-4 text-warning" />;
    return <Activity className="w-4 h-4 text-primary" />;
  };

  const getBg = (action) => {
    const act = action.toLowerCase();
    if (act.includes('log')) return 'bg-gray-100';
    if (act.includes('updat')) return 'bg-primary/10';
    if (act.includes('complet')) return 'bg-success/10';
    if (act.includes('bookmark')) return 'bg-warning/10';
    return 'bg-bg';
  };

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>;
  }

  if (error) {
    return <div className="text-error p-4 bg-error/10 rounded-xl">{error}</div>;
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Activity className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Activity History</h2>
          <p className="text-gray-500 mt-1">Review your recent actions and login history.</p>
        </div>
      </div>

      {activities.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No recent activity found.</div>
      ) : (
        <div className="relative border-l-2 border-border ml-4 mt-6">
          {activities.map((activity, index) => (
            <div key={activity.id} className="mb-8 ml-8 relative">
              {/* Timeline Dot */}
              <div className={`absolute -left-[41px] flex items-center justify-center w-10 h-10 rounded-full border-4 border-white ${getBg(activity.action)}`}>
                {getIcon(activity.action)}
              </div>
              
              <div className="bg-bg rounded-xl p-4 border border-border">
                <h4 className="font-semibold text-gray-900">{activity.action}</h4>
                <time className="block text-sm text-gray-500 mt-1">
                  {new Date(activity.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </time>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
