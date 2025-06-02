
import { useState } from 'react';
import { X, Save, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ActionPoint } from '@/types/api';

interface ActionEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (action: ActionPoint) => void;
  onReprompt: () => void;
  action: ActionPoint;
}

const ActionEditModal = ({ isOpen, onClose, onSave, onReprompt, action }: ActionEditModalProps) => {
  const [editedAction, setEditedAction] = useState(action);

  const handleSave = () => {
    onSave(editedAction);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white/90 backdrop-blur-md rounded-2xl p-6 max-w-md w-full mx-4 border border-white/30 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
            EDIT ACTION POINT
          </h3>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="hover:bg-gray-200/50"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Task</label>
            <textarea
              value={editedAction.task}
              onChange={(e) => setEditedAction({ ...editedAction, task: e.target.value })}
              className="w-full h-20 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-400/50 text-gray-700"
              style={{ fontFamily: 'Helvetica Neue, sans-serif' }}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select
              value={editedAction.priority}
              onChange={(e) => setEditedAction({ ...editedAction, priority: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/50 text-gray-700"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
            <input
              type="text"
              value={editedAction.due_date || ''}
              onChange={(e) => setEditedAction({ ...editedAction, due_date: e.target.value })}
              placeholder="e.g., Tomorrow, Next week, Dec 15"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/50 text-gray-700"
              style={{ fontFamily: 'Helvetica Neue, sans-serif' }}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Context</label>
            <textarea
              value={editedAction.context || ''}
              onChange={(e) => setEditedAction({ ...editedAction, context: e.target.value })}
              placeholder="Additional context or notes..."
              className="w-full h-16 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-400/50 text-gray-700"
              style={{ fontFamily: 'Helvetica Neue, sans-serif' }}
            />
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <Button
            onClick={onReprompt}
            variant="outline"
            className="border-orange-400 text-orange-600 hover:bg-orange-50"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reprompt AI
          </Button>
          
          <div className="flex space-x-2">
            <Button
              onClick={onClose}
              variant="ghost"
              className="hover:bg-gray-200/50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionEditModal;
