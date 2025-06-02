
import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatInterfaceProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

const ChatInterface = ({ onSubmit, isLoading }: ChatInterfaceProps) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt.trim());
      setPrompt('');
    }
  };

  const examplePrompts = [
    "Staff meeting in 5. Help me generate a plan based off of company policy",
    "I need to prepare for a client presentation tomorrow",
    "How should I handle a difficult team conflict?",
    "What's the best approach for quarterly goal setting?"
  ];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Example Prompts */}
      <div className="mb-8">
        <p className="text-sm font-medium text-gray-700 mb-4">Try asking about:</p>
        <div className="grid md:grid-cols-2 gap-3">
          {examplePrompts.map((example, index) => (
            <button
              key={index}
              onClick={() => setPrompt(example)}
              className="text-left p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/70 transition-all duration-200 group"
            >
              <span className="text-sm text-gray-700 group-hover:text-gray-800">"{example}"</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your situation or ask for guidance..."
            className="w-full p-6 pr-16 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none text-gray-800 placeholder-gray-500"
            rows={4}
            disabled={isLoading}
          />
          
          <Button
            type="submit"
            disabled={!prompt.trim() || isLoading}
            className="absolute bottom-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isLoading ? (
              <Sparkles className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>
        
        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <span>Press Enter + Shift for new line</span>
          <span>{prompt.length}/1000</span>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
