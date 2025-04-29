import { ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  details?: string; // Optional detailed description
}

const ProjectCard = ({ title, description, image, link, details }: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="p-2 sm:p-4 h-full">
      <div
        className={`bg-gray-800 bg-opacity-30 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden h-full flex flex-col transition-all duration-500 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1E90FF] ${
          isExpanded
            ? 'shadow-lg shadow-blue-900/20 scale-[1.01] h-auto'
            : 'hover:shadow-lg hover:shadow-blue-900/20 hover:scale-[1.01]'
        }`}
        onClick={toggleExpand}
        tabIndex={0} // Make the card focusable for keyboard navigation
        onKeyDown={(e) => e.key === 'Enter' && toggleExpand()} // Support Enter key for accessibility
        role="button"
        aria-expanded={isExpanded}
        aria-label={`Expand details for ${title}`}
      >
        <div className="relative">
          {!isImageLoaded && (
            <div className="w-full h-40 sm:h-48 bg-gray-700 animate-pulse" />
          )}
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover rounded-md mb-4 sm:mb-0 transition-opacity duration-300"
            style={{ opacity: isImageLoaded ? 1 : 0 }}
            onLoad={() => setIsImageLoaded(true)}
            loading="lazy" // Lazy load images for better performance
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2E] to-transparent opacity-60 transition-opacity duration-300" />
        </div>
        
        <div className="p-4 sm:p-5 flex flex-col flex-grow">
          <h3 className="text-lg sm:text-xl font-bold mb-2 text-white transition-transform duration-300">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-gray-300 mb-4 flex-grow transition-opacity duration-300">
            {description}
          </p>
          {isExpanded && details && (
            <p className="text-sm sm:text-base text-gray-400 mb-4 transition-opacity duration-300">
              {details}
            </p>
          )}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1E90FF] hover:text-blue-400 flex items-center self-start text-sm sm:text-base transition-colors duration-300"
            onClick={(e) => e.stopPropagation()} // Prevent link click from toggling the card
          >
            View Project <ExternalLink className="ml-1" size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;