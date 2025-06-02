
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
      background: 'radial-gradient(circle at center, rgba(251, 146, 60, 0.3) 0%, rgba(0, 0, 0, 0.8) 40%), linear-gradient(135deg, #000000 0%, #f97316 50%, #ec4899 100%)'
    }}>
      {/* Dynamic floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-16 w-3 h-3 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-orange-400/30 rounded-full animate-bounce"></div>
        <div className="absolute top-60 left-1/4 w-4 h-4 bg-pink-400/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-bounce delay-500"></div>
        <div className="absolute top-1/3 right-16 w-3 h-3 bg-orange-300/20 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-60 left-20 w-2 h-2 bg-pink-300/30 rounded-full animate-bounce delay-1500"></div>
        
        {/* Floating lines */}
        <div className="absolute top-32 left-1/3 w-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        <div className="absolute bottom-32 right-1/4 w-12 h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent animate-pulse delay-1000"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 left-12 w-6 h-6 border border-white/10 rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute bottom-1/4 right-12 w-4 h-4 border border-pink-400/20 rotate-12 animate-spin" style={{ animationDuration: '15s' }}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 pt-12 pb-8">
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
      <div className="relative z-10 px-6">
        <ChatInterface onSubmit={handlePromptSubmit} isLoading={isLoading} />
      </div>

      {/* Powered by Gemini */}
      <div className="fixed bottom-6 right-6 z-20">
        <div className="flex items-center space-x-3 bg-black/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>G</span>
          </div>
          <span className="text-white/90 text-sm font-medium" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>powered by Gemini</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
