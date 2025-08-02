import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Instagram, ExternalLink } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const PortfolioSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeClient, setActiveClient] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  const clients = [
    {
      name: "Client 1 - Fashion Influencer",
      nameEn: "Client 1 - Fashion Influencer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      socialMedia: [
        { platform: 'instagram', url: 'https://instagram.com', icon: Instagram },
      ],
      content: [
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop", 
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop"
      ]
    },
    {
      name: "Client 2 - Tech Startup",
      nameEn: "Client 2 - Tech Startup",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      socialMedia: [
        { platform: 'instagram', url: 'https://instagram.com', icon: Instagram },
      ],
      content: [
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a?w=400&h=600&fit=crop"
      ]
    }
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % clients[activeClient].content.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => 
      prev === 0 ? clients[activeClient].content.length - 1 : prev - 1
    );
  };

  const handleClientChange = (clientIndex: number) => {
    setActiveClient(clientIndex);
    setActiveSlide(0);
  };

  return (
    <section id="portfolio" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              {t('portfolioTitle')}
            </h2>
            <p className="text-xl text-foreground/80 animate-slide-up">
              {t('portfolioSubtitle')}
            </p>
          </div>

          {/* Client Selection */}
          <div className="flex justify-center space-x-8 mb-12">
            {clients.map((client, index) => (
              <button
                key={index}
                onClick={() => handleClientChange(index)}
                className={`glass-card text-center transition-all duration-300 ${
                  activeClient === index ? 'glass-strong ring-2 ring-glass-border-strong' : ''
                }`}
              >
                <img
                  src={client.avatar}
                  alt={client.name}
                  className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
                />
                <h3 className="font-semibold text-sm mb-2">{client.name}</h3>
                <div className="flex justify-center space-x-2">
                  {client.socialMedia.map((social, socialIndex) => (
                    <a
                      key={socialIndex}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 glass rounded-full hover:glass-strong transition-all"
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </button>
            ))}
          </div>

          {/* Content Slider */}
          <div className="glass-card relative overflow-hidden">
            <div className="relative aspect-[4/5] md:aspect-video">
              <img
                src={clients[activeClient].content[activeSlide]}
                alt={`Content ${activeSlide + 1}`}
                className="w-full h-full object-cover rounded-xl"
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 glass-button p-3 rounded-full"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 glass-button p-3 rounded-full"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {clients[activeClient].content.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeSlide === index ? 'bg-foreground' : 'bg-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* View More Link */}
          <div className="text-center mt-8">
            <a
              href={clients[activeClient].socialMedia[0]?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button inline-flex items-center space-x-2"
            >
              <span>Vezi mai multe pe Instagram</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;