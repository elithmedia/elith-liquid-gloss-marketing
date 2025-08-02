import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import heroImage from '../assets/hero-bg.jpg';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in text-shadow-glow">
            {t('heroTitle')}
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 animate-slide-up">
            {t('heroSubtitle')}
          </p>
          
          <button
            onClick={scrollToContact}
            className="glass-button inline-flex items-center space-x-2 text-lg px-8 py-4 animate-slide-up group"
          >
            <span>{t('heroButton')}</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 glass rounded-full animate-float opacity-30" />
      <div className="absolute top-1/3 right-20 w-16 h-16 glass rounded-full animate-float-delayed opacity-20" />
      <div className="absolute bottom-1/4 left-1/4 w-12 h-12 glass rounded-full animate-float opacity-25" />
    </section>
  );
};

export default HeroSection;