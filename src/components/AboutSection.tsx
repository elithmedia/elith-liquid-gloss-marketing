import React from 'react';
import { Users, Target, Lightbulb, TrendingUp } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Users,
      title: 'Echipă Experimentată',
      titleEn: 'Experienced Team',
    },
    {
      icon: Target,
      title: 'Strategii Personalizate',
      titleEn: 'Custom Strategies',
    },
    {
      icon: Lightbulb,
      title: 'Creativitate',
      titleEn: 'Creativity',
    },
    {
      icon: TrendingUp,
      title: 'Rezultate Măsurabile',
      titleEn: 'Measurable Results',
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              {t('aboutTitle')}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <p className="text-lg text-foreground/80 leading-relaxed animate-slide-up">
                {t('aboutText1')}
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed animate-slide-up">
                {t('aboutText2')}
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed animate-slide-up">
                {t('aboutText3')}
              </p>
            </div>

            <div className="glass-card animate-slide-up">
              <div className="aspect-video bg-gradient-glass rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <Users className="w-16 h-16 mx-auto mb-4 text-foreground/60" />
                  <p className="text-foreground/80">Team Photo Placeholder</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-card text-center group hover:glass-strong transition-all duration-300"
              >
                <feature.icon className="w-8 h-8 mx-auto mb-4 text-foreground/70 group-hover:text-foreground transition-colors" />
                <h3 className="font-semibold text-sm md:text-base">
                  {/* Display title based on current language */}
                  {/* Since we don't have these in translations, we'll use a simple approach */}
                  {index === 0 && 'Echipă Experimentată'}
                  {index === 1 && 'Strategii Personalizate'}
                  {index === 2 && 'Creativitate'}
                  {index === 3 && 'Rezultate Măsurabile'}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;