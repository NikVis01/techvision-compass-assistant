
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
        radial-gradient(circle at center bottom, 
          rgba(251, 146, 60, 0.4) 0%, 
          rgba(34, 197, 94, 0.3) 20%,
          rgba(236, 72, 153, 0.2) 40%,
          rgba(0, 0, 0, 0.9) 70%
        ),
        conic-gradient(from 0deg at center bottom,
          #000000 0deg,
          #22c55e 30deg,
          #f97316 60deg,
          #ec4899 90deg,
          #22c55e 120deg,
          #000000 150deg,
          #f97316 180deg,
          #ec4899 210deg,
          #22c55e 240deg,
          #f97316 270deg,
          #ec4899 300deg,
          #000000 330deg,
          #000000 360deg
        ),
        linear-gradient(135deg, #000000 0%, #f97316 50%, #ec4899 100%)
      `
    }}>
      {/* Dynamic floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-16 w-3 h-3 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-green-400/30 rounded-full animate-bounce"></div>
        <div className="absolute top-60 left-1/4 w-4 h-4 bg-pink-400/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-bounce delay-500"></div>
        <div className="absolute top-1/3 right-16 w-3 h-3 bg-green-300/20 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-60 left-20 w-2 h-2 bg-pink-300/30 rounded-full animate-bounce delay-1500"></div>
        
        {/* Floating lines */}
        <div className="absolute top-32 left-1/3 w-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        <div className="absolute bottom-32 right-1/4 w-12 h-px bg-gradient-to-r from-transparent via-green-400/30 to-transparent animate-pulse delay-1000"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 left-12 w-6 h-6 border border-white/10 rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute bottom-1/4 right-12 w-4 h-4 border border-green-400/20 rotate-12 animate-spin" style={{ animationDuration: '15s' }}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 pt-32 pb-16">
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
