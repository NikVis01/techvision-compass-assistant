import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import ChatInterface from '@/components/ChatInterface';
import Dashboard from '@/components/Dashboard';
import { StructuredResponse } from '@/types/api';

interface ChatSession {
  id: string;
  name: string;
  data: StructuredResponse;
  timestamp: Date;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<'chat' | 'dashboard'>('chat');
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
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

  if (currentView === 'dashboard' && currentSession) {
    return (
      <Dashboard 
        data={currentSession.data}
        sessionName={currentSession.name}
        onBack={handleBackToChat}
      />
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: `
        radial-gradient(ellipse 120% 80% at center bottom, 
          rgba(255, 218, 185, 0.9) 0%, 
          rgba(255, 180, 120, 0.8) 25%,
          rgba(255, 160, 100, 0.7) 50%,
          rgba(255, 140, 80, 0.6) 75%,
          rgba(139, 69, 19, 0.9) 100%
        )
      `
    }}>
      {/* Dynamic floating elements with more organic movement */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-16 w-4 h-4 bg-white/30 rounded-full animate-pulse" style={{ borderRadius: '60% 40% 70% 30%' }}></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-orange-200/40 animate-bounce" style={{ borderRadius: '40% 60% 30% 70%' }}></div>
        <div className="absolute top-60 left-1/4 w-5 h-5 bg-peach-300/25 animate-pulse delay-1000" style={{ borderRadius: '70% 30% 60% 40%' }}></div>
        <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-white/50 rounded-full animate-bounce delay-500"></div>
        <div className="absolute top-1/3 right-16 w-4 h-4 bg-orange-300/30 animate-pulse delay-2000" style={{ borderRadius: '30% 70% 40% 60%' }}></div>
        <div className="absolute bottom-60 left-20 w-3 h-3 bg-peach-200/35 animate-bounce delay-1500" style={{ borderRadius: '50% 50% 80% 20%' }}></div>
        
        {/* Sketchy floating lines */}
        <div className="absolute top-32 left-1/3 w-20 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" style={{ transform: 'rotate(2deg)' }}></div>
        <div className="absolute bottom-32 right-1/4 w-16 h-px bg-gradient-to-r from-transparent via-orange-200/40 to-transparent animate-pulse delay-1000" style={{ transform: 'rotate(-1deg)' }}></div>
        
        {/* Sketchy geometric shapes */}
        <div className="absolute top-1/4 left-12 w-8 h-8 border-2 border-white/15 animate-spin" style={{ 
          borderRadius: '30% 70% 70% 30%',
          animationDuration: '25s',
          transform: 'rotate(45deg)'
        }}></div>
        <div className="absolute bottom-1/4 right-12 w-6 h-6 border-2 border-orange-200/25 animate-spin" style={{ 
          borderRadius: '60% 40% 40% 60%',
          animationDuration: '20s',
          transform: 'rotate(12deg)'
        }}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 pt-40 pb-20">
        <div className="text-center">
          <h1 className="text-6xl font-light text-white mb-2 tracking-tight" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
            <span className="font-black text-7xl">INTERACTIF</span>
          </h1>
          <p className="text-xl text-white/70 font-light" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
            Internal guidance companion
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 pb-40">
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
