import React from 'react';
import { X } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy' | 'cookies';
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  const { currentLanguage } = useLanguage();

  if (!isOpen) return null;

  const content = {
    terms: {
      ro: {
        title: 'Termeni și Condiții',
        content: `
          <h3>1. Informații generale</h3>
          <p>Prezentul site web este operat de Elith Media, cu sediul în București, România.</p>
          <p>CUI: RO[XXXXXXXX], J40/[XXXX]/2020</p>
          
          <h3>2. Utilizarea site-ului</h3>
          <p>Prin accesarea acestui site, acceptați să respectați acești termeni și condiții. Nu utilizați site-ul dacă nu sunteți de acord cu oricare dintre aceștia.</p>
          
          <h3>3. Proprietatea intelectuală</h3>
          <p>Conținutul acestui site, inclusiv textele, imaginile, logo-urile și design-ul, sunt proprietatea Elith Media și sunt protejate de legile drepturilor de autor.</p>
          
          <h3>4. Limitarea răspunderii</h3>
          <p>Elith Media nu își asumă responsabilitatea pentru eventualele daune care ar putea rezulta din utilizarea acestui site.</p>
          
          <h3>5. Contact</h3>
          <p>Pentru întrebări referitoare la acești termeni, ne puteți contacta la: contact@elithmedia.ro</p>
        `
      },
      en: {
        title: 'Terms and Conditions',
        content: `
          <h3>1. General Information</h3>
          <p>This website is operated by Elith Media, headquartered in Bucharest, Romania.</p>
          <p>Tax ID: RO[XXXXXXXX], Company Registration: J40/[XXXX]/2020</p>
          
          <h3>2. Use of the Website</h3>
          <p>By accessing this website, you agree to comply with these terms and conditions. Do not use the site if you disagree with any of these terms.</p>
          
          <h3>3. Intellectual Property</h3>
          <p>The content of this site, including texts, images, logos and design, are the property of Elith Media and are protected by copyright laws.</p>
          
          <h3>4. Limitation of Liability</h3>
          <p>Elith Media assumes no responsibility for any damages that may result from the use of this website.</p>
          
          <h3>5. Contact</h3>
          <p>For questions regarding these terms, you can contact us at: contact@elithmedia.ro</p>
        `
      }
    },
    privacy: {
      ro: {
        title: 'Politica de Confidențialitate',
        content: `
          <h3>1. Introducere</h3>
          <p>Elith Media respectă confidențialitatea dvs. și se angajează să protejeze datele personale pe care ni le furnizați.</p>
          
          <h3>2. Datele pe care le colectăm</h3>
          <p>Colectăm următoarele tipuri de date:</p>
          <ul>
            <li>Informații de contact: nume, email, telefon</li>
            <li>Mesajele trimise prin formularul de contact</li>
            <li>Date de navigare prin Google Analytics</li>
          </ul>
          
          <h3>3. Cum folosim datele</h3>
          <p>Folosim datele pentru:</p>
          <ul>
            <li>Răspunderea la întrebările dvs.</li>
            <li>Îmbunătățirea serviciilor noastre</li>
            <li>Analize statistice ale traficului web</li>
          </ul>
          
          <h3>4. Partajarea datelor</h3>
          <p>Nu partajăm datele dvs. cu terțe părți, cu excepția:</p>
          <ul>
            <li>Google Analytics pentru analize</li>
            <li>Meta Pixel pentru remarketing (cu acordul dvs.)</li>
          </ul>
          
          <h3>5. Drepturile dvs. GDPR</h3>
          <p>Aveți dreptul să:</p>
          <ul>
            <li>Accesați datele personale</li>
            <li>Rectificați datele incorecte</li>
            <li>Ștergeți datele (dreptul la uitare)</li>
            <li>Limitați prelucrarea</li>
            <li>Portabilitatea datelor</li>
          </ul>
          
          <h3>6. Contact</h3>
          <p>Pentru exercitarea drepturilor sau întrebări: contact@elithmedia.ro</p>
        `
      },
      en: {
        title: 'Privacy Policy',
        content: `
          <h3>1. Introduction</h3>
          <p>Elith Media respects your privacy and is committed to protecting the personal data you provide to us.</p>
          
          <h3>2. Data We Collect</h3>
          <p>We collect the following types of data:</p>
          <ul>
            <li>Contact information: name, email, phone</li>
            <li>Messages sent through the contact form</li>
            <li>Browsing data through Google Analytics</li>
          </ul>
          
          <h3>3. How We Use Data</h3>
          <p>We use data for:</p>
          <ul>
            <li>Responding to your inquiries</li>
            <li>Improving our services</li>
            <li>Statistical analysis of web traffic</li>
          </ul>
          
          <h3>4. Data Sharing</h3>
          <p>We do not share your data with third parties, except:</p>
          <ul>
            <li>Google Analytics for analysis</li>
            <li>Meta Pixel for remarketing (with your consent)</li>
          </ul>
          
          <h3>5. Your GDPR Rights</h3>
          <p>You have the right to:</p>
          <ul>
            <li>Access personal data</li>
            <li>Rectify incorrect data</li>
            <li>Delete data (right to be forgotten)</li>
            <li>Limit processing</li>
            <li>Data portability</li>
          </ul>
          
          <h3>6. Contact</h3>
          <p>To exercise your rights or for questions: contact@elithmedia.ro</p>
        `
      }
    },
    cookies: {
      ro: {
        title: 'Politica de Cookies',
        content: `
          <h3>1. Ce sunt cookie-urile?</h3>
          <p>Cookie-urile sunt fișiere mici de text stocate pe dispozitivul dvs. când vizitați un site web.</p>
          
          <h3>2. Tipuri de cookie-uri folosite</h3>
          
          <h4>Cookie-uri necesare</h4>
          <p>Esențiale pentru funcționarea site-ului:</p>
          <ul>
            <li>Preferințe de limbă</li>
            <li>Sesiunea de navigare</li>
          </ul>
          
          <h4>Cookie-uri de analiză</h4>
          <p>Google Analytics:</p>
          <ul>
            <li>_ga - identificare utilizatori unici</li>
            <li>_ga_* - menținerea stării sesiunii</li>
            <li>Durata: până la 2 ani</li>
          </ul>
          
          <h4>Cookie-uri de marketing</h4>
          <p>Meta Pixel:</p>
          <ul>
            <li>_fbp - urmărire conversii</li>
            <li>Durata: 90 de zile</li>
          </ul>
          
          <h3>3. Gestionarea cookie-urilor</h3>
          <p>Puteți gestiona cookie-urile prin:</p>
          <ul>
            <li>Setările banner-ului de consimțământ</li>
            <li>Setările browser-ului dvs.</li>
            <li>Instrumente de opt-out ale furnizorilor</li>
          </ul>
          
          <h3>4. Contact</h3>
          <p>Pentru întrebări: contact@elithmedia.ro</p>
        `
      },
      en: {
        title: 'Cookie Policy',
        content: `
          <h3>1. What are cookies?</h3>
          <p>Cookies are small text files stored on your device when you visit a website.</p>
          
          <h3>2. Types of cookies used</h3>
          
          <h4>Necessary cookies</h4>
          <p>Essential for website functionality:</p>
          <ul>
            <li>Language preferences</li>
            <li>Browsing session</li>
          </ul>
          
          <h4>Analytics cookies</h4>
          <p>Google Analytics:</p>
          <ul>
            <li>_ga - identify unique users</li>
            <li>_ga_* - maintain session state</li>
            <li>Duration: up to 2 years</li>
          </ul>
          
          <h4>Marketing cookies</h4>
          <p>Meta Pixel:</p>
          <ul>
            <li>_fbp - conversion tracking</li>
            <li>Duration: 90 days</li>
          </ul>
          
          <h3>3. Managing cookies</h3>
          <p>You can manage cookies through:</p>
          <ul>
            <li>Consent banner settings</li>
            <li>Your browser settings</li>
            <li>Provider opt-out tools</li>
          </ul>
          
          <h3>4. Contact</h3>
          <p>For questions: contact@elithmedia.ro</p>
        `
      }
    }
  };

  const currentContent = content[type][currentLanguage];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="glass-strong rounded-2xl border border-glass-border-strong max-w-4xl max-h-[80vh] w-full overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-glass-border">
          <h2 className="text-2xl font-bold">{currentContent.title}</h2>
          <button
            onClick={onClose}
            className="glass-button p-2 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div 
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: currentContent.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default LegalModal;