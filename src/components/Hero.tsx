import { Code } from 'lucide-react';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const codeLines = [
    'public class MinecraftModder {',
    '  private final String name = "Jaai";',
    '  private List<String> skills;',
    '',
    '  public MinecraftModder() {',
    '    skills = new ArrayList<>();',
    '    skills.add("Fabric Development");',
    '    skills.add("Custom Entities");',
    '    skills.add("Block Systems");',
    '    skills.add("Command API");',
    '  }',
    '',
    '  public void createMod() {',
    '    // Magic happens here',
    '    System.out.println("Creating amazing mods!");',
    '  }',
    '}'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLine(prev => (prev + 1) % codeLines.length);
    }, 2000); // Reduced from 2000ms to 1000ms
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="pt-16 bg-[#1A1F2E] text-white min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <div className="w-full h-full flex flex-wrap gap-4 p-4 overflow-hidden">
          {Array.from({ length: 25 }).map((_, i) => ( // Reduced from 50 to 25 elements
            <div
              key={i}
              className="bg-blue-500 h-2 rounded-full animate-pulse"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                animationDelay: `${Math.random()}s`, // Reduced from 2s to 1s max delay
                opacity: Math.random() * 0.5 + 0.25
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 relative">
            <span className="text-[#1E90FF] inline-block animate-slide-in">Jaai</span>
            <span className="inline-block animate-slide-in animation-delay-100"> - Minecraft Mod Developer</span>
          </h2>
          <p className="text-lg md:text-xl mb-8 md:mb-10 animate-slide-in animation-delay-200">
            Crafting Innovative Minecraft Experiences
          </p>
          <a 
            href="#projects" 
            className="bg-[#1E90FF] text-white px-6 py-3 rounded-full hover:bg-blue-600 inline-block animate-slide-in animation-delay-300 transition-colors duration-300"
          >
            Explore My Work
          </a>
        </div>
      </div>
      
      {/* Code editor panels */}
      <div className="absolute top-1/4 -right-1/4 w-2/3 h-2/3 transform rotate-12 pointer-events-none">
        <div className="bg-gray-800 bg-opacity-30 backdrop-blur-sm p-4 rounded-lg shadow-2xl border border-gray-700">
          <div className="flex items-center mb-2">
            <Code className="mr-2 text-[#1E90FF]" size={20} />
            <span className="text-sm text-gray-300">ModDevelopment.java</span>
          </div>
          <pre className="text-sm overflow-hidden font-mono">
            <code className="language-java">
              {codeLines.map((line, index) => (
                <div
                  key={index}
                  className={`transition-colors duration-300 ${
                    index === currentLine ? 'text-[#1E90FF]' : 'text-gray-400'
                  }`}
                >
                  {line}
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>

      <div className="absolute top-1/3 -left-1/4 w-2/3 h-2/3 transform -rotate-12 pointer-events-none">
        <div className="bg-gray-800 bg-opacity-30 backdrop-blur-sm p-4 rounded-lg shadow-2xl border border-gray-700">
          <div className="flex items-center mb-2">
            <Code className="mr-2 text-[#1E90FF]" size={20} />
            <span className="text-sm text-gray-300">EntitySystem.java</span>
          </div>
          <pre className="text-sm overflow-hidden font-mono">
            <code className="language-java">
              {codeLines.slice().reverse().map((line, index) => (
                <div
                  key={index}
                  className={`transition-colors duration-300 ${
                    index === (codeLines.length - 1 - currentLine) ? 'text-[#1E90FF]' : 'text-gray-400'
                  }`}
                >
                  {line}
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
};

export default Hero;