
import { Lightbulb, Tag, ArrowRight } from 'lucide-react';
import { ConsiderPoint } from '@/types/api';

interface ConsiderationCardProps {
  consideration: ConsiderPoint;
  index: number;
}

const ConsiderationCard = ({ consideration, index }: ConsiderationCardProps) => {
  const categoryColors = {
    risk: 'from-red-400 to-pink-400',
    opportunity: 'from-blue-400 to-cyan-400',
    process: 'from-purple-400 to-indigo-400',
    people: 'from-green-400 to-emerald-400',
    communication: 'from-yellow-400 to-orange-400'
  };

  const categoryBg = categoryColors[consideration.category as keyof typeof categoryColors] || categoryColors.process;

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/30 hover:bg-white/80 transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
            {index + 1}
          </div>
          {consideration.category && (
            <div className={`px-3 py-1 bg-gradient-to-r ${categoryBg} rounded-full`}>
              <span className="text-white text-xs font-medium capitalize flex items-center">
                <Tag className="w-3 h-3 mr-1" />
                {consideration.category}
              </span>
            </div>
          )}
        </div>
        <Lightbulb className="w-5 h-5 text-emerald-500" />
      </div>

      <p className="text-gray-700 mb-4 group-hover:text-gray-800 transition-colors">
        {consideration.note}
      </p>

      {consideration.related_to_action && (
        <div className="flex items-center space-x-2 text-gray-600 bg-gray-50/50 rounded-lg p-3">
          <ArrowRight className="w-4 h-4" />
          <span className="text-sm">
            <span className="font-medium">Related to:</span> {consideration.related_to_action}
          </span>
        </div>
      )}
    </div>
  );
};

export default ConsiderationCard;
