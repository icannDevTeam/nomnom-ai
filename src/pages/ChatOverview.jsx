import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Clock, Star, Search, Filter } from 'lucide-react';
import { useUser } from '../context/UserContext';

const ChatOverview = () => {
  const { location } = useUser();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock recent chats - in real app this would come from API/localStorage
  const recentChats = [
    {
      id: '1',
      restaurantName: 'SKYE Bar & Restaurant',
      slug: 'skye-bar-restaurant',
      lastMessage: 'Thanks for asking about our cocktails! Our signature...',
      timestamp: '2 hours ago',
      unread: 2,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      cuisine: 'Fine Dining'
    },
    {
      id: '2', 
      restaurantName: 'Holycow! Steakhouse',
      slug: 'holycow-steakhouse',
      lastMessage: 'Our lunch special is available until 3 PM...',
      timestamp: '1 day ago',
      unread: 0,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
      cuisine: 'Steakhouse'
    },
    {
      id: '3',
      restaurantName: 'Sushi Tei',
      slug: 'sushi-tei',
      lastMessage: 'Fresh salmon sashimi just arrived this morning!',
      timestamp: '3 days ago', 
      unread: 1,
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800',
      cuisine: 'Japanese'
    }
  ];

  const filteredChats = recentChats.filter(chat =>
    chat.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 pb-20 md:pb-0">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">💬</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Your Chats
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Continue conversations with your favorite restaurants
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Recent Chats */}
        <div className="space-y-4">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <Link
                key={chat.id}
                to={`/chat/${chat.slug}`}
                className="block bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="flex items-center p-4">
                  {/* Restaurant Image */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600">
                      <img
                        src={chat.image}
                        alt={chat.restaurantName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Chat Info */}
                  <div className="flex-1 ml-4 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                        {chat.restaurantName}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">
                        {chat.timestamp}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {chat.lastMessage}
                        </p>
                        <span className="text-xs text-primary-600 dark:text-primary-400 mt-1 inline-block">
                          {chat.cuisine}
                        </span>
                      </div>
                      
                      {chat.unread > 0 && (
                        <div className="flex-shrink-0 ml-2">
                          <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                            <span className="text-xs text-white font-medium">
                              {chat.unread}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Chat Icon */}
                  <div className="flex-shrink-0 ml-4">
                    <MessageCircle size={20} className="text-gray-400" />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No chats found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchQuery ? 'Try adjusting your search' : 'Start a conversation with a restaurant'}
              </p>
              <Link
                to="/agents"
                className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
              >
                <MessageCircle size={20} className="mr-2" />
                Browse Restaurants
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-xl border border-primary-100 dark:border-primary-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/agents"
              className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200"
            >
              <MessageCircle size={24} className="text-primary-500 mr-3" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Find New Restaurants</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Browse and chat with restaurant agents</div>
              </div>
            </Link>
            <Link
              to="/discovery"
              className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200"
            >
              <Search size={24} className="text-accent-500 mr-3" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Discover Places</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Explore restaurants near you</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatOverview;