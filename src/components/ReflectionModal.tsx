
import { useState } from 'react';
import { X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReflectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (reflection: string) => void;
  initialReflection?: string;
  considerationText: string;
}

const ReflectionModal = ({ isOpen, onClose, onSave, initialReflection = '', considerationText }: ReflectionModalProps) => {
  const [reflection, setReflection] = useState(initialReflection);

  const handleSave = () => {
    onSave(reflection);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white/90 backdrop-blur-md rounded-2xl p-6 max-w-md w-full mx-4 border border-white/30 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
            REFLECT ON THIS
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
        
        <div className="mb-4 p-3 bg-gray-100/50 rounded-lg">
          <p className="text-sm text-gray-700">{considerationText}</p>
        </div>
        
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="What are your thoughts on this consideration? How does it apply to your situation?"
          className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-400/50 text-gray-700"
          style={{ fontFamily: 'Helvetica Neue, sans-serif' }}
        />
        
        <div className="flex justify-end space-x-2 mt-4">
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
            Save Reflection
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReflectionModal;
