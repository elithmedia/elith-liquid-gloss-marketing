import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Get reCAPTCHA token
      const recaptchaResponse = (window as any).grecaptcha.getResponse();
      if (!recaptchaResponse) {
        alert('Vă rugăm să completați reCAPTCHA / Please complete the reCAPTCHA');
        setIsSubmitting(false);
        return;
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken: recaptchaResponse
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        (window as any).grecaptcha.reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              {t('contactTitle')}
            </h2>
            <p className="text-xl text-foreground/80 animate-slide-up">
              {t('contactSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="glass-card">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-foreground/70 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Adresă / Address</h3>
                    <p className="text-foreground/80">
                      Strada Exemplu 123<br />
                      București, România<br />
                      Cod poștal: 010101
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card">
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-foreground/70 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Telefon / Phone</h3>
                    <p className="text-foreground/80">+40 XXX XXX XXX</p>
                  </div>
                </div>
              </div>

              <div className="glass-card">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-foreground/70 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-foreground/80">contact@elithmedia.ro</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-card">
              {submitStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-400" />
                  </div>
                  <p className="text-green-400 text-lg">{t('contactSuccess')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        {t('contactName')} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t('contactNamePlaceholder')}
                        className="w-full px-4 py-3 glass rounded-xl border border-glass-border focus:outline-none focus:ring-2 focus:ring-glass-border-strong bg-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        {t('contactEmail')} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t('contactEmailPlaceholder')}
                        className="w-full px-4 py-3 glass rounded-xl border border-glass-border focus:outline-none focus:ring-2 focus:ring-glass-border-strong bg-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      {t('contactPhone')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t('contactPhonePlaceholder')}
                      className="w-full px-4 py-3 glass rounded-xl border border-glass-border focus:outline-none focus:ring-2 focus:ring-glass-border-strong bg-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      {t('contactMessage')} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t('contactMessagePlaceholder')}
                      className="w-full px-4 py-3 glass rounded-xl border border-glass-border focus:outline-none focus:ring-2 focus:ring-glass-border-strong bg-transparent resize-none"
                    />
                  </div>

                  {/* reCAPTCHA */}
                  <div className="flex justify-center">
                    <div 
                      className="g-recaptcha" 
                      data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <p className="text-red-400 text-center">{t('contactError')}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full glass-button flex items-center justify-center space-x-2 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{isSubmitting ? 'Se trimite...' : t('contactSubmit')}</span>
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;