
import { useState } from 'react';
import { Calendar, Flag, AlertCircle, Check, Edit, Sparkles, Zap } from 'lucide-react';
import { ActionPoint } from '@/types/api';
import ActionEditModal from './ActionEditModal';

interface ActionCardProps {
  action: ActionPoint;
  index: number;
  isCompleted: boolean;
  onToggleComplete: (index: number) => void;
  onEdit: (index: number, action: ActionPoint) => void;
  onReprompt: (index: number) => void;
}

const ActionCard = ({ action, index, isCompleted, onToggleComplete, onEdit, onReprompt }: ActionCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isExploding, setIsExploding] = useState(false);

  const priorityColors = {
    high: 'from-red-400 to-pink-400',
    medium: 'from-yellow-400 to-orange-400',
    low: 'from-green-400 to-emerald-400'
  };

  const priorityBg = priorityColors[action.priority as keyof typeof priorityColors] || priorityColors.medium;

  const handleToggleComplete = () => {
    if (!isCompleted) {
      setIsExploding(true);
      setTimeout(() => setIsExploding(false), 600);
    }
    onToggleComplete(index);
  };

  const handleEdit = (editedAction: ActionPoint) => {
    onEdit(index, editedAction);
  };

  const handleReprompt = () => {
    onReprompt(index);
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div 
        className={`backdrop-blur-md rounded-xl p-6 border transition-all duration-500 group cursor-pointer relative overflow-hidden ${
          isCompleted 
            ? 'bg-gray-300/20 border-gray-400/30 opacity-60' 
            : isHovered 
              ? 'bg-white/25 border-orange-400/50 shadow-2xl scale-105' 
              : 'bg-white/10 border-white/20 hover:bg-white/15'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Explosion effect */}
        {isExploding && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Zap className="w-8 h-8 text-yellow-400 animate-ping" />
              <Sparkles className="absolute -top-2 -left-2 w-6 h-6 text-orange-400 animate-bounce" />
              <Sparkles className="absolute -bottom-2 -right-2 w-4 h-4 text-pink-400 animate-pulse" />
              <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-green-400 animate-spin" />
              <Sparkles className="absolute -bottom-2 -left-2 w-3 h-3 text-blue-400 animate-ping" />
            </div>
          </div>
        )}

        {/* Sparkle animation on hover for incomplete items */}
        {isHovered && !isCompleted && (
          <div className="absolute inset-0 pointer-events-none">
            <Sparkles className="absolute top-2 right-2 w-4 h-4 text-orange-400 animate-ping" />
            <Sparkles className="absolute bottom-2 left-2 w-3 h-3 text-pink-400 animate-pulse" />
            <Sparkles className="absolute top-1/2 left-1/4 w-2 h-2 text-yellow-400 animate-bounce" />
          </div>
        )}

        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-black text-sm transition-transform duration-200 ${isHovered && !isCompleted ? 'scale-110 rotate-12' : ''}`} style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
              {index + 1}
            </div>
            <div className={`px-3 py-1 bg-gradient-to-r ${priorityBg} rounded-full transition-all duration-200 ${isHovered && !isCompleted ? 'scale-105' : ''}`}>
              <span className="text-white text-xs font-bold capitalize flex items-center" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
                <Flag className="w-3 h-3 mr-1" />
                {action.priority} Priority
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className={`p-2 rounded-full transition-all duration-200 ${
                isHovered && !isCompleted
                  ? 'bg-orange-500 text-white shadow-lg scale-110' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              title="Edit action point"
              disabled={isCompleted}
            >
              <Edit className="w-4 h-4" />
            </button>
            
            <button
              onClick={handleToggleComplete}
              className={`p-2 rounded-full transition-all duration-200 ${
                isCompleted
                  ? 'bg-green-500 text-white'
                  : isHovered 
                    ? 'bg-green-500 text-white shadow-lg scale-110' 
                    : 'bg-white/20 text-white hover:bg-green-400'
              }`}
              title={isCompleted ? "Mark as incomplete" : "Mark as complete"}
            >
              <Check className="w-4 h-4" />
            </button>
          </div>
        </div>

        <h3 className={`font-bold mb-3 transition-all duration-200 ${
          isCompleted 
            ? 'text-gray-400 line-through' 
            : isHovered 
              ? 'text-white' 
              : 'text-white/90'
        }`} style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
          {action.task}
        </h3>

        <div className="space-y-3">
          {action.due_date && (
            <div className={`flex items-center space-x-2 transition-colors duration-200 ${
              isCompleted ? 'text-gray-500' : 'text-white/70'
            }`}>
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-light" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>Due: {action.due_date}</span>
            </div>
          )}

          {action.context && (
            <div className={`flex items-start space-x-2 transition-colors duration-200 ${
              isCompleted ? 'text-gray-500' : 'text-white/70'
            }`}>
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span className="text-sm font-light" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>{action.context}</span>
            </div>
          )}
        </div>
      </div>

      <ActionEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEdit}
        onReprompt={handleReprompt}
        action={action}
      />
    </>
  );
};

export default ActionCard;
