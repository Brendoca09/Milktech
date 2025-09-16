import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const CTA = () => {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: ''
  });

  const features = [
    t('ctaFeature1'),
    t('ctaFeature2'),
    t('ctaFeature3'),
    t('ctaFeature4')
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simular envio de email (em produção, isso seria feito via backend)
    const emailData = {
      to: 'brendon.rogerio.bernardi@gmail.com',
      from: 'noreply@vacaroxa.com', // Email padrão configurado
      subject: `Nova Solicitação de Demonstração Vaca Roxa - ${formData.company}`,
      body: `
Nova solicitação de demonstração Vaca Roxa:

Nome: ${formData.name}
Email: ${formData.email}
Empresa: ${formData.company}
Telefone: ${formData.phone}

Data da solicitação: ${new Date().toLocaleString('pt-BR')}

---
Este email foi enviado automaticamente pelo sistema Vaca Roxa.
      `.trim()
    };

    // Em um ambiente real, você faria uma chamada para sua API
    // fetch('/api/send-email', { method: 'POST', body: JSON.stringify(emailData) })
    
    // Por enquanto, vamos simular o envio e mostrar uma confirmação
    alert(`✅ Solicitação enviada com sucesso!\n\nSeus dados foram enviados para nossa equipe e você receberá um retorno em até 2 horas úteis.\n\nObrigado pelo interesse no Vaca Roxa!`);
    
    console.log('Dados que seriam enviados:', emailData);
    
    // Limpar o formulário
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: ''
    });
  };

  return (
    <section className="py-24 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="text-white"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              {t('ctaTitle')} <span className="text-purple-200">{t('ctaTitleHighlight')}</span>{t('ctaTitleEnd')}
            </h2>
            <p className="text-xl text-purple-100 mb-8 leading-relaxed">
              {t('ctaSubtitle')}
            </p>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                >
                  <CheckCircle className="w-5 h-5 text-purple-200 mr-3 flex-shrink-0" />
                  <span className="text-purple-100">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="flex items-center text-purple-200"
                whileHover={{ scale: 1.05 }}
              >
                <Phone className="w-5 h-5 mr-2" />
                <span>(11) 9999-9999</span>
              </motion.div>
              <motion.div 
                className="flex items-center text-purple-200"
                whileHover={{ scale: 1.05 }}
              >
                <Mail className="w-5 h-5 mr-2" />
                <span>contato@milktech.com</span>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-3xl p-8 shadow-2xl"
            initial={{ opacity: 0, x: 50, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {t('ctaFormTitle')}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { id: 'name', label: t('nameLabel'), type: 'text', placeholder: t('namePlaceholder') },
                { id: 'email', label: t('emailLabel'), type: 'email', placeholder: t('emailPlaceholder') },
                { id: 'company', label: t('companyLabel'), type: 'text', placeholder: t('companyPlaceholder') },
                { id: 'phone', label: t('phoneLabel'), type: 'tel', placeholder: t('phonePlaceholder') }
              ].map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor={field.id} className="block text-sm font-semibold text-gray-700 mb-2">
                    {field.label}
                  </label>
                  <motion.input
                    type={field.type}
                    id={field.id}
                    value={formData[field.id as keyof typeof formData]}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder={field.placeholder}
                    whileFocus={{ scale: 1.02 }}
                    required
                  />
                </motion.div>
              ))}
              
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-purple-500/25 flex items-center justify-center group"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {t('requestDemoButton')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </form>
            
            <motion.p 
              className="text-center text-sm text-gray-500 mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              viewport={{ once: true }}
            >
              {t('responseTime')}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;