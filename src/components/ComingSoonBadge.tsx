
import { Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

const ComingSoonBadge = () => {
  return (
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
  );
};

export default ComingSoonBadge;
