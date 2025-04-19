import { Github, Twitter, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p className="text-center md:text-left">© {currentYear} Jaai. All rights reserved.</p>
          </div>
          
          <div className="flex justify-center space-x-6">
            <a 
              href="https://github.com/yourusername" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#1E90FF] transition-colors duration-300 flex items-center"
              aria-label="GitHub"
            >
              <Github size={20} />
              <span className="ml-2 hidden md:inline">GitHub</span>
            </a>
            
            <a 
              href="https://modrinth.com/user/yourusername" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#1E90FF] transition-colors duration-300 flex items-center"
              aria-label="Modrinth"
            >
              <ExternalLink size={20} />
              <span className="ml-2 hidden md:inline">Modrinth</span>
            </a>
            
            <a 
              href="https://twitter.com/yourusername" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#1E90FF] transition-colors duration-300 flex items-center"
              aria-label="Twitter"
            >
              <Twitter size={20} />
              <span className="ml-2 hidden md:inline">Twitter</span>
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Built with React and Tailwind CSS. Minecraft is a trademark of Mojang AB.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;