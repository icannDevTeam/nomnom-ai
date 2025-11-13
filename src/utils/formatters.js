// Utility functions for the Resto Agent app

/**
 * Format Indonesian Rupiah currency
 * @param {number} amount - The amount in Rupiah
 * @param {boolean} showDecimals - Whether to show decimal places
 * @returns {string} Formatted currency string
 */
export const formatRupiah = (amount, showDecimals = false) => {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  });
  
  return formatter.format(amount);
};

/**
 * Format price range display for restaurants
 * @param {number} priceRange - Price range level (1-4)
 * @returns {string} Price range indicator
 */
export const formatPriceRange = (priceRange) => {
  const ranges = {
    1: 'Rp',
    2: 'Rp Rp', 
    3: 'Rp Rp Rp',
    4: 'Rp Rp Rp Rp'
  };
  return ranges[priceRange] || 'Rp';
};

/**
 * Get price range description
 * @param {number} priceRange - Price range level (1-4)
 * @returns {string} Price range description
 */
export const getPriceRangeDescription = (priceRange) => {
  const descriptions = {
    1: 'Under Rp 150,000',
    2: 'Rp 150,000 - 300,000',
    3: 'Rp 300,000 - 600,000',
    4: 'Rp 600,000+'
  };
  return descriptions[priceRange] || 'Price not available';
};

/**
 * Format distance in kilometers (Indonesia uses metric)
 * @param {number} distance - Distance in kilometers
 * @returns {string} Formatted distance string
 */
export const formatDistance = (distance) => {
  if (distance < 1) {
    return `${(distance * 1000).toFixed(0)}m`;
  }
  return `${distance.toFixed(1)}km`;
};

/**
 * Convert miles to kilometers
 * @param {number} miles - Distance in miles
 * @returns {number} Distance in kilometers
 */
export const milesToKilometers = (miles) => {
  return miles * 1.60934;
};

/**
 * Convert kilometers to miles
 * @param {number} kilometers - Distance in kilometers
 * @returns {number} Distance in miles
 */
export const kilometersToMiles = (kilometers) => {
  return kilometers / 1.60934;
};

/**
 * Format phone number for Indonesian format
 * @param {string} phone - Phone number
 * @returns {string} Formatted Indonesian phone number
 */
export const formatIndonesianPhone = (phone) => {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as Indonesian phone number
  if (cleaned.startsWith('62')) {
    // International format
    return `+62 ${cleaned.slice(2, 5)} ${cleaned.slice(5, 9)} ${cleaned.slice(9)}`;
  } else if (cleaned.startsWith('0')) {
    // Local format
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 8)} ${cleaned.slice(8)}`;
  }
  
  return phone; // Return original if can't format
};

/**
 * Get user initials from full name
 * @param {string} name - Full name
 * @returns {string} User initials
 */
export const getInitials = (name) => {
  if (name === 'Edy') {
    return 'E.D';
  }
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2);
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text with ellipsis
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

/**
 * Generate a random restaurant greeting in Indonesian
 * @param {string} restaurantName - Name of the restaurant
 * @returns {string} Indonesian greeting
 */
export const getIndonesianGreeting = (restaurantName) => {
  const greetings = [
    `Selamat datang di ${restaurantName}! Bagaimana saya bisa membantu Anda hari ini?`,
    `Halo! Terima kasih telah mengunjungi ${restaurantName}. Ada yang bisa saya bantu?`,
    `Selamat pagi/siang/malam! Selamat datang di ${restaurantName}. Apa yang ingin Anda ketahui?`,
    `Halo! Saya senang Anda tertarik dengan ${restaurantName}. Bagaimana saya bisa membantu?`
  ];
  
  return greetings[Math.floor(Math.random() * greetings.length)];
};