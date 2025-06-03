
const FloatingElements = () => {
  return (
    <>
      {/* Subtle light blue glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-cyan-300/5 pointer-events-none"></div>
      
      {/* Dynamic floating elements with blue accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-16 w-3 h-3 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-blue-400/30 rounded-full animate-bounce"></div>
        <div className="absolute top-60 left-1/4 w-4 h-4 bg-cyan-400/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-bounce delay-500"></div>
        <div className="absolute top-1/3 right-16 w-3 h-3 bg-blue-300/20 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-60 left-20 w-2 h-2 bg-cyan-300/30 rounded-full animate-bounce delay-1500"></div>
        
        {/* Floating lines with blue tints */}
        <div className="absolute top-32 left-1/3 w-16 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent animate-pulse"></div>
        <div className="absolute bottom-32 right-1/4 w-12 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-pulse delay-1000"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 left-12 w-6 h-6 border border-blue-400/10 rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute bottom-1/4 right-12 w-4 h-4 border border-cyan-400/20 rotate-12 animate-spin" style={{ animationDuration: '15s' }}></div>
      </div>
    </>
  );
};

export default FloatingElements;
