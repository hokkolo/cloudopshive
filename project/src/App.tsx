import React, { useState, useEffect } from 'react';
import { Cloud, Server, Code, Shield, Check, Mail, Phone, MapPin, X } from 'lucide-react';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    requirements: ''
  });
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

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

  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to database
      // const dbResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/handle-inquiry`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      //   },
      //   body: JSON.stringify({
      //     ...formData,
      //     selectedPlan,
      //   }),
      // });

      // if (!dbResponse.ok) {
      //   throw new Error('Failed to save inquiry');
      // }

      // Send email
      const emailResponse = await fetch(`https://cloudopshive.azurewebsites.net/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          r_email: formData.email,
          e_subject: "CloudOps Hive",
          e_plan: selectedPlan,
          e_req: formData.requirements,
          e_name: formData.name
          //e_body: "`Name: $name\nEmail: ${email}\nCompany: ${company}\nSelected Plan: ${selectedPlan}\nRequirements: ${requirements}\n\nThis inquiry was automatically generated from the CloudOps Hive website.`"
        }),
      });

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        console.error('Email sending failed:', {
          status: emailResponse.status,
          statusText: emailResponse.statusText,
          error: errorText
        });
        throw new Error('Failed to send email');
      }

      alert('Thank you for your interest! We will contact you soon.');
      setShowModal(false);
      setFormData({ name: '', email: '', company: '', requirements: '' });
    } catch (error) {
      console.error('Error:', error);
      alert('Sorry, there was an error sending your request. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleContactSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
  
      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
        if (!supabaseUrl || !supabaseKey) {
          throw new Error('Missing Supabase configuration');
        }
  
        const emailResponse = await fetch(`https://cloudopshive.azurewebsites.net/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            c_name: contactForm.name,
            c_email: contactForm.email,
            c_requirements: contactForm.message,
            type: 'contact'
          })
        });
  
        if (!emailResponse.ok) {
          const errorText = await emailResponse.text();
          throw new Error(`Failed to send message: ${emailResponse.status} ${errorText || emailResponse.statusText}`);
        }
  
        showNotificationMessage('Thank you for your message! We will get back to you soon.');
        setContactForm({ name: '', email: '', message: '' });
      } catch (error) {
        console.error('Contact submission error:', error);
        showNotificationMessage(error instanceof Error ? error.message : 'Sorry, there was an error sending your message. Please try again later.');
      } finally {
        setIsSubmitting(false);
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
      price: 'Starting $10',
      period: '/task',
      features: [
        'One time tasks',
        'Single Environment Pipeline',
        'One time Troubleshooting Linux Servers',
        'Deploy app to Cloud'
      ],
      highlighted: false
    },
    {
      name: 'Growth Hive',
      price: 'Starting $50',
      period: '/project',
      features: [
        'Project Management Onboarding',
        'Design Project Architecture',
        'Setup Branching policies',
        'One CI-CD Pipeline',
        'Self-hosted Agent Setup'
      ],
      highlighted: false
    },
    {
      name: 'Enterprise Hive',
      price: 'Starting $150',
      period: '/project',
      features: [
        'Project Management Onboarding',
        'Cloud Artichecture design',
        'Cloud Deployment',
        'DevOps Architecture',
        'Infra Automation'
      ],
      highlighted: true
    },
    {
      name: 'Scale Hive',
      price: 'Starting $100',
      period: '/project',
      features: [
        'Cloud Infrastructure Security Analysis',
        'Cloud Resource Optimization',
        'Cloud Cost Optimization Suggestions',
        'Auto Scaling deployment'
      ],
      highlighted: false
    },
    {
      name: 'Custom Hive',
      price: 'Custom',
      period: '',
      features: [
        'Kubernetes solution on AWS/Azure',
        'Argo CD for Kubernetes',
        'Cast AI for Kubernetes',
        'Monitoring Solution for Kubernetes and Instances',
        'Application Containerizing'
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
                  onClick={() => handlePlanSelect(plan.name)}
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
                <p className="text-gray-600">Sector 7 HSR, Bangalore, 560068</p>
              </div>
            </div>
          </div>
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                required
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                placeholder="Your Name"
                className="w-full px-4 py-2 bg-white border-2 border-amber-100 rounded-lg focus:outline-none focus:border-amber-400 text-gray-800 placeholder-gray-400"
              />
            </div>
            <div>
              <input
                type="email"
                required
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                placeholder="Your Email"
                className="w-full px-4 py-2 bg-white border-2 border-amber-100 rounded-lg focus:outline-none focus:border-amber-400 text-gray-800 placeholder-gray-400"
              />
            </div>
            <div>
              <textarea
                required
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-2 bg-white border-2 border-amber-100 rounded-lg focus:outline-none focus:border-amber-400 text-gray-800 placeholder-gray-400 resize-none"
              ></textarea>
            </div>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-400 text-white py-2 px-4 rounded-lg font-semibold hover:bg-amber-500 transition-colors">
              {isSubmitting ? 'Sending...' : 'Send Message'}
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

      {/* Plan Selection Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Get Started with {selectedPlan}</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-amber-100 rounded-lg focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-amber-100 rounded-lg focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Company Name"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-amber-100 rounded-lg focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <textarea
                  placeholder="Project Requirements"
                  required
                  value={formData.requirements}
                  onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2 border-2 border-amber-100 rounded-lg focus:outline-none focus:border-amber-400 resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-amber-400 text-white py-2 px-4 rounded-lg font-semibold transition-colors ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-amber-500'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;