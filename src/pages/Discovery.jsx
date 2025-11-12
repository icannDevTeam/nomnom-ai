import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, TrendingUp, Clock, Star, MapPin, Tag, Music, Sparkles } from 'lucide-react';

// Mock discovery data
const categories = [
  { id: 'trending', name: 'Trending Now', icon: TrendingUp, color: 'bg-red-500' },
  { id: 'promos', name: 'Best Deals', icon: Tag, color: 'bg-yellow-500' },
  { id: 'new', name: 'New Openings', icon: Sparkles, color: 'bg-purple-500' },
  { id: 'live_music', name: 'Live Music', icon: Music, color: 'bg-blue-500' },
];

const cuisineTypes = [
  'All', 'Italian', 'Japanese', 'Indonesian', 'Korean', 'Chinese', 
  'American', 'French', 'Thai', 'Indian', 'Mexican'
];

const mockItems = [
  {
    id: '1',
    type: 'restaurant',
    name: 'SKYE Bar & Restaurant',
    slug: 'skye-bar-restaurant',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600',
    cuisine: 'Fine Dining',
    rating: 4.8,
    priceRange: '$$$$',
    distance: '2.3 km',
    promo: 'Ladies Night Free Flow',
    tags: ['rooftop', 'cocktails', 'trending'],
    isNew: false
  },
  {
    id: '2',
    type: 'promo',
    restaurant: 'Holycow! Steakhouse',
    slug: 'holycow-steakhouse',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600',
    title: '30% Off Lunch Special',
    description: 'Get 30% off all steak sets during lunch hours',
    validDays: 'Mon-Fri',
    time: '11AM-3PM',
    rating: 4.6,
    tags: ['discount', 'lunch_special']
  },
  {
    id: '3',
    type: 'restaurant',
    name: 'Kintan Buffet',
    slug: 'kintan-buffet',
    image: 'https://images.unsplash.com/photo-1608877907149-a206d75ba011?w=600',
    cuisine: 'Japanese BBQ',
    rating: 4.7,
    priceRange: '$$$',
    distance: '5.1 km',
    promo: 'Birthday Month Free',
    tags: ['all_you_can_eat', 'birthday_special'],
    isNew: false
  },
  {
    id: '4',
    type: 'event',
    restaurant: 'Cork&Screw',
    slug: 'cork-screw',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600',
    title: 'Live Jazz Night',
    description: 'Free entry to live acoustic music every Friday',
    date: 'Every Friday',
    time: '8PM-12AM',
    rating: 4.5,
    tags: ['live_music', 'jazz', 'free_entry']
  },
  {
    id: '5',
    type: 'restaurant',
    name: 'Pizza Marzano',
    slug: 'pizza-marzano',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600',
    cuisine: 'Italian',
    rating: 4.4,
    priceRange: '$$',
    distance: '3.8 km',
    promo: 'Buy 1 Get 1 Tuesday',
    tags: ['bogo', 'pizza'],
    isNew: false
  },
  {
    id: '6',
    type: 'restaurant',
    name: 'Sushi Tei',
    slug: 'sushi-tei',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600',
    cuisine: 'Japanese',
    rating: 4.5,
    priceRange: '$$',
    distance: '1.2 km',
    promo: '15% Off All Day',
    tags: ['discount', 'sushi'],
    isNew: false
  },
  {
    id: '7',
    type: 'promo',
    restaurant: 'Magal Korean BBQ',
    slug: 'magal-korean-bbq',
    image: 'https://images.unsplash.com/photo-1592415499556-fa00e07c00c6?w=600',
    title: 'All You Can Eat Special',
    description: 'Weekday lunch buffet at special price',
    validDays: 'Mon-Fri',
    time: '11AM-4PM',
    rating: 4.6,
    tags: ['buffet', 'korean', 'lunch_special']
  },
  {
    id: '8',
    type: 'restaurant',
    name: 'Benedict',
    slug: 'benedict',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600',
    cuisine: 'Brunch',
    rating: 4.6,
    priceRange: '$$$',
    distance: '2.7 km',
    promo: 'Bottomless Brunch',
    tags: ['brunch', 'breakfast', 'weekend'],
    isNew: true
  }
];

const Discovery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('filter') || 'all');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.restaurant?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.title?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
                           item.tags?.includes(selectedCategory) ||
                           (selectedCategory === 'trending' && item.tags?.includes('trending')) ||
                           (selectedCategory === 'promos' && (item.type === 'promo' || item.promo)) ||
                           (selectedCategory === 'new' && item.isNew);
    
    const matchesCuisine = selectedCuisine === 'All' || item.cuisine === selectedCuisine;
    
    return matchesSearch && matchesCategory && matchesCuisine;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 md:pb-0">
      {/* Header */}
      <div className="sticky top-16 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Discovery</h1>
          
          {/* Search Bar */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search restaurants, promos, events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-700 border-none rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Filter size={20} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Category Pills */}
          <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              All
            </button>
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? `${category.color} text-white`
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <Icon size={16} />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>

          {/* Cuisine Filter */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Cuisine Type</h3>
              <div className="flex flex-wrap gap-2">
                {cuisineTypes.map(cuisine => (
                  <button
                    key={cuisine}
                    onClick={() => setSelectedCuisine(cuisine)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      selectedCuisine === cuisine
                        ? 'bg-primary-500 text-white'
                        : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'
                    }`}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Discovery Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-600 dark:text-gray-400">
            {filteredItems.length} results found
          </p>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedCuisine('All');
              }}
              className="text-primary-600 dark:text-primary-400 hover:underline text-sm"
            >
              Clear filters
            </button>
          )}
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No results found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedCuisine('All');
              }}
              className="px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map(item => (
              <Link
                key={item.id}
                to={`/restaurant/${item.slug}`}
                className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name || item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 right-2 flex items-start justify-between">
                    {item.isNew && (
                      <span className="px-2 py-1 bg-purple-500 text-white text-xs font-semibold rounded-full">
                        NEW
                      </span>
                    )}
                    {item.type && (
                      <span className="px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold rounded-full capitalize">
                        {item.type}
                      </span>
                    )}
                  </div>

                  {/* Promo Badge */}
                  {(item.promo || item.title) && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
                      <div className="flex items-center space-x-1 text-yellow-300 text-sm font-semibold">
                        <Tag size={14} />
                        <span className="line-clamp-1">{item.promo || item.title}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 transition-colors line-clamp-1">
                    {item.name || item.restaurant}
                  </h3>
                  
                  {item.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                      {item.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between mb-3">
                    {item.cuisine && (
                      <span className="text-sm text-gray-600 dark:text-gray-400">{item.cuisine}</span>
                    )}
                    {item.rating && (
                      <div className="flex items-center space-x-1">
                        <Star size={14} className="text-yellow-500" fill="currentColor" />
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.rating}</span>
                      </div>
                    )}
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    {item.distance && (
                      <span className="flex items-center">
                        <MapPin size={12} className="mr-1" />
                        {item.distance}
                      </span>
                    )}
                    {item.time && (
                      <span className="flex items-center">
                        <Clock size={12} className="mr-1" />
                        {item.time}
                      </span>
                    )}
                    {item.priceRange && (
                      <span className="font-semibold">{item.priceRange}</span>
                    )}
                  </div>

                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {item.tags.slice(0, 2).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                        >
                          #{tag.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
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

export default Discovery;