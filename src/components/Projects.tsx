import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projectsData';

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3); // Default for desktop
  const sliderRef = useRef<HTMLDivElement>(null);

  // Update items per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2); // Tablet
      } else {
        setItemsPerPage(3); // Desktop
      }
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(projects.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Calculate which projects to show
  const startIdx = currentIndex * itemsPerPage;
  const visibleProjects = projects.slice(startIdx, startIdx + itemsPerPage);

  return (
    <section id="projects" className="py-20 bg-[#1A1F2E]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10 text-white">My Projects</h2>
        
        <div className="relative">
          {/* Previous button */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#1E90FF] text-white p-2 rounded-full hover:bg-blue-600 z-10 transition-colors duration-300 -ml-2 md:ml-0"
            aria-label="Previous project"
          >
            <ChevronLeft size={24} />
          </button>
          
          {/* Projects carousel */}
          <div className="overflow-hidden mx-8">
            <div 
              ref={sliderRef}
              className="flex transition-all duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              <div className="min-w-full flex flex-wrap">
                {visibleProjects.map((project, index) => (
                  <div 
                    key={index} 
                    className={`
                      ${itemsPerPage === 1 ? 'w-full' : 
                        itemsPerPage === 2 ? 'w-1/2' : 'w-1/3'}
                    `}
                  >
                    <ProjectCard {...project} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Next button */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#1E90FF] text-white p-2 rounded-full hover:bg-blue-600 z-10 transition-colors duration-300 -mr-2 md:mr-0"
            aria-label="Next project"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        {/* Pagination dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-[#1E90FF]' : 'bg-gray-600'
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;