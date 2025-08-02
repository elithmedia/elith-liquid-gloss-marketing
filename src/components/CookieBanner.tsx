import React, { useState, useEffect } from 'react';
import { X, Settings } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const CookieBanner: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('elith-cookie-consent');
    if (!consent) {
      setIsVisible(true);
    } else {
      // Load analytics scripts if consent was given
      const consentData = JSON.parse(consent);
      if (consentData.analytics) {
        loadAnalyticsScripts();
      }
    }
  }, []);

  const loadAnalyticsScripts = () => {
    // Google Analytics
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
    document.head.appendChild(gaScript);

    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');

    // Meta Pixel
    const fbPixelScript = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}
      (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
    `;
    
    const pixelScript = document.createElement('script');
    pixelScript.innerHTML = fbPixelScript;
    document.head.appendChild(pixelScript);
    
    (window as any).fbq('init', 'FACEBOOK_PIXEL_ID');
    (window as any).fbq('track', 'PageView');
  };

  const handleAcceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('elith-cookie-consent', JSON.stringify(consent));
    loadAnalyticsScripts();
    setIsVisible(false);
  };

  const handleDeclineAll = () => {
    const consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('elith-cookie-consent', JSON.stringify(consent));
    setIsVisible(false);
  };

  const handleSaveSettings = (settings: any) => {
    const consent = {
      necessary: true,
      ...settings,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('elith-cookie-consent', JSON.stringify(consent));
    if (settings.analytics || settings.marketing) {
      loadAnalyticsScripts();
    }
    setIsVisible(false);
    setShowSettings(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="glass-strong rounded-xl border border-glass-border-strong max-w-4xl mx-auto">
        {!showSettings ? (
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Cookie-uri / Cookies</h3>
                <p className="text-sm text-foreground/80 mb-4">
                  {t('cookieMessage')}
                </p>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="glass-button p-2 ml-4"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleAcceptAll}
                className="glass-button px-6 py-2 bg-primary text-primary-foreground"
              >
                {t('cookieAccept')}
              </button>
              <button
                onClick={handleDeclineAll}
                className="glass-button px-6 py-2"
              >
                {t('cookieDecline')}
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="glass-button px-6 py-2 flex items-center space-x-2"
              >
                <Settings className="w-4 h-4" />
                <span>{t('cookieSettings')}</span>
              </button>
            </div>
          </div>
        ) : (
          <CookieSettings 
            onSave={handleSaveSettings}
            onBack={() => setShowSettings(false)}
          />
        )}
      </div>
    </div>
  );
};

const CookieSettings: React.FC<{
  onSave: (settings: any) => void;
  onBack: () => void;
}> = ({ onSave, onBack }) => {
  const [settings, setSettings] = useState({
    analytics: false,
    marketing: false
  });

  const handleSave = () => {
    onSave(settings);
  };

  return (
    <div className="p-6">
      <h3 className="font-semibold mb-4">Setări Cookie-uri / Cookie Settings</h3>
      
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Cookie-uri necesare / Necessary Cookies</h4>
            <p className="text-sm text-foreground/80">
              Esențiale pentru funcționarea site-ului / Essential for website function
            </p>
          </div>
          <input type="checkbox" checked disabled className="opacity-50" />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Cookie-uri de analiză / Analytics Cookies</h4>
            <p className="text-sm text-foreground/80">
              Google Analytics pentru statistici / Google Analytics for statistics
            </p>
          </div>
          <input
            type="checkbox"
            checked={settings.analytics}
            onChange={(e) => setSettings(prev => ({ ...prev, analytics: e.target.checked }))}
            className="glass rounded"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Cookie-uri de marketing / Marketing Cookies</h4>
            <p className="text-sm text-foreground/80">
              Meta Pixel pentru remarketing / Meta Pixel for remarketing
            </p>
          </div>
          <input
            type="checkbox"
            checked={settings.marketing}
            onChange={(e) => setSettings(prev => ({ ...prev, marketing: e.target.checked }))}
            className="glass rounded"
          />
        </div>
      </div>
      
      <div className="flex gap-3">
        <button onClick={handleSave} className="glass-button px-6 py-2 bg-primary text-primary-foreground">
          Salvează / Save
        </button>
        <button onClick={onBack} className="glass-button px-6 py-2">
          Înapoi / Back
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;