
import { useState } from 'react';
import { Sparkles, BarChart3, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import ChatInterface from '@/components/ChatInterface';
import Dashboard from '@/components/Dashboard';
import AnalysisView from '@/components/AnalysisView';
import { StructuredResponse } from '@/types/api';

interface ChatSession {
  id: string;
  name: string;
  data: StructuredResponse;
  timestamp: Date;
}

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

// Mock previous missions data
const mockMissions: Mission[] = [
  {
    id: '1',
    name: 'Team Communication Strategy',
    data: {
      action_points: [
        { task: 'Schedule weekly team standup', priority: 'high' },
        { task: 'Create shared communication guidelines', priority: 'medium' }
      ],
      consider_points: [
        { note: 'Consider different time zones for remote team members', category: 'people' }
      ]
    },
    timestamp: new Date('2024-05-28'),
    completedActions: 2,
    totalActions: 2,
    reflections: 1,
    totalConsiderations: 1
  },
  {
    id: '2',
    name: 'Project Deadline Management',
    data: {
      action_points: [
        { task: 'Break down project into smaller milestones', priority: 'high' },
        { task: 'Set up automated progress tracking', priority: 'medium' },
        { task: 'Plan buffer time for unexpected issues', priority: 'low' }
      ],
      consider_points: [
        { note: 'Consider stakeholder expectations and communication', category: 'communication' },
        { note: 'Risk of scope creep during implementation', category: 'risk' }
      ]
    },
    timestamp: new Date('2024-05-30'),
    completedActions: 2,
    totalActions: 3,
    reflections: 2,
    totalConsiderations: 2
  },
  {
    id: '3',
    name: 'Client Relationship Building',
    data: {
      action_points: [
        { task: 'Schedule monthly check-in calls', priority: 'high' },
        { task: 'Create client satisfaction survey', priority: 'medium' }
      ],
      consider_points: [
        { note: 'Consider cultural differences in communication styles', category: 'people' },
        { note: 'Opportunity to upsell additional services', category: 'opportunity' }
      ]
    },
    timestamp: new Date('2024-06-01'),
    completedActions: 1,
    totalActions: 2,
    reflections: 1,
    totalConsiderations: 2
  }
];

const Index = () => {
  const [currentView, setCurrentView] = useState<'chat' | 'dashboard' | 'analysis'>('chat');
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [completedMissions, setCompletedMissions] = useState<Mission[]>(mockMissions);
  const [isLoading, setIsLoading] = useState(false);

  const generateSessionName = (prompt: string): string => {
    const words = prompt.split(' ').slice(0, 3);
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const handlePromptSubmit = async (prompt: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/structured-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: prompt,
          use_structured_output: true
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const newSession: ChatSession = {
          id: Date.now().toString(),
          name: generateSessionName(prompt),
          data: data.structured_data,
          timestamp: new Date()
        };
        
        setChatSessions(prev => [newSession, ...prev]);
        setCurrentSession(newSession);
        setCurrentView('dashboard');
      }
    } catch (error) {
      console.error('Error sending prompt:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToChat = () => {
    setCurrentView('chat');
    setCurrentSession(null);
  };

  const handleFinishMission = (completedActions: number, totalActions: number, reflections: number, totalConsiderations: number) => {
    if (currentSession) {
      const newMission: Mission = {
        id: currentSession.id,
        name: currentSession.name,
        data: currentSession.data,
        timestamp: currentSession.timestamp,
        completedActions,
        totalActions,
        reflections,
        totalConsiderations
      };
      
      setCompletedMissions(prev => [newMission, ...prev]);
      setCurrentView('analysis');
    }
  };

  const handleViewAnalysis = () => {
    setCurrentView('analysis');
  };

  if (currentView === 'analysis') {
    return (
      <AnalysisView 
        missions={completedMissions}
        onBack={handleBackToChat}
      />
    );
  }

  if (currentView === 'dashboard' && currentSession) {
    return (
      <Dashboard 
        data={currentSession.data}
        sessionName={currentSession.name}
        onBack={handleBackToChat}
        onFinishMission={handleFinishMission}
      />
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'radial-gradient(circle at center bottom, rgba(251, 146, 60, 0.3) 0%, rgba(0, 0, 0, 0.8) 40%), linear-gradient(135deg, #000000 0%, #f97316 50%, #ec4899 100%)'
    }}>
      {/* Subtle light green glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 via-transparent to-green-300/5 pointer-events-none"></div>
      
      {/* Dynamic floating elements with green accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-16 w-3 h-3 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-emerald-400/30 rounded-full animate-bounce"></div>
        <div className="absolute top-60 left-1/4 w-4 h-4 bg-green-400/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-bounce delay-500"></div>
        <div className="absolute top-1/3 right-16 w-3 h-3 bg-emerald-300/20 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-60 left-20 w-2 h-2 bg-green-300/30 rounded-full animate-bounce delay-1500"></div>
        
        {/* Floating lines with green tints */}
        <div className="absolute top-32 left-1/3 w-16 h-px bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent animate-pulse"></div>
        <div className="absolute bottom-32 right-1/4 w-12 h-px bg-gradient-to-r from-transparent via-green-400/30 to-transparent animate-pulse delay-1000"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 left-12 w-6 h-6 border border-emerald-400/10 rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute bottom-1/4 right-12 w-4 h-4 border border-green-400/20 rotate-12 animate-spin" style={{ animationDuration: '15s' }}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 pt-32 pb-16">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-4 mb-2">
            <img 
              src="/lovable-uploads/55e73367-3a72-485c-987b-4efe3f2b8861.png" 
              alt="Star Logo" 
              className="w-16 h-16 brightness-0 invert" 
            />
            <h1 className="text-6xl font-light text-white tracking-tight" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
              <span className="font-black text-7xl">INTERACTIF</span>
            </h1>
          </div>
          <p className="text-xl text-white/70 font-light" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
            Internal guidance companion
          </p>
        </div>
      </div>

      {/* Coming Soon Badge */}
      <div className="fixed top-6 left-6 z-20">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Badge 
              variant="secondary" 
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 cursor-pointer hover:scale-105 transition-transform duration-200 px-3 py-1"
              style={{ fontFamily: 'Helvetica Neue, sans-serif' }}
            >
              <Zap className="w-3 h-3 mr-1" />
              Coming Soon
            </Badge>
          </HoverCardTrigger>
          <HoverCardContent className="w-64 bg-white/95 backdrop-blur-md border border-white/20">
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-gray-800" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
                Upcoming Features
              </h4>
              <div className="space-y-1 text-xs text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                  <span>Jira integration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                  <span>Slack integration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                  <span>Google Cloud native support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                  <span>Personal growth platform</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                  <span>Advanced analytics dashboard</span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>

      {/* Analysis Button */}
      {completedMissions.length > 0 && (
        <div className="fixed top-6 right-6 z-20">
          <Button
            onClick={handleViewAnalysis}
            className="bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 transition-all duration-200 hover:scale-105"
            style={{ fontFamily: 'Helvetica Neue, sans-serif' }}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            View Analysis
          </Button>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 px-6 pb-32">
        <ChatInterface onSubmit={handlePromptSubmit} isLoading={isLoading} />
      </div>

      {/* Powered by Gemini with real logo */}
      <div className="fixed bottom-6 right-6 z-20">
        <div className="flex items-center space-x-3 bg-black/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="url(#gemini-gradient)" />
            <path d="M12 8L12.5 10.5L15 11L12.5 11.5L12 14L11.5 11.5L9 11L11.5 10.5L12 8Z" fill="url(#gemini-gradient-inner)" />
            <defs>
              <linearGradient id="gemini-gradient" x1="4" y1="2" x2="20" y2="16" gradientUnits="userSpaceOnUse">
                <stop stopColor="#4285F4" />
                <stop offset="0.25" stopColor="#9C27B0" />
                <stop offset="0.5" stopColor="#E91E63" />
                <stop offset="0.75" stopColor="#FF9800" />
                <stop offset="1" stopColor="#FFEB3B" />
              </linearGradient>
              <linearGradient id="gemini-gradient-inner" x1="9" y1="8" x2="15" y2="14" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFFFFF" stopOpacity="0.8" />
                <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>
          <span className="text-white/90 text-sm font-medium" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>powered by Gemini</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
