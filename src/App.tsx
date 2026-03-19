import { useEffect } from 'react'
import { ProfileProvider, useProfile } from './contexts/ProfileContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProfileSwitch from './components/ProfileSwitch'

function AppContent() {
  const { profile } = useProfile()

  useEffect(() => {
    document.title = profile === 'personal' ? 'Jaai · Developer' : 'ArcticQuests · Game Dev Studio'
  }, [profile])

  return (
    <div className="min-h-screen bg-bg text-white noise">
      <Navbar />
      <ProfileSwitch />
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
    <ProfileProvider>
      <AppContent />
    </ProfileProvider>
  )
}
