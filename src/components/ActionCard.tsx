
import { useState } from 'react';
import { Calendar, Flag, AlertCircle, Check, Edit, Sparkles, Zap, Users, Lightbulb } from 'lucide-react';
import { ActionPoint } from '@/types/api';
import ActionEditModal from './ActionEditModal';
import EmployeeRecommendationModal from './EmployeeRecommendationModal';

interface ActionCardProps {
  action: ActionPoint;
  index: number;
  isCompleted: boolean;
  onToggleComplete: (index: number) => void;
  onEdit: (index: number, action: ActionPoint) => void;
  onReprompt: (index: number) => void;
  mindfulnessTip?: string;
}

// Mock employee data
const mockEmployees = [
  {
    id: 1,
    name: 'Sarah Chen',
    position: 'Sales Manager',
    department: 'Sales',
    email: 'sarah.chen@company.com',
    expertise: ['Deal closing', 'Enterprise sales', 'Contract negotiation'],
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    position: 'Legal Counsel',
    department: 'Legal',
    email: 'michael.rodriguez@company.com',
    expertise: ['Contract law', 'Compliance', 'Risk assessment'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'Lisa Thompson',
    position: 'Product Manager',
    department: 'Product',
    email: 'lisa.thompson@company.com',
    expertise: ['Product roadmap', 'Feature specifications', 'Customer requirements'],
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  }
];

const contactReasons = [
  'They have extensive experience in this area and can provide valuable insights',
  'Their expertise aligns perfectly with the requirements of this action',
  'They have successfully handled similar situations in the past',
  'Their department knowledge will be crucial for this task'
];

const ActionCard = ({ action, index, isCompleted, onToggleComplete, onEdit, onReprompt, mindfulnessTip }: ActionCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isExploding, setIsExploding] = useState(false);

  const priorityColors = {
    high: 'from-red-400 to-pink-400',
    medium: 'from-yellow-400 to-orange-400',
    low: 'from-green-400 to-emerald-400'
  };

  const priorityBg = priorityColors[action.priority as keyof typeof priorityColors] || priorityColors.medium;

  // Get a random employee and contact reason for this action
  const recommendedEmployee = mockEmployees[index % mockEmployees.length];
  const contactReason = contactReasons[index % contactReasons.length];

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
        className={`rounded-xl p-6 border-0 shadow-2xl transition-all duration-500 group cursor-pointer relative overflow-hidden ${
          isCompleted 
            ? 'bg-gray-200 opacity-60' 
            : isHovered 
              ? 'bg-white scale-105 shadow-2xl' 
              : 'bg-white hover:shadow-xl'
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
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
                    : 'bg-gray-100 text-gray-600 hover:bg-green-400 hover:text-white'
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
              ? 'text-black' 
              : 'text-gray-800'
        }`} style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
          {action.task}
        </h3>

        <div className="space-y-3 mb-4">
          {action.due_date && (
            <div className={`flex items-center space-x-2 transition-colors duration-200 ${
              isCompleted ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-light" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>Due: {action.due_date}</span>
            </div>
          )}

          {action.context && (
            <div className={`flex items-start space-x-2 transition-colors duration-200 ${
              isCompleted ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span className="text-sm font-light" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>{action.context}</span>
            </div>
          )}
        </div>

        {/* Mindfulness tip bubble */}
        {mindfulnessTip && (
          <div className={`bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-3 mb-4 border-l-4 border-purple-400 transition-colors duration-200 ${
            isCompleted ? 'opacity-60' : ''
          }`}>
            <div className="flex items-start space-x-2">
              <Lightbulb className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-xs font-semibold text-purple-600 uppercase" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>Think about:</span>
                <p className="text-sm text-purple-700 mt-1" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>{mindfulnessTip}</p>
              </div>
            </div>
          </div>
        )}

        {/* Employee recommendation */}
        <div className="border-t border-gray-200 pt-4">
          <button
            onClick={() => setIsEmployeeModalOpen(true)}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
              isCompleted 
                ? 'bg-gray-100 opacity-60 cursor-not-allowed' 
                : 'bg-blue-50 hover:bg-blue-100 hover:scale-105'
            }`}
            disabled={isCompleted}
          >
            <img 
              src={recommendedEmployee.avatar} 
              alt={recommendedEmployee.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1 text-left">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-semibold text-blue-700" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
                  Recommended contact
                </span>
              </div>
              <p className="text-xs text-blue-600" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
                {recommendedEmployee.name} • {recommendedEmployee.position}
              </p>
            </div>
          </button>
        </div>
      </div>

      <ActionEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEdit}
        onReprompt={handleReprompt}
        action={action}
      />

      <EmployeeRecommendationModal
        isOpen={isEmployeeModalOpen}
        onClose={() => setIsEmployeeModalOpen(false)}
        employee={recommendedEmployee}
        contactReason={contactReason}
      />
    </>
  );
};

export default ActionCard;
