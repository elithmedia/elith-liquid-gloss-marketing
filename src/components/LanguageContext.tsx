import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ro' | 'en';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ro: {
    // Navigation
    about: "Despre Noi",
    portfolio: "Portofoliu", 
    contact: "Contact",
    
    // Hero Section
    heroTitle: "Agenție de marketing digital orientată spre viitor",
    heroSubtitle: "Transformăm ideile în strategii digitale de succes prin creativitate, inovație și rezultate măsurabile.",
    heroButton: "Contactează-ne",
    
    // About Section
    aboutTitle: "Despre Noi",
    aboutText1: "Elith Media a fost fondată în 2020 de o echipă pasionată de marketing digital și creativitate. Cu peste 4 ani de experiență în domeniu, ne-am specializat în promovarea brandurilor pe platformele sociale și în crearea de conținut viral.",
    aboutText2: "Echipa noastră combină creativitatea cu analiza datelor pentru a livra campanii care nu doar că captivează audiența, ci și generează rezultate concrete. De la strategii de social media la producție video și fotografie, oferim servicii complete de marketing digital.",
    aboutText3: "Lucram cu influenceri, companii locale și branduri internaționale, adaptându-ne întotdeauna la specificul fiecărui client și la tendințele din mediul online.",
    
    // Portfolio Section
    portfolioTitle: "Portofoliu",
    portfolioSubtitle: "Rezultatele vorbesc de la sine – iată câțiva dintre clienții noștri și campaniile derulate:",
    
    // Contact Section
    contactTitle: "Contactează-ne",
    contactSubtitle: "Ai un proiect în minte? Hai să discutăm.",
    contactName: "Nume",
    contactNamePlaceholder: "Numele tău",
    contactEmail: "Email",
    contactEmailPlaceholder: "Email-ul tău",
    contactPhone: "Telefon",
    contactPhonePlaceholder: "Numărul tău de telefon",
    contactMessage: "Mesaj",
    contactMessagePlaceholder: "Descrie-ne proiectul tău...",
    contactSubmit: "Trimite",
    contactSuccess: "Mulțumim! Mesajul tău a fost trimis. Îți vom răspunde în curând.",
    contactError: "A apărut o eroare. Te rugăm să încerci din nou.",
    
    // Footer
    footerTagline: "Marketing digital orientat spre viitor",
    footerCopyright: "© 2025 Elith Media - Toate drepturile rezervate.",
    footerTerms: "Termeni și Condiții",
    footerPrivacy: "Politica de Confidențialitate", 
    footerCookies: "Politica de Cookies",
    
    // Cookie Banner
    cookieMessage: "Acest site folosește cookie-uri pentru a îmbunătăți experiența utilizatorului și pentru analiză. Vă rugăm să vă exprimați acordul.",
    cookieAccept: "Acceptă toate",
    cookieDecline: "Respinge",
    cookieSettings: "Setări",
  },
  
  en: {
    // Navigation
    about: "About Us",
    portfolio: "Portfolio",
    contact: "Contact",
    
    // Hero Section
    heroTitle: "Future-Oriented Digital Marketing Agency",
    heroSubtitle: "We transform ideas into successful digital strategies through creativity, innovation, and measurable results.",
    heroButton: "Contact Us",
    
    // About Section
    aboutTitle: "About Us",
    aboutText1: "Elith Media was founded in 2020 by a team passionate about digital marketing and creativity. With over 4 years of experience in the field, we specialize in promoting brands on social platforms and creating viral content.",
    aboutText2: "Our team combines creativity with data analysis to deliver campaigns that not only captivate audiences but also generate concrete results. From social media strategies to video production and photography, we offer complete digital marketing services.",
    aboutText3: "We work with influencers, local companies, and international brands, always adapting to each client's specifics and online trends.",
    
    // Portfolio Section
    portfolioTitle: "Portfolio",
    portfolioSubtitle: "Results speak for themselves – here are some of our clients and the campaigns we ran for them:",
    
    // Contact Section
    contactTitle: "Contact Us",
    contactSubtitle: "Have a project in mind? Let's talk.",
    contactName: "Name",
    contactNamePlaceholder: "Your name",
    contactEmail: "Email",
    contactEmailPlaceholder: "Your email",
    contactPhone: "Phone",
    contactPhonePlaceholder: "Your phone number",
    contactMessage: "Message",
    contactMessagePlaceholder: "Tell us about your project...",
    contactSubmit: "Send",
    contactSuccess: "Thank you! Your message has been sent. We will get back to you shortly.",
    contactError: "An error occurred. Please try again.",
    
    // Footer
    footerTagline: "Future-oriented digital marketing",
    footerCopyright: "© 2025 Elith Media - All rights reserved.",
    footerTerms: "Terms & Conditions",
    footerPrivacy: "Privacy Policy",
    footerCookies: "Cookie Policy",
    
    // Cookie Banner
    cookieMessage: "This site uses cookies to improve user experience and for analytics. Please express your consent.",
    cookieAccept: "Accept All",
    cookieDecline: "Decline",
    cookieSettings: "Preferences",
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('ro');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('elith-language') as Language;
    const urlParams = new URLSearchParams(window.location.search);
    const urlLanguage = urlParams.get('lang') as Language;
    
    if (urlLanguage && ['ro', 'en'].includes(urlLanguage)) {
      setCurrentLanguage(urlLanguage);
      localStorage.setItem('elith-language', urlLanguage);
    } else if (savedLanguage && ['ro', 'en'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('elith-language', lang);
    
    // Update URL without page reload
    const url = new URL(window.location.href);
    if (lang === 'en') {
      url.searchParams.set('lang', 'en');
    } else {
      url.searchParams.delete('lang');
    }
    window.history.replaceState({}, '', url.toString());
  };

  const t = (key: string): string => {
    return translations[currentLanguage][key as keyof typeof translations['ro']] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};