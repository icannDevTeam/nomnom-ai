import { useState } from 'react';
import { 
  User, MapPin, Heart, BookmarkPlus, Award, TrendingUp, 
  Settings, Bell, Moon, Sun, LogOut, Edit, Star, Calendar 
} from 'lucide-react';
import { useUser } from '@context/UserContext';

// Mock user data - will be replaced with real data from backend
const mockUserData = {
  name: 'Albert Arthur',
  email: 'albert.arthur@example.com',
  avatar: 'https://ui-avatars.com/api/?name=Albert+Arthur&size=200&background=0ea5e9&color=fff',
  joinedDate: '2024-01-15',
  location: 'Jakarta, Indonesia',
  bio: 'Food enthusiast exploring Jakarta\'s culinary scene 🍽️',
  stats: {
    followingRestaurants: 12,
    totalVisits: 47,
    reviewsWritten: 23,
    savedItems: 18
  },
  preferences: {
    cuisines: ['Italian', 'Japanese', 'Indonesian'],
    dietaryRestrictions: ['halal'],
    priceRange: 2,
    favoriteAtmospheres: ['outdoor_seating', 'live_music', 'romantic']
  },
  recentActivity: [
    {
      id: '1',
      type: 'visit',
      restaurant: 'SKYE Bar',
      date: '2 days ago',
      icon: '🍸'
    },
    {
      id: '2',
      type: 'review',
      restaurant: 'Holycow! Steakhouse',
      rating: 5,
      date: '1 week ago',
      icon: '⭐'
    },
    {
      id: '3',
      type: 'follow',
      restaurant: 'Sushi Tei',
      date: '2 weeks ago',
      icon: '👥'
    }
  ],
  loyaltyTiers: [
    {
      restaurant: 'SKYE Bar',
      tier: 'Gold',
      points: 850,
      nextTier: 'Platinum',
      pointsToNext: 150
    },
    {
      restaurant: 'Holycow!',
      tier: 'Silver',
      points: 420,
      nextTier: 'Gold',
      pointsToNext: 80
    }
  ]
};

const Profile = () => {
  const { isDarkMode, toggleDarkMode, logout } = useUser();
  const [userData, setUserData] = useState(mockUserData);
  const [activeTab, setActiveTab] = useState('overview'); // overview, activity, loyalty, settings
  const [isEditing, setIsEditing] = useState(false);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'activity', name: 'Activity', icon: TrendingUp },
    { id: 'loyalty', name: 'Loyalty', icon: Award },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 md:pb-0">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-start space-x-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <img
                src={userData.avatar}
                alt={userData.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-xl"
              />
              <button className="absolute bottom-0 right-0 p-2 bg-white text-gray-900 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                <Edit size={18} />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl md:text-3xl font-bold">{userData.name}</h1>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                >
                  Edit Profile
                </button>
              </div>
              <p className="text-white/90 mb-2">{userData.email}</p>
              <div className="flex items-center space-x-4 text-sm text-white/80 mb-3">
                <span className="flex items-center">
                  <MapPin size={16} className="mr-1" />
                  {userData.location}
                </span>
                <span className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  Joined {new Date(userData.joinedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>
              <p className="text-white/90">{userData.bio}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{userData.stats.followingRestaurants}</div>
              <div className="text-sm text-white/80">Following</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{userData.stats.totalVisits}</div>
              <div className="text-sm text-white/80">Visits</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{userData.stats.reviewsWritten}</div>
              <div className="text-sm text-white/80">Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{userData.stats.savedItems}</div>
              <div className="text-sm text-white/80">Saved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto hide-scrollbar">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-all whitespace-nowrap ${
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
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Preferences */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Food Preferences</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Favorite Cuisines</h3>
                  <div className="flex flex-wrap gap-2">
                    {userData.preferences.cuisines.map(cuisine => (
                      <span
                        key={cuisine}
                        className="px-3 py-1.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-sm font-medium"
                      >
                        {cuisine}
                      </span>
                    ))}
                    <button className="px-3 py-1.5 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-full text-sm text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-500 transition-colors">
                      + Add More
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Dietary Restrictions</h3>
                  <div className="flex flex-wrap gap-2">
                    {userData.preferences.dietaryRestrictions.map(restriction => (
                      <span
                        key={restriction}
                        className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium"
                      >
                        {restriction}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Price Range Preference</h3>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4].map(level => (
                      <button
                        key={level}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          userData.preferences.priceRange >= level
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {'$'.repeat(level)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Favorite Atmospheres</h3>
                  <div className="flex flex-wrap gap-2">
                    {userData.preferences.favoriteAtmospheres.map(atmosphere => (
                      <span
                        key={atmosphere}
                        className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm font-medium"
                      >
                        {atmosphere.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
            
            {userData.recentActivity.map(activity => (
              <div
                key={activity.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm flex items-center space-x-4"
              >
                <div className="text-3xl">{activity.icon}</div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {activity.type === 'visit' && `Visited ${activity.restaurant}`}
                    {activity.type === 'review' && `Reviewed ${activity.restaurant}`}
                    {activity.type === 'follow' && `Started following ${activity.restaurant}`}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{activity.date}</p>
                </div>
                {activity.rating && (
                  <div className="flex items-center space-x-1">
                    <Star size={16} className="text-yellow-500" fill="currentColor" />
                    <span className="font-semibold text-gray-900 dark:text-white">{activity.rating}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Loyalty Tab */}
        {activeTab === 'loyalty' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Loyalty Programs</h2>
            
            {userData.loyaltyTiers.map((loyalty, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{loyalty.restaurant}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    loyalty.tier === 'Gold' 
                      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {loyalty.tier}
                  </span>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>{loyalty.points} points</span>
                    <span>{loyalty.pointsToNext} to {loyalty.nextTier}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full transition-all"
                      style={{ width: `${(loyalty.points / (loyalty.points + loyalty.pointsToNext)) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Earn more points with every visit and review!
                </p>
              </div>
            ))}

            <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl p-6 text-white text-center">
              <Award size={48} className="mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">Join More Programs</h3>
              <p className="mb-4">Follow more restaurants to earn exclusive rewards</p>
              <button className="px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Explore Restaurants
              </button>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* Notifications */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Notifications</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Push Notifications</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications from restaurants you follow</p>
                  </div>
                  <button className="w-12 h-6 bg-primary-500 rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Email Notifications</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Weekly digest of new deals and promos</p>
                  </div>
                  <button className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Appearance */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Appearance</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Switch between light and dark theme</p>
                  </div>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`w-12 h-6 rounded-full relative transition-colors ${
                    isDarkMode ? 'bg-primary-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    isDarkMode ? 'right-1' : 'left-1'
                  }`}></div>
                </button>
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm space-y-3">
              <button className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-between">
                <span className="font-medium text-gray-900 dark:text-white">Change Password</span>
                <Edit size={18} className="text-gray-400" />
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-between">
                <span className="font-medium text-gray-900 dark:text-white">Privacy Settings</span>
                <Settings size={18} className="text-gray-400" />
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center justify-between text-red-600 dark:text-red-400">
                <span className="font-medium">Delete Account</span>
                <LogOut size={18} />
              </button>
            </div>

            {/* Logout */}
            <button
              onClick={logout}
              className="w-full px-6 py-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
            >
              <LogOut size={20} />
              <span>Log Out</span>
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Profile;