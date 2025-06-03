
import { Sparkles } from 'lucide-react';

const AppHeader = () => {
  return (
    <div className="relative z-10 pt-32 pb-16">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-4 mb-2">
          <img 
            src="/lovable-uploads/55e73367-3a72-485c-987b-4efe3f2b8861.png" 
            alt="Star Logo" 
            className="w-16 h-16 brightness-0 invert" 
          />
          <h1 className="text-6xl font-light text-white tracking-tight" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
            <span className="font-black text-7xl">INTERACTIF</span>
          </h1>
        </div>
        <p className="text-xl text-white/70 font-light" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
          Internal guidance companion
        </p>
      </div>
    </div>
  );
};

export default AppHeader;
