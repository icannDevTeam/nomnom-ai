import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Send, Search, FileText, Star, Clock, 
  Mic, Loader, Plus, Brain, Percent, MapPin 
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import AdvancedSearch from '../components/search/AdvancedSearch';
import SearchResults from '../components/search/SearchResults';
import { searchRestaurants } from '../services/restaurantService';

const API_BASE = 'http://localhost:8000';

const quickActions = [
  {
    id: 'search-restaurants',
    emoji: '🔍',
    title: 'Find Restaurants',
    description: 'Search by cuisine, location, or preferences',
    prompt: 'Find Italian restaurants near me'
  },
  {
    id: 'reviews',
    emoji: '📝',
    title: 'Read Reviews',
    description: 'Customer feedback and ratings',
    prompt: 'Show me reviews for popular restaurants'
  },
  {
    id: 'promos',
    emoji: '🎯',
    title: 'Promos & Deals',
    description: 'Special offers and discounts',
    prompt: 'Find restaurant promotions and deals'
  },
  {
    id: 'filtered-reviews',
    emoji: '⭐',
    title: 'Filter Reviews',
    description: '5-star, 4+ rating filters',
    prompt: 'Show me 5 star restaurant reviews'
  },
  {
    id: 'location-based',
    emoji: '📍',
    title: 'Location Search',
    description: 'Restaurants near you or specific areas',
    prompt: 'Find restaurants nearby'
  },
  {
    id: 'mixed-content',
    emoji: '📝📸',
    title: 'Reviews + Photos',
    description: 'Complete restaurant information',
    prompt: 'Show me restaurant reviews with photos'
  }
];

const Landing = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "👋 Hi! I'm your restaurant search assistant. I can help you find restaurants, read reviews, view photos, and discover amazing dining experiences. Try asking me something or use the quick actions below!",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [currentFilters, setCurrentFilters] = useState({});
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

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
    const actionData = quickActions.find(a => a.id === action);
    if (actionData) {
      await sendMessage(actionData.prompt);
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationMessage = `Find restaurants near my location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
          sendMessage(locationMessage);
        },
        (error) => {
          console.error('Error getting location:', error);
          sendMessage('Find restaurants near me');
        }
      );
    } else {
      sendMessage('Find restaurants near me');
    }
  };

  const addMessage = (newMessage) => {
    setMessages(prev => [...prev, { ...newMessage, id: Date.now() }]);
  };

  const sendMessage = async (customMessage = null) => {
    const messageToSend = customMessage || message.trim();
    if (!messageToSend || isLoading) return;

    // Hide welcome section once user starts chatting
    setShowWelcome(false);

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

    // Show typing indicator
    setIsTyping(true);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageToSend
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Hide typing indicator and add AI response
      setIsTyping(false);
      addMessage({
        type: 'ai',
        content: data.response,
        timestamp: new Date()
      });

    } catch (error) {
      console.error('Error:', error);
      setIsTyping(false);
      addMessage({
        type: 'ai',
        content: `❌ Error: ${error.message}. Make sure your API is running on ${API_BASE}`,
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
    // Basic markdown-like formatting
    const formatted = content
      .replace(/^# (.*$)/gm, '<h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">$1</h2>')
      .replace(/^## (.*$)/gm, '<h3 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/\n/g, '<br>');
    
    return formatted;
  };

  const handleSearch = (query, filters) => {
    setCurrentFilters(filters);
    setShowWelcome(false);
    
    // Perform the search using our restaurant service
    const results = searchRestaurants(query, filters);
    setSearchResults(results);
    
    // Create a comprehensive search message for the chat
    let searchMessage = `Search for: "${query}"`;
    
    if (filters.cuisine?.length > 0) {
      searchMessage += `\nCuisines: ${filters.cuisine.join(', ')}`;
    }
    if (filters.priceRange?.length > 0) {
      const priceLabels = filters.priceRange.map(p => {
        const ranges = { 
          '1': 'Rp (Under 150K)', 
          '2': 'Rp Rp (150K-300K)', 
          '3': 'Rp Rp Rp (300K-600K)', 
          '4': 'Rp Rp Rp Rp (600K+)' 
        };
        return ranges[p];
      });
      searchMessage += `\nPrice Range: ${priceLabels.join(', ')}`;
    }
    if (filters.rating) {
      searchMessage += `\nMinimum Rating: ${filters.rating}+ stars`;
    }
    if (filters.distance) {
      searchMessage += `\nDistance: Within ${filters.distance} km`;
    }
    if (filters.dietary?.length > 0) {
      searchMessage += `\nDietary Options: ${filters.dietary.join(', ')}`;
    }
    
    const additionalOptions = [];
    if (filters.openNow) additionalOptions.push('Open Now');
    if (filters.hasDelivery) additionalOptions.push('Delivery Available');
    if (filters.hasReservations) additionalOptions.push('Accepts Reservations');
    
    if (additionalOptions.length > 0) {
      searchMessage += `\nAdditional Requirements: ${additionalOptions.join(', ')}`;
    }
    
    // Add the search to chat history
    sendMessage(searchMessage);
    
    // Add AI response about the search results
    setTimeout(() => {
      const resultMessage = results.length > 0 
        ? `I found ${results.length} restaurant${results.length > 1 ? 's' : ''} matching your search! ${results.length > 3 ? 'Here are the top matches:' : 'Here they are:'}\n\n${results.slice(0, 3).map(r => `🍽️ **${r.name}** (${r.rating}⭐)\n   ${r.cuisine} • ${r.location} • ${r.distance}mi away`).join('\n\n')}\n\nYou can see all results below the chat. Would you like me to help you with anything specific about these restaurants?`
        : `I couldn't find any restaurants matching your criteria. Try adjusting your filters or search terms to see more options.`;
      
      addMessage({
        id: messages.length + 2,
        type: 'ai',
        content: resultMessage,
        timestamp: new Date()
      });
    }, 1000);
  };

  const handleFilterChange = (filters) => {
    setCurrentFilters(filters);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Chat Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🍽️</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">NomnomAI Assistant</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your culinary discovery companion</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link
              to="/channels"
              className="px-3 py-1.5 text-sm bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Browse Restaurants
            </Link>
            <Link
              to="/discovery"
              className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Discover
            </Link>
          </div>
        </div>
      </div>

      {/* Chat Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Compact Search Bar (when welcome is hidden) */}
          {!showWelcome && (
            <div className="mb-6 sticky top-0 bg-gray-50 dark:bg-gray-900 pt-2 pb-4 -mx-4 px-4 z-10">
              <AdvancedSearch 
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
              />
            </div>
          )}

          {/* Welcome Section */}
          {showWelcome && (
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🍽️</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome to <span className="text-primary-600">NomnomAI</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                Your intelligent restaurant search assistant. Find restaurants, read reviews, view photos, and discover amazing dining experiences.
              </p>

              {/* Advanced Search Component */}
              <div className="mb-8">
                <AdvancedSearch 
                  onSearch={handleSearch}
                  onFilterChange={handleFilterChange}
                />
              </div>

              {/* Quick Actions Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleQuickAction(action.id)}
                    className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 text-left"
                  >
                    <div className="text-3xl mb-2">{action.emoji}</div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">{action.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{action.description}</p>
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
                      ? 'bg-primary-500 text-white'
                      : msg.type === 'system'
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-800'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {msg.type === 'ai' && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                        AI
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
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      AI
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="max-w-4xl mx-auto px-4 pb-6">
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <SearchResults 
                results={searchResults}
                query={messages.length > 1 ? messages[messages.length - 2]?.content?.split('"')[1] : ''}
                filters={currentFilters}
                isLoading={false}
              />
            </div>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-3 bg-gray-100 dark:bg-gray-700 rounded-2xl p-3">
            <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
              <FileText size={20} />
            </button>
            
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Try: 'Italian restaurants near me', 'Pizza Hut reviews', 'Show me promos'..."
              className="flex-1 bg-transparent border-none outline-none resize-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 max-h-32"
              rows="1"
              maxLength="2000"
            />
            
            <button
              onClick={handleGetLocation}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              title="Get current location"
            >
              <MapPin size={20} />
            </button>
            
            <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
              <Mic size={20} />
            </button>
            
            <button
              onClick={() => sendMessage()}
              disabled={!message.trim() || isLoading}
              className="p-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? <Loader size={20} className="animate-spin" /> : <Send size={20} />}
            </button>
          </div>
          
          <div className="flex justify-between items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
            <p>Enter to send • Shift + Enter for new line</p>
            <p>{message.length}/2000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;