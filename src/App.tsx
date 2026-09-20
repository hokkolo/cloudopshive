import React, { useState, useEffect } from 'react';
import { Cloud, Server, Code, Shield, Check, Mail, Phone, MapPin, X } from 'lucide-react';
import { BlogSection } from './components/BlogSection';
import { BlogModal } from './components/BlogModal';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: string;
}

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [showFullBlog, setShowFullBlog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const services = [
    {
      icon: <Cloud className="w-12 h-12 text-amber-500" />,
      title: "Cloud Migration",
      description: "Seamlessly migrate your infrastructure to the cloud with minimal downtime and maximum efficiency."
    },
    {
      icon: <Server className="w-12 h-12 text-amber-500" />,
      title: "Infrastructure Management",
      description: "24/7 monitoring and management of your cloud infrastructure to ensure optimal performance."
    },
    {
      icon: <Code className="w-12 h-12 text-amber-500" />,
      title: "DevOps Automation",
      description: "Streamline your development pipeline with automated testing, deployment, and monitoring."
    },
    {
      icon: <Shield className="w-12 h-12 text-amber-500" />,
      title: "Security & Compliance",
      description: "Implement robust security measures and ensure compliance with industry standards."
    }
  ];

  const plans = [
    {
      name: "Starter",
      price: "$99",
      period: "/month",
      features: [
        "Basic cloud setup",
        "Email support",
        "Monthly reports",
        "Up to 5 services"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$299",
      period: "/month",
      features: [
        "Advanced cloud architecture",
        "24/7 phone support",
        "Weekly reports",
        "Up to 20 services",
        "DevOps automation",
        "Security monitoring"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$799",
      period: "/month",
      features: [
        "Custom cloud solutions",
        "Dedicated account manager",
        "Daily reports",
        "Unlimited services",
        "Full DevOps pipeline",
        "Advanced security",
        "Compliance management"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-amber-500">CloudOps Pro</div>
            <div className="hidden md:flex space-x-6">
              <button onClick={() => scrollToSection('services')} className="text-gray-600 hover:text-amber-500">Services</button>
              <button onClick={() => scrollToSection('blog')} className="text-gray-600 hover:text-amber-500">Blog</button>
              <button onClick={() => {
                setShowFullBlog(true);
                setTimeout(() => scrollToSection('blog-full'), 100);
              }} className="text-gray-600 hover:text-amber-500">All Posts</button>
              <button onClick={() => scrollToSection('pricing')} className="text-gray-600 hover:text-amber-500">Pricing</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-600 hover:text-amber-500">Contact</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-amber-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Transform Your Business with <span className="text-amber-500">Cloud Excellence</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Expert cloud operations and DevOps services to accelerate your digital transformation journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-amber-500 text-white px-8 py-3 rounded-lg hover:bg-amber-600 transition-colors"
            >
              Get Started
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="border border-amber-500 text-amber-500 px-8 py-3 rounded-lg hover:bg-amber-50 transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Our Services</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Comprehensive cloud solutions tailored to your business needs
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Latest Insights</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Stay updated with the latest trends, best practices, and insights in cloud operations and DevOps
          </p>
          <BlogSection
            onReadMore={(post) => {
              setSelectedBlogPost(post);
              setShowBlogModal(true);
            }}
            showAll={false}
          />
        </div>
      </section>

      {/* Full Blog Section */}
      {showFullBlog && (
        <section id="blog-full" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">All Blog Posts</h2>
              <button
                onClick={() => setShowFullBlog(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <BlogSection
              onReadMore={(post) => {
                setSelectedBlogPost(post);
                setShowBlogModal(true);
              }}
              showAll={true}
            />
          </div>
        </section>
      )}

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Choose Your Plan</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Flexible pricing options to match your business requirements
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div key={index} className={`relative p-8 rounded-lg border-2 ${
                plan.popular ? 'border-amber-500 bg-amber-50' : 'border-gray-200 bg-white'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-amber-500 text-white px-4 py-1 rounded-full text-sm">Most Popular</span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => {
                    setSelectedPlan(plan.name);
                    setShowModal(true);
                  }}
                  className={`w-full py-3 rounded-lg transition-colors ${
                    plan.popular 
                      ? 'bg-amber-500 text-white hover:bg-amber-600' 
                      : 'border border-amber-500 text-amber-500 hover:bg-amber-50'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Get In Touch</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Ready to transform your business? Let's discuss your cloud strategy
          </p>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-amber-500 mr-3" />
                  <span className="text-gray-600">contact@cloudopspro.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-amber-500 mr-3" />
                  <span className="text-gray-600">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-amber-500 mr-3" />
                  <span className="text-gray-600">123 Cloud Street, Tech City, TC 12345</span>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
              ></textarea>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-500 text-white py-3 rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="text-2xl font-bold text-amber-500 mb-4">CloudOps Pro</div>
          <p className="text-gray-400">© 2024 CloudOps Pro. All rights reserved.</p>
        </div>
      </footer>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Get Started with {selectedPlan}</h3>
              <button onClick={() => setShowModal(false)}>
                <X className="w-6 h-6 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Thank you for your interest in our {selectedPlan} plan. We'll contact you shortly to discuss your requirements.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Blog Modal */}
      {selectedBlogPost && (
        <BlogModal
          post={selectedBlogPost}
          isOpen={showBlogModal}
          onClose={() => {
            setShowBlogModal(false);
            setSelectedBlogPost(null);
          }}
        />
      )}
    </div>
  );
}

export default App;