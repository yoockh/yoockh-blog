import HeroSection from '@/components/sections/HeroSection'
import TechGrid from '@/components/sections/TechGrid'
import ProjectShowcase from '@/components/sections/ProjectShowcase'
import CertificateSlider from '@/components/sections/CertificateSlider'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <TechGrid />
      <ProjectShowcase />
      <CertificateSlider />
      <ContactSection />
    </>
  )
}
