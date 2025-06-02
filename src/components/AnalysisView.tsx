
import { useState } from 'react';
import { ArrowLeft, Calendar, CheckCircle2, Lightbulb, TrendingUp, Brain, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StructuredResponse } from '@/types/api';

interface Mission {
  id: string;
  name: string;
  data: StructuredResponse;
  timestamp: Date;
  completedActions: number;
  totalActions: number;
  reflections: number;
  totalConsiderations: number;
}

interface AnalysisViewProps {
  missions: Mission[];
  onBack: () => void;
}

const AnalysisView = ({ missions, onBack }: AnalysisViewProps) => {
  const totalMissions = missions.length;
  const totalActions = missions.reduce((sum, mission) => sum + mission.totalActions, 0);
  const totalCompletedActions = missions.reduce((sum, mission) => sum + mission.completedActions, 0);
  const totalReflections = missions.reduce((sum, mission) => sum + mission.reflections, 0);
  const completionRate = totalActions > 0 ? Math.round((totalCompletedActions / totalActions) * 100) : 0;

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'radial-gradient(circle at center, rgba(251, 146, 60, 0.2) 0%, rgba(0, 0, 0, 0.9) 40%), linear-gradient(135deg, #000000 0%, #f97316 50%, #ec4899 100%)'
    }}>
      {/* Subtle light green glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 via-transparent to-green-300/5 pointer-events-none"></div>
      
      {/* Header */}
      <div className="relative z-10 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button
                onClick={onBack}
                variant="ghost"
                size="sm"
                className="hover:bg-white/10 text-white border border-white/20 transition-all duration-200 hover:scale-105"
                style={{ fontFamily: 'Helvetica Neue, sans-serif' }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Chat
              </Button>
              <div>
                <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
                  MISSION ANALYSIS
                </h1>
                <p className="text-sm text-white/70 font-light" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
                  Your journey with INTERACTIF over time
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Overview Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border-0 shadow-2xl hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1 font-light" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>Total Missions</p>
                <p className="text-3xl font-black text-black" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>{totalMissions}</p>
              </div>
              <Target className="w-8 h-8 text-orange-400" />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border-0 shadow-2xl hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1 font-light" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>Action Completion</p>
                <p className="text-3xl font-black text-black" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>{completionRate}%</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border-0 shadow-2xl hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1 font-light" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>Total Reflections</p>
                <p className="text-3xl font-black text-black" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>{totalReflections}</p>
              </div>
              <Brain className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border-0 shadow-2xl hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1 font-light" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>Growth Trend</p>
                <p className="text-3xl font-black text-green-500" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>↗</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Mission Timeline */}
        <div className="bg-white rounded-2xl p-6 border-0 shadow-2xl">
          <h2 className="text-xl font-black text-black mb-6" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
            MISSION TIMELINE
          </h2>
          
          <div className="space-y-4">
            {missions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
                  No completed missions yet. Finish your first mission to see it here!
                </p>
              </div>
            ) : (
              missions.map((mission) => (
                <div key={mission.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-800" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
                        {mission.name}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{mission.timestamp.toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>{mission.completedActions}/{mission.totalActions} actions</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Lightbulb className="w-4 h-4 text-yellow-500" />
                        <span>{mission.reflections}/{mission.totalConsiderations} reflections</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisView;
