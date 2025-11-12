import { useState, useRef, useEffect } from 'react';
import { Search, Filter, MapPin, Star, DollarSign, Clock, Utensils, X, ChevronDown } from 'lucide-react';

const CUISINE_TYPES = [
  'Italian', 'Chinese', 'Japanese', 'Mexican', 'Indian', 'Thai', 'French', 
  'Mediterranean', 'American', 'Korean', 'Vietnamese', 'Lebanese', 'Greek'
];

const PRICE_RANGES = [
  { label: 'Rp', value: '1', description: 'Under Rp 150,000' },
  { label: 'Rp Rp', value: '2', description: 'Rp 150,000 - 300,000' },
  { label: 'Rp Rp Rp', value: '3', description: 'Rp 300,000 - 600,000' },
  { label: 'Rp Rp Rp Rp', value: '4', description: 'Rp 600,000+' }
];

const DIETARY_OPTIONS = [
  'Vegetarian', 'Vegan', 'Gluten-Free', 'Halal', 'Kosher', 'Keto', 'Low-Carb'
];

const DISTANCE_OPTIONS = [
  { label: '1 km', value: '1' },
  { label: '2 km', value: '2' },
  { label: '5 km', value: '5' },
  { label: '10 km', value: '10' },
  { label: '15+ km', value: '15' }
];

const AdvancedSearch = ({ onSearch, onFilterChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    cuisine: [],
    priceRange: [],
    rating: '',
    distance: '',
    dietary: [],
    openNow: false,
    hasDelivery: false,
    hasReservations: false
  });
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  // Mock search suggestions - in real app, this would call an API
  const mockSuggestions = [
    'Italian restaurants near me',
    'Best pizza places',
    'Japanese sushi',
    'Vegetarian restaurants',
    'Fine dining',
    'Late night food',
    'Family restaurants',
    'Mexican food delivery'
  ];

  useEffect(() => {
    if (searchQuery.length > 2) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleFilterChange = (filterType, value) => {
    let newFilters = { ...filters };
    
    if (filterType === 'cuisine' || filterType === 'dietary' || filterType === 'priceRange') {
      if (newFilters[filterType].includes(value)) {
        newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
      } else {
        newFilters[filterType] = [...newFilters[filterType], value];
      }
    } else {
      newFilters[filterType] = newFilters[filterType] === value ? '' : value;
    }
    
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleSearch = (query = searchQuery) => {
    onSearch?.(query, filters);
    setShowSuggestions(false);
  };

  const clearFilters = () => {
    const clearedFilters = {
      cuisine: [],
      priceRange: [],
      rating: '',
      distance: '',
      dietary: [],
      openNow: false,
      hasDelivery: false,
      hasReservations: false
    };
    setFilters(clearedFilters);
    onFilterChange?.(clearedFilters);
  };

  const getActiveFilterCount = () => {
    return filters.cuisine.length + 
           filters.priceRange.length + 
           filters.dietary.length + 
           (filters.rating ? 1 : 0) + 
           (filters.distance ? 1 : 0) + 
           (filters.openNow ? 1 : 0) + 
           (filters.hasDelivery ? 1 : 0) + 
           (filters.hasReservations ? 1 : 0);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Search Bar */}
      <div className="relative">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search restaurants, cuisines, or dishes..."
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-primary-500 focus:outline-none text-gray-900 dark:text-white placeholder-gray-500"
              />
            </div>
            
            {/* Search Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg mt-1 shadow-lg z-50">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(suggestion);
                      handleSearch(suggestion);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                  >
                    <Search className="inline w-4 h-4 mr-3 text-gray-400" />
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button
            onClick={() => handleSearch()}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors"
          >
            Search
          </button>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`px-4 py-3 border-2 rounded-xl font-medium transition-all ${
              isExpanded 
                ? 'bg-primary-50 border-primary-500 text-primary-700 dark:bg-primary-900 dark:text-primary-300' 
                : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500'
            }`}
          >
            <Filter className="w-5 h-5 inline mr-2" />
            Filters
            {getActiveFilterCount() > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-primary-600 text-white text-xs rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {isExpanded && (
        <div className="mt-4 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Advanced Filters</h3>
            <button
              onClick={clearFilters}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Cuisine Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                <Utensils className="inline w-4 h-4 mr-2" />
                Cuisine Type
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {CUISINE_TYPES.map(cuisine => (
                  <label key={cuisine} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.cuisine.includes(cuisine)}
                      onChange={() => handleFilterChange('cuisine', cuisine)}
                      className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{cuisine}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                <DollarSign className="inline w-4 h-4 mr-2" />
                Price Range
              </label>
              <div className="space-y-2">
                {PRICE_RANGES.map(price => (
                  <label key={price.value} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.priceRange.includes(price.value)}
                      onChange={() => handleFilterChange('priceRange', price.value)}
                      className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      {price.label} <span className="text-gray-500">({price.description})</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                <Star className="inline w-4 h-4 mr-2" />
                Minimum Rating
              </label>
              <select
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Any Rating</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
                <option value="3.0">3.0+ Stars</option>
              </select>
            </div>

            {/* Distance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                <MapPin className="inline w-4 h-4 mr-2" />
                Distance
              </label>
              <div className="space-y-2">
                {DISTANCE_OPTIONS.map(distance => (
                  <label key={distance.value} className="flex items-center">
                    <input
                      type="radio"
                      name="distance"
                      checked={filters.distance === distance.value}
                      onChange={() => handleFilterChange('distance', distance.value)}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{distance.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Dietary Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Dietary Options
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {DIETARY_OPTIONS.map(option => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.dietary.includes(option)}
                      onChange={() => handleFilterChange('dietary', option)}
                      className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                <Clock className="inline w-4 h-4 mr-2" />
                Additional Options
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.openNow}
                    onChange={() => handleFilterChange('openNow', !filters.openNow)}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Open Now</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.hasDelivery}
                    onChange={() => handleFilterChange('hasDelivery', !filters.hasDelivery)}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Delivery Available</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.hasReservations}
                    onChange={() => handleFilterChange('hasReservations', !filters.hasReservations)}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Accepts Reservations</span>
                </label>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {getActiveFilterCount() > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Active Filters:</h4>
              <div className="flex flex-wrap gap-2">
                {filters.cuisine.map(cuisine => (
                  <span key={cuisine} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                    {cuisine}
                    <button
                      onClick={() => handleFilterChange('cuisine', cuisine)}
                      className="ml-1 hover:text-primary-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {filters.priceRange.map(price => {
                  const priceLabel = PRICE_RANGES.find(p => p.value === price)?.label;
                  return (
                    <span key={price} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {priceLabel}
                      <button
                        onClick={() => handleFilterChange('priceRange', price)}
                        className="ml-1 hover:text-green-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  );
                })}
                {filters.dietary.map(dietary => (
                  <span key={dietary} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    {dietary}
                    <button
                      onClick={() => handleFilterChange('dietary', dietary)}
                      className="ml-1 hover:text-purple-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {filters.rating && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                    {filters.rating}+ Stars
                    <button
                      onClick={() => handleFilterChange('rating', '')}
                      className="ml-1 hover:text-yellow-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;