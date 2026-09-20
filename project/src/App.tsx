// App.tsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useLocation,
} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {
  Cloud,
  Server,
  Shield,
  Check,
  Mail,
  Phone,
  MapPin,
  X,
  Zap,
  DollarSign,
  Gauge,
  Wrench,
} from "lucide-react";

/* -------------------------
   Small utilities
   ------------------------- */
function parseFrontMatter(text: string) {
  // minimal YAML frontmatter parser: returns { data: Record<string,string>, content: string }
  const fm = /^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/m.exec(text);
  if (!fm) return { data: {}, content: text };
  const raw = fm[1];
  const content = fm[2] || "";
  const data: Record<string, string> = {};
  raw.split(/\r?\n/).forEach((line) => {
    const idx = line.indexOf(":");
    if (idx > -1) {
      const key = line.slice(0, idx).trim();
      let value = line.slice(idx + 1).trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      } else if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }
      data[key] = value;
    }
  });
  return { data, content };
}

function excerpt(txt: string, len = 150) {
  const cleaned = txt.replace(/[#>*_`~\[\]]/g, "");
  return cleaned.trim().slice(0, len) + (cleaned.length > len ? "…" : "");
}

// BlogPost
const blogModules = (import.meta as any).glob('./content/blogs/*.md', { eager: true, import: 'default', query: "?raw", });

const PRELOADED_BLOGS = Object.entries(blogModules).map(([path, mod]) => {
  const raw = mod as unknown as string; // markdown file content
  const slug = path.split("/").pop()!.replace(".md", "");

  const { data, content } = parseFrontMatter(raw);

  return {
    slug,
    title: (data.title as string) || slug,
    date: (data.date as string) || "",
    summary: (data.summary as string) || excerpt(content, 160),
    content,
  };
});

/* -------------------------
   Shared NavBar
   ------------------------- */
function NavBar({ isScrolled }: { isScrolled?: boolean }) {
  // Using hash links so clicking About/Plans/Contact navigates to "/#about" etc.
  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-white shadow z-50 h-16 flex items-center ${isScrolled ? "bg-white/95 shadow-lg" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <Logo />
            <span className="text-xl font-bold text-gray-800 ml-2">
              Cloud<span className="text-amber-500">Ops</span>Hive
            </span>
          </Link>
          <div className="flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-amber-500 transition-colors">
              Home
            </Link>
            <Link to="/#about" className="text-gray-600 hover:text-amber-500 transition-colors">
              About
            </Link>
            <Link to="/blog" className="text-gray-600 hover:text-amber-500 transition-colors">
              Blogs
            </Link>
            <Link to="/plans" className="text-gray-600 hover:text-amber-500 transition-colors">
              Plans
            </Link>
            <Link to="/#contact" className="text-gray-600 hover:text-amber-500 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* -------------------------
   Logo / HeroLogo (from your file)
   ------------------------- */
function Logo() {
  return (
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
}

function HeroLogo() {
  return (
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
}

/* -------------------------
   BlogList component
   - tries to fetch /blogs/index.json (array of filenames)
   - fallback to a small built-in sample
   ------------------------- */
function BlogList() {
  const [blogs, setBlogs] = useState<typeof PRELOADED_BLOGS>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // PRELOADED_BLOGS is already populated at module load time
      setBlogs(PRELOADED_BLOGS);
    } catch (e) {
      console.error(e);
      setError("Failed to load blog posts.");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50 pt-24">
      <NavBar isScrolled />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>

        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && blogs.length === 0 && (
          <div className="p-6 bg-yellow-50 rounded border border-amber-100">
            <p className="text-gray-700">
              No blog posts found. Add markdown files into <code>src/content/blogs/</code>.
            </p>
          </div>
        )}

        <div className="mt-6 space-y-4">
          {blogs.map((b) => (
            <Link
              key={b.slug}
              to={`/blog/${b.slug}`}
              className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-gray-800">{b.title}</h2>
              {b.date && <p className="text-sm text-gray-500">{b.date}</p>}
              <p className="mt-2 text-gray-700">{b.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------
   BlogPost component
   - fetches /blogs/:slug.md
   - parses frontmatter and renders body via react-markdown
   ------------------------- */
function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState("");
  const [meta, setMeta] = useState<{ title?: string; date?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);

    try {
      const post = PRELOADED_BLOGS.find((p) => p.slug === slug);
      if (!post) {
        setError("Post not found.");
        setLoading(false);
        return;
      }
      setMeta({ title: post.title, date: post.date });
      setContent(post.content);
    } catch (e) {
      console.error(e);
      setError("Failed to load post.");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50 pt-24">
      <NavBar isScrolled />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Link to="/blog" className="text-sm text-amber-500 hover:underline">
          ← Back to blog
        </Link>

        {loading && <p className="mt-6 text-gray-600">Loading post...</p>}
        {error && <p className="mt-6 text-red-600">{error}</p>}

        {!loading && meta && (
          <article className="mt-6 prose prose-lg">
            <h1>{meta.title}</h1>
            {meta.date && <p className="text-sm text-gray-500">{meta.date}</p>}
            <ReactMarkdown>{content}</ReactMarkdown>
          </article>
        )}
      </div>
    </div>
  );
}

/* -------------------------
   Home component:
   - your original homepage code, kept largely intact
   - includes contact form + notification auto-hide
   ------------------------- */
function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // auto-hide notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const location = useLocation(); // to support hash scrolling
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  // contact form submit
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const emailResponse = await fetch(`https://api.cloudopshive.com/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          c_name: contactForm.name,
          c_email: contactForm.email,
          c_requirements: contactForm.message,
          type: "contact",
        }),
      });

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        throw new Error(
          `Failed to send message: ${emailResponse.status} ${errorText || emailResponse.statusText}`
        );
      }

      setNotification({ type: "success", message: "✅ Thank you for your message! We will get back to you soon." });
      setContactForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact submission error:", error);
      setNotification({
        type: "error",
        message: error instanceof Error ? error.message : "Sorry, there was an error sending your message.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      id: "hosting",
      icon: <Server className="w-8 h-8 text-amber-500" />,
      badge: "🚀 Managed Hosting",
      title: "Managed Hosting & Dedicated Support",
      subtitle: "High-Performance Cloud Hosting with 24/7 Peace of Mind",
      description: "Downtime costs money. Whether you’re scaling a high-traffic app or migrating legacy servers, our managed hosting plans deliver sub-second response times, rock-solid uptime, and round-the-clock support.",
      deliverables: [
        { label: "Fully Managed Application Hosting", detail: "Tailored setup on AWS, Azure, or GCP." },
        { label: "All-Inclusive Support Plans", detail: "Active monitoring, automated backups, and instant incident response included." },
        { label: "Zero-Downtime Migration", detail: "Seamless transition from your legacy provider with zero operational disruption." }
      ]
    },
    {
      id: "devops",
      icon: <Zap className="w-8 h-8 text-amber-500" />,
      badge: "⚡ DevOps & CI/CD",
      title: "DevOps & CI/CD Automation",
      subtitle: "Ship Code 10x Faster with Automated Pipelines",
      description: "Manual deployments are slow, error-prone, and painful. We build robust, modern CI/CD pipelines that automate your testing, building, and deployment workflows—so you can push to production with total confidence.",
      tools: "GitHub Actions | AWS CodeDeploy | Azure DevOps",
      deliverables: [
        { label: "End-to-End CI/CD Setup", detail: "Automated code builds, automated testing, and single-click deployments." },
        { label: "Blue/Green & Canary Deployments", detail: "Eliminate user-facing downtime during updates using modern deployment strategies." },
        { label: "Infrastructure as Code (IaC)", detail: "Provision and scale environments reproducibly in minutes." }
      ]
    },
    {
      id: "security",
      icon: <Shield className="w-8 h-8 text-amber-500" />,
      badge: "🛡️ Cloud Security",
      title: "Cloud Security & Compliance Guardrails",
      subtitle: "Plug Security Holes Before Attackers Find Them",
      description: "A single misconfigured S3 bucket or overly permissive IAM role can compromise your entire business. We audit, harden, and secure your cloud infrastructure against modern threats.",
      deliverables: [
        { label: "IAM Policy Hardening", detail: "Identification and remediation of dangerous wildcard (*) permissions and lingering IAM user credentials." },
        { label: "Network Vulnerability Audits", detail: "Real-time scanning and closing of exposed security groups, open ports, and public endpoints." },
        { label: "Principle of Least Privilege (PoLP)", detail: "Restructuring cloud roles so access is granted strictly on a need-to-know basis." }
      ]
    },
    {
      id: "finops",
      icon: <DollarSign className="w-8 h-8 text-amber-500" />,
      badge: "💰 FinOps / Optimization",
      title: "Cloud Cost Optimization (FinOps)",
      subtitle: "Stop Overpaying for Idle Cloud Infrastructure",
      description: "Unused instances, unattached EBS volumes, and wrong-tier storage can quietly inflate your cloud bill by 30% or more. We audit your architecture to slash waste without impacting performance.",
      deliverables: [
        { label: "Resource Right-Sizing", detail: "Matching CPU, RAM, and storage precisely to your actual workload demands." },
        { label: "Architectural Savings", detail: "Leveraging Reserved Instances, Savings Plans, and automated lifecycle rules (e.g., tiering older data to Glacier)." },
        { label: "Cost Visibility & Alerts", detail: "Clear financial reporting so you know exactly where every dollar goes." }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50 relative overflow-hidden">
      {/* Background Blobs for Visual Interest */}
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-yellow-200/10 rounded-full blur-3xl"></div>
      </div>

      <NavBar isScrolled={isScrolled} />

      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center space-y-8">
            <div className="flex justify-center">
              <HeroLogo />
            </div>
            <div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 mb-2 tracking-tight">
                Cloud<span className="text-amber-500">Ops</span>Hive
              </h1>
              <p className="text-xs md:text-sm font-bold text-amber-600 tracking-widest uppercase mb-6">
                Scale Smarter. Deploy Faster. Stay Secure.
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight max-w-4xl mx-auto">
                The Complete Cloud & DevOps Solution.
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We handle the complex infrastructure, so your engineers can focus on building products.
              </p>
            </div>

            {/* Outcome-First Core Value Props */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12 text-left">
              <div className="bg-white p-6 rounded-xl border border-amber-100 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center">
                  <span className="text-amber-500 mr-2">🚀</span> Scale Smarter.
                </h3>
                <p className="text-gray-600 text-sm">Zero-downtime, high-performance managed hosting.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-amber-100 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center">
                  <span className="text-amber-500 mr-2">⚡</span> Deploy Faster.
                </h3>
                <p className="text-gray-600 text-sm">Fully automated CI/CD pipelines (GitHub Actions, AWS, Azure).</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-amber-100 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center">
                  <span className="text-amber-500 mr-2">🛡️</span> Stay Secure.
                </h3>
                <p className="text-gray-600 text-sm">Ironclad security hardening and continuous cost optimization.</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
              <button
                onClick={() => scrollToSection("services")}
                className="w-full sm:w-auto bg-amber-400 hover:bg-amber-500 text-white font-bold py-3.5 px-8 rounded-lg shadow-md transition-colors text-lg"
              >
                Explore Our Services
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full sm:w-auto bg-white hover:bg-amber-50 text-amber-600 border-2 border-amber-300 font-bold py-3.5 px-8 rounded-lg shadow-sm transition-colors text-lg"
              >
                Start Your Free Cloud Health Audit
              </button>
            </div>

            {/* Key Performance Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 max-w-4xl mx-auto mt-12">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-4">
                Key Performance Stats
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-amber-100">
                <div className="flex items-center justify-center p-3 space-x-4">
                  <div className="p-3 bg-amber-50 rounded-full">
                    <Shield className="w-6 h-6 text-amber-500" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-black text-gray-800">99.9%</div>
                    <div className="text-sm text-gray-500 font-semibold">Uptime Guarantee</div>
                  </div>
                </div>
                <div className="flex items-center justify-center p-3 space-x-4">
                  <div className="p-3 bg-amber-50 rounded-full">
                    <Zap className="w-6 h-6 text-amber-500" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-black text-gray-800">3x</div>
                    <div className="text-sm text-gray-500 font-semibold">Deployment Speed</div>
                  </div>
                </div>
                <div className="flex items-center justify-center p-3 space-x-4">
                  <div className="p-3 bg-amber-50 rounded-full">
                    <DollarSign className="w-6 h-6 text-amber-500" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-black text-gray-800">25%</div>
                    <div className="text-sm text-gray-500 font-semibold">Cost Reduction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:block">
            <button
              onClick={() => scrollToSection("services")}
              className="animate-bounce text-amber-500 hover:text-amber-600 transition-colors"
              aria-label="Scroll to Services section"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div id="services" className="container mx-auto px-4 py-24 border-t border-amber-100">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-4">Our Services</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16 text-lg">
          We offer specialized cloud and DevOps services designed to supercharge your applications and infrastructure.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm border border-amber-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-amber-50 rounded-xl">
                    {service.icon}
                  </div>
                  <span className="text-sm font-semibold px-3 py-1 bg-amber-100 text-amber-800 rounded-full">
                    {service.badge}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{service.title}</h3>
                  <h4 className="text-amber-600 font-semibold text-base mb-4">{service.subtitle}</h4>
                  <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                </div>
                {service.tools && (
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-4">
                    <span className="text-xs font-bold text-gray-500 uppercase block mb-1">Tools We Master:</span>
                    <span className="text-sm text-gray-700 font-medium">{service.tools}</span>
                  </div>
                )}
                <div>
                  <span className="text-sm font-bold text-gray-700 block mb-3">What We Deliver:</span>
                  <ul className="space-y-3">
                    {service.deliverables.map((del, dIdx) => (
                      <li key={dIdx} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-gray-800 text-sm block">{del.label}</span>
                          <span className="text-gray-600 text-sm">{del.detail}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-100">
                <Link
                  to="/plans"
                  className="inline-flex items-center justify-center w-full py-3 px-6 bg-amber-400 hover:bg-amber-500 text-white font-bold rounded-xl shadow-sm hover:shadow transition-all text-center"
                >
                  Get Started
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Partner with Us Section */}
      <div className="bg-amber-50/50 border-y border-amber-100 py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12">
            Why Partner with CloudOpsHive?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-amber-100 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">🛠️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Turnkey Infrastructure</h3>
              <p className="text-gray-600 leading-relaxed">
                From hosting to CI/CD pipelines, we handle the entire cloud lifecycle.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-amber-100 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Proactive Defense</h3>
              <p className="text-gray-600 leading-relaxed">
                We fix security vulnerabilities before they become headline news.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-amber-100 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Transparent ROI</h3>
              <p className="text-gray-600 leading-relaxed">
                Our cost optimization services often pay for our fees in cloud savings alone.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="container mx-auto px-4 py-24">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Who We Are</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="/expert_bees_honeycomb.png"
              alt="Expert bees creating perfect honeycomb and honey"
              className="rounded-2xl shadow-xl border border-amber-100 hover:shadow-2xl transition-shadow duration-300"
            />
          </div>
          <div className="space-y-6">
            <p className="text-gray-700 text-lg leading-relaxed font-medium">
              CloudOpsHive was born from a simple realization: small and growing teams deserve the same high-caliber cloud infrastructure as Fortune 500 companies.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Founded by senior engineers from leading multinational corporations, our team brings 10+ years of hands-on experience across AWS, Azure, CI/CD automation, and cloud security.
            </p>
            <ul className="space-y-4 pt-4">
              <li className="flex items-start">
                <span className="text-amber-500 mr-3 text-xl">🏆</span>
                <div>
                  <strong className="text-gray-800 font-semibold block">MNC-Grade Expertise</strong>
                  <span className="text-gray-600 text-sm">Built by engineers who have managed complex, mission-critical infrastructure at scale.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-3 text-xl">⚡</span>
                <div>
                  <strong className="text-gray-800 font-semibold block">Startup Agility</strong>
                  <span className="text-gray-600 text-sm">Fast execution, direct communication, and flexible support tailored to your team's real-time needs.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-3 text-xl">🎯</span>
                <div>
                  <strong className="text-gray-800 font-semibold block">Outcome-Focused</strong>
                  <span className="text-gray-600 text-sm">We don't just maintain your cloud—we optimize costs, eliminate manual deployments, and plug security gaps from day one.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="container mx-auto px-4 py-24 border-t border-amber-100">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 text-amber-500" />
              <div>
                <h4 className="text-gray-800 font-semibold">Email</h4>
                <p className="text-gray-600">contacts@cloudopshive.com</p>
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
                <p className="text-gray-600">
                  Aspire CoWorks, 17, 2nd Floor<br />
                  7th Main Road, II Stage IndiraNagar<br />
                  Bangalore, 560038
                </p>
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
              className="w-full bg-amber-400 text-white py-2 px-4 rounded-lg font-semibold hover:bg-amber-500 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {notification && (
              <p className={`mt-3 text-sm transition-opacity duration-500 ${notification.type === "success" ? "text-green-600" : "text-red-600"}`}>
                {notification.message}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-amber-100 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <div className="flex justify-center items-center mb-4">
            <Logo />
            <span className="text-xl font-bold text-gray-800 ml-2">
              Cloud<span className="text-amber-500">Ops</span>Hive
            </span>
          </div>
          <p>© 2026 CloudOpsHive. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

/* -------------------------
   NotFound page
   ------------------------- */
function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50 pt-24 flex items-center">
      <NavBar isScrolled />
      <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">404 — Page Not Found</h1>
        <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="inline-flex items-center justify-center py-3 px-6 bg-amber-400 hover:bg-amber-500 text-white font-bold rounded-xl shadow-sm transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

/* -------------------------
   PlansPage Component
   ------------------------- */
function PlansPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    requirements: "",
  });
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const emailResponse = await fetch(`https://api.cloudopshive.com/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          r_email: formData.email,
          e_subject: "CloudOpsHive",
          e_plan: selectedPlan,
          e_req: formData.requirements,
          e_name: formData.name,
        }),
      });

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        console.error("Email sending failed:", {
          status: emailResponse.status,
          statusText: emailResponse.statusText,
          error: errorText,
        });
        throw new Error("Failed to send email");
      }

      setNotification({ type: "success", message: "Thank you — we'll get back in 12 hours." });
      setShowModal(false);
      setFormData({ name: "", email: "", requirements: "" });
    } catch (error) {
      console.error("Error:", error);
      setNotification({ type: "error", message: "Sorry, there was an error sending your request." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const servicePlans = [
    {
      icon: <Server className="w-7 h-7 text-amber-500" />,
      title: "Cloud Website Hosting",
      tagline: "Get your site live on reliable, production-ready cloud infrastructure.",
      price: "Starting at $25",
      priceNote: "one-time setup",
      secondaryPrice: "managed plan $45/mo",
      includes: [
        "Cloud account & network (VPC) setup — AWS / GCP / Azure",
        "Server provisioning & OS hardening",
        "Domain connection + SSL (HTTPS)",
        "Deploy your app/site to production",
        "Basic uptime monitoring & alerting",
        "30-day post-launch support",
      ],
      addons: "CDN setup · staging environment · automated backups · multi-region redundancy",
    },
    {
      icon: <Gauge className="w-7 h-7 text-amber-500" />,
      title: "Auto-Scaling Solution",
      tagline: "Handle traffic spikes automatically, without paying for idle capacity.",
      price: "Starting at $25",
      priceNote: "per project",
      includes: [
        "Auto Scaling Group / Kubernetes HPA configuration",
        "Load balancer setup",
        "Scaling policy design (CPU, memory, or request-based)",
        "Load testing to validate behavior under real traffic",
        "Cost-vs-performance tuning",
      ],
      addons: "Multi-AZ failover · predictive scaling · full container orchestration (K8s) setup",
    },
    {
      icon: <Shield className="w-7 h-7 text-amber-500" />,
      title: "Cloud Security Audit",
      tagline: "Find and fix security gaps before attackers — or auditors — do.",
      price: "Starting at $25",
      priceNote: "per audit",
      includes: [
        "IAM policy & access review",
        "Network / firewall / security group audit",
        "Encryption check (at-rest & in-transit)",
        "Vulnerability scan of exposed services",
        "Compliance gap check (SOC 2 / ISO 27001 / GDPR, as applicable)",
        "Written report with prioritized remediation steps",
      ],
      addons: "Hands-on remediation · penetration testing · recurring quarterly audits",
    },
    {
      icon: <Zap className="w-7 h-7 text-amber-500" />,
      title: "CI/CD Pipeline Automation",
      tagline: "Ship code faster with automated, reliable build & release pipelines.",
      price: "Starting at $30",
      priceNote: "per pipeline",
      includes: [
        "CI/CD platform setup (GitHub Actions / Azure DevOps / AWS CodeDeploy)",
        "Automated build → test → deploy stages",
        "Environment promotion strategy (dev → staging → prod)",
        "Secrets management setup",
        "Rollback strategy",
      ],
      addons: "Multi-service / monorepo pipelines · self-hosted runners · blue-green or canary deployments",
    },
    {
      icon: <Wrench className="w-7 h-7 text-amber-500" />,
      title: "Linux Server Troubleshooting",
      tagline: "Get your server back to healthy, fast.",
      price: "Starting at $30",
      priceNote: "per incident",
      secondaryPrice: "retainer $50/mo",
      includes: [
        "Root-cause diagnosis (crashes, performance, disk, memory, networking)",
        "Log analysis",
        "Service/process recovery",
        "Security patching during the fix",
        "Post-incident summary & prevention recommendations",
      ],
      addons: "24/7 on-call retainer · proactive server health monitoring setup",
    },
    {
      icon: <DollarSign className="w-7 h-7 text-amber-500" />,
      title: "FinOps Cost Audit & Optimization",
      tagline: "Stop the bill surprises — find out exactly where your cloud spend is leaking.",
      price: "Starting at $30",
      priceNote: "per audit",
      secondaryPrice: "retainer $50/mo",
      includes: [
        "Full multi-cloud billing & usage audit (AWS / GCP / Azure)",
        "Identify idle, orphaned, and underutilized resources",
        "Rightsizing recommendations for compute, storage, and databases",
        "Reserved Instance / Savings Plan / Committed Use analysis",
        "Cost allocation & tagging review",
        "Root-cause breakdown of unexpected charge spikes",
        "Written report with a quantified savings estimate",
      ],
      addons: "hands-on implementation of savings recommendations · monthly FinOps retainer with ongoing monitoring · access to Cloud-Cost Tracker, CloudOpsHive's in-house cost-tracking dashboard",
      note: "Powered by our own tooling. Every FinOps engagement can include access to [Your Product Name] — our in-house dashboard that tracks resource costs at daily granularity, so a spend spike gets caught within a day instead of showing up as a surprise at the end of the billing cycle.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50">
      <NavBar isScrolled={true} />
      <div className="container mx-auto px-4 py-24 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-4 pt-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Cloud<span className="text-amber-500">Ops</span>Hive — Service Plans
          </h1>
          <p className="mt-4 text-xl text-gray-600 leading-relaxed">
            Choose the service you need, or combine two or more for a bundled rate.
          </p>
          {/* <p className="mt-2 text-sm text-gray-400">
            Prices below are placeholders — swap in your real rates.
          </p> */}
        </div>

        {notification && (
          <div className={`mb-8 p-4 rounded-xl text-center max-w-md mx-auto ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {notification.message}
          </div>
        )}

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {servicePlans.map((plan, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm border border-amber-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-amber-50 rounded-xl">{plan.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-800">{plan.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{plan.tagline}</p>
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <span className="text-2xl font-bold text-gray-800">{plan.price}</span>
                  {plan.priceNote && <span className="text-gray-500 text-sm">({plan.priceNote})</span>}
                  {plan.secondaryPrice && (
                    <span className="text-amber-600 text-sm font-semibold italic">{plan.secondaryPrice}</span>
                  )}
                </div>
                <div>
                  <span className="text-sm font-bold text-gray-700 block mb-3">What's included:</span>
                  <ul className="space-y-2">
                    {plan.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start text-gray-600 text-sm leading-tight">
                        <Check className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-amber-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <span className="text-xs font-bold text-gray-500 uppercase block mb-1">Add-ons:</span>
                  <span className="text-sm text-gray-700">{plan.addons}</span>
                </div>
                {plan.note && (
                  <div className="border-l-4 border-amber-300 bg-amber-50/60 pl-4 py-2 text-sm text-gray-600 italic">
                    {plan.note}
                  </div>
                )}
              </div>
              <button
                onClick={() => handlePlanSelect(plan.title)}
                className="w-full py-2 px-4 rounded-lg font-semibold transition-colors mt-6 bg-amber-400 text-white hover:bg-amber-500"
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-amber-50/60 border border-amber-100 rounded-2xl p-8 text-center max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Need more than one?</h3>
          <p className="text-gray-600 leading-relaxed">
            Most clients start with <strong>Security Audit + CI/CD Automation</strong>,{" "}
            <strong>Hosting + Auto-Scaling</strong>, or <strong>FinOps Audit + Auto-Scaling</strong>{" "}
            (rightsizing pairs naturally with scaling policy work). Ask about a bundled rate for
            combined engagements — or a monthly retainer if you want ongoing coverage across all six.
          </p>
        </div>
      </div>

      {/* Plan Selection Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Get Started with {selectedPlan}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
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
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-amber-100 rounded-lg focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-amber-100 rounded-lg focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <textarea
                  placeholder="Project Requirements"
                  required
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border-2 border-amber-100 rounded-lg focus:outline-none focus:border-amber-400 resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-amber-400 text-white py-2 px-4 rounded-lg font-semibold transition-colors ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-amber-500"
                  }`}
              >
                {isSubmitting ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <footer className="border-t border-amber-100 py-8 bg-white mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <div className="flex justify-center items-center mb-4">
            <Logo />
            <span className="text-xl font-bold text-gray-800 ml-2">
              Cloud<span className="text-amber-500">Ops</span>Hive
            </span>
          </div>
          <p>© 2026 CloudOpsHive. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

/* -------------------------
   App (Router wrapper)
   ------------------------- */
export default function App() {
  return (
    <Router>
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}
