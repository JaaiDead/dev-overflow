import { useEffect } from 'react'
import { ProfileProvider, useProfile } from './contexts/ProfileContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProfileSwitch from './components/ProfileSwitch'
import ThemeToggle from './components/ThemeToggle'

function AppContent() {
  const { profile } = useProfile()

  useEffect(() => {
    document.title = profile === 'personal' ? 'Jaai · Developer' : 'ArcticQuests · Game Dev Studio'
  }, [profile])

  return (
    <div className="min-h-screen bg-bg dark:bg-dark-bg text-text-primary dark:text-dark-text-primary noise transition-colors duration-300">
      <Navbar />
      {/* Profile switch in top-right */}
      <div className="fixed top-6 right-6 z-50">
        <ProfileSwitch />
      </div>
      {/* Theme toggle below navbar */}
      <div className="fixed top-24 right-6 z-50">
        <ThemeToggle />
      </div>
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <ProfileProvider>
        <AppContent />
      </ProfileProvider>
    </ThemeProvider>
  )
}
