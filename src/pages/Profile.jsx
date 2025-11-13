import { useState } from 'react';
import { 
  User, MapPin, Heart, BookmarkPlus, Award, TrendingUp, 
  Settings, Bell, Moon, Sun, LogOut, Edit, Star, Calendar,
  Volume2, Palette, Gift, Crown, Utensils, ChevronRight, Zap
} from 'lucide-react';
import { useUser } from '../context/UserContext';

// Enhanced mock user data with personalization features
const mockUserData = {
  name: 'Edy',
  email: 'edy@email.com',
  avatar: 'https://ui-avatars.com/api/?name=E+D&size=200&background=0ea5e9&color=fff',
  joinedDate: '2024-01-15',
  location: 'Jakarta, Indonesia',
  bio: 'Senior Software Engineer & Food enthusiast exploring Jakarta\'s culinary scene 🍽️✨',
  
  // Personal Information
  personalInfo: {
    interests: ['Fine Dining', 'Craft Cocktails', 'Street Food', 'Asian Cuisine', 'Desserts']
  },

  // Culinary Data
  culinaryData: {
    loyaltyPoints: 15420,
    membershipTier: 'Gold',
    nextTierPoints: 4580,
    vouchers: 12
  },

  // Vouchers
  vouchers: [
    {
      id: 1,
      restaurant: 'Sushi Tei',
      title: '20% Off Premium Sushi',
      description: 'Valid for all premium sushi sets',
      discount: '20%',
      validUntil: '2025-12-31',
      code: 'SUSHI20',
      icon: '🍣',
      used: false,
      category: 'discount'
    },
    {
      id: 2,
      restaurant: 'Pizza Hut',
      title: 'Free Delivery',
      description: 'Free delivery on orders above $25',
      discount: 'Free Delivery',
      validUntil: '2025-11-30',
      code: 'FREEDEL',
      icon: '🍕',
      used: false,
      category: 'delivery'
    },
    {
      id: 3,
      restaurant: 'Starbucks',
      title: 'Buy 1 Get 1 Free',
      description: 'Buy any grande drink, get second free',
      discount: 'BOGO',
      validUntil: '2025-12-15',
      code: 'BOGO1',
      icon: '☕',
      used: false,
      category: 'bogo'
    },
    {
      id: 4,
      restaurant: 'KFC',
      title: '15% Off Family Bucket',
      description: 'Discount on family bucket meals',
      discount: '15%',
      validUntil: '2025-11-25',
      code: 'FAMILY15',
      icon: '🍗',
      used: true,
      category: 'discount'
    },
    {
      id: 5,
      restaurant: 'McDonald\'s',
      title: 'Free Dessert',
      description: 'Free McFlurry with any meal',
      discount: 'Free Item',
      validUntil: '2025-12-20',
      code: 'DESSERT',
      icon: '🍦',
      used: false,
      category: 'free'
    }
  ],

  // Preferences
  preferences: {
    cuisines: ['Japanese', 'Italian', 'Indonesian', 'French'],
    priceRange: 3, // 1-4 scale
    groupSize: '2-4',
    diningTime: 'Evening',
    ambiance: 'Fine Dining'
  },

  // AI Personality Settings
  aiPersonality: {
    communicationTone: 'Friendly & Professional',
    responseStyle: 'Detailed with recommendations',
    proactiveness: 'High',
    personalityTraits: ['Enthusiastic', 'Knowledgeable', 'Supportive'],
    specialization: 'Fine dining and cultural experiences'
  },

  // Recent Activity
  recentActivity: [
    {
      id: 1,
      type: 'visit',
      restaurant: 'Sushi Tei',
      date: '2 days ago',
      points: 48,
      icon: '🍣',
      rating: 5
    },
    {
      id: 2,
      type: 'review',
      restaurant: 'Pizza Hut',
      date: '1 week ago',
      points: 25,
      icon: '🍕',
      rating: 4
    },
    {
      id: 3,
      type: 'visit',
      restaurant: 'Starbucks',
      date: '1 week ago',
      points: 12,
      icon: '☕'
    },
    {
      id: 4,
      type: 'reward',
      restaurant: 'KFC',
      date: '2 weeks ago',
      points: 50,
      icon: '🎁'
    }
  ],

  stats: {
    followingRestaurants: 24,
    totalVisits: 156,
    reviewsWritten: 48,
    savedItems: 12,
    photosShared: 89,
    friendsConnected: 34
  },

  loyaltyTiers: [
    {
      restaurant: 'Sushi Tei',
      tier: 'Gold',
      points: 2450,
      nextTier: 'Platinum',
      pointsToNext: 550
    },
    {
      restaurant: 'Pizza Hut',
      tier: 'Silver',
      points: 1200,
      nextTier: 'Gold',
      pointsToNext: 800
    }
  ]
};

const Profile = () => {
  const { user, logout, isDarkMode, toggleDarkMode } = useUser();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [voucherFilter, setVoucherFilter] = useState('all');
  
  // Use mock data for demonstration
  const userData = mockUserData;

  // Filter vouchers based on selected filter
  const filteredVouchers = userData.vouchers.filter(voucher => {
    if (voucherFilter === 'active') return !voucher.used;
    if (voucherFilter === 'used') return voucher.used;
    return true;
  });

  // Handle voucher usage
  const handleUseVoucher = (voucherId) => {
    // In a real app, this would make an API call
    console.log(`Using voucher ${voucherId}`);
    // For now, just show an alert
    alert('Voucher copied to clipboard! Use it at checkout.');
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'personality', name: 'AI Personality', icon: Zap },
    { id: 'loyalty', name: 'Loyalty & Rewards', icon: Crown },
    { id: 'vouchers', name: 'Vouchers', icon: Gift },
    { id: 'activity', name: 'Activity', icon: TrendingUp },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  // Calculate loyalty progress
  const loyaltyProgress = (userData.culinaryData.loyaltyPoints / (userData.culinaryData.loyaltyPoints + userData.culinaryData.nextTierPoints)) * 100;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 md:pb-0">
      {/* Enhanced Profile Header */}
      <div className="bg-gradient-to-br from-primary-500 via-accent-500 to-purple-600 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 py-8 relative">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left - Profile Info */}
            <div className="md:col-span-2">
              <div className="flex items-start space-x-6">
                <div className="relative">
                  <img
                    src={userData.avatar}
                    alt={userData.name}
                    className="w-24 h-24 rounded-full border-4 border-white/20 shadow-xl"
                  />
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h1 className="text-3xl font-bold">{userData.name}</h1>
                      <div className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-semibold flex items-center space-x-1">
                        <Crown size={16} />
                        <span>{userData.culinaryData.membershipTier}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsEditModalOpen(true)}
                      className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
                    >
                      <Edit size={16} />
                      <span>Edit Profile</span>
                    </button>
                  </div>
                  
                  <p className="text-white/90 mb-3 leading-relaxed">{userData.bio}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} className="text-white/70" />
                      <span>{userData.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-white/70" />
                      <span>Joined {new Date(userData.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Utensils size={16} className="text-white/70" />
                      <span>Food Explorer</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star size={16} className="text-white/70" />
                      <span>{userData.culinaryData.loyaltyPoints} points</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Culinary Summary */}
            <div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Utensils size={20} className="mr-2" />
                  Culinary Journey
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-white/70 mb-1">Membership Tier</div>
                    <div className="text-2xl font-bold flex items-center">
                      <Crown size={24} className="mr-2 text-yellow-300" />
                      {userData.culinaryData.membershipTier}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-white/70 mb-1">Following</div>
                      <div className="text-lg font-semibold">{userData.stats.followingRestaurants}</div>
                    </div>
                    <div>
                      <div className="text-sm text-white/70 mb-1">Total Visits</div>
                      <div className="text-lg font-semibold text-green-300">{userData.stats.totalVisits}</div>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-white/20">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Loyalty Points</span>
                      <span className="text-lg font-bold text-yellow-300">{userData.culinaryData.loyaltyPoints.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Culinary Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20">
              <div className="text-2xl font-bold">{userData.stats.followingRestaurants}</div>
              <div className="text-sm text-white/80">Following</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20">
              <div className="text-2xl font-bold">{userData.stats.totalVisits}</div>
              <div className="text-sm text-white/80">Visits</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20">
              <div className="text-2xl font-bold">{userData.stats.reviewsWritten}</div>
              <div className="text-sm text-white/80">Reviews</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20">
              <div className="text-2xl font-bold">{userData.stats.photosShared}</div>
              <div className="text-sm text-white/80">Food Photos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content Container */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Culinary Profile */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <User size={24} className="mr-3 text-primary-500" />
                Culinary Profile
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Following</label>
                    <p className="text-lg text-gray-900 dark:text-white mt-1">{userData.stats.followingRestaurants} restaurants</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Visits</label>
                    <p className="text-lg text-gray-900 dark:text-white mt-1">{userData.stats.totalVisits} visits</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Food Interests</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {userData.personalInfo.interests.map((interest, index) => (
                      <span key={index} className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Dining Preferences */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Utensils size={24} className="mr-3 text-accent-500" />
                Dining Preferences
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Favorite Cuisines</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {userData.preferences.cuisines.map((cuisine, index) => (
                      <span key={index} className="px-3 py-1 bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300 rounded-full text-sm">
                        {cuisine}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Price Range</label>
                    <div className="flex mt-2">
                      {'$'.repeat(userData.preferences.priceRange)}
                      <span className="text-gray-300 dark:text-gray-600">
                        {'$'.repeat(4 - userData.preferences.priceRange)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Group Size</label>
                    <p className="text-lg text-gray-900 dark:text-white mt-1">{userData.preferences.groupSize} people</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Personality Tab */}
        {activeTab === 'personality' && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* AI Configuration */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Zap size={24} className="mr-3 text-blue-500" />
                AI Assistant Configuration
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Communication Tone</label>
                    <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center space-x-2">
                        <Volume2 size={16} className="text-blue-500" />
                        <span className="text-blue-900 dark:text-blue-100 font-medium">{userData.aiPersonality.communicationTone}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Response Style</label>
                    <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="flex items-center space-x-2">
                        <Palette size={16} className="text-green-500" />
                        <span className="text-green-900 dark:text-green-100 font-medium">{userData.aiPersonality.responseStyle}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Proactiveness Level</label>
                    <div className="mt-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                      <div className="flex items-center space-x-2">
                        <Target size={16} className="text-purple-500" />
                        <span className="text-purple-900 dark:text-purple-100 font-medium">{userData.aiPersonality.proactiveness}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Personality Traits</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {userData.aiPersonality.personalityTraits.map((trait, index) => (
                        <span key={index} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm">
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Specialization</label>
                    <p className="mt-2 text-gray-900 dark:text-white p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      {userData.aiPersonality.specialization}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-start space-x-3">
                  <Zap size={20} className="text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100">AI Interaction Preview</h4>
                    <p className="text-blue-700 dark:text-blue-300 mt-1">
                      "Hey Albert! Based on your love for fine dining and craft cocktails, I'd recommend trying the new Japanese fusion restaurant downtown. They have an amazing rooftop bar with city views that matches your preference for outdoor seating with ambiance!"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loyalty & Rewards Tab */}
        {activeTab === 'loyalty' && (
          <div className="space-y-8">
            {/* Loyalty Status Card */}
            <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 rounded-2xl p-8 text-white shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Loyalty Status</h3>
                  <div className="flex items-center space-x-2">
                    <Crown size={24} />
                    <span className="text-xl font-semibold">{userData.culinaryData.membershipTier} Foodie</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{userData.culinaryData.loyaltyPoints.toLocaleString()}</div>
                  <div className="text-yellow-100">Loyalty Points</div>
                </div>
              </div>
              
              {/* Progress to Next Tier */}
              <div className="bg-white/20 rounded-full p-1 mb-4">
                <div 
                  className="bg-white rounded-full h-3 transition-all duration-500"
                  style={{ width: `${loyaltyProgress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-yellow-100">
                <span>Progress to Platinum</span>
                <span>{userData.culinaryData.nextTierPoints} points to go</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Culinary Stats */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Utensils size={24} className="mr-3 text-green-500" />
                  Culinary Journey
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Restaurants Following</span>
                      <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {userData.stats.followingRestaurants}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Visits</div>
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">
                        {userData.stats.totalVisits}
                      </div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                      <div className="text-sm text-green-600 dark:text-green-400 mb-1">Reviews Written</div>
                      <div className="text-lg font-semibold text-green-700 dark:text-green-300">
                        {userData.stats.reviewsWritten}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rewards & Benefits */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Gift size={24} className="mr-3 text-purple-500" />
                  Rewards & Benefits
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                        <Gift size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">Active Vouchers</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Ready to use</div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {userData.culinaryData.vouchers}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">Free Delivery</span>
                      <span className="text-green-600 dark:text-green-400 font-semibold">✓ Active</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">Priority Support</span>
                      <span className="text-green-600 dark:text-green-400 font-semibold">✓ Active</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">Exclusive Events</span>
                      <span className="text-green-600 dark:text-green-400 font-semibold">✓ Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vouchers Tab */}
        {activeTab === 'vouchers' && (
          <div className="space-y-6">
            {/* Vouchers Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Vouchers</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  You have {userData.vouchers.filter(v => !v.used).length} active vouchers
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                  {userData.vouchers.filter(v => !v.used).length} Active
                </div>
                <div className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                  {userData.vouchers.filter(v => v.used).length} Used
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button 
                onClick={() => setVoucherFilter('all')}
                className={`flex-1 px-4 py-2 rounded-md font-medium text-sm transition-all ${
                  voucherFilter === 'all' 
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-700/50'
                }`}
              >
                All Vouchers
              </button>
              <button 
                onClick={() => setVoucherFilter('active')}
                className={`flex-1 px-4 py-2 rounded-md font-medium text-sm transition-all ${
                  voucherFilter === 'active' 
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-700/50'
                }`}
              >
                Active ({userData.vouchers.filter(v => !v.used).length})
              </button>
              <button 
                onClick={() => setVoucherFilter('used')}
                className={`flex-1 px-4 py-2 rounded-md font-medium text-sm transition-all ${
                  voucherFilter === 'used' 
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-700/50'
                }`}
              >
                Used ({userData.vouchers.filter(v => v.used).length})
              </button>
            </div>

            {/* Vouchers Grid */}
            {filteredVouchers.length === 0 ? (
              <div className="text-center py-12">
                <Gift size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No {voucherFilter === 'all' ? '' : voucherFilter} vouchers found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {voucherFilter === 'active' 
                    ? 'You don\'t have any active vouchers at the moment.' 
                    : voucherFilter === 'used'
                    ? 'You haven\'t used any vouchers yet.'
                    : 'Start following restaurants to earn vouchers!'
                  }
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVouchers.map((voucher) => (
                <div 
                  key={voucher.id} 
                  className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 transition-all hover:shadow-xl ${
                    voucher.used 
                      ? 'border-gray-200 dark:border-gray-700 opacity-60' 
                      : 'border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700'
                  }`}
                >
                  {/* Voucher Header */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{voucher.icon}</div>
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white">{voucher.restaurant}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{voucher.title}</p>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        voucher.category === 'discount' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300' :
                        voucher.category === 'delivery' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300' :
                        voucher.category === 'bogo' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300' :
                        voucher.category === 'free' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300' :
                        'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {voucher.discount}
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {voucher.description}
                    </p>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Valid until:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {new Date(voucher.validUntil).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Voucher Code:</span>
                        <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs font-mono">
                          {voucher.code}
                        </code>
                      </div>
                    </div>
                  </div>

                  {/* Voucher Footer */}
                  <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 rounded-b-xl">
                    {voucher.used ? (
                      <div className="flex items-center justify-center space-x-2 text-gray-500 dark:text-gray-400">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <span className="text-sm font-medium">Used</span>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleUseVoucher(voucher.id)}
                        className="w-full px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium text-sm transition-colors"
                      >
                        Use Voucher
                      </button>
                    )}
                  </div>

                  {/* Used Overlay */}
                  {voucher.used && (
                    <div className="absolute inset-0 bg-gray-900/20 rounded-xl flex items-center justify-center">
                      <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-lg">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">USED</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              </div>
            )}
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <TrendingUp size={24} className="mr-3 text-blue-500" />
                  Recent Activity
                </h3>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {userData.recentActivity.map((activity, index) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      <div className="text-3xl">{activity.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {activity.type === 'visit' ? 'Visited' : activity.type === 'review' ? 'Reviewed' : 'Earned'} {activity.restaurant}
                            </h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                              <span>{activity.date}</span>
                              {activity.points > 0 && (
                                <span className="text-yellow-600 dark:text-yellow-400 font-medium">
                                  +{activity.points} pts
                                </span>
                              )}
                            </div>
                          </div>
                          {activity.rating && (
                            <div className="flex items-center space-x-1">
                              {[...Array(activity.rating)].map((_, i) => (
                                <Star key={i} size={16} className="text-yellow-400 fill-current" />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
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

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Profile</h2>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ChevronRight size={20} className="text-gray-500 dark:text-gray-400 rotate-45" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center space-x-4">
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="w-16 h-16 rounded-full border-4 border-primary-500"
                />
                <div>
                  <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-colors">
                    Change Photo
                  </button>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    JPG, PNG, or GIF. Max 5MB.
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue={userData.name}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={userData.email}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    defaultValue={userData.location}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    rows={3}
                    defaultValue={userData.bio}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Food Interests
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {userData.personalInfo.interests.map((interest, index) => (
                      <div key={index} className="flex items-center space-x-2 bg-primary-50 dark:bg-primary-900/20 px-3 py-1 rounded-full">
                        <span className="text-sm text-primary-700 dark:text-primary-300">{interest}</span>
                        <button className="text-primary-500 hover:text-primary-700">
                          <ChevronRight size={12} className="rotate-45" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button className="mt-2 px-3 py-1 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-full text-sm text-gray-500 dark:text-gray-400 hover:border-primary-300 hover:text-primary-500 transition-colors">
                    + Add Interest
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;