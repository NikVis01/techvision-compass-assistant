
import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import ChatInterface from '@/components/ChatInterface';
import Dashboard from '@/components/Dashboard';
import { StructuredResponse } from '@/types/api';

const Index = () => {
  const [currentView, setCurrentView] = useState<'chat' | 'dashboard'>('chat');
  const [structuredData, setStructuredData] = useState<StructuredResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
        setStructuredData(data.structured_data);
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
    setStructuredData(null);
  };

  if (currentView === 'dashboard' && structuredData) {
    return (
      <Dashboard 
        data={structuredData} 
        onBack={handleBackToChat}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 relative overflow-hidden">
      {/* Floating Wingdings */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-16 text-6xl text-white/10 animate-pulse">✨</div>
        <div className="absolute top-40 right-20 text-4xl text-white/15 animate-bounce">🌟</div>
        <div className="absolute top-60 left-1/4 text-5xl text-white/10 animate-pulse delay-1000">💫</div>
        <div className="absolute bottom-40 right-1/3 text-3xl text-white/20 animate-bounce delay-500">⭐</div>
        <div className="absolute top-1/3 right-16 text-4xl text-white/10 animate-pulse delay-2000">✦</div>
        <div className="absolute bottom-60 left-20 text-5xl text-white/15 animate-bounce delay-1500">◆</div>
        <div className="absolute top-80 right-40 text-3xl text-white/10 animate-pulse delay-500">❋</div>
      </div>

      {/* Minimal Header */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-medium text-white">TechVision AI</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light text-white mb-6 tracking-tight">
              How can I help?
            </h2>
            <p className="text-lg text-white/80 font-light">
              Your internal guidance companion
            </p>
          </div>

          <ChatInterface onSubmit={handlePromptSubmit} isLoading={isLoading} />
        </div>
      </div>

      {/* Powered by Gemini */}
      <div className="fixed bottom-6 right-6 z-20">
        <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
          <div className="w-5 h-5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">G</span>
          </div>
          <span className="text-white/80 text-sm font-medium">powered by Gemini</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
