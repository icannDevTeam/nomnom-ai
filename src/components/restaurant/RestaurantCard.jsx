import { Star, MapPin, Clock, Phone, Utensils, DollarSign, Truck, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPriceRange, formatDistance, formatIndonesianPhone } from '../../utils/formatters';

const RestaurantCard = ({ restaurant, compact = false }) => {
  const getPriceRange = (priceRange) => {
    return formatPriceRange(priceRange);
  };

  const getFormattedDistance = (distance) => {
    return formatDistance(distance);
  };

  if (compact) {
    return (
      <Link
        to={`/restaurant/${restaurant.id}`}
        className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
      >
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-16 h-16 rounded-lg object-cover mr-4"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 dark:text-white truncate">
            {restaurant.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {restaurant.cuisine} • {getPriceRange(restaurant.priceRange)}
          </p>
          <div className="flex items-center mt-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">
              {restaurant.rating}
            </span>
            <MapPin className="w-4 h-4 text-gray-400 ml-3" />
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
              {getFormattedDistance(restaurant.distance)}
            </span>
          </div>
        </div>
        {restaurant.features.openNow && (
          <div className="flex items-center text-green-600 dark:text-green-400">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium">Open</span>
          </div>
        )}
      </Link>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Restaurant Image */}
      <div className="relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            restaurant.features.openNow
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {restaurant.features.openNow ? 'Open' : 'Closed'}
          </span>
        </div>
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-black bg-opacity-70 text-white rounded-full text-xs font-medium">
            {getPriceRange(restaurant.priceRange)}
          </span>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
              {restaurant.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {restaurant.description}
            </p>
          </div>
        </div>

        {/* Rating and Distance */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="ml-1 font-medium text-gray-900 dark:text-white">
              {restaurant.rating}
            </span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <MapPin className="w-4 h-4" />
            <span className="ml-1 text-sm">
              {getFormattedDistance(restaurant.distance)} • {restaurant.location}
            </span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <Utensils className="w-4 h-4" />
            <span className="ml-1 text-sm">{restaurant.cuisine}</span>
          </div>
        </div>

        {/* Dietary Options */}
        {restaurant.dietary.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {restaurant.dietary.map((option) => (
              <span
                key={option}
                className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full text-xs font-medium"
              >
                {option}
              </span>
            ))}
          </div>
        )}

        {/* Features */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{restaurant.openHours}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {restaurant.features.hasDelivery && (
              <div className="flex items-center text-blue-600 dark:text-blue-400" title="Delivery Available">
                <Truck className="w-4 h-4" />
              </div>
            )}
            {restaurant.features.hasReservations && (
              <div className="flex items-center text-green-600 dark:text-green-400" title="Accepts Reservations">
                <Calendar className="w-4 h-4" />
              </div>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <Phone className="w-4 h-4 mr-2" />
              <span className="text-sm">{formatIndonesianPhone(restaurant.phone)}</span>
            </div>
            <Link
              to={`/restaurant/${restaurant.id}`}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;