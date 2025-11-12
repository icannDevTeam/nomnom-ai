import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, BellOff, Star, MapPin, Users, TrendingUp } from 'lucide-react';

// Mock data - will be replaced with API calls
const mockChannels = [
  {
    id: '1',
    name: 'SKYE Bar & Restaurant',
    slug: 'skye-bar-restaurant',
    verified: true,
    followers: '12.5K',
    avatar: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200',
    cuisine: 'Fine Dining',
    rating: 4.8,
    location: 'SCBD',
    isFollowing: true,
    notificationsEnabled: true,
    lastPost: {
      time: '2 hours ago',
      preview: 'New cocktail menu launching this weekend! 🍸'
    }
  },
  {
    id: '2',
    name: 'Holycow! Steakhouse',
    slug: 'holycow-steakhouse',
    verified: true,
    followers: '8.2K',
    avatar: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=200',
    cuisine: 'Steakhouse',
    rating: 4.6,
    location: 'Senopati',
    isFollowing: true,
    notificationsEnabled: false,
    lastPost: {
      time: '5 hours ago',
      preview: '30% off lunch special all week! Don\'t miss out 🥩'
    }
  },
  {
    id: '3',
    name: 'Sushi Tei',
    slug: 'sushi-tei',
    verified: true,
    followers: '15.3K',
    avatar: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=200',
    cuisine: 'Japanese',
    rating: 4.5,
    location: 'Grand Indonesia',
    isFollowing: false,
    notificationsEnabled: false,
    lastPost: {
      time: '1 day ago',
      preview: 'Fresh salmon shipment arrived! Come try our new sushi rolls'
    }
  },
  {
    id: '4',
    name: 'Kintan Buffet',
    slug: 'kintan-buffet',
    verified: true,
    followers: '9.8K',
    avatar: 'https://images.unsplash.com/photo-1608877907149-a206d75ba011?w=200',
    cuisine: 'Japanese BBQ',
    rating: 4.7,
    location: 'PIK',
    isFollowing: false,
    notificationsEnabled: false,
    lastPost: {
      time: '2 days ago',
      preview: 'Birthday special - bring 4 friends, eat free! 🎉'
    }
  },
  {
    id: '5',
    name: 'Pizza Marzano',
    slug: 'pizza-marzano',
    verified: true,
    followers: '6.7K',
    avatar: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200',
    cuisine: 'Italian',
    rating: 4.4,
    location: 'Kemang',
    isFollowing: false,
    notificationsEnabled: false,
    lastPost: {
      time: '3 days ago',
      preview: 'BOGO Tuesday! Buy one pizza, get one free 🍕'
    }
  },
];

const Channels = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [channels, setChannels] = useState(mockChannels);
  const [activeTab, setActiveTab] = useState('following'); // 'following' or 'explore'
  const [filter, setFilter] = useState('all'); // 'all', 'cuisine', 'location'

  const filteredChannels = channels.filter(channel => {
    const matchesSearch = channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         channel.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'following' ? channel.isFollowing : true;
    return matchesSearch && matchesTab;
  });

  const followingCount = channels.filter(c => c.isFollowing).length;

  const handleFollow = (channelId) => {
    setChannels(channels.map(channel => 
      channel.id === channelId 
        ? { ...channel, isFollowing: !channel.isFollowing }
        : channel
    ));
  };

  const handleNotifications = (channelId) => {
    setChannels(channels.map(channel => 
      channel.id === channelId 
        ? { ...channel, notificationsEnabled: !channel.notificationsEnabled }
        : channel
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 md:pb-0">
      {/* Header */}
      <div className="sticky top-16 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Channels</h1>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search restaurants or cuisine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-700 border-none rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>

          {/* Tabs */}
          <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('following')}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'following'
                  ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Following {followingCount > 0 && `(${followingCount})`}
            </button>
            <button
              onClick={() => setActiveTab('explore')}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'explore'
                  ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Explore Channels
            </button>
          </div>
        </div>
      </div>

      {/* Channels List */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {activeTab === 'explore' && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <TrendingUp className="mr-2 text-primary-500" size={20} />
              Trending Channels
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Discover popular restaurants and follow to get updates
            </p>
          </div>
        )}

        {filteredChannels.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {activeTab === 'following' ? 'No channels yet' : 'No results found'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {activeTab === 'following' 
                ? 'Start following restaurants to see their updates here'
                : 'Try a different search term'}
            </p>
            {activeTab === 'following' && (
              <button
                onClick={() => setActiveTab('explore')}
                className="px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors"
              >
                Explore Channels
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredChannels.map((channel) => (
              <Link
                key={channel.id}
                to={`/restaurant/${channel.slug}`}
                className="block bg-white dark:bg-gray-800 rounded-xl p-4 hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start space-x-4">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={channel.avatar}
                      alt={channel.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    {channel.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-primary-500 rounded-full p-1">
                        <Star size={12} fill="white" className="text-white" />
                      </div>
                    )}
                  </div>

                  {/* Channel Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 dark:text-white truncate">
                          {channel.name}
                        </h3>
                        <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400 mt-1">
                          <span className="flex items-center">
                            <Users size={14} className="mr-1" />
                            {channel.followers}
                          </span>
                          <span className="flex items-center">
                            <Star size={14} className="mr-1 text-yellow-500" />
                            {channel.rating}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2 ml-4" onClick={(e) => e.preventDefault()}>
                        {channel.isFollowing && (
                          <button
                            onClick={() => handleNotifications(channel.id)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            title={channel.notificationsEnabled ? 'Mute notifications' : 'Enable notifications'}
                          >
                            {channel.notificationsEnabled ? (
                              <Bell size={18} className="text-primary-500" />
                            ) : (
                              <BellOff size={18} className="text-gray-400" />
                            )}
                          </button>
                        )}
                        <button
                          onClick={() => handleFollow(channel.id)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            channel.isFollowing
                              ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                              : 'bg-primary-500 text-white hover:bg-primary-600'
                          }`}
                        >
                          {channel.isFollowing ? 'Following' : 'Follow'}
                        </button>
                      </div>
                    </div>

                    {/* Cuisine & Location */}
                    <div className="flex items-center space-x-3 text-sm mb-2">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                        {channel.cuisine}
                      </span>
                      <span className="flex items-center text-gray-600 dark:text-gray-400">
                        <MapPin size={14} className="mr-1" />
                        {channel.location}
                      </span>
                    </div>

                    {/* Last Post Preview */}
                    {channel.lastPost && (
                      <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {channel.lastPost.time}
                          </span>
                          {channel.isFollowing && (
                            <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                          {channel.lastPost.preview}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* See All Link */}
      {activeTab === 'explore' && filteredChannels.length > 0 && (
        <div className="text-center py-6">
          <button className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
            See all channels
          </button>
        </div>
      )}
    </div>
  );
};

export default Channels;