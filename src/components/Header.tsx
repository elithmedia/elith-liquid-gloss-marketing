import React, { useState, useEffect } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const Header: React.FC = () => {
  const { currentLanguage, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const toggleLanguage = () => {
    setLanguage(currentLanguage === 'ro' ? 'en' : 'ro');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'glass-strong border-b border-glass-border-strong' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Elith Media
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              {t('about')}
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              {t('portfolio')}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              {t('contact')}
            </button>
          </nav>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="glass-button flex items-center space-x-2 text-sm"
            >
              <Globe className="w-4 h-4" />
              <span>{currentLanguage.toUpperCase()}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden glass-button p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 glass rounded-xl border border-glass-border">
            <div className="flex flex-col space-y-4 p-4">
              <button
                onClick={() => scrollToSection('about')}
                className="text-left text-foreground/80 hover:text-foreground transition-colors"
              >
                {t('about')}
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="text-left text-foreground/80 hover:text-foreground transition-colors"
              >
                {t('portfolio')}
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left text-foreground/80 hover:text-foreground transition-colors"
              >
                {t('contact')}
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;