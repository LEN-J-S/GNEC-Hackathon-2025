import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 w-10 h-10 rounded-full flex items-center justify-center">
                <Globe size={20} className="text-white" />
              </div>
              <span className="font-bold text-xl">Access AI</span>
            </Link>
            <p className="mt-4 text-gray-400 max-w-md">
              Supporting UN SDG 10: Reduced Inequalities. We're bridging the digital divide and ensuring equal access to information for all communities worldwide.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Impact</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Success Stories</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Community Impact</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">SDG 10 Progress</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Partner With Us</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Downloads</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/windows" className="text-gray-400 hover:text-white transition-colors">Windows</Link>
              </li>
              <li>
                <Link to="/android" className="text-gray-400 hover:text-white transition-colors">Android</Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Release Notes</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Previous Versions</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Access AI. Supporting UN SDG 10: Reduced Inequalities
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;