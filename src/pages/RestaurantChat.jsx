import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Send, MapPin, Search, FileText, Star, Clock, 
  Target, Mic, Loader, Plus, Brain, ArrowLeft,
  Phone, Globe, Menu as MenuIcon, Users, Award
} from 'lucide-react';
import { useUser } from '../context/UserContext';

const API_BASE = 'http://localhost:8000';

// Restaurant branding configurations
const restaurantBranding = {
  'skye-bar-restaurant': {
    name: 'SKYE Bar & Restaurant',
    primaryColor: '#1a1a2e',
    accentColor: '#16213e',
    gradientFrom: '#0f3460',
    gradientTo: '#16213e',
    textColor: '#ffffff',
    secondaryText: '#e6e6e6',
    bgPattern: 'radial-gradient(circle at 25% 25%, #16213e 0%, #0f3460 50%, #1a1a2e 100%)',
    emoji: '🏙️',
    tagline: 'Elevated Dining with City Views',
    specialty: 'Fine Dining & Premium Cocktails',
    atmosphere: 'Sophisticated, upscale atmosphere perfect for special occasions',
    quickActions: [
      { emoji: '🍸', title: 'Cocktail Menu', prompt: 'Show me your signature cocktails and drink menu' },
      { emoji: '🥩', title: 'Fine Dining', prompt: 'What are your premium dinner options and wine pairings?' },
      { emoji: '🌃', title: 'City Views', prompt: 'Tell me about your rooftop seating and views' },
      { emoji: '🎉', title: 'Events', prompt: 'Do you host private events or special occasions?' }
    ]
  },
  'holycow-steakhouse': {
    name: 'Holycow! Steakhouse',
    primaryColor: '#8B0000',
    accentColor: '#CD5C5C',
    gradientFrom: '#8B0000',
    gradientTo: '#A0522D',
    textColor: '#ffffff',
    secondaryText: '#f5f5dc',
    bgPattern: 'linear-gradient(135deg, #8B0000 0%, #A0522D 50%, #CD853F 100%)',
    emoji: '🥩',
    tagline: 'Premium Steaks & Casual Vibes',
    specialty: 'Hand-cut Steaks & American Classics',
    atmosphere: 'Warm, casual dining perfect for family and friends',
    quickActions: [
      { emoji: '🥩', title: 'Steak Menu', prompt: 'Show me your steak cuts and cooking options' },
      { emoji: '🍟', title: 'Sides & Apps', prompt: 'What appetizers and side dishes do you recommend?' },
      { emoji: '💰', title: 'Lunch Deals', prompt: 'Tell me about your lunch specials and promotions' },
      { emoji: '👨‍👩‍👧‍👦', title: 'Family Dining', prompt: 'Do you have family-friendly options and kids menu?' }
    ]
  },
  'sushi-tei': {
    name: 'Sushi Tei',
    primaryColor: '#C41E3A',
    accentColor: '#2F4F4F',
    gradientFrom: '#C41E3A',
    gradientTo: '#2F4F4F',
    textColor: '#ffffff',
    secondaryText: '#f0f0f0',
    bgPattern: 'linear-gradient(45deg, #C41E3A 0%, #8B0000 30%, #2F4F4F 70%, #1C1C1C 100%)',
    emoji: '🍣',
    tagline: 'Authentic Japanese Cuisine',
    specialty: 'Fresh Sushi & Traditional Japanese Dishes',
    atmosphere: 'Traditional Japanese ambiance with modern touches',
    quickActions: [
      { emoji: '🍣', title: 'Sushi Menu', prompt: 'Show me your fresh sushi selection and chef recommendations' },
      { emoji: '🍜', title: 'Ramen & Hot Dishes', prompt: 'What hot dishes and ramen options do you have?' },
      { emoji: '🍱', title: 'Bento Sets', prompt: 'Tell me about your bento box combinations' },
      { emoji: '🎋', title: 'Japanese Culture', prompt: 'What makes your restaurant authentically Japanese?' }
    ]
  },
  'pizza-marzano': {
    name: 'Pizza Marzano',
    primaryColor: '#228B22',
    accentColor: '#DC143C',
    gradientFrom: '#228B22',
    gradientTo: '#DC143C',
    textColor: '#ffffff',
    secondaryText: '#fff8dc',
    bgPattern: 'linear-gradient(135deg, #228B22 0%, #32CD32 30%, #DC143C 70%, #8B0000 100%)',
    emoji: '🍕',
    tagline: 'Authentic Neapolitan Pizza',
    specialty: 'Wood-fired Pizza & Italian Classics',
    atmosphere: 'Cozy Italian trattoria with authentic flavors',
    quickActions: [
      { emoji: '🍕', title: 'Pizza Menu', prompt: 'Show me your wood-fired pizza selection' },
      { emoji: '🇮🇹', title: 'Italian Classics', prompt: 'What traditional Italian dishes do you serve?' },
      { emoji: '🔥', title: 'Wood-fired Oven', prompt: 'Tell me about your wood-fired cooking process' },
      { emoji: '🎁', title: 'Special Offers', prompt: 'What promotions and deals do you have today?' }
    ]
  },
  'starbucks-reserve': {
    name: 'Starbucks Reserve',
    primaryColor: '#00704A',
    accentColor: '#D4AF37',
    gradientFrom: '#00704A',
    gradientTo: '#8B4513',
    textColor: '#ffffff',
    secondaryText: '#f5f5dc',
    bgPattern: 'linear-gradient(135deg, #00704A 0%, #228B22 30%, #D4AF37 70%, #8B4513 100%)',
    emoji: '☕',
    tagline: 'Premium Coffee Experience',
    specialty: 'Rare Beans & Artisanal Beverages',
    atmosphere: 'Premium coffeehouse with expert baristas',
    quickActions: [
      { emoji: '☕', title: 'Reserve Coffee', prompt: 'What rare and premium coffee beans do you have?' },
      { emoji: '🥐', title: 'Pastries', prompt: 'Show me your pastries and food pairings' },
      { emoji: '⏰', title: 'Happy Hour', prompt: 'Tell me about your happy hour specials' },
      { emoji: '🎓', title: 'Coffee Education', prompt: 'Can you teach me about different brewing methods?' }
    ]
  }
};

const RestaurantChat = () => {
  const { slug } = useParams();
  const { updateLocation, location } = useUser();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [locationInput, setLocationInput] = useState(location?.area || 'Jakarta, Indonesia');
  const [hasUserChatted, setHasUserChatted] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Get restaurant branding
  const branding = restaurantBranding[slug] || restaurantBranding['skye-bar-restaurant'];

  useEffect(() => {
    // Initialize with welcome message
    setMessages([
      {
        id: 1,
        type: 'ai',
        content: `👋 Welcome to ${branding.name}! I'm your personal dining assistant. I can help you with our menu, reservations, special offers, and answer any questions about our ${branding.specialty.toLowerCase()}. How can I assist you today?`,
        timestamp: new Date()
      }
    ]);
  }, [slug, branding]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  };

  const handleQuickAction = async (action) => {
    await sendMessage(action.prompt);
  };

  const addMessage = (newMessage) => {
    setMessages(prev => [...prev, { ...newMessage, id: Date.now() }]);
  };

  const sendMessage = async (customMessage = null) => {
    const messageToSend = customMessage || message.trim();
    if (!messageToSend || isLoading) return;

    // Mark that user has started chatting
    setHasUserChatted(true);

    // Add user message
    addMessage({
      type: 'user',
      content: messageToSend,
      timestamp: new Date()
    });

    // Clear input if using the input field
    if (!customMessage) {
      setMessage('');
    }

    setIsLoading(true);

    try {
      // Enhanced prompt with restaurant context
      const contextualPrompt = `As the AI assistant for ${branding.name}, a ${branding.specialty} restaurant: ${messageToSend}`;
      
      const lat = location?.latitude || null;
      const lon = location?.longitude || null;
      
      let userLocation = null;
      if (lat !== null && lon !== null) {
        userLocation = { latitude: lat, longitude: lon };
      }

      const response = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: contextualPrompt,
          user_location: userLocation
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      addMessage({
        type: 'ai',
        content: data.response,
        timestamp: new Date()
      });

    } catch (error) {
      console.error('Error:', error);
      addMessage({
        type: 'ai',
        content: `❌ I'm having trouble connecting right now. Please try again, or feel free to call us directly for immediate assistance!`,
        timestamp: new Date()
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessageContent = (content) => {
    const formatted = content
      .replace(/^# (.*$)/gm, '<h2 class="text-xl font-semibold mb-2">$1</h2>')
      .replace(/^## (.*$)/gm, '<h3 class="text-lg font-medium mb-2">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/\n/g, '<br>');
    
    return formatted;
  };

  // Dynamic styles based on branding
  const headerStyle = {
    background: branding.bgPattern,
    color: branding.textColor
  };

  const primaryButtonStyle = {
    backgroundColor: branding.primaryColor,
    borderColor: branding.primaryColor
  };

  const accentStyle = {
    color: branding.accentColor
  };

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: '#f8fafc' }}>
      {/* Dynamic Header - Full hero before chat, compact after */}
      {!hasUserChatted ? (
        /* Full Hero Header */
        <div className="relative overflow-hidden" style={headerStyle}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
          </div>
          
          <div className="relative max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <Link
                to="/agents"
                className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors text-sm"
              >
                <ArrowLeft size={18} />
                <span>Back to Agents</span>
              </Link>
              <div className="flex items-center space-x-3">
                <Link
                  to={`/restaurant/${slug}`}
                  className="px-4 py-2 text-sm bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                >
                  View Restaurant
                </Link>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center text-3xl"
                   style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                <span>{branding.emoji}</span>
              </div>
              <h1 className="text-2xl font-bold mb-1" style={{ color: branding.textColor }}>
                {branding.name}
              </h1>
              <p className="text-base mb-3" style={{ color: branding.secondaryText }}>
                {branding.tagline}
              </p>
              
              {/* Restaurant Quick Info */}
              <div className="flex items-center justify-center space-x-4 text-sm" style={{ color: branding.secondaryText }}>
                <div className="flex items-center space-x-1">
                  <Star size={14} fill="currentColor" />
                  <span>4.8</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Open</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users size={14} />
                  <span>AI Chat</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Compact Chat Header */
        <div className="border-b border-gray-200 bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Link
                  to="/agents"
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ArrowLeft size={18} />
                </Link>
                
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg"
                    style={{ backgroundColor: branding.primaryColor }}
                  >
                    {branding.emoji}
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">{branding.name}</h2>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>Online</span>
                      </div>
                      <span>•</span>
                      <span>{branding.specialty}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Link
                  to={`/restaurant/${slug}`}
                  className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium hover:shadow-sm"
                >
                  View Restaurant
                </Link>
                <button 
                  className="p-2.5 text-white rounded-xl hover:opacity-90 transition-all duration-200 shadow-sm hover:shadow-md"
                  style={{ backgroundColor: branding.primaryColor }}
                  title="Call Restaurant"
                >
                  <Phone size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Quick Actions - Only show before user starts chatting */}
          {!hasUserChatted && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">How can I help you today?</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {branding.quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action)}
                    className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 border border-gray-200 text-left"
                  >
                    <div className="text-2xl mb-2">{action.emoji}</div>
                    <h4 className="font-medium text-gray-900 text-sm">{action.title}</h4>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Messages */}
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-3xl px-4 py-3 rounded-2xl ${
                    msg.type === 'user'
                      ? 'text-white'
                      : msg.type === 'system'
                      ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                      : 'bg-white text-gray-900 border border-gray-200 shadow-sm'
                  }`}
                  style={msg.type === 'user' ? { backgroundColor: branding.primaryColor } : {}}
                >
                  {msg.type === 'ai' && (
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                        style={{ backgroundColor: branding.primaryColor }}
                      >
                        {branding.emoji}
                      </div>
                      <div
                        className="flex-1"
                        dangerouslySetInnerHTML={{ __html: formatMessageContent(msg.content) }}
                      />
                    </div>
                  )}
                  {msg.type === 'user' && (
                    <div className="text-right">
                      <p>{msg.content}</p>
                    </div>
                  )}
                  {msg.type === 'system' && (
                    <div className="text-center">
                      <p className="font-medium">{msg.content}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl shadow-sm">
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                      style={{ backgroundColor: branding.primaryColor }}
                    >
                      {branding.emoji}
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: branding.primaryColor, animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: branding.primaryColor, animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: branding.primaryColor, animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input - Branded */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-3 bg-gray-100 rounded-2xl p-3">
            <button className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-xl transition-all duration-200" title="Attach file">
              <FileText size={20} />
            </button>
            
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Ask me about ${branding.name}'s menu, reservations, or anything else...`}
              className="flex-1 bg-transparent border-none outline-none resize-none text-gray-900 placeholder-gray-500 max-h-32"
              rows="1"
              maxLength="2000"
            />
            
            <button className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-xl transition-all duration-200" title="Voice message">
              <Mic size={20} />
            </button>
            
            <button
              onClick={() => sendMessage()}
              disabled={!message.trim() || isLoading}
              className="p-2.5 text-white rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
              style={primaryButtonStyle}
              title="Send message"
            >
              {isLoading ? <Loader size={20} className="animate-spin" /> : <Send size={20} />}
            </button>
          </div>
          
          <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
            <p>Enter to send • Shift + Enter for new line</p>
            <p>{message.length}/2000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantChat;