export function HeroCSSFallback() {
  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[300px]">
      {/* Outer rotating ring */}
      <div className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full border border-accent/30 animate-spin-slow" />

      {/* Middle pulsing circle */}
      <div className="absolute w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-accent/20 to-accent-light/20 animate-pulse-soft blur-sm" />

      {/* Inner geometric shape — rotated square */}
      <div className="absolute w-32 h-32 md:w-44 md:h-44 bg-gradient-to-tr from-accent/30 to-accent-light/30 rotate-45 rounded-lg animate-float" />

      {/* Center dot */}
      <div className="absolute w-3 h-3 rounded-full bg-accent animate-pulse" />

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.08); opacity: 0.9; }
        }
        @keyframes float {
          0%, 100% { transform: rotate(45deg) translateY(0); }
          50% { transform: rotate(45deg) translateY(-12px); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-pulse-soft {
          animation: pulse-soft 4s ease-in-out infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
