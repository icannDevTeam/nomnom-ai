import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, MessageSquare, Bell, Menu, X, Sun, Moon, Bot, ChevronDown, Settings, LogOut, User, MoreVertical, Hash } from 'lucide-react';
import { useUser } from '../../context/UserContext';

const Navbar = () => {
  const location = useLocation();
  const { isDarkMode, toggleDarkMode } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  // Mock user data - replace with actual user context
  const user = {
    name: 'Edy',
    email: 'edy@email.com',
    avatar: null // Will use initials if no avatar
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navigation = [
    { name: 'Discovery', href: '/discovery', icon: Compass },
    { name: 'Channels', href: '/channels', icon: Hash },
    { name: 'Resto Agents', href: '/agents', icon: Bot },
  ];

  // Mobile navigation includes chats
  const mobileNavigation = [
    { name: 'Discovery', href: '/discovery', icon: Compass },
    { name: 'Channels', href: '/channels', icon: Hash },
    { name: 'Agents', href: '/agents', icon: Bot },
    { name: 'Chats', href: '/chat', icon: MessageSquare },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Enhanced Desktop Navbar */}
      <nav className="hidden md:flex bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50 shadow-2xl shadow-gray-900/10 relative">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-50/20 via-accent-50/10 to-primary-50/20 dark:from-primary-900/10 dark:via-accent-900/5 dark:to-primary-900/10 opacity-0 hover:opacity-100 transition-opacity duration-700"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group relative">
              <div className="relative">
                <div className="text-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 ease-out filter group-hover:drop-shadow-lg">🍽️</div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300"></div>
              </div>
              <div className="relative overflow-hidden">
                <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent group-hover:from-primary-600 group-hover:to-accent-600 dark:group-hover:from-primary-400 dark:group-hover:to-accent-400 transition-all duration-300">
                  Nom Nom AI
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 group-hover:w-full transition-all duration-300 ease-out"></div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="flex items-center space-x-12 lg:space-x-16">
                {navigation.map((item, index) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 group overflow-hidden ${
                        active
                          ? 'text-white bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500 shadow-lg shadow-primary-500/25'
                          : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gradient-to-r hover:from-gray-50 hover:via-gray-100 hover:to-gray-50 dark:hover:from-gray-700 dark:hover:via-gray-600 dark:hover:to-gray-700'
                      }`}
                      style={{ 
                        animationDelay: `${index * 150}ms`
                      }}
                    >
                      {/* Background animation for active state */}
                      {active && (
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-500 opacity-0 animate-pulse rounded-xl"></div>
                      )}
                      
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-accent-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                      
                      <Icon 
                        size={18} 
                        className={`relative z-10 transition-all duration-300 ${
                          active 
                            ? 'text-white drop-shadow-sm' 
                            : 'group-hover:scale-110 group-hover:rotate-3'
                        }`} 
                      />
                      <span className="relative z-10">
                        {item.name}
                        {!active && (
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 group-hover:w-full transition-all duration-300 ease-out"></div>
                        )}
                      </span>
                      
                      {/* Active indicator */}
                      {active && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-lg"></div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center">
              {/* Notifications */}
              <div className="flex items-center mr-4">
                <button className="relative p-2.5 text-gray-600 dark:text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-primary-500 hover:to-accent-500 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary-500/25 group">
                  <Bell size={20} className="transition-all duration-300 group-hover:scale-110" />
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-gradient-to-r from-red-500 to-red-600 rounded-full animate-pulse shadow-lg">
                    <span className="absolute inset-0 w-2.5 h-2.5 bg-red-400 rounded-full animate-ping"></span>
                  </span>
                </button>
              </div>

              {/* Theme Toggle */}
              <div className="flex items-center mr-4 pr-4 border-r border-gray-300/60 dark:border-gray-600/60">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  {isDarkMode ? 
                    <Sun size={20} /> : 
                    <Moon size={20} />
                  }
                </button>
              </div>
              
              {/* Profile Dropdown */}
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      getInitials(user.name)
                    )}
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                  <ChevronDown 
                    size={16} 
                    className={`text-gray-400 transition-transform duration-200 ${
                      isProfileDropdownOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                {/* Desktop Profile Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 z-[9999]">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                          ) : (
                            getInitials(user.name)
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <User size={16} />
                        <span>View Profile</span>
                      </Link>
                      <button className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                        <Settings size={16} />
                        <span>Settings</span>
                      </button>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                      <button className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left">
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Mobile Navbar */}
      <nav className="md:hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50 shadow-xl shadow-gray-900/10 relative overflow-hidden">
        {/* Mobile animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-50/20 via-accent-50/10 to-primary-50/20 dark:from-primary-900/10 dark:via-accent-900/5 dark:to-primary-900/10 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
        <div className="px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="text-2xl group-hover:scale-110 transition-transform duration-200">🍽️</div>
              <span className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                Nom Nom AI
              </span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Mobile menu button clicked, current state:', isMenuOpen);
                setIsMenuOpen(!isMenuOpen);
              }}
              className="relative z-20 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 cursor-pointer"
              style={{ pointerEvents: 'all' }}
            >
              {isMenuOpen ? 
                <X size={24} /> : 
                <MoreVertical size={24} />
              }
            </button>
          </div>

          {/* Enhanced Mobile menu with animations */}
          {isMenuOpen && (
            <div className="border-t border-gray-200/50 dark:border-gray-700/50 py-4 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-gray-700/20 transform transition-all duration-300 ease-out">
              <div className="space-y-2">
                {navigation.map((item, index) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`relative flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:scale-105 hover:translate-x-2 group overflow-hidden ${
                        active
                          ? 'text-white bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500 shadow-lg shadow-primary-500/25'
                          : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gradient-to-r hover:from-gray-50 hover:via-gray-100 hover:to-gray-50 dark:hover:from-gray-700 dark:hover:via-gray-600 dark:hover:to-gray-700'
                      }`}
                      style={{ 
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      {/* Background animation for active state */}
                      {active && (
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-500 opacity-0 animate-pulse rounded-xl"></div>
                      )}
                      
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-accent-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                      
                      <Icon 
                        size={20} 
                        className={`relative z-10 transition-all duration-300 ${
                          active 
                            ? 'text-white drop-shadow-sm' 
                            : 'group-hover:scale-110 group-hover:rotate-3'
                        }`} 
                      />
                      <span className="relative z-10">
                        {item.name}
                        {!active && (
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 group-hover:w-full transition-all duration-300 ease-out"></div>
                        )}
                      </span>
                      
                      {/* Active indicator */}
                      {active && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-white rounded-full shadow-lg"></div>
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile actions */}
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between px-4 mb-4">
                  {/* Notifications */}
                  <button className="relative p-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-110">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
                  </button>
                  
                  {/* Theme Toggle */}
                  <button
                    onClick={toggleDarkMode}
                    className="p-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-110"
                  >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                </div>
                
                {/* Mobile Profile */}
                <div className="px-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <Link 
                    to="/profile"
                    className="flex items-center space-x-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-[1.02] mt-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-md">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        getInitials(user.name)
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 safe-bottom z-50">
        <div className="grid grid-cols-4 gap-1">
          {mobileNavigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-col items-center justify-center py-3 px-2 text-xs font-medium transition-all duration-200 hover:scale-105 group ${
                  isActive(item.href)
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Icon size={20} className="mb-1 group-hover:scale-110 transition-transform duration-200" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;