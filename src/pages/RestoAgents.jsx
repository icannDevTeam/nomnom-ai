import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, Star, MapPin, Clock, Users, Bot, 
  MessageCircle, Heart, ChevronRight, Zap, Award,
  Utensils, Coffee, Pizza, IceCream 
} from 'lucide-react';
import { useUser } from '../context/UserContext';

// Restaurant brand colors for chat buttons
const restaurantBrandColors = {
  'skye-bar-restaurant': '#1a1a2e',
  'holycow-steakhouse': '#8B0000',
  'sushi-tei': '#C41E3A',
  'kintan-buffet': '#B8860B',
  'pizza-marzano': '#228B22',
  'starbucks-reserve': '#00704A',
  'warung-tekko': '#FF6B35',
  'the-social-house': '#6B46C1'
};

// Add custom styles for scrolling
const scrollbarHideStyles = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .smooth-scroll {
    scroll-behavior: smooth;
  }
`;

// Inject styles
if (typeof document !== 'undefined' && !document.getElementById('scrollbar-styles')) {
  const style = document.createElement('style');
  style.id = 'scrollbar-styles';
  style.textContent = scrollbarHideStyles;
  document.head.appendChild(style);
}

// Mock restaurant agents data - will be replaced with API data
const restaurantAgents = [
  {
    id: '1',
    name: 'SKYE Bar & Restaurant',
    slug: 'skye-bar-restaurant',
    cuisine: 'Fine Dining',
    rating: 4.8,
    totalChats: '2.3K',
    activeNow: true,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    description: 'Rooftop fine dining with stunning city views and premium cocktails',
    specialties: ['Cocktails', 'City View', 'Fine Dining'],
    promo: 'Ladies Night Free Flow - Wed 8PM',
    verified: true,
    location: 'Central Jakarta',
    price: '$$$$'
  },
  {
    id: '2',
    name: 'Holycow! Steakhouse',
    slug: 'holycow-steakhouse',
    cuisine: 'Steakhouse',
    rating: 4.6,
    totalChats: '1.8K',
    activeNow: true,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
    description: 'Premium steaks and casual dining experience for meat lovers',
    specialties: ['Steaks', 'Casual Dining', 'American'],
    promo: '30% Off Lunch Special',
    verified: true,
    location: 'South Jakarta',
    price: '$$$'
  },
  {
    id: '3',
    name: 'Sushi Tei',
    slug: 'sushi-tei',
    cuisine: 'Japanese',
    rating: 4.5,
    totalChats: '3.1K',
    activeNow: true,
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800',
    description: 'Authentic Japanese sushi and cuisine with fresh ingredients',
    specialties: ['Sushi', 'Japanese', 'Fresh Fish'],
    promo: '15% Off All Day',
    verified: true,
    location: 'Multiple Locations',
    price: '$$'
  },
  {
    id: '4',
    name: 'Kintan Buffet',
    slug: 'kintan-buffet',
    cuisine: 'Japanese BBQ',
    rating: 4.7,
    totalChats: '1.5K',
    activeNow: true,
    image: 'https://images.unsplash.com/photo-1608877907149-a206d75ba011?w=800',
    description: 'All-you-can-eat Japanese BBQ with premium wagyu selections',
    specialties: ['Yakiniku', 'Buffet', 'Wagyu'],
    promo: 'Birthday Month Free Entry',
    verified: true,
    location: 'North Jakarta',
    price: '$$$'
  },
  {
    id: '5',
    name: 'Pizza Marzano',
    slug: 'pizza-marzano',
    cuisine: 'Italian',
    rating: 4.4,
    totalChats: '890',
    activeNow: true,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800',
    description: 'Authentic Neapolitan pizza made with imported Italian ingredients',
    specialties: ['Pizza', 'Italian', 'Wood-fired'],
    promo: 'Buy 2 Get 1 Free Pizza',
    verified: false,
    location: 'West Jakarta',
    price: '$$'
  },
  {
    id: '6',
    name: 'Starbucks Reserve',
    slug: 'starbucks-reserve',
    cuisine: 'Coffee & Pastries',
    rating: 4.3,
    totalChats: '4.2K',
    activeNow: true,
    image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800',
    description: 'Premium coffee experience with rare beans and artisanal beverages',
    specialties: ['Coffee', 'Pastries', 'Premium'],
    promo: 'Happy Hour 3-5 PM',
    verified: true,
    location: 'Multiple Locations',
    price: '$$'
  },
  {
    id: '7',
    name: 'Warung Tekko',
    slug: 'warung-tekko',
    cuisine: 'Indonesian',
    rating: 4.2,
    totalChats: '1.2K',
    activeNow: true,
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800',
    description: 'Authentic Indonesian cuisine with traditional flavors',
    specialties: ['Nasi Gudeg', 'Sate', 'Traditional'],
    promo: 'Free Es Teh with every meal',
    verified: true,
    location: 'East Jakarta',
    price: '$'
  },
  {
    id: '8',
    name: 'The Social House',
    slug: 'the-social-house',
    cuisine: 'International',
    rating: 4.5,
    totalChats: '2.7K',
    activeNow: true,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    description: 'Trendy spot with international cuisine and great vibes',
    specialties: ['Brunch', 'International', 'Instagrammable'],
    promo: 'Weekend Brunch Special',
    verified: true,
    location: 'South Jakarta',
    price: '$$$'
  }
];

const cuisineFilters = [
  { id: 'all', name: 'All Cuisines', icon: Utensils },
  { id: 'fine-dining', name: 'Fine Dining', icon: Award },
  { id: 'japanese', name: 'Japanese', icon: Zap },
  { id: 'italian', name: 'Italian', icon: Pizza },
  { id: 'steakhouse', name: 'Steakhouse', icon: Utensils },
  { id: 'coffee', name: 'Coffee & Cafe', icon: Coffee },
  { id: 'indonesian', name: 'Indonesian', icon: IceCream }
];

const RestoAgents = () => {
  const { location } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [filteredAgents, setFilteredAgents] = useState(restaurantAgents);
  const [showFilters, setShowFilters] = useState(false);
  const [liveChatCount, setLiveChatCount] = useState(47);

  useEffect(() => {
    filterAgents();
  }, [searchQuery, selectedCuisine]);

  // Live chat counter simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveChatCount(prev => {
        // Random fluctuation between 35-75 people
        const change = Math.floor(Math.random() * 7) - 3; // -3 to +3
        const newCount = prev + change;
        
        // Keep within realistic bounds
        if (newCount < 35) return 35 + Math.floor(Math.random() * 5);
        if (newCount > 75) return 70 + Math.floor(Math.random() * 5);
        
        return newCount;
      });
    }, 3000 + Math.random() * 4000); // Update every 3-7 seconds

    return () => clearInterval(interval);
  }, []);

  const filterAgents = () => {
    let filtered = restaurantAgents;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(agent =>
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.specialties.some(specialty => 
          specialty.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Cuisine filter
    if (selectedCuisine !== 'all') {
      filtered = filtered.filter(agent => {
        const cuisine = agent.cuisine.toLowerCase();
        switch (selectedCuisine) {
          case 'fine-dining':
            return cuisine.includes('fine dining');
          case 'japanese':
            return cuisine.includes('japanese');
          case 'italian':
            return cuisine.includes('italian');
          case 'steakhouse':
            return cuisine.includes('steakhouse');
          case 'coffee':
            return cuisine.includes('coffee') || cuisine.includes('cafe');
          case 'indonesian':
            return cuisine.includes('indonesian');
          default:
            return true;
        }
      });
    }

    setFilteredAgents(filtered);
  };

  const handleChatWithAgent = (agent) => {
    // Navigate to branded restaurant chat page
    window.location.href = `/chat/${agent.slug}`;
  };

  return (
    <div className="pb-20 md:pb-0">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="text-4xl">🤖</div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Restaurant AI Agents</h1>
            <p className="text-lg text-white/90 mb-4 max-w-2xl mx-auto">
              Chat with restaurant agents for instant help with menus, reservations & recommendations
            </p>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 max-w-lg mx-auto">
              <div className="flex items-center justify-between text-sm">
                <span>🟢 All Agents Online</span>
                <div className="flex items-center space-x-3">
                  <span className="relative">
                    💬 {liveChatCount} chatting now
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </span>
                  <span className="text-white/70">•</span>
                  <span>{restaurantAgents.reduce((sum, a) => sum + parseFloat(a.totalChats.replace('K', '')), 0).toFixed(1)}K+ total</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp-style Status Cards - Full Width */}
      <div className="mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Featured Agents</h2>
              <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-xs font-medium">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span>{liveChatCount} active chats</span>
              </div>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Swipe →</span>
          </div>
        </div>
        
        {/* Full-width scrollable container */}
        <div className="overflow-x-auto scrollbar-hide smooth-scroll" style={{ 
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x mandatory'
        }}>
          <div className="flex space-x-4 px-4 sm:px-6 lg:px-8 py-2" style={{ width: 'max-content' }}>
            {/* Add more agents for better scrolling */}
            {[...restaurantAgents, ...restaurantAgents.slice(0, 3)].map((agent, index) => (
              <div
                key={`${agent.id}-${index}`}
                onClick={() => handleChatWithAgent(agent)}
                className="flex-shrink-0 cursor-pointer group"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="relative">
                  {/* Status Ring with brand colors */}
                  <div 
                    className="w-20 h-20 rounded-full p-1 shadow-lg group-hover:shadow-xl transition-all duration-300"
                    style={{ 
                      background: `linear-gradient(135deg, ${restaurantBrandColors[agent.slug] || '#3b82f6'}, ${restaurantBrandColors[agent.slug] || '#3b82f6'}99)`
                    }}
                  >
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
                      <img
                        src={agent.image}
                        alt={agent.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  
                  {/* Online Indicator with brand color */}
                  <div 
                    className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center shadow-md"
                    style={{ backgroundColor: restaurantBrandColors[agent.slug] || '#10b981' }}
                  >
                    <Bot size={12} className="text-white" />
                  </div>
                  
                  {/* Verified Badge for some agents */}
                  {agent.verified && index % 3 === 0 && (
                    <div className="absolute -top-1 -left-1 w-6 h-6 bg-primary-500 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                      <Award size={10} className="text-white" />
                    </div>
                  )}
                </div>
                
                <div className="mt-2 text-center">
                  <p className="text-xs font-medium text-gray-900 dark:text-white truncate max-w-[80px]">
                    {agent.name.split(' ')[0]}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {agent.cuisine}
                  </p>
                  {/* Live indicator */}
                  {index % 4 === 0 && (
                    <div className="flex items-center justify-center space-x-1 mt-1">
                      <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-red-500 font-medium">LIVE</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* View All Card */}
            <div className="flex-shrink-0 cursor-pointer group">
              <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center group-hover:border-primary-500 transition-colors shadow-lg">
                <ChevronRight size={24} className="text-gray-400 group-hover:text-primary-500" />
              </div>
              <div className="mt-2 text-center">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  View All
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search restaurants by name, cuisine, or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-16 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none shadow-sm"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-colors ${
                showFilters
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Filter size={18} />
            </button>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Filter by Cuisine</h3>
              <div className="flex flex-wrap gap-2">
                {cuisineFilters.map((cuisine) => {
                  const Icon = cuisine.icon;
                  return (
                    <button
                      key={cuisine.id}
                      onClick={() => setSelectedCuisine(cuisine.id)}
                      className={`flex items-center space-x-2 px-4 py-2.5 rounded-full text-sm transition-all duration-200 font-medium ${
                        selectedCuisine === cuisine.id
                          ? 'bg-primary-500 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-sm'
                      }`}
                    >
                      <Icon size={16} />
                      <span>{cuisine.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Quick Action Pills */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setSelectedCuisine('fine-dining')}
            className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full text-sm hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 font-medium"
          >
            ⭐ Fine Dining
          </button>
          <button
            onClick={() => setSelectedCuisine('japanese')}
            className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full text-sm hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 font-medium"
          >
            🍣 Japanese
          </button>
          <button
            onClick={() => setSearchQuery('promo')}
            className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full text-sm hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 font-medium"
          >
            🎯 With Promos
          </button>
          <button
            onClick={() => setSelectedCuisine('coffee')}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-full text-sm hover:from-amber-700 hover:to-amber-800 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 font-medium"
          >
            ☕ Coffee & Cafe
          </button>
        </div>

        {/* Modern List View */}
        <div className="space-y-4">
          {filteredAgents.map((agent, index) => (
            <div
              key={agent.id}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 group"
            >
              <div className="flex flex-col md:flex-row md:items-center p-4 space-y-4 md:space-y-0">
                {/* Top Row - Avatar and Info */}
                <div className="flex items-center flex-1 min-w-0">
                  {/* Agent Avatar */}
                  <div className="flex-shrink-0 relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100 dark:border-gray-700 group-hover:border-primary-500 transition-colors">
                      <img
                        src={agent.image}
                        alt={agent.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* Online Indicator */}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    </div>
                    
                    {/* Verified Badge */}
                    {agent.verified && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                        <Award size={10} className="text-white" />
                      </div>
                    )}
                  </div>

                  {/* Agent Info */}
                  <div className="flex-1 ml-4 min-w-0">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white truncate">
                      {agent.name}
                    </h3>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                        {agent.cuisine}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {agent.price}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star size={14} className="text-yellow-500" fill="currentColor" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {agent.rating}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                      {agent.description}
                    </p>
                    
                    {/* Stats Row */}
                    <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500 dark:text-gray-400 overflow-x-auto">
                      <div className="flex items-center space-x-1 flex-shrink-0">
                        <MessageCircle size={12} />
                        <span>{agent.totalChats} chats</span>
                      </div>
                      <div className="flex items-center space-x-1 flex-shrink-0">
                        <MapPin size={12} />
                        <span className="truncate">{agent.location}</span>
                      </div>
                      <div className="flex items-center space-x-1 flex-shrink-0">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                        <span>{Math.floor(Math.random() * 8) + 2} chatting</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Separate row on mobile, right side on desktop */}
                <div className="flex space-x-2 md:flex-shrink-0 md:ml-4">
                  <button
                    onClick={() => handleChatWithAgent(agent)}
                    className="flex-1 md:flex-initial px-4 md:px-6 py-2.5 text-white rounded-xl hover:opacity-90 transition-all duration-200 font-medium text-sm flex items-center justify-center space-x-2 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    style={{ 
                      backgroundColor: restaurantBrandColors[agent.slug] || '#3b82f6',
                      boxShadow: `0 4px 14px 0 ${restaurantBrandColors[agent.slug] || '#3b82f6'}20`
                    }}
                  >
                    <MessageCircle size={16} />
                    <span>Chat</span>
                  </button>
                  
                  <Link
                    to={`/restaurant/${agent.slug}`}
                    className="p-2.5 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:shadow-md flex-shrink-0"
                    title="View restaurant details"
                  >
                    <ChevronRight size={16} className="text-gray-600 dark:text-gray-400" />
                  </Link>
                </div>
              </div>

              {/* Promo Banner */}
              {agent.promo && (
                <div className="mx-4 mb-3 p-2 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Zap size={14} className="text-orange-600 dark:text-orange-400" />
                    <span className="text-sm font-medium text-orange-800 dark:text-orange-200">
                      {agent.promo}
                    </span>
                  </div>
                </div>
              )}

              {/* Specialties */}
              <div className="mx-4 mb-4">
                <div className="flex flex-wrap gap-2">
                  {agent.specialties.slice(0, 3).map((specialty) => (
                    <span
                      key={specialty}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAgents.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No agents found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search criteria or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCuisine('all');
              }}
              className="px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestoAgents;