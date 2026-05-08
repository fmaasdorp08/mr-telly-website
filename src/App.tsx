import { useState, useEffect, useRef } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { 
  Shield, 
  Lock, 
  Award, 
  CheckCircle, 
  Phone, 
  MessageCircle, 
  ArrowRight, 
  TrendingDown, 
  Heart, 
  Home, 
  CreditCard, 
  ChevronDown,
  Star,
  Clock,
  Users,
  FileCheck,
  Sparkles,
  Menu,
  X,
  AlertCircle,
  Send
} from 'lucide-react';

/* ============================================================
   MR TELLy Landing Page
   Debt Review & Credit Rehabilitation - South Africa
============================================================ */

// ---- Scroll Animation Hook ----
function useScrollAnimation(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// ---- Stagger Animation Hook ----
function useStaggerAnimation(count: number, delay = 100) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(count).fill(false));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          for (let i = 0; i < count; i++) {
            setTimeout(() => {
              setVisibleItems(prev => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * delay);
          }
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [count, delay]);

  return { containerRef, visibleItems };
}

// ---- WhatsApp CTA Settings ----
const WHATSAPP_NUMBER = "27688079487";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi MR TELLy, I would like to check if I qualify for debt review or debt removal support."
);
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

// ---- Navigation ----
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Benefits', href: '#benefits' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <a href="#" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-teal to-teal-dark rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xl font-bold tracking-tight transition-colors ${
                isScrolled ? 'text-navy' : 'text-white'
              }`}>
                MR TELLy
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className={`text-sm font-medium transition-colors hover:opacity-80 ${
                    isScrolled ? 'text-navy/70 hover:text-navy' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal text-white text-sm font-semibold rounded-lg hover:bg-teal-dark transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-navy' : 'text-white'
              }`}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white lg:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-2xl font-semibold text-navy"
              >
                {link.label}
              </button>
            ))}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-teal text-white text-lg font-semibold rounded-lg mt-4"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </>
  );
}

// ---- Hero Section ----
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src="/images/hero-bg.jpg" 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="animate-fade-in inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
            <Shield className="w-4 h-4 text-teal" />
            <span className="text-sm text-white/90 font-medium">Registered Debt Review Specialists</span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6" style={{ animationDelay: '0.1s' }}>
            Take Control of Your Debt.{" "}
            <span className="text-teal">Start Fresh Today.</span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-up text-lg sm:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl" style={{ animationDelay: '0.2s' }}>
            Professional, confidential debt review support designed to help you regain financial stability. 
            Trusted by thousands of South Africans.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up flex flex-col sm:flex-row gap-4 mb-12" style={{ animationDelay: '0.3s' }}>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-teal text-white font-semibold rounded-lg hover:bg-teal-dark transition-all hover:shadow-lg hover:shadow-teal/25 text-center"
            >
              Check If You Qualify
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/30 hover:bg-white/20 transition-all text-center"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="animate-fade-up flex flex-wrap items-center gap-6" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <img src="/images/consultant-1.jpg" alt="" className="w-8 h-8 rounded-full border-2 border-navy object-cover" />
                <img src="/images/consultant-2.jpg" alt="" className="w-8 h-8 rounded-full border-2 border-navy object-cover" />
                <img src="/images/consultant-3.jpg" alt="" className="w-8 h-8 rounded-full border-2 border-navy object-cover" />
              </div>
              <span className="text-sm text-white/80">Expert consultants</span>
            </div>
            <div className="h-4 w-px bg-white/20" />
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-4 h-4 fill-gold text-gold" />
              ))}
              <span className="text-sm text-white/80 ml-1">4.9/5 rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/50" />
      </div>
    </section>
  );
}

// ---- Trust Strip ----
function TrustStrip() {
  const { ref, isVisible } = useScrollAnimation(0.3);
  const items = [
    { icon: Users, text: 'Trusted by South Africans' },
    { icon: Lock, text: 'Confidential & Secure' },
    { icon: Award, text: 'Professional Guidance' },
    { icon: Shield, text: 'NCR Registered' },
  ];

  return (
    <section ref={ref} className="bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div
              key={item.text}
              className={`flex items-center justify-center gap-3 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <item.icon className="w-5 h-5 text-teal flex-shrink-0" />
              <span className="text-sm font-medium text-navy">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Problem / Solution Section ----
function ProblemSolutionSection() {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const problems = [
    { icon: TrendingDown, text: 'Overwhelming debt repayments' },
    { icon: AlertCircle, text: 'Missed payments & creditor pressure' },
    { icon: Heart, text: 'Constant financial stress & anxiety' },
    { icon: CreditCard, text: 'Damaged credit profile' },
  ];
  const solutions = [
    { icon: FileCheck, text: 'Structured debt review plan' },
    { icon: Shield, text: 'Legal protection from creditors' },
    { icon: TrendingDown, text: 'Reduced monthly repayments' },
    { icon: Sparkles, text: 'Clear path to financial recovery' },
  ];

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-teal uppercase tracking-wider">Understanding Your Situation</span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-navy">You're Not Alone. We Can Help.</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Problems */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <h3 className="text-xl font-semibold text-navy mb-6 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              Common Challenges
            </h3>
            <div className="space-y-4">
              {problems.map((p, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-red-100 shadow-sm">
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <p.icon className="w-5 h-5 text-red-500" />
                  </div>
                  <p className="text-navy/80 font-medium">{p.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden lg:flex justify-center">
            <div className="w-16 h-16 bg-teal rounded-full flex items-center justify-center shadow-lg shadow-teal/30">
              <ArrowRight className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Solutions */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`} style={{ transitionDelay: '200ms' }}>
            <h3 className="text-xl font-semibold text-navy mb-6 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-teal" />
              How MR TELLy Helps
            </h3>
            <div className="space-y-4">
              {solutions.map((s, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-teal/20 shadow-sm">
                  <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <s.icon className="w-5 h-5 text-teal" />
                  </div>
                  <p className="text-navy/80 font-medium">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- How It Works ----
function HowItWorksSection() {
  const { containerRef, visibleItems } = useStaggerAnimation(4, 150);
  const steps = [
    { num: '01', title: 'Submit Your Details', desc: 'Fill in our quick form or WhatsApp us. It takes less than 2 minutes.' },
    { num: '02', title: 'Speak to a Consultant', desc: 'Our expert will assess your situation and explain your options.' },
    { num: '03', title: 'Get a Structured Plan', desc: 'We create a tailored debt review plan that works for your budget.' },
    { num: '04', title: 'Start Your Recovery', desc: 'Begin your journey to financial freedom with ongoing support.' },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-teal uppercase tracking-wider">Our Process</span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-navy">How It Works</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">A simple, straightforward process designed to get you the help you need quickly.</p>
        </div>

        <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`relative text-center transition-all duration-700 ${
                visibleItems[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Connector Line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-teal/30 to-transparent" />
              )}
              
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-teal to-teal-dark rounded-2xl flex items-center justify-center shadow-lg shadow-teal/20">
                <span className="text-2xl font-bold text-white">{step.num}</span>
              </div>
              <h3 className="text-lg font-semibold text-navy mb-2">{step.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Benefits Section ----
function BenefitsSection() {
  const { containerRef, visibleItems } = useStaggerAnimation(4, 100);
  const benefits = [
    { icon: Heart, title: 'Reduce Financial Stress', desc: 'Sleep better knowing your debt is being managed by professionals.' },
    { icon: Shield, title: 'Regain Control', desc: 'Take charge of your finances with a clear, structured plan.' },
    { icon: Home, title: 'Protect Your Assets', desc: 'Safeguard your home, car, and belongings through legal protection.' },
    { icon: CreditCard, title: 'Improve Your Credit', desc: 'Rebuild your credit profile over time with disciplined repayments.' },
  ];

  return (
    <section id="benefits" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-teal uppercase tracking-wider">Why Choose Us</span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-navy">Benefits of Debt Review</h2>
        </div>

        <div ref={containerRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className={`group p-8 bg-white rounded-2xl border border-slate-100 hover:border-teal/30 hover:shadow-lg hover:shadow-teal/5 transition-all duration-500 ${
                visibleItems[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-teal/10 to-teal/5 rounded-xl flex items-center justify-center mb-6 group-hover:from-teal group-hover:to-teal-dark transition-all duration-300">
                <b.icon className="w-7 h-7 text-teal group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-navy mb-2">{b.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Testimonials Section ----
function TestimonialsSection() {
  const { containerRef, visibleItems } = useStaggerAnimation(3, 150);
  const testimonials = [
    {
      name: 'Thabo Mokoena',
      role: 'Debt Review Client',
      image: '/images/consultant-2.jpg',
      text: 'MR TELLy changed my life. I was drowning in debt and didn\'t know where to turn. Their team was professional, kind, and walked me through every step. My monthly payments are now manageable.',
      rating: 5,
    },
    {
      name: 'Lerato Ndlovu',
      role: 'Credit Rehabilitation Client',
      image: '/images/consultant-1.jpg',
      text: 'I was sceptical at first, but the team at MR TELLy proved me wrong. They negotiated with my creditors and reduced my payments by 40%. I finally see a way out of debt.',
      rating: 5,
    },
    {
      name: 'Patricia van Wyk',
      role: 'Debt Review Graduate',
      image: '/images/consultant-3.jpg',
      text: 'After completing my debt review programme, my credit score has improved significantly. The support I received throughout the process was exceptional. Highly recommend MR TELLy.',
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-teal uppercase tracking-wider">Testimonials</span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-navy">What Our Clients Say</h2>
        </div>

        <div ref={containerRef} className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`p-8 bg-slate-50 rounded-2xl border border-slate-100 transition-all duration-700 hover:shadow-lg ${
                visibleItems[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-navy/80 leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-navy">{t.name}</div>
                  <div className="text-sm text-slate-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Lead Form Section ----
function LeadFormSection() {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) newErrors.phone = 'Enter a valid phone number';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => { const n = { ...prev }; delete n[e.target.name]; return n; });
    }
  };

  return (
    <section id="contact" ref={ref} className="py-20 lg:py-28 bg-gradient-to-b from-navy to-navy-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <span className="text-sm font-semibold text-teal uppercase tracking-wider">Get Started</span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-white">Get Help Now</h2>
            <p className="mt-4 text-lg text-white/70 leading-relaxed">
              Fill in your details and one of our consultants will contact you within 24 hours. 
              Your information is confidential and secure.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-teal" />
                </div>
                <div>
                  <div className="font-semibold text-white">Fast Response</div>
                  <div className="text-sm text-white/60">We respond within 24 hours</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Lock className="w-6 h-6 text-teal" />
                </div>
                <div>
                  <div className="font-semibold text-white">100% Confidential</div>
                  <div className="text-sm text-white/60">Your privacy is our priority</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-teal" />
                </div>
                <div>
                  <div className="font-semibold text-white">No Obligation</div>
                  <div className="text-sm text-white/60">Free initial assessment</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`} style={{ transitionDelay: '200ms' }}>
            <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-2xl">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-6 bg-teal/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-teal" />
                  </div>
                  <h3 className="text-2xl font-bold text-navy mb-3">Thank You!</h3>
                  <p className="text-slate-600">We've received your details. A consultant will contact you within 24 hours.</p>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-teal text-white font-semibold rounded-lg hover:bg-teal-dark transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Or Chat on WhatsApp Now
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-bold text-navy mb-6">Request a Free Assessment</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 rounded-lg border ${errors.fullName ? 'border-red-500' : 'border-slate-200'} focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all`}
                    />
                    {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+27 82 123 4567"
                      className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-slate-200'} focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all`}
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-slate-200'} focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">Message (Optional)</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Tell us about your situation..."
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-teal text-white font-semibold rounded-lg hover:bg-teal-dark transition-all hover:shadow-lg hover:shadow-teal/25"
                  >
                    <Send className="w-5 h-5" />
                    Get Help Now
                  </button>

                  <p className="text-xs text-slate-500 text-center">
                    By submitting, you agree to our privacy policy. We will never share your information.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- WhatsApp CTA Section ----
function WhatsAppSection() {
  const { ref, isVisible } = useScrollAnimation(0.3);

  return (
    <section ref={ref} className="py-16 lg:py-20 bg-teal">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <MessageCircle className="w-12 h-12 text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Speak to a Consultant Now
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Get instant answers via WhatsApp. Our team is ready to help you understand your options.
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-teal font-bold rounded-xl hover:bg-white/90 transition-all hover:shadow-xl text-lg"
          >
            <MessageCircle className="w-6 h-6" />
            Chat on WhatsApp
          </a>
          <p className="mt-4 text-sm text-white/60">Typically replies within minutes</p>
        </div>
      </div>
    </section>
  );
}

// ---- Final CTA Section ----
function FinalCTASection() {
  const { ref, isVisible } = useScrollAnimation(0.3);

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <h2 className="text-3xl lg:text-5xl font-bold text-navy mb-6">
            Your Financial Reset Starts Here
          </h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Thousands of South Africans have already taken the first step. 
            Don't let debt control your life any longer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-teal text-white font-semibold rounded-lg hover:bg-teal-dark transition-all hover:shadow-lg hover:shadow-teal/25"
            >
              Check If You Qualify
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href={`tel:${WHATSAPP_NUMBER}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-navy text-white font-semibold rounded-lg hover:bg-navy-light transition-all"
            >
              <Phone className="w-5 h-5" />
              Call Us Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Footer ----
function Footer() {
  return (
    <footer className="bg-navy-dark text-white/70 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-teal to-teal-dark rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">MR TELLy</span>
            </div>
            <p className="text-sm leading-relaxed">
              Professional debt review and credit rehabilitation services for South Africans. 
              Regulated. Confidential. Trusted.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['How It Works', 'Benefits', 'Reviews', 'Contact'].map(link => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase().replace(' ', '-')}`} 
                    className="text-sm hover:text-teal transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal" />
                <a href={`tel:${WHATSAPP_NUMBER}`} className="text-sm hover:text-teal transition-colors">+27 82 123 4567</a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-teal" />
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-teal transition-colors">WhatsApp Us</a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal" />
                <span className="text-sm">Mon - Fri: 08:00 - 17:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="pt-8 border-t border-white/10">
          <p className="text-xs text-white/40 leading-relaxed mb-4">
            Disclaimer: Debt review is a formal legal process under the National Credit Act 34 of 2005. 
            MR TELLy is a registered debt counselling practice. The information on this website is for 
            educational purposes only and does not constitute financial advice. Results may vary based on 
            individual circumstances.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/40">
              &copy; {new Date().getFullYear()} MR TELLy. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-white/40 hover:text-white/60 transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-white/40 hover:text-white/60 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ---- Sticky CTA ----
function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-lg transition-transform duration-500 lg:hidden ${
      visible ? 'translate-y-0' : 'translate-y-full'
    }`}>
      <div className="flex items-center gap-3 p-4 max-w-lg mx-auto">
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-teal text-white font-semibold rounded-lg"
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp
        </a>
        <a
          href="#contact"
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-navy text-white font-semibold rounded-lg"
        >
          <Send className="w-5 h-5" />
          Apply Now
        </a>
      </div>
    </div>
  );
}

// ---- Main App ----
export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <TrustStrip />
      <ProblemSolutionSection />
      <HowItWorksSection />
      <BenefitsSection />
      <TestimonialsSection />
      <LeadFormSection />
      <WhatsAppSection />
      <FinalCTASection />
      <Footer />
      <StickyCTA />
      <Analytics />
    </div>
  );
}
