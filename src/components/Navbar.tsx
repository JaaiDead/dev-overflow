import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`fixed w-full top-0 z-10 transition-all duration-300 ${
      isScrolled ? 'bg-gray-900 shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold">Jaai's Portfolio</h1>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          
          {/* Desktop navigation */}
          <ul className="hidden md:flex space-x-6">
            <li><a href="#home" className="hover:text-[#1E90FF] transition-colors duration-300">Home</a></li>
            <li><a href="#about" className="hover:text-[#1E90FF] transition-colors duration-300">About</a></li>
            <li><a href="#projects" className="hover:text-[#1E90FF] transition-colors duration-300">Projects</a></li>
            <li><a href="#contact" className="hover:text-[#1E90FF] transition-colors duration-300">Contact</a></li>
          </ul>
        </div>
        
        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-800 py-2">
            <ul className="flex flex-col space-y-2 px-4 pb-4">
              <li><a href="#home" className="block py-2 hover:text-[#1E90FF]" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
              <li><a href="#about" className="block py-2 hover:text-[#1E90FF]" onClick={() => setMobileMenuOpen(false)}>About</a></li>
              <li><a href="#projects" className="block py-2 hover:text-[#1E90FF]" onClick={() => setMobileMenuOpen(false)}>Projects</a></li>
              <li><a href="#contact" className="block py-2 hover:text-[#1E90FF]" onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;