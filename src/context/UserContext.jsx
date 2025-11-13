import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState({
    latitude: -6.2088,
    longitude: 106.8456,
    area: 'Jakarta, Indonesia'
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [followedRestaurants, setFollowedRestaurants] = useState([]);

  // Initialize dark mode from localStorage - default to light mode
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedDarkMode !== null) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    } else {
      // Always default to light mode, don't detect system preference
      setIsDarkMode(false);
    }
  }, []);

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setFollowedRestaurants([]);
  };

  const updateLocation = (newLocation) => {
    setLocation(prev => ({ ...prev, ...newLocation }));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const followRestaurant = (restaurantId) => {
    setFollowedRestaurants(prev => 
      prev.includes(restaurantId) 
        ? prev.filter(id => id !== restaurantId)
        : [...prev, restaurantId]
    );
  };

  const isFollowing = (restaurantId) => {
    return followedRestaurants.includes(restaurantId);
  };

  const value = {
    user,
    location,
    isDarkMode,
    followedRestaurants,
    login,
    logout,
    updateLocation,
    toggleDarkMode,
    followRestaurant,
    isFollowing,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};