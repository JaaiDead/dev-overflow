import { useState, useEffect, useRef } from 'react';
import { GithubIcon, Code2, Server, BookOpen } from 'lucide-react';

const About = () => {
  const [typedName, setTypedName] = useState('');
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Typing effect for name
  useEffect(() => {
    const name = 'Jaai';
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < name.length) {
        setTypedName((prev) => prev + name[index]);
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 200);
    return () => clearInterval(typingInterval);
  }, []);

  // Counter animation for stats
  const [years, setYears] = useState(0);
  const [mods, setMods] = useState(0);
  const [servers, setServers] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (statsVisible) {
      const animateCounter = (setCounter: (value: number) => void, target: number) => {
        let count = 0;
        const interval = setInterval(() => {
          if (count < target) {
            setCounter(count + 1);
            count++;
          } else {
            clearInterval(interval);
          }
        }, 100);
      };

      animateCounter(setYears, 2); // 3 years of experience
      animateCounter(setMods, 4);  // 5 mods created
      animateCounter(setServers, 2); // 2 servers managed
    }
  }, [statsVisible]);

  return (
    <section id="about" className="py-20 bg-[#1A1F2E]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10 text-white animate__animated animate__fadeIn">
          About Me
        </h2>

        <div className="flex flex-col md:flex-row items-center">
          {/* Profile section */}
          <div className="md:w-1/2 mb-8 md:mb-0 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center group">
              {/* Animated Wavy Ring */}
              <div className="absolute w-full h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-[length:400%_400%] animate-gradientWave transition-all duration-300 group-hover:scale-105"></div>

              {/* Mask to create the ring shape */}
              <div className="absolute w-[92%] h-[92%] rounded-full bg-[#1A1F2E] z-10"></div>

              <a
              href="https://github.com/JaaiDead" 
                target="_blank"
                 rel="noopener noreferrer"
                               className="relative w-[86%] h-[86%] rounded-full z-20"
                      title="Visit my GitHub"
                            >
               <img
                 src="https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Jaai Avatar"
                     className="w-full h-full rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                       />
                    </a>
            </div>
          </div>

          {/* Text section */}
          <div className="md:w-1/2 md:pl-10 text-gray-200">
            <p className="text-lg mb-6 leading-relaxed animate__animated animate__fadeIn animate__delay-1s">
              I'm <span className="text-[#1E90FF] font-semibold">{typedName}</span>, a passionate mod developer with a focus on crafting innovative mods that enhance the gameplay experience. My journey began with shaping the game world and has expanded to designing new mechanics and features that truly transform how players experience Minecraft.
            </p>

            <p className="text-lg mb-6 leading-relaxed animate__animated animate__fadeIn animate__delay-2s">
              My work is centered around creating fun and engaging gameplay. Whether it's designing mods that add new features or enhancing existing ones, I strive to push the boundaries of what's possible in Minecraft, all while making sure that the experience is enjoyable and rewarding.
            </p>

            <p className="text-lg mb-8 leading-relaxed animate__animated animate__fadeIn animate__delay-3s">
              Through my role as a paid developer at Lumlyte Network, I've honed my skills in server-side optimization and mod development. I'm also an active contributor to the Fabric community, working on documentation and helping new modders get started.
            </p>

            {/* Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg flex items-start animate__animated animate__fadeInUp animate__delay-4s">
                <Code2 className="mr-3 text-[#1E90FF]" size={24} />
                <div>
                  <h3 className="font-semibold text-white mb-1">Mod Development</h3>
                  <p className="text-sm">Fabric frameworks, custom blocks , items and so on!</p>
                </div>
              </div>

              <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg flex items-start animate__animated animate__fadeInUp animate__delay-4s">
                <Server className="mr-3 text-[#1E90FF]" size={24} />
                <div>
                  <h3 className="font-semibold text-white mb-1">Server Management</h3>
                  <p className="text-sm">Server-side optimization and management</p>
                </div>
              </div>

              <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg flex items-start animate__animated animate__fadeInUp animate__delay-5s">
                <BookOpen className="mr-3 text-[#1E90FF]" size={24} />
                <div>
                  <h3 className="font-semibold text-white mb-1">Documentation</h3>
                  <p className="text-sm">Contributing to open-source documentation to help new modders</p>
                </div>
              </div>

              <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg flex items-start animate__animated animate__fadeInUp animate__delay-5s">
                <GithubIcon className="mr-3 text-[#1E90FF]" size={24} />
                <div>
                  <h3 className="font-semibold text-white mb-1">Open Source</h3>
                  <p className="text-sm">Active contributor to Minecraft modding community projects</p>
                </div>
              </div>
              <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg flex items-start animate__animated animate__fadeInUp animate__delay-6s">
  <Code2 className="mr-3 text-[#1E90FF]" size={24} />
  <div>
    <h3 className="font-semibold text-white mb-1">Plugins</h3>
    <p className="text-sm">Under Construction</p>
  </div>
</div>              <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg flex items-start animate__animated animate__fadeInUp animate__delay-6s">
  <Code2 className="mr-3 text-[#1E90FF]" size={24} />
  <div>
    <h3 className="font-semibold text-white mb-1">Forge</h3>
    <p className="text-sm">Under Construction</p>
  </div>
</div>
            </div>

            {/* Stats Section */}
            <div ref={statsRef} className="mt-10 grid grid-cols-3 gap-4 text-center">
              <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
                <p className="text-3xl font-bold text-[#1E90FF]">{years}</p>
                <p className="text-sm text-gray-300">Years Experience</p>
              </div>
              <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
                <p className="text-3xl font-bold text-[#1E90FF]">{mods}</p>
                <p className="text-sm text-gray-300">Mods Created</p>
              </div>
              <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
                <p className="text-3xl font-bold text-[#1E90FF]">{servers}</p>
                <p className="text-sm text-gray-300">Servers Managed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;