import React from 'react';
import HeroSection from '../components/home/HeroSection';
import AuthoritySection from '../components/home/AuthoritySection';
import SpeedAdvantageSection from '../components/home/SpeedAdvantageSection';
import DemoSection from '../components/home/DemoSection';
import PartnershipModelSection from '../components/home/PartnershipModelSection';
import FrameworksSection from '../components/home/FrameworksSection';
import SocialProofSection from '../components/home/SocialProofSection';
import FinalCTASection from '../components/home/FinalCTASection';

const HomePage = () => {
  return (
    <div className="pt-16">
      <HeroSection />
      <AuthoritySection />
      <SpeedAdvantageSection />
      <DemoSection />
      <PartnershipModelSection />
      <FrameworksSection />
      <SocialProofSection />
      <FinalCTASection />
    </div>
  );
};

export default HomePage;