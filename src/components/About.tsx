import { GithubIcon, Code2, Server, BookOpen } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-[#1A1F2E]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10 text-white">About Me</h2>

        <div className="flex flex-col md:flex-row items-center">
          {/* Profile section */}
          <div className="md:w-1/2 mb-8 md:mb-0 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">

              {/* Animated Wavy Ring */}
              <div className="absolute w-full h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-[length:400%_400%] animate-gradientWave"></div>

              {/* Mask to create the ring shape */}
              <div className="absolute w-[92%] h-[92%] rounded-full bg-[#1A1F2E] z-10"></div>

              {/* Profile Image */}
              <img 
                src="https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Jaai Avatar" 
                className="relative w-[86%] h-[86%] rounded-full object-cover z-20"
              />
            </div>
          </div>

          {/* Text section */}
          <div className="md:w-1/2 md:pl-10 text-gray-200">
            <p className="text-lg mb-6 leading-relaxed">
              I'm <span className="text-[#1E90FF] font-semibold">Jaai</span>, a passionate mod developer with a focus on crafting innovative mods that enhance the Minecraft gameplay experience. My journey began with shaping the game world and has expanded to designing new mechanics and features that truly transform how players experience Minecraft.
            </p>

            <p className="text-lg mb-6 leading-relaxed">
              My work is centered around creating fun and engaging gameplay. Whether it's designing mods that add new features or enhancing existing ones, I strive to push the boundaries of what's possible in Minecraft, all while making sure that the experience is enjoyable and rewarding.
            </p>

            <p className="text-lg mb-8 leading-relaxed">
              Through my role as a paid developer at Lumlyte Network, I've honed my skills in server-side optimization and mod development. I'm also an active contributor to the Fabric community, working on documentation and helping new modders get started.
            </p>

            {/* Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg flex items-start">
                <Code2 className="mr-3 text-[#1E90FF]" size={24} />
                <div>
                  <h3 className="font-semibold text-white mb-1">Mod Development</h3>
                  <p className="text-sm">Forge & Fabric frameworks, custom entities and blocks</p>
                </div>
              </div>

              <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg flex items-start">
                <Server className="mr-3 text-[#1E90FF]" size={24} />
                <div>
                  <h3 className="font-semibold text-white mb-1">Server Management</h3>
                  <p className="text-sm">Server-side optimization and management</p>
                </div>
              </div>

              <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg flex items-start">
                <BookOpen className="mr-3 text-[#1E90FF]" size={24} />
                <div>
                  <h3 className="font-semibold text-white mb-1">Documentation</h3>
                  <p className="text-sm">Contributing to open-source documentation to help new modders</p>
                </div>
              </div>

              <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg flex items-start">
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
