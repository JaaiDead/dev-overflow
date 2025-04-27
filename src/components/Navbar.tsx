import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react'; // Add these icons if not already included

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark', !isDarkMode);
    document.body.classList.toggle('light', isDarkMode);
  };

  return (
    <nav className={`fixed w-full top-0 z-10 transition-all duration-300 ${isScrolled ? 'bg-gray-900 shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold">Jaai's Portfolio</h1>
          
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {/* Existing mobile menu button */}
          </button>
          
          <div className="flex items-center space-x-6">
            <ul className="hidden md:flex space-x-6">
              <li><a href="#home" className="hover:text-[#1E90FF] transition-colors duration-300">Home</a></li>
              <li><a href="#about" className="hover:text-[#1E90FF] transition-colors duration-300">About</a></li>
              <li><a href="#projects" className="hover:text-[#1E90FF] transition-colors duration-300">Projects</a></li>
              <li><a href="#contact" className="hover:text-[#1E90FF] transition-colors duration-300">Contact</a></li>
            </ul>
            <button
              onClick={toggleTheme}
              className="text-white hover:text-[#1E90FF] transition-colors duration-300"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-800 py-2">
            <ul className="flex flex-col space-y-2 px-4 pb-4">
              {/* Existing mobile menu items */}
              <li><a href="#home" className="block py-2 hover:text-[#1E90FF]" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
              <li><a href="#about" className="block py-2 hover:text-[#1E90FF]" onClick={() => setMobileMenuOpen(false)}>About</a></li>
              <li><a href="#projects" className="block py-2 hover:text-[#1E90FF]" onClick={() => setMobileMenuOpen(false)}>Projects</a></li>
              <li><a href="#contact" className="block py-2 hover:text-[#1E90FF]" onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
              <li>
                <button
                  onClick={toggleTheme}
                  className="w-full text-left py-2 hover:text-[#1E90FF]"
                >
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;