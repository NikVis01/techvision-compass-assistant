
import { Calendar, Flag, AlertCircle } from 'lucide-react';
import { ActionPoint } from '@/types/api';

interface ActionCardProps {
  action: ActionPoint;
  index: number;
}

const ActionCard = ({ action, index }: ActionCardProps) => {
  const priorityColors = {
    high: 'from-red-400 to-pink-400',
    medium: 'from-yellow-400 to-orange-400',
    low: 'from-green-400 to-emerald-400'
  };

  const priorityBg = priorityColors[action.priority as keyof typeof priorityColors] || priorityColors.medium;

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/30 hover:bg-white/80 transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
            {index + 1}
          </div>
          <div className={`px-3 py-1 bg-gradient-to-r ${priorityBg} rounded-full`}>
            <span className="text-white text-xs font-medium capitalize flex items-center">
              <Flag className="w-3 h-3 mr-1" />
              {action.priority} Priority
            </span>
          </div>
        </div>
      </div>

      <h3 className="font-semibold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
        {action.task}
      </h3>

      <div className="space-y-3">
        {action.due_date && (
          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Due: {action.due_date}</span>
          </div>
        )}

        {action.context && (
          <div className="flex items-start space-x-2 text-gray-600">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span className="text-sm">{action.context}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionCard;
