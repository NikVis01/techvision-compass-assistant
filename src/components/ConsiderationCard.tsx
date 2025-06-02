
import { useState } from 'react';
import { Lightbulb, Tag, ArrowRight, Edit3, Sparkles } from 'lucide-react';
import { ConsiderPoint } from '@/types/api';
import ReflectionModal from './ReflectionModal';

interface ConsiderationCardProps {
  consideration: ConsiderPoint;
  index: number;
  onReflectionSave: (index: number, reflection: string) => void;
}

const ConsiderationCard = ({ consideration, index, onReflectionSave }: ConsiderationCardProps) => {
  const [isReflectionModalOpen, setIsReflectionModalOpen] = useState(false);
  const [reflection, setReflection] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const categoryColors = {
    risk: 'from-red-400 to-pink-400',
    opportunity: 'from-blue-400 to-cyan-400',
    process: 'from-purple-400 to-indigo-400',
    people: 'from-green-400 to-emerald-400',
    communication: 'from-yellow-400 to-orange-400'
  };

  const categoryBg = categoryColors[consideration.category as keyof typeof categoryColors] || categoryColors.process;

  const handleReflectionSave = (reflectionText: string) => {
    setReflection(reflectionText);
    onReflectionSave(index, reflectionText);
  };

  return (
    <>
      <div 
        className={`bg-white rounded-xl p-6 border-0 shadow-2xl transition-all duration-300 group cursor-pointer relative overflow-hidden ${
          isHovered ? 'scale-105 shadow-2xl' : 'hover:shadow-xl'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Sparkle animation on hover */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            <Sparkles className="absolute top-2 right-2 w-4 h-4 text-emerald-400 animate-ping" />
            <Sparkles className="absolute bottom-2 left-2 w-3 h-3 text-pink-400 animate-pulse" />
            <Sparkles className="absolute top-1/2 left-1/4 w-2 h-2 text-yellow-400 animate-bounce" />
          </div>
        )}

        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm transition-transform duration-200 ${isHovered ? 'scale-110 rotate-12' : ''}`}>
              {index + 1}
            </div>
            {consideration.category && (
              <div className={`px-3 py-1 bg-gradient-to-r ${categoryBg} rounded-full transition-all duration-200 ${isHovered ? 'scale-105' : ''}`}>
                <span className="text-white text-xs font-medium capitalize flex items-center">
                  <Tag className="w-3 h-3 mr-1" />
                  {consideration.category}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsReflectionModalOpen(true)}
              className={`p-2 rounded-full transition-all duration-200 ${
                isHovered 
                  ? 'bg-emerald-500 text-white shadow-lg scale-110' 
                  : 'bg-gray-100 text-emerald-600 hover:bg-emerald-50'
              }`}
              title="Reflect on this consideration"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <Lightbulb className={`w-5 h-5 text-emerald-500 transition-all duration-200 ${isHovered ? 'animate-pulse' : ''}`} />
          </div>
        </div>

        <p className={`text-gray-700 mb-4 transition-colors duration-200 ${isHovered ? 'text-gray-800' : ''}`}>
          {consideration.note}
        </p>

        {consideration.related_to_action && (
          <div className={`flex items-center space-x-2 text-gray-600 bg-gray-50 rounded-lg p-3 transition-all duration-200 ${isHovered ? 'bg-gray-100' : ''}`}>
            <ArrowRight className="w-4 h-4" />
            <span className="text-sm">
              <span className="font-medium">Related to:</span> {consideration.related_to_action}
            </span>
          </div>
        )}

        {reflection && (
          <div className="mt-4 p-3 bg-emerald-50 rounded-lg border-l-4 border-emerald-400">
            <div className="flex items-center space-x-2 mb-2">
              <Edit3 className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">Your Reflection</span>
            </div>
            <p className="text-sm text-emerald-800">{reflection}</p>
          </div>
        )}
      </div>

      <ReflectionModal
        isOpen={isReflectionModalOpen}
        onClose={() => setIsReflectionModalOpen(false)}
        onSave={handleReflectionSave}
        initialReflection={reflection}
        considerationText={consideration.note}
      />
    </>
  );
};

export default ConsiderationCard;
