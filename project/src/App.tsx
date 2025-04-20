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

  const plans = [
    {
      name: 'Starter Hive',
      price: 'Starting $10/task',
      features: [
        'One time tasks',
        'Single Environment Pipeline',
        'One time Troubleshooting Linux Servers',
        'Deploy app to Cloud'
      ]
    },
    {
      name: 'Growth Hive',
      price: 'Starting $50/project',
      features: [
        'Project Management Onboarding',
        'Design Project Architecture',
        'Setup Branching policies',
        'One CI-CD Pipeline',
        'Self-hosted Agent Setup'
      ]
    },
    {
      name: 'Enterprise Hive',
      price: 'Starting $150/Project',
      features: [
        'Project Management Onboarding',
        'Cloud Artichecture design',
        'Cloud Deployment',
        'DevOps Architecture',
        'Infra Automation'
      ]
    },
    {
      name: 'Scale Hive',
      price: 'Starting $100/Project',
      features: [
        'Cloud Infrastructure Security Analysis',
        'Cloud Resource Optimization',
        'Cloud Cost Optimization Suggestions',
        'Auto Scaling deployment'
      ]
    },
    {
      name: 'Custom Hive',
      price: 'Contact us',
      features: [
        'Kubernetes solution on AWS/Azure',
        'Argo CD for Kubernetes',
        'Cast AI for Kubernetes',
        'Monitoring Solution for Kubernetes and Instances',
        'Application Containerizing'
      ]
    }
  ];

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
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Missing Supabase configuration');
      }

      const inquiryResponse = await fetch(`${supabaseUrl}/functions/v1/handle-inquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          selectedPlan,
          requirements: formData.requirements
        })
      });

      if (!inquiryResponse.ok) {
        const errorText = await inquiryResponse.text();
        console.error('Inquiry submission failed:', {
          status: inquiryResponse.status,
          statusText: inquiryResponse.statusText,
          error: errorText
        });
        throw new Error(`Failed to submit inquiry: ${inquiryResponse.status} ${errorText || inquiryResponse.statusText}`);
      }

      const emailResponse = await fetch(`${supabaseUrl}/functions/v1/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          selectedPlan,
          requirements: formData.requirements
        })
      });

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        console.error('Email sending failed:', {
          status: emailResponse.status,
          statusText: emailResponse.statusText,
          error: errorText
        });
        throw new Error(`Failed to send email notification: ${emailResponse.status} ${errorText || emailResponse.statusText}`);
      }

      alert('Thank you for your interest! We will contact you soon.');
      setShowModal(false);
      setFormData({ name: '', email: '', company: '', requirements: '' });
    } catch (error) {
      console.error('Submission error:', error);
      alert(error instanceof Error ? error.message : 'Sorry, there was an error sending your request. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const Logo = () => (
    <div className="relative inline-flex">
      <Cloud className="w-8 h-8 text-amber-400" />
      <div className="absolute -right-1 -bottom-1">
        <div className="w-4 h-3 bg-amber-400 rounded-full relative">
          <div className="absolute top-0.5 left-0 w-full h-0.5 bg-black opacity-20"></div>
          <div className="absolute top-1.5 left-0 w-full h-0.5 bg-black opacity-20"></div>
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
        <div className="w-8 h-6 bg-amber-400 rounded-full relative">
          <div className="absolute top-1 left-0 w-full h-1 bg-black opacity-20"></div>
          <div className="absolute top-3 left-0 w-full h-1 bg-black opacity-20"></div>
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-white rounded-full opacity-70"></div>
          <div className="absolute -top-2 left-1 w-4 h-4 bg-white rounded-full opacity-70"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Logo />
            <span className="text-xl font-bold text-gray-800">CloudOps Hive</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <button onClick={() => scrollToSection('services')} className="text-gray-600 hover:text-amber-500">Services</button>
            <button onClick={() => scrollToSection('pricing')} className="text-gray-600 hover:text-amber-500">Pricing</button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-600 hover:text-amber-500">Contact</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <HeroLogo />
          <h1 className="mt-8 text-5xl font-bold text-gray-900">Cloud Operations Excellence</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your cloud infrastructure with our expert DevOps solutions
          </p>
          <button
            onClick={() => scrollToSection('contact')}
            className="mt-8 px-8 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <Server className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Infrastructure Management</h3>
              <p className="text-gray-600">Expert cloud infrastructure setup and maintenance</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <Code className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">DevOps Automation</h3>
              <p className="text-gray-600">Streamline your development and deployment processes</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <Shield className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Security & Compliance</h3>
              <p className="text-gray-600">Ensure your cloud infrastructure is secure and compliant</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Pricing Plans</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {plans.map((plan) => (
              <div key={plan.name} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-amber-500 font-semibold mb-4">{plan.price}</p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handlePlanSelect(plan.name)}
                  className="w-full py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors"
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Contact Us</h2>
          <div className="max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-amber-500" />
                <span>contact@cloudopshive.com</span>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="w-6 h-6 text-amber-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="w-6 h-6 text-amber-500" />
                <span>123 Cloud Street, Tech City</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Request Information</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
                  <textarea
                    required
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={4}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors disabled:bg-amber-300"
                >
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;