import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotPopupProps {
  initialPrompt?: string;
}

const ChatbotPopup = ({ initialPrompt }: ChatbotPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Add initial prompt to messages when component mounts
  useEffect(() => {
    if (initialPrompt && messages.length === 0) {
      const initialMessage: Message = {
        id: 'initial',
        text: initialPrompt,
        isUser: true,
        timestamp: new Date()
      };
      setMessages([initialMessage]);
      
      // Auto-send the initial prompt
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      isUser: true,
      timestamp: new Date()
    };

    // Only add user message if it's not the initial prompt
    if (!messageText) {
      setMessages(prev => [...prev, userMessage]);
    }
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('http://34.51.175.185:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response || 'Sorry, I could not process your request.',
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, there was an error processing your request. Please try again.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  return (
    <>
      {/* Chat bubble button */}
      {!isOpen && (
        <div className="fixed bottom-8 left-8 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-2xl transition-all duration-200 hover:scale-110"
          >
            <MessageCircle className="w-8 h-8 text-white" />
          </Button>
        </div>
      )}

      {/* Chat popup */}
      {isOpen && (
        <div className="fixed bottom-8 left-8 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-t-2xl">
            <h3 className="text-white font-bold" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
              AI Assistant
            </h3>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                  style={{ fontFamily: 'Helvetica Neue, sans-serif' }}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                style={{ fontFamily: 'Helvetica Neue, sans-serif' }}
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotPopup;
