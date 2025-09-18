import React from 'react';
import { Check, Star, Zap, Shield, Headphones, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Pricing = () => {
  const { t } = useLanguage();

  const plans = [
    {
      name: 'Raquete Inteligente',
      description: 'Sistema completo de análise de leite com raquete portátil',
      price: 'R$ 12.500',
      originalPrice: 'R$ 15.000',
      period: 'à vista',
      installments: '12x de R$ 1.250',
      popular: false,
      features: [
        'Raquete inteligente com sensores avançados',
        'Análise instantânea em 30 segundos',
        'Precisão de 99.8% nos resultados',
        'Conectividade Wi-Fi e Bluetooth',
        'App móvel para iOS e Android',
        'Relatórios em tempo real',
        'Suporte técnico por 1 ano',
        'Treinamento da equipe incluído'
      ],
      color: 'purple',
      icon: Zap
    },
    {
      name: 'Kit Completo Premium',
      description: 'Raquete + Tornozeleira eletrônica para monitoramento bovino',
      price: 'R$ 18.900',
      originalPrice: 'R$ 22.000',
      period: 'à vista',
      installments: '18x de R$ 1.250',
      popular: true,
      features: [
        'Raquete inteligente completa',
        'Tornozeleira eletrônica IoT',
        'Monitoramento 24/7 do rebanho',
        'Alertas de saúde e reprodução',
        'Dashboard web completo',
        'Integração com sistemas ERP',
        'Análise preditiva com IA',
        'Suporte premium por 2 anos',
        'Consultoria especializada',
        'Atualizações gratuitas'
      ],
      color: 'gradient',
      icon: Award
    },
    {
      name: 'Tornozeleira IoT',
      description: 'Monitoramento inteligente individual para bovinos',
      price: 'R$ 890',
      originalPrice: 'R$ 1.200',
      period: 'por unidade',
      installments: '6x de R$ 178',
      popular: false,
      features: [
        'Sensor de movimento e temperatura',
        'Bateria de longa duração (6 meses)',
        'Resistente à água IP67',
        'Conectividade LoRaWAN',
        'Alertas em tempo real',
        'Histórico de dados completo',
        'Fácil instalação',
        'Garantia de 2 anos'
      ],
      color: 'blue',
      icon: Shield
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const getCardClasses = (plan: any) => {
    if (plan.popular) {
      return "bg-gradient-to-br from-purple-600 to-purple-700 text-white transform scale-105 shadow-2xl border-4 border-purple-300";
    }
    return "bg-white text-gray-900 shadow-lg border border-gray-200 hover:shadow-xl";
  };

  const getButtonClasses = (plan: any) => {
    if (plan.popular) {
      return "bg-white text-purple-600 hover:bg-purple-50";
    }
    if (plan.color === 'blue') {
      return "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800";
    }
    return "bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800";
  };

  return (
    <section id="precos" className="py-24 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Escolha o <span className="text-purple-600">Plano Ideal</span> para Seu Negócio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Soluções completas de análise de leite e monitoramento bovino com tecnologia de ponta
          </p>
          <div className="mt-6 inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
            <Star className="w-4 h-4 mr-2" />
            Promoção de Lançamento - Até 25% OFF
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {plans.map((plan, index) => (
            <motion.div 
              key={index} 
              className={`relative rounded-3xl p-8 transition-all duration-300 ${getCardClasses(plan)}`}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    🔥 MAIS POPULAR
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <motion.div 
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                    plan.popular ? 'bg-white/20' : 'bg-purple-100'
                  }`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <plan.icon className={`w-8 h-8 ${plan.popular ? 'text-white' : 'text-purple-600'}`} />
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={`text-sm ${plan.popular ? 'text-purple-100' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
              </div>

              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-2">
                  <span className={`text-lg line-through ${plan.popular ? 'text-purple-200' : 'text-gray-400'}`}>
                    {plan.originalPrice}
                  </span>
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold ml-2">
                    -{Math.round((1 - parseFloat(plan.price.replace(/[^\d]/g, '')) / parseFloat(plan.originalPrice.replace(/[^\d]/g, ''))) * 100)}%
                  </span>
                </div>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={`ml-2 ${plan.popular ? 'text-purple-200' : 'text-gray-600'}`}>
                    {plan.period}
                  </span>
                </div>
                <p className={`text-sm mt-2 ${plan.popular ? 'text-purple-200' : 'text-gray-500'}`}>
                  ou {plan.installments}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <motion.li 
                    key={featureIndex} 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * featureIndex, duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <Check className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                      plan.popular ? 'text-green-300' : 'text-green-500'
                    }`} />
                    <span className={`text-sm ${plan.popular ? 'text-purple-100' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <motion.button
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg ${getButtonClasses(plan)}`}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Solicitar Orçamento
              </motion.button>

              <div className="mt-4 text-center">
                <div className="flex items-center justify-center space-x-4 text-xs">
                  <div className="flex items-center">
                    <Headphones className={`w-4 h-4 mr-1 ${plan.popular ? 'text-purple-200' : 'text-gray-500'}`} />
                    <span className={plan.popular ? 'text-purple-200' : 'text-gray-500'}>
                      Suporte 24/7
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Shield className={`w-4 h-4 mr-1 ${plan.popular ? 'text-purple-200' : 'text-gray-500'}`} />
                    <span className={plan.popular ? 'text-purple-200' : 'text-gray-500'}>
                      Garantia
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              🎯 Oferta Especial de Lançamento
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Demonstração Gratuita</h4>
                <p className="text-gray-600 text-sm">30 dias de teste sem compromisso</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <Headphones className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Suporte Especializado</h4>
                <p className="text-gray-600 text-sm">Equipe técnica dedicada</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">ROI Garantido</h4>
                <p className="text-gray-600 text-sm">Retorno em até 6 meses</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;