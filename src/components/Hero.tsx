import { useState, useEffect } from 'react';

const Hero = () => {
  const texts: string[] = ['Jaai', 'a Developer', 'a Minecraft Modder'];
  const [currentText, setCurrentText] = useState<string>('');
  const [textIndex, setTextIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [typingSpeed, setTypingSpeed] = useState<number>(250); // Dynamic speed

  useEffect(() => {
    const currentString = texts[textIndex];

    const handleTyping = () => {
      if (isDeleting) {
        setCurrentText(currentString.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
        setTypingSpeed(50); // Faster deleting
        if (charIndex === 0) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
          setTypingSpeed(250); // Reset speed for typing
        }
      } else {
        setCurrentText(currentString.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
        setTypingSpeed(250); // Normal typing speed
        if (charIndex === currentString.length) {
          setIsDeleting(true);
          setTypingSpeed(1000); // Pause before deleting
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex, texts, typingSpeed]);

  // Smooth scroll and animations
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      window.scrollTo({
        top: projectsSection.offsetTop,
        behavior: 'smooth',
      });
    } else {
      console.error('Projects section not found');
    }
  };

  useEffect(() => {
    try {
      const elements = document.querySelectorAll('.hero-animate');
      elements.forEach((el, index) => {
        if (el instanceof HTMLElement) {
          el.classList.add('animate__animated', 'animate__fadeInUp');
          el.style.animationDelay = `${index * 0.2}s`;
        }
      });
    } catch (error) {
      console.error('Animation setup failed:', error);
    }
  }, []);

  return (
    
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-[#1A1F2E] text-white"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1623334231973-88116b8e2767?auto=compress&w=1920&h=1080&dpr=1')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(26, 31, 46, 0.8)',
      }}
    >
      <div className="text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 hero-animate">
          Hi, I'm{' '}
          <span style={{ color: '#1E90FF' }}>
            {currentText}
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300 hero-animate">
          I create custom Minecraft mods, tools, and server optimizations.
        </p>
        <button
  id="projects-button"
  onClick={scrollToProjects}
  className="bg-[#1E90FF] text-white py-3 px-6 rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 animate__animated animate__pulse animate__slow hero-animate"
>
  View My Projects
</button>

      </div>
    </section>
  );
};

export default Hero;
