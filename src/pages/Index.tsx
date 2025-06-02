
import { useState } from 'react';
import { MessageSquare, Sparkles, Users, Target } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">TechVision AI Assistant</h1>
              <p className="text-sm text-gray-600">Your internal guidance companion</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">AI Assistant Online</span>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            How can I help you today?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get instant guidance, action plans, and mindful considerations for your daily tasks. 
            Just describe your situation and I'll help you navigate it.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/70 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Action Plans</h3>
            <p className="text-gray-600 text-sm">Get structured action points with priorities and deadlines</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/70 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Smart Guidance</h3>
            <p className="text-gray-600 text-sm">AI-powered advice based on company policies and best practices</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/70 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Team Support</h3>
            <p className="text-gray-600 text-sm">Collaborative insights for meetings, projects, and team dynamics</p>
          </div>
        </div>

        {/* Chat Interface */}
        <ChatInterface onSubmit={handlePromptSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Index;
