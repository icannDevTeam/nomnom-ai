import { useState } from 'react';
import { Grid, List, Filter, SortAsc, MapPin } from 'lucide-react';
import RestaurantCard from '../restaurant/RestaurantCard';

const SearchResults = ({ results, query, filters, isLoading }) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('relevance'); // 'relevance', 'rating', 'distance', 'price'

  const sortResults = (results, sortBy) => {
    const sorted = [...results];
    
    switch (sortBy) {
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'distance':
        return sorted.sort((a, b) => a.distance - b.distance);
      case 'price':
        return sorted.sort((a, b) => a.priceRange - b.priceRange);
      case 'relevance':
      default:
        return sorted; // Already sorted by relevance in service
    }
  };

  const getActiveFiltersCount = () => {
    if (!filters) return 0;
    return (filters.cuisine?.length || 0) + 
           (filters.priceRange?.length || 0) + 
           (filters.dietary?.length || 0) + 
           (filters.rating ? 1 : 0) + 
           (filters.distance ? 1 : 0) + 
           (filters.openNow ? 1 : 0) + 
           (filters.hasDelivery ? 1 : 0) + 
           (filters.hasReservations ? 1 : 0);
  };

  const getFiltersSummary = () => {
    if (!filters) return '';
    
    const parts = [];
    if (filters.cuisine?.length > 0) parts.push(`${filters.cuisine.length} cuisine${filters.cuisine.length > 1 ? 's' : ''}`);
    if (filters.priceRange?.length > 0) parts.push(`${filters.priceRange.length} price range${filters.priceRange.length > 1 ? 's' : ''}`);
    if (filters.rating) parts.push(`${filters.rating}+ stars`);
    if (filters.distance) parts.push(`within ${filters.distance}km`);
    if (filters.dietary?.length > 0) parts.push(`${filters.dietary.length} dietary option${filters.dietary.length > 1 ? 's' : ''}`);
    
    return parts.join(', ');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Searching restaurants...</p>
        </div>
      </div>
    );
  }

  const sortedResults = sortResults(results, sortBy);

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {results.length === 0 ? 'No restaurants found' : `${results.length} restaurant${results.length > 1 ? 's' : ''} found`}
          </h2>
          {query && (
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              for "<span className="font-medium">{query}</span>"
              {getActiveFiltersCount() > 0 && (
                <span className="ml-2">
                  with {getActiveFiltersCount()} filter{getActiveFiltersCount() > 1 ? 's' : ''} 
                  {getFiltersSummary() && `: ${getFiltersSummary()}`}
                </span>
              )}
            </p>
          )}
        </div>

        {results.length > 0 && (
          <div className="flex items-center space-x-4">
            {/* Sort Dropdown */}
            <div className="flex items-center">
              <SortAsc className="w-4 h-4 text-gray-400 mr-2" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="relevance">Relevance</option>
                <option value="rating">Highest Rated</option>
                <option value="distance">Nearest</option>
                <option value="price">Price: Low to High</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-l-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-r-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* No Results State */}
      {results.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            No restaurants match your search
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Try adjusting your filters or search terms to find more restaurants in your area.
          </p>
          <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <p>Suggestions:</p>
            <ul className="space-y-1">
              <li>• Remove some filters to see more results</li>
              <li>• Try a different cuisine type</li>
              <li>• Expand your search radius</li>
              <li>• Check your spelling</li>
            </ul>
          </div>
        </div>
      )}

      {/* Results Grid/List */}
      {results.length > 0 && (
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }>
          {sortedResults.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              compact={viewMode === 'list'}
            />
          ))}
        </div>
      )}

      {/* Load More Button (for future pagination) */}
      {results.length > 0 && results.length >= 10 && (
        <div className="text-center pt-8">
          <button className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Load More Restaurants
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;