// Mock restaurant data service
export const mockRestaurants = [
  {
    id: 1,
    name: "Bella Vista Italian",
    cuisine: "Italian",
    rating: 4.5,
    priceRange: 3,
    distance: 0.8,
    location: "Senayan, Jakarta Selatan",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400",
    dietary: ["Vegetarian", "Gluten-Free"],
    features: {
      openNow: true,
      hasDelivery: true,
      hasReservations: true
    },
    description: "Authentic Italian cuisine with fresh pasta and wood-fired pizzas",
    openHours: "11:00 AM - 10:00 PM",
    phone: "021-5794-8234"
  },
  {
    id: 2,
    name: "Dragon Palace",
    cuisine: "Chinese",
    rating: 4.2,
    priceRange: 2,
    distance: 1.2,
    location: "Glodok, Jakarta Barat",
    image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400",
    dietary: ["Vegetarian", "Vegan"],
    features: {
      openNow: true,
      hasDelivery: true,
      hasReservations: false
    },
    description: "Traditional Chinese dishes with modern presentation",
    openHours: "12:00 PM - 11:00 PM",
    phone: "021-6329-4567"
  },
  {
    id: 3,
    name: "Sakura Sushi Bar",
    cuisine: "Japanese",
    rating: 4.8,
    priceRange: 4,
    distance: 2.1,
    location: "Pondok Indah, Jakarta Selatan",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400",
    dietary: ["Gluten-Free"],
    features: {
      openNow: false,
      hasDelivery: false,
      hasReservations: true
    },
    description: "Premium sushi and sashimi with seasonal omakase menus",
    openHours: "5:00 PM - 12:00 AM",
    phone: "021-7592-8456"
  },
  {
    id: 4,
    name: "Taco Libre",
    cuisine: "Mexican",
    rating: 4.1,
    priceRange: 1,
    distance: 0.5,
    location: "Mission District",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
    dietary: ["Vegetarian", "Vegan", "Gluten-Free"],
    features: {
      openNow: true,
      hasDelivery: true,
      hasReservations: false
    },
    description: "Authentic street tacos and fresh Mexican flavors",
    openHours: "10:00 AM - 11:00 PM",
    phone: "(555) 456-7890"
  },
  {
    id: 5,
    name: "Spice Route",
    cuisine: "Indian",
    rating: 4.4,
    priceRange: 2,
    distance: 1.8,
    location: "Little India",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
    dietary: ["Vegetarian", "Vegan", "Halal"],
    features: {
      openNow: true,
      hasDelivery: true,
      hasReservations: true
    },
    description: "Aromatic curries and tandoor specialties from across India",
    openHours: "11:30 AM - 10:30 PM",
    phone: "(555) 567-8901"
  },
  {
    id: 6,
    name: "Thai Garden",
    cuisine: "Thai",
    rating: 4.3,
    priceRange: 2,
    distance: 1.5,
    location: "Thai Town",
    image: "https://images.unsplash.com/photo-1559314809-0f31657def5e?w=400",
    dietary: ["Vegetarian", "Vegan", "Gluten-Free"],
    features: {
      openNow: true,
      hasDelivery: true,
      hasReservations: true
    },
    description: "Traditional Thai dishes with authentic flavors and fresh herbs",
    openHours: "11:00 AM - 10:00 PM",
    phone: "(555) 678-9012"
  },
  {
    id: 7,
    name: "Le Petit Bistro",
    cuisine: "French",
    rating: 4.7,
    priceRange: 4,
    distance: 2.8,
    location: "French Quarter",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
    dietary: ["Vegetarian"],
    features: {
      openNow: false,
      hasDelivery: false,
      hasReservations: true
    },
    description: "Classic French cuisine in an intimate bistro setting",
    openHours: "6:00 PM - 11:00 PM",
    phone: "(555) 789-0123"
  },
  {
    id: 8,
    name: "Mediterranean Coast",
    cuisine: "Mediterranean",
    rating: 4.6,
    priceRange: 3,
    distance: 1.3,
    location: "Harbor District",
    image: "https://images.unsplash.com/photo-1544510850-c8d04d1d4d9e?w=400",
    dietary: ["Vegetarian", "Vegan", "Gluten-Free"],
    features: {
      openNow: true,
      hasDelivery: true,
      hasReservations: true
    },
    description: "Fresh Mediterranean dishes with locally sourced ingredients",
    openHours: "11:00 AM - 11:00 PM",
    phone: "(555) 890-1234"
  },
  {
    id: 9,
    name: "Seoul Kitchen",
    cuisine: "Korean",
    rating: 4.4,
    priceRange: 2,
    distance: 2.3,
    location: "Koreatown",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400",
    dietary: ["Vegetarian"],
    features: {
      openNow: true,
      hasDelivery: true,
      hasReservations: false
    },
    description: "Authentic Korean BBQ and traditional dishes",
    openHours: "12:00 PM - 12:00 AM",
    phone: "(555) 901-2345"
  },
  {
    id: 10,
    name: "Pho Saigon",
    cuisine: "Vietnamese",
    rating: 4.2,
    priceRange: 1,
    distance: 1.7,
    location: "Vietnamese Quarter",
    image: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400",
    dietary: ["Vegetarian", "Gluten-Free"],
    features: {
      openNow: true,
      hasDelivery: true,
      hasReservations: false
    },
    description: "Traditional Vietnamese pho and fresh spring rolls",
    openHours: "10:00 AM - 9:00 PM",
    phone: "(555) 012-3456"
  }
];

export const searchRestaurants = (query, filters) => {
  let results = [...mockRestaurants];
  
  // Filter by query (name, cuisine, description)
  if (query && query.trim()) {
    const searchTerm = query.toLowerCase();
    results = results.filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchTerm) ||
      restaurant.cuisine.toLowerCase().includes(searchTerm) ||
      restaurant.description.toLowerCase().includes(searchTerm) ||
      restaurant.location.toLowerCase().includes(searchTerm)
    );
  }
  
  // Filter by cuisine
  if (filters.cuisine && filters.cuisine.length > 0) {
    results = results.filter(restaurant =>
      filters.cuisine.includes(restaurant.cuisine)
    );
  }
  
  // Filter by price range
  if (filters.priceRange && filters.priceRange.length > 0) {
    const priceRanges = filters.priceRange.map(p => parseInt(p));
    results = results.filter(restaurant =>
      priceRanges.includes(restaurant.priceRange)
    );
  }
  
  // Filter by rating
  if (filters.rating) {
    const minRating = parseFloat(filters.rating);
    results = results.filter(restaurant =>
      restaurant.rating >= minRating
    );
  }
  
  // Filter by distance
  if (filters.distance) {
    const maxDistance = parseFloat(filters.distance);
    results = results.filter(restaurant =>
      restaurant.distance <= maxDistance
    );
  }
  
  // Filter by dietary options
  if (filters.dietary && filters.dietary.length > 0) {
    results = results.filter(restaurant =>
      filters.dietary.some(dietary =>
        restaurant.dietary.includes(dietary)
      )
    );
  }
  
  // Filter by additional features
  if (filters.openNow) {
    results = results.filter(restaurant =>
      restaurant.features.openNow
    );
  }
  
  if (filters.hasDelivery) {
    results = results.filter(restaurant =>
      restaurant.features.hasDelivery
    );
  }
  
  if (filters.hasReservations) {
    results = results.filter(restaurant =>
      restaurant.features.hasReservations
    );
  }
  
  // Sort by rating and distance
  results.sort((a, b) => {
    if (b.rating !== a.rating) {
      return b.rating - a.rating; // Higher rating first
    }
    return a.distance - b.distance; // Closer distance first
  });
  
  return results;
};

export const getRestaurantById = (id) => {
  return mockRestaurants.find(restaurant => restaurant.id === parseInt(id));
};

export const getPopularRestaurants = () => {
  return mockRestaurants
    .filter(restaurant => restaurant.rating >= 4.3)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);
};

export const getNearbyRestaurants = (maxDistance = 2) => {
  return mockRestaurants
    .filter(restaurant => restaurant.distance <= maxDistance)
    .sort((a, b) => a.distance - b.distance);
};