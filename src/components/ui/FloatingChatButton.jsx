import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, X } from 'lucide-react';

const FloatingChatButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [ripples, setRipples] = useState([]);

  // Show tooltip after a delay when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
      // Hide tooltip after 3 seconds
      setTimeout(() => setShowTooltip(false), 3000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Handle ripple animation
  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      x,
      y,
      id: Date.now(),
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  return (
    <>
      {/* Desktop Only - Floating Chat Button */}
      <div className="hidden md:block fixed bottom-6 right-6 z-50">
        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-lg shadow-lg whitespace-nowrap animate-bounce">
            💬 View your chats
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
          </div>
        )}

        {/* Main Floating Button */}
        <Link
          to="/chat"
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative group flex items-center justify-center w-14 h-14 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 overflow-hidden"
          style={{
            boxShadow: isHovered 
              ? '0 20px 40px rgba(59, 130, 246, 0.4), 0 0 0 0 rgba(59, 130, 246, 0.3)' 
              : '0 10px 25px rgba(59, 130, 246, 0.3)',
            animation: 'float 3s ease-in-out infinite',
          }}
        >
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent-500 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Pulse Animation Ring */}
          <div className="absolute inset-0 rounded-full bg-primary-400 opacity-75 animate-ping group-hover:animate-none"></div>
          
          {/* Ripple Effects */}
          {ripples.map((ripple) => (
            <div
              key={ripple.id}
              className="absolute rounded-full bg-white opacity-30 pointer-events-none animate-ping"
              style={{
                left: ripple.x - 10,
                top: ripple.y - 10,
                width: 20,
                height: 20,
                animation: 'ripple 0.6s linear',
              }}
            />
          ))}
          
          {/* Icon */}
          <MessageCircle 
            size={24} 
            className={`relative z-10 transition-all duration-300 ${
              isHovered ? 'scale-110 rotate-12' : ''
            }`}
          />
          
          {/* Notification Badge */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
            <span className="text-xs font-bold text-white">3</span>
          </div>
        </Link>

        {/* Floating Chat Preview Cards (on hover) */}
        {isHovered && (
          <div className="absolute bottom-16 right-0 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 animate-slideUp">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">Recent Chats</h3>
              <div className="text-xs text-gray-500 dark:text-gray-400">3 active</div>
            </div>
            
            <div className="space-y-2">
              {/* Mini Chat Preview */}
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  SK
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 dark:text-white truncate">SKYE Bar</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">What's your signature cocktail?</div>
                </div>
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              </div>
              
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  HC
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 dark:text-white truncate">Holycow!</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">Our lunch special is available...</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ST
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 dark:text-white truncate">Sushi Tei</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">Fresh salmon just arrived!</div>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
            
            <Link 
              to="/chat"
              className="block mt-3 text-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
            >
              View all chats →
            </Link>
          </div>
        )}
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default FloatingChatButton;