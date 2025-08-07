import React, { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import LegalModal from './LegalPages';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | 'cookies' | null>(null);

  const openModal = (type: 'terms' | 'privacy' | 'cookies') => {
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <footer className="py-12 border-t border-glass-border">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <div className="text-2xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
                Elith Media
              </div>
              <p className="text-foreground/80 mb-4">
                {t('footerTagline')}
              </p>
              <div className="space-y-2 text-sm text-foreground/70">
                <p>CUI: RO[XXXXXXXX]</p>
                <p>J40/[XXXX]/2020</p>
              </div>
            </div>

            {/* Contact Details */}
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-foreground/70" />
                  <span className="text-foreground/80">
                    Strada Piata Presei Libere 1, Corp A3, Et. 4, București
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-foreground/70" />
                  <span className="text-foreground/80">+40 757 069 034</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-foreground/70" />
                  <span className="text-foreground/80">contact@elithmedia.ro</span>
                </div>
              </div>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <div className="space-y-2 text-sm">
                <button
                  onClick={() => openModal('terms')}
                  className="block text-foreground/80 hover:text-foreground transition-colors"
                >
                  {t('footerTerms')}
                </button>
                <button
                  onClick={() => openModal('privacy')}
                  className="block text-foreground/80 hover:text-foreground transition-colors"
                >
                  {t('footerPrivacy')}
                </button>
                <button
                  onClick={() => openModal('cookies')}
                  className="block text-foreground/80 hover:text-foreground transition-colors"
                >
                  {t('footerCookies')}
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-glass-border mt-8 pt-8 text-center text-sm text-foreground/70">
            <p>{t('footerCopyright')}</p>
          </div>
        </div>
      </div>
      
      {/* Legal Modals */}
      <LegalModal
        isOpen={activeModal !== null}
        onClose={closeModal}
        type={activeModal || 'terms'}
      />
    </footer>
  );
};

export default Footer;
