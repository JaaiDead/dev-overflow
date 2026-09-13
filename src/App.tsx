import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { ProfileProvider, useProfile } from "./contexts/ProfileContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import ModrinthShowcase from "./components/ModrinthShowcase";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import MouseGlow from "./components/MouseGlow";
import PrivacyPolicy from "./components/PrivacyPolicy";

function AppContent() {
  const { profile } = useProfile();

  useEffect(() => {
    document.title = profile === "personal" ? "Jaai · Developer" : "ArcticQuests · Game Dev Studio";
  }, [profile]);

  return (
    <div className="min-h-screen bg-bg text-text-primary transition-colors duration-300 dark:bg-dark-bg dark:text-dark-text-primary">
      <a
        href="#main-content"
        className="sr-only rounded-full bg-primary px-4 py-2 font-mono text-xs text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] dark:bg-dark-primary dark:text-dark-bg"
      >
        Skip to content
      </a>

      <MouseGlow />
      <Navbar />

      <main id="main-content">
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <ModrinthShowcase />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  if (window.location.pathname === "/privacy") {
    return (
      <ThemeProvider>
        <PrivacyPolicy />
      </ThemeProvider>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <ProfileProvider>
          <AppContent />
        </ProfileProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}
