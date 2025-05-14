import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-blue-600"
            aria-label="Access AI Home"
          >
            <div className="bg-gradient-to-r from-blue-600 to-green-600 w-10 h-10 rounded-full flex items-center justify-center">
              <Globe size={20} className="text-white" />
            </div>
            <span className="font-bold text-xl">Access AI</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/' 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/windows" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/windows' 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Windows
            </Link>
            <Link 
              to="/android" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/android' 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Android
            </Link>
            <LanguageSelector />
            <a 
              href="#"
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-md transition-all duration-300 hover:opacity-90"
            >
              Get Started
            </a>
          </nav>

          <div className="md:hidden flex items-center space-x-4">
            <LanguageSelector />
            <button
              className="rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white pt-16 px-4 pb-6">
          <div className="flex flex-col space-y-6">
            <Link 
              to="/" 
              className={`text-lg font-medium transition-colors ${
                location.pathname === '/' ? 'text-blue-600' : 'text-gray-900'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/windows" 
              className={`text-lg font-medium transition-colors ${
                location.pathname === '/windows' ? 'text-blue-600' : 'text-gray-900'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Windows
            </Link>
            <Link 
              to="/android" 
              className={`text-lg font-medium transition-colors ${
                location.pathname === '/android' ? 'text-blue-600' : 'text-gray-900'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Android
            </Link>
            <a 
              href="#"
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-5 py-3 rounded-full text-center font-medium hover:shadow-md transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;