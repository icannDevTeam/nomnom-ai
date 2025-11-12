import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Star, MapPin, Clock, Phone, Globe, Share2, 
  Heart, Bell, BellOff, Send, Image, ThumbsUp, MessageCircle,
  Users, Award, Calendar, DollarSign, Wifi, Car, CreditCard
} from 'lucide-react';
import { useUser } from '@context/UserContext';

// Mock restaurant data - will be replaced with API calls
const mockRestaurantData = {
  id: '1',
  name: 'SKYE Bar & Restaurant',
  slug: 'skye-bar-restaurant',
  verified: true,
  cuisine: 'Fine Dining',
  rating: 4.8,
  reviewCount: 1247,
  priceRange: '$$$$',
  location: {
    address: 'BCA Tower, Level 56, Jl. MH Thamrin No.1, Jakarta Pusat',
    area: 'SCBD',
    distance: '2.3 km'
  },
  contact: {
    phone: '+62 21 2358 7777',
    website: 'https://skye-jakarta.com',
    instagram: '@skye_jakarta'
  },
  hours: {
    monday: '17:00 - 01:00',
    tuesday: '17:00 - 01:00',
    wednesday: '17:00 - 01:00',
    thursday: '17:00 - 01:00',
    friday: '17:00 - 02:00',
    saturday: '17:00 - 02:00',
    sunday: '17:00 - 01:00'
  },
  amenities: ['WiFi', 'Parking', 'Credit Cards', 'Reservations', 'Outdoor Seating'],
  images: [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800',
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800'
  ],
  followers: 12500,
  isFollowing: false,
  notificationsEnabled: false,
  description: 'Perched on the 56th floor of BCA Tower, SKYE offers breathtaking panoramic views of Jakarta\'s skyline. Experience world-class cocktails and contemporary cuisine in an elegant rooftop setting.',
  tags: ['rooftop', 'cocktails', 'fine_dining', 'city_view', 'romantic'],
  posts: [
    {
      id: '1',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600',
      caption: 'New signature cocktail: Jakarta Sunset 🌅 Available now at SKYE!',
      timestamp: '2 hours ago',
      likes: 127,
      comments: 23,
      isLiked: false
    },
    {
      id: '2',
      type: 'promo',
      title: 'Ladies Night Special',
      description: 'Every Wednesday, ladies enjoy free-flow cocktails from 8PM-11PM',
      validUntil: '2024-12-31',
      timestamp: '1 day ago',
      likes: 89,
      comments: 15
    },
    {
      id: '3',
      type: 'image',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600',
      caption: 'Weekend vibes at SKYE ✨ Book your table now!',
      timestamp: '3 days ago',
      likes: 156,
      comments: 31
    }
  ]
};

const RestaurantDetail = () => {
  const { slug } = useParams();
  const { followRestaurant, isFollowing } = useUser();
  const [restaurant, setRestaurant] = useState(mockRestaurantData);
  const [activeTab, setActiveTab] = useState('feed'); // feed, info, chat
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [slug]);

  const handleFollow = () => {
    followRestaurant(restaurant.id);
    setRestaurant(prev => ({
      ...prev,
      isFollowing: !prev.isFollowing,
      followers: prev.isFollowing ? prev.followers - 1 : prev.followers + 1
    }));
  };

  const handleLike = (postId) => {
    setRestaurant(prev => ({
      ...prev,
      posts: prev.posts.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    }));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Here you would send the message to the AI chat
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🍽️</div>
          <div className="text-xl font-semibold text-gray-900 dark:text-white">Loading restaurant...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 md:pb-0">
      {/* Header */}
      <div className="relative">
        {/* Hero Image */}
        <div className="h-64 md:h-80 relative overflow-hidden">
          <img
            src={restaurant.images[0]}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Back Button */}
          <Link
            to="/channels"
            className="absolute top-4 left-4 p-2 bg-black/30 backdrop-blur-sm text-white rounded-full hover:bg-black/50 transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>

          {/* Share Button */}
          <button className="absolute top-4 right-4 p-2 bg-black/30 backdrop-blur-sm text-white rounded-full hover:bg-black/50 transition-colors">
            <Share2 size={20} />
          </button>

          {/* Restaurant Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center space-x-2 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold">{restaurant.name}</h1>
              {restaurant.verified && (
                <div className="p-1 bg-primary-500 rounded-full">
                  <Star size={16} fill="white" />
                </div>
              )}
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <span className="flex items-center">
                <Star size={16} className="mr-1" fill="currentColor" />
                {restaurant.rating} ({restaurant.reviewCount} reviews)
              </span>
              <span>{restaurant.cuisine}</span>
              <span>{restaurant.priceRange}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleFollow}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  restaurant.isFollowing
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    : 'bg-primary-500 text-white hover:bg-primary-600'
                }`}
              >
                {restaurant.isFollowing ? 'Following' : 'Follow'}
              </button>
              
              {restaurant.isFollowing && (
                <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
                  {restaurant.notificationsEnabled ? <Bell size={20} /> : <BellOff size={20} />}
                </button>
              )}
            </div>

            <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
              <Users size={16} />
              <span>{restaurant.followers.toLocaleString()} followers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex space-x-1">
            {[
              { id: 'feed', name: 'Feed', icon: Image },
              { id: 'info', name: 'Info', icon: MapPin },
              { id: 'chat', name: 'AI Chat', icon: MessageCircle }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-all ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Feed Tab */}
        {activeTab === 'feed' && (
          <div className="space-y-6">
            {restaurant.posts.map(post => (
              <div key={post.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full h-64 object-cover"
                  />
                )}
                
                <div className="p-4">
                  {post.title && (
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {post.title}
                    </h3>
                  )}
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    {post.caption || post.description}
                  </p>
                  
                  {post.validUntil && (
                    <div className="flex items-center text-sm text-orange-600 dark:text-orange-400 mb-3">
                      <Calendar size={16} className="mr-1" />
                      Valid until {new Date(post.validUntil).toLocaleDateString()}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg transition-colors ${
                          post.isLiked
                            ? 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        <ThumbsUp size={16} />
                        <span>{post.likes}</span>
                      </button>
                      
                      <button className="flex items-center space-x-1 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors">
                        <MessageCircle size={16} />
                        <span>{post.comments}</span>
                      </button>
                    </div>
                    
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {post.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Tab */}
        {activeTab === 'info' && (
          <div className="space-y-6">
            {/* Description */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">About</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{restaurant.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {restaurant.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-sm"
                  >
                    #{tag.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact & Location */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Contact & Location</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="text-gray-400 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{restaurant.location.address}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{restaurant.location.area} • {restaurant.location.distance}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="text-gray-400" size={20} />
                  <a href={`tel:${restaurant.contact.phone}`} className="text-primary-600 dark:text-primary-400 hover:underline">
                    {restaurant.contact.phone}
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Globe className="text-gray-400" size={20} />
                  <a href={restaurant.contact.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">
                    Visit Website
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Opening Hours</h2>
              
              <div className="space-y-2">
                {Object.entries(restaurant.hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between">
                    <span className="capitalize font-medium text-gray-900 dark:text-white">{day}</span>
                    <span className="text-gray-600 dark:text-gray-400">{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Amenities</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {restaurant.amenities.map(amenity => {
                  const icons = {
                    'WiFi': Wifi,
                    'Parking': Car,
                    'Credit Cards': CreditCard,
                    'Reservations': Calendar,
                    'Outdoor Seating': Users
                  };
                  const Icon = icons[amenity] || Award;
                  
                  return (
                    <div key={amenity} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                      <Icon size={16} className="text-green-500" />
                      <span className="text-sm">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* AI Chat Tab */}
        {activeTab === 'chat' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm h-96 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">AI</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">SKYE Assistant</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ask me anything about the restaurant!</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">AI</span>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-xs">
                    <p className="text-sm text-gray-900 dark:text-white">
                      Hi! I'm your SKYE assistant. I can help you with reservations, menu questions, or anything else about our restaurant. How can I help you today?
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about menu, reservations, hours..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetail;