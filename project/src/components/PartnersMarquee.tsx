import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const PartnersMarquee = () => {
  const { t } = useLanguage();
  
  const partners = [
    "Nestlé", "Danone", "Lactalis", "Vigor", "Itambé", "Piracanjuba", 
    "Laticínios Bela Vista", "Cooperativa Central", "Embaré", "Shefa",
    "Leitbom", "Fazenda Bela Vista", "Cooperlac", "Dairy Partners"
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-purple-50 via-white to-purple-50 border-t border-purple-100 relative overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 left-1/4 w-16 h-16 bg-purple-300 rounded-full"></div>
        <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-purple-400 rounded-full"></div>
        <div className="absolute bottom-4 left-1/3 w-20 h-20 bg-purple-200 rounded-full"></div>
        <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-purple-500 rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {t('partnersTitle')} <span className="text-purple-600">{t('partnersTitleHighlight')}</span> {t('partnersTitleEnd')}
          </h3>
          <p className="text-gray-600">{t('partnersSubtitle')}</p>
        </motion.div>

        <div className="relative overflow-hidden bg-white/50 backdrop-blur-sm rounded-2xl py-4 shadow-lg border border-purple-100">
          <motion.div 
            className="flex space-x-12 whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...partners, ...partners].map((partner, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 bg-gradient-to-r from-purple-100 to-purple-200 px-8 py-4 rounded-xl shadow-md border border-purple-200 backdrop-blur-sm"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-lg font-bold text-purple-800">
                  {partner}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PartnersMarquee;