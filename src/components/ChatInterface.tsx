
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

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-6 pr-16 bg-white/20 backdrop-blur-md rounded-3xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none text-white placeholder-white/60 shadow-xl"
            rows={3}
            disabled={isLoading}
          />
          
          <Button
            type="submit"
            disabled={!prompt.trim() || isLoading}
            className="absolute bottom-4 right-4 w-12 h-12 rounded-2xl bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg backdrop-blur-sm border border-white/30"
          >
            {isLoading ? (
              <Sparkles className="w-5 h-5 animate-spin text-white" />
            ) : (
              <Send className="w-5 h-5 text-white" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
