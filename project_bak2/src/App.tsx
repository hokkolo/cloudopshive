import React, { useState, useEffect } from 'react';
import { Cloud, Server, Code, Shield, Check, Mail, Phone, MapPin } from 'lucide-react';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const Logo = () => (
    <div className="relative inline-flex">
      <Cloud className="w-8 h-8 text-amber-400" />
      <div className="absolute -right-1 -bottom-1">
        {/* Bee body */}
        <div className="w-4 h-3 bg-amber-400 rounded-full relative">
          {/* Stripes */}
          <div className="absolute top-0.5 left-0 w-full h-0.5 bg-black opacity-20"></div>
          <div className="absolute top-1.5 left-0 w-full h-0.5 bg-black opacity-20"></div>
          {/* Wings */}
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-white rounded-full opacity-70"></div>
          <div className="absolute -top-1 left-0.5 w-2 h-2 bg-white rounded-full opacity-70"></div>
        </div>
      </div>
    </div>
  );

  const HeroLogo = () => (
    <div className="relative inline-flex">
      <Cloud className="w-16 h-16 text-amber-400" />
      <div className="absolute -right-2 -bottom-2">
        {/* Larger bee for hero section */}
        <div className="w-8 h-6 bg-amber-400 rounded-full relative">
          <div className="absolute top-1 left-0 w-full h-1 bg-black opacity-20"></div>
          <div className="absolute top-3 left-0 w-full h-1 bg-black opacity-20"></div>
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-white rounded-full opacity-70"></div>
          <div className="absolute -top-2 left-1 w-4 h-4 bg-white rounded-full opacity-70"></div>
        </div>
      </div>
    </div>
  );

  const pricingPlans = [
    {
      name: 'Starter Hive',
      price: '$299',
      period: '/month',
      features: [
        'Basic Cloud Infrastructure Setup',
        'Single Environment Pipeline',
        '8/5 Support',
        'Basic Monitoring',
        'Weekly Backups'
      ],
      highlighted: false
    },
    {
      name: 'Growth Hive',
      price: '$599',
      period: '/month',
      features: [
        'Advanced Cloud Architecture',
        'Multi-Environment Pipelines',
        '16/5 Support',
        'Advanced Monitoring',
        'Daily Backups'
      ],
      highlighted: false
    },
    {
      name: 'Enterprise Hive',
      price: '$999',
      period: '/month',
      features: [
        'Enterprise Cloud Solutions',
        'Custom CI/CD Workflows',
        '24/7 Premium Support',
        'Custom Monitoring Solutions',
        'Real-time Backups'
      ],
      highlighted: true
    },
    {
      name: 'Scale Hive',
      price: '$1,499',
      period: '/month',
      features: [
        'Multi-Cloud Architecture',
        'Advanced Security Measures',
        '24/7 Dedicated Support',
        'AI-Powered Monitoring',
        'Disaster Recovery'
      ],
      highlighted: false
    },
    {
      name: 'Custom Hive',
      price: 'Custom',
      period: '',
      features: [
        'Tailored Cloud Solutions',
        'Custom Infrastructure Design',
        'Dedicated Team',
        'Custom SLA',
        'Bespoke Security'
      ],
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Logo />
              <span className="text-xl font-bold text-gray-800 ml-2">CloudOps Hive</span>
            </div>
            <div className="flex space-x-8">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-600 hover:text-amber-500 transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-gray-600 hover:text-amber-500 transition-colors"
              >
                Plans
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-600 hover:text-amber-500 transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center space-y-8">
            <div className="flex justify-center">
              <HeroLogo />
            </div>
            <div>
              <h1 className="text-6xl font-bold text-gray-800 mb-4">CloudOps Hive</h1>
              <p className="text-xl text-amber-600">Cloud & DevOps solutions from expertised Techbees</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center text-gray-600 bg-white px-8 py-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Server className="w-6 h-6 mr-3 text-amber-500" />
                <span>Infrastructure</span>
              </div>
              <div className="flex items-center text-gray-600 bg-white px-8 py-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Code className="w-6 h-6 mr-3 text-amber-500" />
                <span>DevOps</span>
              </div>
              <div className="flex items-center text-gray-600 bg-white px-8 py-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Shield className="w-6 h-6 mr-3 text-amber-500" />
                <span>Security</span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <button 
              onClick={() => scrollToSection('about')}
              className="animate-bounce text-amber-500 hover:text-amber-600 transition-colors"
              aria-label="Scroll to About section"
            >
              <svg 
                className="w-8 h-8" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="container mx-auto px-4 py-32">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">About Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800" 
              alt="Data Center"
              className="rounded-lg shadow-xl"
            />
          </div>
          <div className="space-y-6">
            <p className="text-gray-600 text-lg leading-relaxed">
              CloudOps Hive is your trusted partner in cloud operations and DevOps excellence. With years of experience and a team of dedicated experts, we help businesses transform their infrastructure and development processes.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our mission is to empower organizations with cutting-edge cloud solutions that drive innovation, enhance security, and accelerate growth. We believe in the power of automation, continuous improvement, and strategic partnerships.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-white p-4 rounded-lg text-center shadow-md border-2 border-amber-100">
                <h4 className="text-amber-500 text-2xl font-bold mb-2">500+</h4>
                <p className="text-gray-600">Projects Delivered</p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center shadow-md border-2 border-amber-100">
                <h4 className="text-amber-500 text-2xl font-bold mb-2">99.9%</h4>
                <p className="text-gray-600">Uptime Guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plans Section */}
      <div id="pricing" className="container mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-lg p-6 ${
                plan.highlighted
                  ? 'bg-amber-400 transform scale-105 shadow-xl'
                  : 'bg-white hover:bg-amber-50 border-2 border-amber-100'
              } transition-all duration-300`}
            >
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-800">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <ul className="text-left space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <Check className="w-5 h-5 mr-2 text-amber-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                    plan.highlighted
                      ? 'bg-white text-amber-500 hover:bg-gray-50'
                      : 'bg-amber-400 text-white hover:bg-amber-500'
                  }`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 text-amber-500" />
              <div>
                <h4 className="text-gray-800 font-semibold">Email</h4>
                <p className="text-gray-600">contact@cloudopshive.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="w-6 h-6 text-amber-500" />
              <div>
                <h4 className="text-gray-800 font-semibold">Phone</h4>
                <p className="text-gray-600">+91 9123548371</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="w-6 h-6 text-amber-500" />
              <div>
                <h4 className="text-gray-800 font-semibold">Location</h4>
                <p className="text-gray-600">Sector 7, HSR,Bangalore 560068</p>
              </div>
            </div>
          </div>
          <form className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 bg-white border-2 border-amber-100 rounded-lg focus:outline-none focus:border-amber-400 text-gray-800 placeholder-gray-400"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 bg-white border-2 border-amber-100 rounded-lg focus:outline-none focus:border-amber-400 text-gray-800 placeholder-gray-400"
              />
            </div>
            <div>
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-2 bg-white border-2 border-amber-100 rounded-lg focus:outline-none focus:border-amber-400 text-gray-800 placeholder-gray-400 resize-none"
              ></textarea>
            </div>
            <button className="w-full bg-amber-400 text-white py-2 px-4 rounded-lg font-semibold hover:bg-amber-500 transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-amber-100 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <div className="flex justify-center items-center mb-4">
            <Logo />
            <span className="text-xl font-bold text-gray-800 ml-2">CloudOps Hive</span>
          </div>
          <p>© 2024 CloudOps Hive. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;