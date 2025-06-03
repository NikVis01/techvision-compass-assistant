
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  expertise: string[];
  avatar: string;
}

interface EmployeeRecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee;
  contactReason: string;
}

const EmployeeRecommendationModal = ({ isOpen, onClose, employee, contactReason }: EmployeeRecommendationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl p-6 max-w-lg w-full mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
            RECOMMENDED CONTACT
          </h3>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="hover:bg-gray-200"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-start space-x-4 mb-6">
          <img 
            src={employee.avatar} 
            alt={employee.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h4 className="font-bold text-lg text-gray-900">{employee.name}</h4>
            <p className="text-gray-600">{employee.position}</p>
            <p className="text-gray-500 text-sm">{employee.department}</p>
            <p className="text-gray-600 text-sm mt-1">{employee.email}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <h5 className="font-semibold text-gray-900 mb-2">Expertise:</h5>
          <div className="flex flex-wrap gap-2">
            {employee.expertise.map((skill, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h5 className="font-semibold text-gray-900 mb-2">Why contact them:</h5>
          <p className="text-gray-700 text-sm leading-relaxed">{contactReason}</p>
        </div>
        
        <div className="flex justify-end">
          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
          >
            Got it
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRecommendationModal;
