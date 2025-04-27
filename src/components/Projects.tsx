import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projectsData';

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3); // Default for desktop
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);

  // Create an extended array for infinite looping
  const extendedProjects = [...projects, ...projects.slice(0, itemsPerPage)];

  // Update items per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1); // Mobile
      else if (window.innerWidth < 1024) setItemsPerPage(2); // Tablet
      else setItemsPerPage(3); // Desktop
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    const startAutoScroll = () => {
      if (isAutoScrolling && totalPages > 1) {
        autoScrollInterval.current = setInterval(nextSlide, 5000);
      }
    };
    startAutoScroll();
    return () => {
      if (autoScrollInterval.current) clearInterval(autoScrollInterval.current);
    };
  }, [currentIndex, isAutoScrolling]);

  const totalPages = Math.ceil(projects.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMouseEnter = () => setIsAutoScrolling(false);
  const handleMouseLeave = () => setIsAutoScrolling(true);

  // Calculate start index for the original projects array
  const startIdx = currentIndex % projects.length;
  const visibleProjects = extendedProjects.slice(startIdx, startIdx + itemsPerPage);

  return (
    <section id="projects" className="py-20 bg-[#1A1F2E]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10 text-white">My Projects</h2>
        
        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#1E90FF] text-white p-2 rounded-full hover:bg-blue-600 z-10 transition-colors duration-300 -ml-2 md:ml-0"
            aria-label="Previous project"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="overflow-hidden mx-8 perspective-1000">
            <div 
              ref={sliderRef}
              className="flex transition-transform duration-1000 ease-in-out-out"
              style={{ transform: `translateX(-${(currentIndex * 100 / itemsPerPage)}%)` }}
            >
              {extendedProjects.map((project, index) => (
                <div
                  key={index}
                  className={`
                    flex-none w-1/${itemsPerPage} p-2 transition-all duration-500 ease-in-out
                    ${Math.abs(index % projects.length - startIdx) < itemsPerPage ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                  `}
                  style={{
                    transition: 'opacity 0.6s ease-in-out, transform 0.6s ease-in-out',
                    transitionDelay: `${(index % itemsPerPage) * 0.1}s`
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'perspective(1000px) rotateY(5deg) scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
                >
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#1E90FF] text-white p-2 rounded-full hover:bg-blue-600 z-10 transition-colors duration-300 -mr-2 md:mr-0"
            aria-label="Next project"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-500 ease-in-out ${
                index === currentIndex ? 'bg-[#1E90FF] scale-125' : 'bg-gray-600'
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