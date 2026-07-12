import HeroSection from '@/components/sections/HeroSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import EducationSection from '@/components/sections/EducationSection'
import ProjectShowcase from '@/components/sections/ProjectShowcase'
import CertificateSlider from '@/components/sections/CertificateSlider'
import ContactSection from '@/components/sections/ContactSection'
import CharacterCanvas from '@/components/three/CharacterCanvas'

export default function Home() {
  return (
    <>
      {/* Fixed 3D character canvas — rendered first so positioned section
          content paints above it */}
      <CharacterCanvas />
      <HeroSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectShowcase />
      <CertificateSlider />
      <ContactSection />
    </>
  )
}
