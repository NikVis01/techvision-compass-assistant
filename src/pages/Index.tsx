import { useState } from 'react';
import ChatInterface from '@/components/ChatInterface';
import Dashboard from '@/components/Dashboard';
import AnalysisView from '@/components/AnalysisView';
import CompanyDatabase from '@/components/CompanyDatabase';
import AppHeader from '@/components/AppHeader';
import FloatingElements from '@/components/FloatingElements';
import ComingSoonBadge from '@/components/ComingSoonBadge';
import ActionButtons from '@/components/ActionButtons';
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
  const [currentView, setCurrentView] = useState<'chat' | 'dashboard' | 'analysis' | 'company'>('chat');
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [completedMissions, setCompletedMissions] = useState<Mission[]>(mockMissions);
  const [isLoading, setIsLoading] = useState(false);
  const [lastPrompt, setLastPrompt] = useState<string>('');

  const generateSessionName = (prompt: string): string => {
    const words = prompt.split(' ').slice(0, 3);
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const handlePromptSubmit = async (prompt: string) => {
    setLastPrompt(prompt);
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

  const handleViewCompanyDatabase = () => {
    setCurrentView('company');
  };

  if (currentView === 'analysis') {
    return (
      <AnalysisView 
        missions={completedMissions}
        onBack={handleBackToChat}
      />
    );
  }

  if (currentView === 'company') {
    return (
      <CompanyDatabase 
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
        initialPrompt={lastPrompt}
      />
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'radial-gradient(circle at center bottom, rgba(59, 130, 246, 0.3) 0%, rgba(0, 0, 0, 0.8) 40%), linear-gradient(135deg, #000000 0%, #3b82f6 50%, #06b6d4 100%)'
    }}>
      <FloatingElements />

      <AppHeader />

      <ComingSoonBadge />

      <ActionButtons 
        completedMissions={completedMissions}
        onViewAnalysis={handleViewAnalysis}
        onViewCompanyDatabase={handleViewCompanyDatabase}
      />

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
