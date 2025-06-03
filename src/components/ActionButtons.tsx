
import { BarChart3, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActionButtonsProps {
  completedMissions: any[];
  onViewAnalysis: () => void;
  onViewCompanyDatabase: () => void;
}

const ActionButtons = ({ completedMissions, onViewAnalysis, onViewCompanyDatabase }: ActionButtonsProps) => {
  return (
    <div className="fixed top-6 right-6 z-20 flex space-x-4">
      <Button
        onClick={onViewCompanyDatabase}
        className="bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 transition-all duration-200 hover:scale-105"
        style={{ fontFamily: 'Helvetica Neue, sans-serif' }}
      >
        <Database className="w-4 h-4 mr-2" />
        Company Database
      </Button>
      
      {completedMissions.length > 0 && (
        <Button
          onClick={onViewAnalysis}
          className="bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 transition-all duration-200 hover:scale-105"
          style={{ fontFamily: 'Helvetica Neue, sans-serif' }}
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          View Analysis
        </Button>
      )}
    </div>
  );
};

export default ActionButtons;
