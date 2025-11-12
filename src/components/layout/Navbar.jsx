import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, MessageSquare, Bell, Menu, X, Sun, Moon, Bot, ChevronDown, Settings, LogOut, User } from 'lucide-react';
import { useUser } from '@context/UserContext';

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
    { name: 'Channels', href: '/channels', icon: MessageSquare },
    { name: 'Resto Agents', href: '/agents', icon: Bot },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="text-2xl group-hover:scale-110 transition-transform duration-200">🍽️</div>
              <span className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                Nom Nom AI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="flex items-center space-x-12">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-md group ${
                        isActive(item.href)
                          ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 shadow-sm'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon size={18} className="group-hover:scale-110 transition-transform duration-200" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-3">
              <button className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-110">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-110"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              {/* Profile Dropdown */}
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-105 group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-md group-hover:shadow-lg transition-shadow duration-200">
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
                    className={`text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-all duration-200 ${
                      isProfileDropdownOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50 animate-in fade-in duration-200">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-md">
                          {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                          ) : (
                            getInitials(user.name)
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <User size={16} />
                        <span>View Profile</span>
                      </Link>
                      <button className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 w-full text-left">
                        <Settings size={16} />
                        <span>Settings</span>
                      </button>
                      <hr className="my-2 border-gray-200 dark:border-gray-700" />
                      <button className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 w-full text-left">
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

      {/* Mobile Navbar */}
      <nav className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
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
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="border-t border-gray-200 dark:border-gray-700 py-4">
              <div className="space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 hover:scale-105 group ${
                        isActive(item.href)
                          ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon size={20} className="group-hover:scale-110 transition-transform duration-200" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile actions */}
              <div className="flex items-center justify-center space-x-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="relative p-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-110">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
                </button>
                <button
                  onClick={toggleDarkMode}
                  className="p-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-110"
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                
                {/* Mobile Profile */}
                <Link 
                  to="/profile"
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-105"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-md">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      getInitials(user.name)
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 safe-bottom z-50">
        <div className="grid grid-cols-4 gap-1">
          {navigation.map((item) => {
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