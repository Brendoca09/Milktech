import React, { useState } from 'react';
import { Beef, Menu, X, Globe, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { currentLanguage, setLanguage, t } = useLanguage();

  const languages = [
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode as any);
    setIsLanguageOpen(false);
    console.log('Idioma alterado para:', langCode);
  };

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white/95 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
              <Beef className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Vaca Roxa</span>
          </motion.div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { key: 'howItWorks', href: '#como-funciona' },
              { key: 'benefits', href: '#beneficios' },
              { key: 'testimonials', href: '#depoimentos' },
              { key: 'blog', href: '/blog' }
            ].map((item, index) => (
              <motion.a
                key={item.key}
                href={item.href}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                {t(item.key as any)}
              </motion.a>
            ))}
            
            {/* Language Selector */}
            <div className="relative">
              <motion.button
                className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors font-medium"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                whileHover={{ scale: 1.05 }}
              >
                <Globe className="w-4 h-4" />
                <span>{languages.find(lang => lang.code === currentLanguage)?.flag}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
              </motion.button>
              
              {isLanguageOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[150px] z-50"
                >
                  {languages.map((language) => (
                    <motion.button
                      key={language.code}
                      className="w-full px-4 py-2 text-left hover:bg-purple-50 transition-colors flex items-center space-x-2"
                      onClick={() => handleLanguageChange(language.code)}
                      whileHover={{ backgroundColor: '#f3f4f6' }}
                    >
                      <span>{language.flag}</span>
                      <span className="text-gray-700">{language.name}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </div>
            
            <motion.button 
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-purple-500/25"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {t('requestDemo')}
            </motion.button>
          </nav>

          <motion.button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-purple-100"
          >
            <div className="flex flex-col space-y-4">
              {[
                { key: 'howItWorks', href: '#como-funciona' },
                { key: 'benefits', href: '#beneficios' },
                { key: 'testimonials', href: '#depoimentos' },
                { key: 'blog', href: '/blog' }
              ].map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(item.key as any)}
                </a>
              ))}
              <div className="border-t border-purple-100 pt-4">
                <p className="text-gray-600 text-sm mb-2">{t('language')}:</p>
                {languages.map((language) => (
                  <button
                    key={language.code}
                    className="w-full text-left px-2 py-1 text-gray-700 hover:text-purple-600 transition-colors flex items-center space-x-2"
                    onClick={() => handleLanguageChange(language.code)}
                  >
                    <span>{language.flag}</span>
                    <span>{language.name}</span>
                  </button>
                ))}
              </div>
              <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-lg font-semibold text-left">
                {t('requestDemo')}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;