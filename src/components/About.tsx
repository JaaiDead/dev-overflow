import { GithubIcon, Code2, Server, BookOpen } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-[#1A1F2E]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10 text-white">About Me</h2>
        
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Profile image with glowing border effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
              <img 
                src="https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Jaai Avatar" 
                className="absolute inset-1 rounded-full object-cover w-[calc(100%-8px)] h-[calc(100%-8px)]"
              />
            </div>
          </div>
          
          <div className="md:w-1/2 md:pl-10 text-gray-200">
            <p className="text-lg mb-6 leading-relaxed">
              I'm <span className="text-[#1E90FF] font-semibold">Jaai</span>, a dedicated Minecraft mod developer passionate about crafting innovative mods that enhance gameplay. My journey began with exploring entity creation, like the MiniGolemEntity, and has grown to include complex command systems and block designs.
            </p>
            
            <p className="text-lg mb-8 leading-relaxed">
              I've honed my skills at Lumlyte Network as a paid developer and contribute to the Fabric community by improving documentation. My work also includes tackling challenges like UV mapping fixes and waterlogging for custom blocks in Forge.
            </p>
            
            {/* Skills section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg flex items-start">
                <Code2 className="mr-3 text-[#1E90FF]" size={24} />
                <div>
                  <h3 className="font-semibold text-white mb-1">Mod Development</h3>
                  <p className="text-sm">Expert in Forge & Fabric frameworks, creating custom entities and blocks</p>
                </div>
              </div>
              
              <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg flex items-start">
                <Server className="mr-3 text-[#1E90FF]" size={24} />
                <div>
                  <h3 className="font-semibold text-white mb-1">Server Management</h3>
                  <p className="text-sm">Specialized in command systems and server-side optimization</p>
                </div>
              </div>
              
              <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg flex items-start">
                <BookOpen className="mr-3 text-[#1E90FF]" size={24} />
                <div>
                  <h3 className="font-semibold text-white mb-1">Documentation</h3>
                  <p className="text-sm">Contributing to open-source documentation to help new modders</p>
                </div>
              </div>
              
              <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg flex items-start">
                <GithubIcon className="mr-3 text-[#1E90FF]" size={24} />
                <div>
                  <h3 className="font-semibold text-white mb-1">Open Source</h3>
                  <p className="text-sm">Active contributor to Minecraft modding community projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;