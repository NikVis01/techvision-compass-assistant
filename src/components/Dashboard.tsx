
import { ArrowLeft, Clock, AlertCircle, CheckCircle2, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StructuredResponse } from '@/types/api';
import ActionCard from '@/components/ActionCard';
import ConsiderationCard from '@/components/ConsiderationCard';

interface DashboardProps {
  data: StructuredResponse;
  onBack: () => void;
}

const Dashboard = ({ data, onBack }: DashboardProps) => {
  const totalActions = data.action_points?.length || 0;
  const totalConsiderations = data.consider_points?.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                onClick={onBack}
                variant="ghost"
                size="sm"
                className="hover:bg-white/50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Chat
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-800">Your Action Plan</h1>
                <p className="text-sm text-gray-600">AI-generated guidance and recommendations</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">Just now</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Summary Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 mb-1">Action Points</p>
                <p className="text-3xl font-bold">{totalActions}</p>
              </div>
              <CheckCircle2 className="w-12 h-12 text-purple-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 mb-1">Considerations</p>
                <p className="text-3xl font-bold">{totalConsiderations}</p>
              </div>
              <Lightbulb className="w-12 h-12 text-emerald-200" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Action Points Column */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Action Points</h2>
            </div>
            
            <div className="space-y-4">
              {data.action_points?.map((action, index) => (
                <ActionCard key={index} action={action} index={index} />
              )) || (
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <p className="text-gray-600 text-center">No action points generated</p>
                </div>
              )}
            </div>
          </div>

          {/* Considerations Column */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Mindful Considerations</h2>
            </div>
            
            <div className="space-y-4">
              {data.consider_points?.map((consideration, index) => (
                <ConsiderationCard key={index} consideration={consideration} index={index} />
              )) || (
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <p className="text-gray-600 text-center">No considerations generated</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
