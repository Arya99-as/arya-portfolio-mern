import React, { useState } from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useScrollReveal } from '../hooks/useScrollReveal';

import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Skills } from '../components/Skills';
import { Projects } from '../components/Projects';
import { Experience } from '../components/Experience';
import { PositionsOfResponsibility } from '../components/PositionsOfResponsibility';
import { Education } from '../components/Education';
import { Achievements } from '../components/Achievements';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { BackToTop } from '../components/BackToTop';
import { ResumeModal } from '../components/ResumeModal';
import { AskAryaBot } from '../components/AskAryaBot';
import { AdminDashboard } from '../components/AdminDashboard';

const sectionIds = [
  'hero',
  'about',
  'skills',
  'projects',
  'experience',
  'positions',
  'education',
  'achievements',
  'contact'
];

export function Home() {
  const activeSection = useScrollSpy(sectionIds, 150);
  const revealContainerRef = useScrollReveal();
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const openResumeModal = () => setIsResumeModalOpen(true);
  const closeResumeModal = () => setIsResumeModalOpen(false);

  const toggleAdmin = () => setIsAdminOpen((prev) => !prev);
  const closeAdmin = () => setIsAdminOpen(false);

  return (
    <div ref={revealContainerRef}>
      <Navbar
        activeSection={activeSection}
        onOpenResumeModal={openResumeModal}
        onToggleAdmin={toggleAdmin}
        isAdminOpen={isAdminOpen}
      />
      
      <main>
        <Hero onOpenResumeModal={openResumeModal} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <PositionsOfResponsibility />
        <Education />
        <Achievements />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
      <ResumeModal isOpen={isResumeModalOpen} onClose={closeResumeModal} />
      <AskAryaBot />

      {isAdminOpen && <AdminDashboard onClose={closeAdmin} />}
    </div>
  );
}
