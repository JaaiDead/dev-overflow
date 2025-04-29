import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projectsData';
import { X } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  details?: string;
}

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  // Close modal when ESC key is pressed
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedProject) {
        closeModal();
      }
    };

    // Adding event listener when modal is open
    if (selectedProject) {
      window.addEventListener('keydown', handleEscKey);
    }

    // Cleanup event listener
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="py-20 bg-[#1A1F2E]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10 text-white">My Projects</h2>

        {/* Grid Layout for Project Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} onClick={() => openModal(project)}>
              <ProjectCard {...project} />
            </div>
          ))}
        </div>

        {/* Modal for Selected Project */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div
              className="bg-gray-800 rounded-lg max-w-lg w-full p-6 relative animate__animated animate__zoomIn"
              role="dialog"
              aria-labelledby="modal-title"
              aria-modal="true"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              <h3 id="modal-title" className="text-2xl font-bold mb-4 text-white">
                {selectedProject.title}
              </h3>
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <p className="text-gray-300 mb-4">{selectedProject.description}</p>
              {selectedProject.details && (
                <p className="text-gray-400 mb-4">{selectedProject.details}</p>
              )}
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#1E90FF] hover:text-blue-400 transition-colors duration-300"
              >
                View Project <X className="ml-1" size={16} />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
