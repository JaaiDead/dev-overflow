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

  return (
    <div className="p-4 h-full">
      <div
        className={`bg-gray-800 bg-opacity-30 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden h-full flex flex-col transition-all duration-300 ${
          isExpanded ? 'hover:shadow-lg hover:shadow-blue-900/20 hover:scale-[1.02] h-auto' : 'hover:shadow-lg hover:shadow-blue-900/20 hover:scale-[1.02]'
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="relative">
          <img src={image} alt={title} className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2E] to-transparent opacity-60"></div>
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
          <p className="text-gray-300 mb-4 flex-grow">{description}</p>
          {isExpanded && details && <p className="text-gray-400 mb-4">{details}</p>}
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#1E90FF] hover:text-blue-400 flex items-center self-start transition-colors duration-300"
          >
            View Project <ExternalLink className="ml-1" size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;