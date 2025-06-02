
import { ArrowLeft, Clock, CheckCircle2, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StructuredResponse } from '@/types/api';
import ActionCard from '@/components/ActionCard';
import ConsiderationCard from '@/components/ConsiderationCard';

interface DashboardProps {
  data: StructuredResponse;
  sessionName: string;
  onBack: () => void;
}

const Dashboard = ({ data, sessionName, onBack }: DashboardProps) => {
  const totalActions = data.action_points?.length || 0;
  const totalConsiderations = data.consider_points?.length || 0;

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'radial-gradient(circle at center, rgba(251, 146, 60, 0.2) 0%, rgba(0, 0, 0, 0.9) 40%), linear-gradient(135deg, #000000 0%, #f97316 50%, #ec4899 100%)'
    }}>
      {/* Dynamic floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-16 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-orange-400/30 rounded-full animate-bounce"></div>
        <div className="absolute top-60 left-1/4 w-1 h-1 bg-pink-400/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-white/40 rounded-full animate-bounce delay-500"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button
                onClick={onBack}
                variant="ghost"
                size="sm"
                className="hover:bg-white/10 text-white border border-white/20"
                style={{ fontFamily: 'Helvetica Neue, sans-serif' }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Chat
              </Button>
              <div>
                <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
                  {sessionName.toUpperCase()}
                </h1>
                <p className="text-sm text-white/70 font-light" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
                  AI-generated guidance and recommendations
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Clock className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-white" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>Just now</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Summary Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 mb-1 font-light" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>Action Points</p>
                <p className="text-4xl font-black text-white" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>{totalActions}</p>
              </div>
              <CheckCircle2 className="w-12 h-12 text-orange-400" />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 mb-1 font-light" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>Considerations</p>
                <p className="text-4xl font-black text-white" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>{totalConsiderations}</p>
              </div>
              <Lightbulb className="w-12 h-12 text-pink-400" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Action Points Column */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-black text-white" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>ACTION POINTS</h2>
            </div>
            
            <div className="space-y-4">
              {data.action_points?.map((action, index) => (
                <ActionCard key={index} action={action} index={index} />
              )) || (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <p className="text-white/70 text-center" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>No action points generated</p>
                </div>
              )}
            </div>
          </div>

          {/* Considerations Column */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-black text-white" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>MINDFUL CONSIDERATIONS</h2>
            </div>
            
            <div className="space-y-4">
              {data.consider_points?.map((consideration, index) => (
                <ConsiderationCard key={index} consideration={consideration} index={index} />
              )) || (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <p className="text-white/70 text-center" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>No considerations generated</p>
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
