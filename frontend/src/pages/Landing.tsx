import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { useState, useEffect, useRef } from "react";

const Landing = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null);
  const [animatedTestimonial, setAnimatedTestimonial] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: (
        <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="url(#grad1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#00D4AA"/><stop offset="100%" stopColor="#0096C7"/></linearGradient></defs>
          <rect x="4" y="4" width="16" height="16" rx="2"/>
          <rect x="9" y="9" width="6" height="6"/>
          <line x1="9" y1="1" x2="9" y2="4"/>
          <line x1="15" y1="1" x2="15" y2="4"/>
          <line x1="9" y1="20" x2="9" y2="23"/>
          <line x1="15" y1="20" x2="15" y2="23"/>
        </svg>
      ),
      title: "Order Medicines",
      description: "Get genuine medicines delivered to your doorstep with verified prescriptions and real-time tracking.",
      color: "#00D4AA",
    },
    {
      icon: (
        <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="url(#grad2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <defs><linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FF6B6B"/><stop offset="100%" stopColor="#FF8E53"/></linearGradient></defs>
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
      ),
      title: "Expert Consultations",
      description: "Connect with qualified healthcare professionals through secure video consultations, 24/7.",
      color: "#FF6B6B",
    },
    {
      icon: (
        <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="url(#grad3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <defs><linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#845EF7"/><stop offset="100%" stopColor="#5C7CFA"/></linearGradient></defs>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
      title: "Partner Pharmacies",
      description: "Access a nationwide network of trusted and verified pharmacy partners across India.",
      color: "#845EF7",
    },
  ];

  const stats = [
    { number: "50,000+", label: "Happy Patients", icon: "❤️" },
    { number: "1,000+", label: "Expert Doctors", icon: "👨‍⚕️" },
    { number: "500+", label: "Partner Pharmacies", icon: "🏪" },
    { number: "98%", label: "Satisfaction Rate", icon: "⭐" },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer, Bangalore",
      content: "BharathCare made healthcare accessible for me. The online consultation feature is a lifesaver when you're working from home!",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=1",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      name: "Rajesh Kumar",
      role: "Business Owner, Delhi",
      content: "Fast medicine delivery and genuine products. I've been using BharathCare for my family's healthcare needs for over a year now.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=12",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      name: "Dr. Anita Desai",
      role: "General Physician, Mumbai",
      content: "As a doctor on this platform, I appreciate the seamless interface and the ability to help patients remotely. Highly recommended!",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=5",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
      name: "Vikram Singh",
      role: "Teacher, Pune",
      content: "The prescription management and timely reminders have helped me stay on top of my medication schedule. Excellent service!",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=33",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    },
    {
      name: "Meera Patel",
      role: "Marketing Manager, Ahmedabad",
      content: "The platform is user-friendly and the customer support is exceptional. I can manage my entire family's health records in one place.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=9",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
    },
    {
      name: "Arjun Reddy",
      role: "Entrepreneur, Hyderabad",
      content: "Quick appointments, professional doctors, and hassle-free medicine delivery. BharathCare has revolutionized my healthcare experience.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=14",
      gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)"
    },
  ];

  const pharmacyPartners = [
    { name: "Apollo Pharmacy", color: "#E63946", letter: "A" },
    { name: "MedPlus", color: "#2196F3", letter: "M" },
    { name: "Netmeds", color: "#4CAF50", letter: "N" },
    { name: "PharmEasy", color: "#FF6B35", letter: "P" },
    { name: "1mg", color: "#E91E63", letter: "1" },
    { name: "Wellness Forever", color: "#00BCD4", letter: "W" },
    { name: "Guardian Pharmacy", color: "#9C27B0", letter: "G" },
    { name: "HealthKart", color: "#FF5722", letter: "H" },
    { name: "Truemeds", color: "#00897B", letter: "T" },
    { name: "Cure Fit", color: "#3F51B5", letter: "C" },
  ];

  const benefits = [
    {
      icon: "🕐",
      title: "24/7 Availability",
      text: "Round-the-clock access to healthcare services and support whenever you need it.",
      bg: "linear-gradient(135deg, #667eea20, #764ba220)",
      border: "#667eea40",
      accent: "#667eea"
    },
    {
      icon: "✅",
      title: "Verified Products",
      text: "100% genuine medicines with rigorous quality assurance and certification.",
      bg: "linear-gradient(135deg, #00D4AA20, #0096C720)",
      border: "#00D4AA40",
      accent: "#00D4AA"
    },
    {
      icon: "🚚",
      title: "Pan India Delivery",
      text: "Lightning-fast, reliable delivery across every corner of the country.",
      bg: "linear-gradient(135deg, #FF6B6B20, #FF8E5320)",
      border: "#FF6B6B40",
      accent: "#FF6B6B"
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      text: "Bank-grade encryption keeps your health data completely confidential.",
      bg: "linear-gradient(135deg, #845EF720, #5C7CFA20)",
      border: "#845EF740",
      accent: "#845EF7"
    },
    {
      icon: "💰",
      title: "Affordable Pricing",
      text: "Competitive rates, exclusive discounts, and full insurance support.",
      bg: "linear-gradient(135deg, #43e97b20, #38f9d720)",
      border: "#43e97b40",
      accent: "#43e97b"
    },
    {
      icon: "👨‍⚕️",
      title: "Expert Team",
      text: "Over 1,000 qualified doctors and certified healthcare professionals.",
      bg: "linear-gradient(135deg, #fa709a20, #fee14020)",
      border: "#fa709a40",
      accent: "#fa709a"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedTestimonial(false);
      setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        setAnimatedTestimonial(true);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToTestimonial = (index: number) => {
    setAnimatedTestimonial(false);
    setTimeout(() => {
      setCurrentTestimonial(index);
      setAnimatedTestimonial(true);
    }, 300);
  };

  const current = testimonials[currentTestimonial];

  return (
    <div style={styles.container}>

      {/* ── Navigation ── */}
      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <div style={styles.navLeft}>
            <img src="/Bharath Care Logo.png" alt="BharathCare" style={styles.logo} />
            <span style={styles.brandName}>BharathCare</span>
          </div>
          <div style={styles.navRight}>
            <Link to="/login" style={styles.linkReset}>
              <button style={styles.navSignIn}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#f0f9ff'; e.currentTarget.style.borderColor = '#0096C7'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = '#CBD5E1'; }}
              >
                Sign In
              </button>
            </Link>
            <Link to="/r" style={styles.linkReset}>
              <button style={styles.navSignUp}
                onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg, #00C49A, #0088B8)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 150, 199, 0.45)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg, #00D4AA, #0096C7)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 150, 199, 0.3)'; }}
              >
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section style={styles.hero}>
        {/* Mesh background */}
        <div style={styles.meshBg} />
        <div style={styles.heroOrb1} />
        <div style={styles.heroOrb2} />
        <div style={styles.heroOrb3} />

        {/* Floating medical icons */}
        <div style={{ ...styles.floatingIcon, top: '12%', left: '6%', animationDelay: '0s' }}>💊</div>
        <div style={{ ...styles.floatingIcon, top: '20%', right: '8%', animationDelay: '1.5s', fontSize: 28 }}>🩺</div>
        <div style={{ ...styles.floatingIcon, bottom: '25%', left: '4%', animationDelay: '0.8s', fontSize: 24 }}>🧬</div>
        <div style={{ ...styles.floatingIcon, bottom: '15%', right: '6%', animationDelay: '2s', fontSize: 26 }}>🏥</div>
        <div style={{ ...styles.floatingIcon, top: '45%', left: '2%', animationDelay: '1s', fontSize: 22 }}>❤️</div>
        <div style={{ ...styles.floatingIcon, top: '55%', right: '3%', animationDelay: '2.5s', fontSize: 20 }}>🔬</div>

        <div style={{ ...styles.heroContent, opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(40px)', transition: 'all 1.1s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <h1 style={styles.mainTitle}>
            Your Health,<br />
            <span style={styles.titleGradient}>Our Priority</span>
          </h1>
          <p style={styles.mainSubtitle}>
            Experience seamless healthcare with expert consultations, genuine medicines,
            and a network of trusted pharmacies — all at your fingertips.
          </p>

          <div style={styles.ctaContainer}>
            <Link to="/login" style={styles.linkReset}>
              <button style={styles.primaryCta}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.04)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,212,170,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,212,170,0.3)'; }}
              >
                Get Started Free
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: 10 }}>
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </Link>
            <button style={styles.watchDemoBtn}
              onClick={() => setShowVideoModal(true)}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={styles.playIconWrapper}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="none">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              </div>
              Watch Demo
            </button>
          </div>

          <div style={styles.statsContainer}>
            {stats.map((stat, i) => (
              <div key={i} style={{ ...styles.statItem, animationDelay: `${i * 0.12}s` }}>
                <div style={styles.statEmoji}>{stat.icon}</div>
                <div style={styles.statNumber}>{stat.number}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pharmacy Brands Scroll ── */}
      <section style={styles.brandsSection}>
        <p style={styles.brandsTitle}>Trusted by India's Leading Pharmacy Networks</p>
        <div style={styles.scrollOuter}>
          <div style={styles.scrollContent}>
            {[...pharmacyPartners, ...pharmacyPartners].map((brand, i) => (
              <div key={i} style={styles.brandPill}>
                <div style={{ ...styles.brandLogo, backgroundColor: brand.color }}>
                  {brand.letter}
                </div>
                <span style={styles.brandName2}>{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section style={styles.featuresSection}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionBadge}>Our Services</span>
          <h2 style={styles.sectionTitle}>Comprehensive Healthcare Solutions</h2>
          <p style={styles.sectionSubtitle}>Everything you need for your health and wellness in one integrated platform</p>
        </div>
        <div style={styles.featuresGrid}>
          {features.map((f, i) => (
            <div key={i} style={{ ...styles.featureCard, animationDelay: `${i * 0.15}s` }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-14px)'; e.currentTarget.style.boxShadow = `0 24px 48px ${f.color}22`; e.currentTarget.style.borderColor = `${f.color}60`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)'; e.currentTarget.style.borderColor = '#E8EDF5'; }}
            >
              <div style={{ ...styles.featureIconBg, background: `${f.color}18` }}>
                {f.icon}
              </div>
              <h3 style={styles.featureTitle}>{f.title}</h3>
              <p style={styles.featureDescription}>{f.description}</p>
              <div style={{ ...styles.featureAccentLine, background: f.color }} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Why Choose BharathCare ── */}
      <section style={styles.benefitsSection}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionBadge}>Why Us</span>
          <h2 style={styles.sectionTitle}>Why Choose BharathCare?</h2>
          <p style={styles.sectionSubtitle}>Built with care, powered by technology, trusted by thousands</p>
        </div>
        <div style={styles.benefitsGrid}>
          {benefits.map((b, i) => (
            <div key={i}
              style={{
                ...styles.benefitCard,
                background: hoveredBenefit === i ? b.bg : '#FFFFFF',
                borderColor: hoveredBenefit === i ? b.border : '#E8EDF5',
                transform: hoveredBenefit === i ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                boxShadow: hoveredBenefit === i ? `0 16px 40px ${b.accent}22` : '0 2px 12px rgba(0,0,0,0.05)',
              }}
              onMouseEnter={() => setHoveredBenefit(i)}
              onMouseLeave={() => setHoveredBenefit(null)}
            >
              <div style={{ ...styles.benefitIconCircle, background: `${b.accent}18`, border: `2px solid ${b.accent}30` }}>
                <span style={{ fontSize: 28 }}>{b.icon}</span>
              </div>
              <h4 style={{ ...styles.benefitTitle, color: hoveredBenefit === i ? b.accent : '#0F1F3D' }}>{b.title}</h4>
              <p style={styles.benefitText}>{b.text}</p>
              {hoveredBenefit === i && <div style={{ ...styles.benefitAccent, background: b.accent }} />}
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials Section ── */}
      <section style={styles.testimonialsSection}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionBadge}>Reviews</span>
          <h2 style={styles.sectionTitle}>What Our Patients Say</h2>
          <p style={styles.sectionSubtitle}>Real stories from real people across India</p>
        </div>

        <div style={styles.testimonialWrapper}>
          {/* Decorative background card shapes */}
          <div style={styles.bgCard1} />
          <div style={styles.bgCard2} />

          <div style={{ ...styles.testimonialMain, opacity: animatedTestimonial ? 1 : 0, transform: animatedTestimonial ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.97)', transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
            <div style={{ background: current.gradient, ...styles.testimonialGradientBar }} />

            <div style={styles.quoteMarkLarge}>"</div>

            <p style={styles.testimonialText}>{current.content}</p>

            <div style={styles.testimonialFooter}>
              <img src={current.avatar} alt={current.name} style={styles.avatarLarge}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              <div>
                <div style={styles.testimonialName}>{current.name}</div>
                <div style={styles.testimonialRole}>{current.role}</div>
              </div>
              <div style={styles.starsRow}>
                {[...Array(5)].map((_, k) => (
                  <svg key={k} width="18" height="18" viewBox="0 0 24 24" fill="#F59E0B" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* Thumbnail row */}
          <div style={styles.thumbnailRow} ref={carouselRef}>
            {testimonials.map((t, i) => (
              <button key={i} onClick={() => goToTestimonial(i)}
                style={{ ...styles.thumbCard, borderColor: i === currentTestimonial ? '#00D4AA' : '#E8EDF5', background: i === currentTestimonial ? '#F0FDFA' : '#FAFAFA', transform: i === currentTestimonial ? 'scale(1.06)' : 'scale(1)', boxShadow: i === currentTestimonial ? '0 4px 16px rgba(0,212,170,0.25)' : 'none' }}
              >
                <img src={t.avatar} alt={t.name} style={styles.thumbAvatar}
                  onError={e => { (e.target as HTMLImageElement).src = ''; }} />
                <span style={{ ...styles.thumbName, color: i === currentTestimonial ? '#00897B' : '#64748B' }}>{t.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Dot indicators */}
          <div style={styles.dotRow}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => goToTestimonial(i)}
                style={{ ...styles.dot, backgroundColor: i === currentTestimonial ? '#00D4AA' : '#CBD5E1', width: i === currentTestimonial ? 28 : 10 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaOrb1} /><div style={styles.ctaOrb2} />
        <div style={styles.ctaContent}>
          <div style={styles.ctaHeartbeat}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00D4AA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'heartbeat 1.5s ease-in-out infinite' }}>
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
          </div>
          <h2 style={styles.ctaTitle}>Ready to Transform Your Healthcare Experience?</h2>
          <p style={styles.ctaSubtitle}>Join 50,000+ satisfied users who trust BharathCare for their health needs</p>
          <Link to="/login" style={styles.linkReset}>
            <button style={styles.ctaButton}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(255,255,255,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,255,255,0.2)'; }}
            >
              Start Your Journey Today
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: 12 }}>
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerGrid}>
            <div>
              <div style={styles.footerBrand}>
                <img src="/Bharath Care Logo.png" alt="BharathCare" style={styles.footerLogo} />
                <span style={styles.footerBrandName}>BharathCare</span>
              </div>
              <p style={styles.footerDescription}>Revolutionizing healthcare delivery across India with technology and compassion.</p>
            </div>
            <div>
              <h4 style={styles.footerHeading}>Quick Links</h4>
              <ul style={styles.footerList}>
                {["About Us", "Services", "Find Doctors", "Partner Pharmacies"].map(l => (
                  <li key={l}><a href="#" style={styles.footerLink}>{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={styles.footerHeading}>Support</h4>
              <ul style={styles.footerList}>
                {["Help Center", "Privacy Policy", "Terms of Service", "Contact Us"].map(l => (
                  <li key={l}><a href="#" style={styles.footerLink}>{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={styles.footerHeading}>Contact</h4>
              <ul style={styles.footerList}>
                <li style={styles.footerContactItem}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00D4AA" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  support@bharathcare.com
                </li>
                <li style={styles.footerContactItem}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00D4AA" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  1800-123-4567
                </li>
              </ul>
            </div>
          </div>
          <div style={styles.footerBottom}>
            <p style={styles.footerCopyright}>© 2024 BharathCare. All rights reserved. Made with ❤️ for India.</p>
          </div>
        </div>
      </footer>

      {/* ── AI Video Modal ── */}
      {showVideoModal && (
        <div style={styles.modalOverlay} onClick={() => setShowVideoModal(false)}>
          <div style={styles.modalBox} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div style={styles.modalTitleGroup}>
                <div style={styles.aiChip}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00D4AA" strokeWidth="2" style={{ marginRight: 5 }}>
                    <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
                  </svg>
                  AI Generated
                </div>
                <h3 style={styles.modalTitle}>BharathCare Platform Demo</h3>
                <p style={styles.modalSubtitle}>See how AI-powered healthcare works in just 2 minutes</p>
              </div>
              <button onClick={() => setShowVideoModal(false)} style={styles.closeBtn}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#FEE2E2'; e.currentTarget.style.color = '#EF4444'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#F1F5F9'; e.currentTarget.style.color = '#64748B'; }}
              >✕</button>
            </div>
            <div style={styles.videoPlaceholder}>
              <div style={styles.videoPulseRing} />
              <div style={styles.videoPlayBig}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="white" stroke="none">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              </div>
              <div style={styles.videoLabel}>
                <div style={{ fontWeight: 700, fontSize: 18, color: 'white', marginBottom: 6 }}>Platform Walkthrough</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>Connect your video source to display here</div>
              </div>
              {/* Animated EKG line */}
              <svg viewBox="0 0 400 60" style={styles.ekgLine} preserveAspectRatio="none">
                <polyline points="0,30 60,30 80,5 100,55 120,30 160,30 180,15 200,45 220,30 400,30" fill="none" stroke="#00D4AA" strokeWidth="2" opacity="0.6" style={{ animation: 'ekgDraw 3s linear infinite' }}/>
              </svg>
            </div>
            <div style={styles.modalFeatures}>
              {["Order medicines in 3 taps", "Book doctor in 60 seconds", "AI prescription analysis", "Live delivery tracking"].map((f, i) => (
                <div key={i} style={styles.modalFeatureItem}>
                  <span style={styles.modalFeatureCheck}>✓</span> {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Global CSS ── */}
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { margin: 0; padding: 0; overflow-x: hidden; }

        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap');

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes floatMed {
          0%, 100% { transform: translateY(0) rotate(-4deg); }
          50% { transform: translateY(-18px) rotate(4deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); opacity: 1; }
          15% { transform: scale(1.25); }
          30% { transform: scale(1); }
          45% { transform: scale(1.15); }
          60% { transform: scale(1); }
        }
        @keyframes orbPulse {
          0%, 100% { transform: scale(1); opacity: 0.25; }
          50% { transform: scale(1.12); opacity: 0.4; }
        }
        @keyframes ekgDraw {
          0% { stroke-dashoffset: 1000; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.5); opacity: 1; }
        }
        .stat-item {
          animation: fadeInUp 0.7s ease-out both;
        }
      `}</style>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#FFFFFF",
    fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    width: "100%",
  },

  // ── NAV ──
  nav: {
    backgroundColor: "rgba(255,255,255,0.96)",
    backdropFilter: "blur(16px)",
    boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
    position: "sticky" as const,
    top: 0,
    zIndex: 100,
  },
  navContent: {
    maxWidth: "100%",
    padding: "14px 60px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navLeft: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  logo: {
    height: 44,
    width: "auto",
  },
  brandName: {
    fontSize: 20,
    fontWeight: 800,
    color: "#0F1F3D",
    fontFamily: '"Syne", sans-serif',
    letterSpacing: "-0.3px",
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  navSignIn: {
    padding: "9px 22px",
    fontSize: 14,
    fontWeight: 600,
    backgroundColor: "transparent",
    color: "#0F1F3D",
    border: "1.5px solid #CBD5E1",
    borderRadius: 8,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  navSignUp: {
    padding: "9px 22px",
    fontSize: 14,
    fontWeight: 700,
    background: "linear-gradient(135deg, #00D4AA, #0096C7)",
    color: "#FFFFFF",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    transition: "all 0.25s ease",
    boxShadow: "0 4px 14px rgba(0,150,199,0.3)",
  },

  // ── HERO ──
  hero: {
    background: "linear-gradient(145deg, #0A1628 0%, #0F2850 50%, #092040 100%)",
    padding: "110px 60px 90px",
    textAlign: "center" as const,
    color: "white",
    position: "relative" as const,
    overflow: "hidden",
  },
  meshBg: {
    position: "absolute" as const,
    inset: 0,
    background: "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(0,212,170,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 20%, rgba(0,150,199,0.1) 0%, transparent 60%)",
  },
  heroOrb1: {
    position: "absolute" as const,
    width: 500,
    height: 500,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(0,212,170,0.15) 0%, transparent 70%)",
    top: "-150px",
    right: "-100px",
    animation: "orbPulse 6s ease-in-out infinite",
  },
  heroOrb2: {
    position: "absolute" as const,
    width: 400,
    height: 400,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(0,150,199,0.12) 0%, transparent 70%)",
    bottom: "-100px",
    left: "-80px",
    animation: "orbPulse 8s ease-in-out infinite 2s",
  },
  heroOrb3: {
    position: "absolute" as const,
    width: 200,
    height: 200,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(126,220,226,0.1) 0%, transparent 70%)",
    top: "40%",
    left: "15%",
    animation: "orbPulse 5s ease-in-out infinite 1s",
  },
  floatingIcon: {
    position: "absolute" as const,
    fontSize: 32,
    opacity: 0.25,
    animation: "floatMed 5s ease-in-out infinite",
    userSelect: "none" as const,
    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
    zIndex: 1,
  },
  heroContent: {
    maxWidth: 920,
    margin: "0 auto",
    position: "relative" as const,
    zIndex: 2,
  },
  mainTitle: {
    fontSize: 72,
    fontWeight: 800,
    margin: "0 0 28px 0",
    lineHeight: 1.05,
    fontFamily: '"Syne", sans-serif',
    color: "#FFFFFF",
    letterSpacing: "-1px",
  },
  titleGradient: {
    background: "linear-gradient(135deg, #00D4AA, #4FC3F7)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  mainSubtitle: {
    fontSize: 19,
    margin: "0 auto 52px",
    lineHeight: 1.7,
    color: "rgba(255,255,255,0.72)",
    maxWidth: 680,
  },
  ctaContainer: {
    display: "flex",
    gap: 16,
    justifyContent: "center",
    flexWrap: "wrap" as const,
    marginBottom: 80,
  },
  primaryCta: {
    padding: "16px 40px",
    fontSize: 16,
    fontWeight: 700,
    background: "linear-gradient(135deg, #00D4AA, #0096C7)",
    color: "#FFFFFF",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
    boxShadow: "0 4px 20px rgba(0,212,170,0.3)",
    display: "inline-flex",
    alignItems: "center",
  },
  watchDemoBtn: {
    padding: "16px 36px",
    fontSize: 16,
    fontWeight: 600,
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "white",
    border: "1.5px solid rgba(255,255,255,0.25)",
    borderRadius: 10,
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "inline-flex",
    alignItems: "center",
    gap: 12,
    backdropFilter: "blur(8px)",
  },
  playIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    backgroundColor: "rgba(255,255,255,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  statsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 24,
    maxWidth: 900,
    margin: "0 auto",
    paddingTop: 48,
    borderTop: "1px solid rgba(255,255,255,0.1)",
  },
  statItem: {
    textAlign: "center" as const,
    padding: "20px 16px",
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.08)",
    animation: "fadeInUp 0.8s ease-out both",
  },
  statEmoji: { fontSize: 28, marginBottom: 8 },
  statNumber: {
    fontSize: 36,
    fontWeight: 800,
    marginBottom: 6,
    background: "linear-gradient(135deg, #00D4AA, #4FC3F7)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    fontFamily: '"Syne", sans-serif',
  },
  statLabel: { fontSize: 13, opacity: 0.7, fontWeight: 500 },

  // ── BRANDS ──
  brandsSection: {
    padding: "56px 0",
    backgroundColor: "#F8FAFF",
    overflow: "hidden",
  },
  brandsTitle: {
    textAlign: "center" as const,
    fontSize: 12,
    fontWeight: 700,
    color: "#94A3B8",
    marginBottom: 28,
    textTransform: "uppercase" as const,
    letterSpacing: "2px",
  },
  scrollOuter: { overflow: "hidden", whiteSpace: "nowrap" as const },
  scrollContent: {
    display: "inline-flex",
    animation: "scroll 32s linear infinite",
    gap: 0,
  },
  brandPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 28px",
    margin: "0 10px",
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    border: "1px solid #E8EDF5",
    transition: "all 0.3s ease",
  },
  brandLogo: {
    width: 32,
    height: 32,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: 800,
    fontSize: 14,
  },
  brandName2: { fontSize: 14, fontWeight: 600, color: "#0F1F3D" },

  // ── FEATURES ──
  featuresSection: {
    padding: "100px 60px",
    backgroundColor: "#FFFFFF",
  },
  sectionHeader: {
    textAlign: "center" as const,
    marginBottom: 64,
  },
  sectionBadge: {
    display: "inline-block",
    padding: "6px 18px",
    backgroundColor: "#F0FDF9",
    color: "#00897B",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: "1.5px",
    marginBottom: 16,
    border: "1px solid #CCFBF1",
  },
  sectionTitle: {
    fontSize: 40,
    fontWeight: 800,
    color: "#0F1F3D",
    margin: "0 0 14px 0",
    fontFamily: '"Syne", sans-serif',
    letterSpacing: "-0.5px",
  },
  sectionSubtitle: {
    fontSize: 17,
    color: "#64748B",
    margin: 0,
    maxWidth: 580,
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: 1.65,
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 28,
    maxWidth: 1160,
    margin: "0 auto",
  },
  featureCard: {
    backgroundColor: "#FFFFFF",
    padding: 40,
    borderRadius: 20,
    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
    transition: "all 0.4s cubic-bezier(0.34, 1, 0.64, 1)",
    border: "1.5px solid #E8EDF5",
    textAlign: "center" as const,
    position: "relative" as const,
    overflow: "hidden",
    animation: "fadeInUp 0.6s ease-out both",
  },
  featureIconBg: {
    width: 90,
    height: 90,
    borderRadius: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 24px",
  },
  featureTitle: {
    fontSize: 21,
    fontWeight: 700,
    color: "#0F1F3D",
    margin: "0 0 14px 0",
    fontFamily: '"Syne", sans-serif',
  },
  featureDescription: {
    fontSize: 15,
    color: "#64748B",
    margin: 0,
    lineHeight: 1.65,
  },
  featureAccentLine: {
    position: "absolute" as const,
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: 60,
    height: 4,
    borderRadius: "4px 4px 0 0",
    transition: "width 0.4s ease",
  },

  // ── BENEFITS ──
  benefitsSection: {
    padding: "100px 60px",
    backgroundColor: "#F8FAFF",
  },
  benefitsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 24,
    maxWidth: 1160,
    margin: "0 auto",
  },
  benefitCard: {
    padding: 32,
    borderRadius: 18,
    border: "1.5px solid #E8EDF5",
    transition: "all 0.35s cubic-bezier(0.34, 1, 0.64, 1)",
    position: "relative" as const,
    overflow: "hidden",
  },
  benefitIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  benefitTitle: {
    fontSize: 17,
    fontWeight: 700,
    margin: "0 0 10px 0",
    fontFamily: '"Syne", sans-serif',
    transition: "color 0.3s ease",
  },
  benefitText: {
    fontSize: 14,
    color: "#64748B",
    margin: 0,
    lineHeight: 1.65,
  },
  benefitAccent: {
    position: "absolute" as const,
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
  },

  // ── TESTIMONIALS ──
  testimonialsSection: {
    padding: "100px 60px",
    backgroundColor: "#FFFFFF",
    textAlign: "center" as const,
  },
  testimonialWrapper: {
    maxWidth: 820,
    margin: "0 auto",
    position: "relative" as const,
  },
  bgCard1: {
    position: "absolute" as const,
    width: "92%",
    height: "100%",
    background: "linear-gradient(135deg, #F0FDF9, #E0F7FA)",
    borderRadius: 24,
    top: -12,
    left: "4%",
    zIndex: 0,
    opacity: 0.6,
  },
  bgCard2: {
    position: "absolute" as const,
    width: "84%",
    height: "100%",
    background: "linear-gradient(135deg, #E8F5E9, #F0F7FF)",
    borderRadius: 24,
    top: -24,
    left: "8%",
    zIndex: 0,
    opacity: 0.4,
  },
  testimonialMain: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: "40px 48px",
    boxShadow: "0 12px 48px rgba(0,0,0,0.1)",
    position: "relative" as const,
    zIndex: 2,
    border: "1px solid #E8EDF5",
    overflow: "hidden",
    textAlign: "left" as const,
    marginBottom: 28,
  },
  testimonialGradientBar: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    height: 5,
  },
  quoteMarkLarge: {
    fontSize: 96,
    lineHeight: 0.8,
    color: "#00D4AA",
    opacity: 0.15,
    fontFamily: "Georgia, serif",
    fontWeight: 900,
    marginBottom: 16,
    display: "block",
  },
  testimonialText: {
    fontSize: 18,
    color: "#1E293B",
    lineHeight: 1.8,
    margin: "0 0 32px 0",
    fontStyle: "italic",
  },
  testimonialFooter: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  avatarLarge: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    objectFit: "cover" as const,
    border: "3px solid #00D4AA",
    boxShadow: "0 4px 14px rgba(0,212,170,0.25)",
    flexShrink: 0,
  },
  testimonialName: {
    fontSize: 16,
    fontWeight: 700,
    color: "#0F1F3D",
    margin: "0 0 2px 0",
    fontFamily: '"Syne", sans-serif',
  },
  testimonialRole: {
    fontSize: 13,
    color: "#94A3B8",
    margin: 0,
  },
  starsRow: {
    display: "flex",
    gap: 3,
    marginLeft: "auto",
  },
  thumbnailRow: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    marginBottom: 20,
    flexWrap: "wrap" as const,
  },
  thumbCard: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: 6,
    padding: "10px 14px",
    borderRadius: 12,
    border: "2px solid",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
    background: "none",
  },
  thumbAvatar: {
    width: 42,
    height: 42,
    borderRadius: "50%",
    objectFit: "cover" as const,
  },
  thumbName: { fontSize: 11, fontWeight: 600, transition: "color 0.2s ease" },
  dotRow: {
    display: "flex",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    height: 10,
    borderRadius: 5,
    border: "none",
    cursor: "pointer",
    transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
  },

  // ── CTA ──
  ctaSection: {
    padding: "100px 60px",
    background: "linear-gradient(145deg, #0A1628 0%, #0F2850 100%)",
    textAlign: "center" as const,
    color: "white",
    position: "relative" as const,
    overflow: "hidden",
  },
  ctaOrb1: {
    position: "absolute" as const,
    width: 500,
    height: 500,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(0,212,170,0.12) 0%, transparent 70%)",
    top: "-200px",
    right: "-100px",
    animation: "orbPulse 7s ease-in-out infinite",
  },
  ctaOrb2: {
    position: "absolute" as const,
    width: 350,
    height: 350,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(0,150,199,0.1) 0%, transparent 70%)",
    bottom: "-120px",
    left: "-80px",
    animation: "orbPulse 9s ease-in-out infinite 3s",
  },
  ctaContent: {
    maxWidth: 760,
    margin: "0 auto",
    position: "relative" as const,
    zIndex: 1,
  },
  ctaHeartbeat: { marginBottom: 24 },
  ctaTitle: {
    fontSize: 42,
    fontWeight: 800,
    margin: "0 0 20px 0",
    fontFamily: '"Syne", sans-serif',
    letterSpacing: "-0.5px",
    lineHeight: 1.15,
  },
  ctaSubtitle: {
    fontSize: 17,
    margin: "0 0 40px 0",
    color: "rgba(255,255,255,0.65)",
    lineHeight: 1.6,
  },
  ctaButton: {
    padding: "18px 48px",
    fontSize: 16,
    fontWeight: 700,
    backgroundColor: "#FFFFFF",
    color: "#0F1F3D",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
    boxShadow: "0 4px 16px rgba(255,255,255,0.2)",
    display: "inline-flex",
    alignItems: "center",
  },

  // ── FOOTER ──
  footer: {
    backgroundColor: "#0A1628",
    color: "white",
    padding: "80px 60px 40px",
  },
  footerContent: { maxWidth: 1200, margin: "0 auto" },
  footerGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 48,
    marginBottom: 48,
  },
  footerBrand: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  footerLogo: { height: 40, width: "auto", filter: "brightness(0) invert(1)" },
  footerBrandName: {
    fontSize: 18,
    fontWeight: 800,
    color: "white",
    fontFamily: '"Syne", sans-serif',
  },
  footerDescription: { fontSize: 14, color: "#64748B", lineHeight: 1.7, margin: 0 },
  footerHeading: { fontSize: 14, fontWeight: 700, marginBottom: 18, color: "#94A3B8", textTransform: "uppercase" as const, letterSpacing: "1px" },
  footerList: { listStyle: "none", padding: 0, margin: 0 },
  footerLink: { color: "#CBD5E1", textDecoration: "none", fontSize: 14, lineHeight: 2.3, transition: "color 0.2s ease", display: "block" },
  footerContactItem: { display: "flex", alignItems: "center", gap: 10, color: "#CBD5E1", fontSize: 14, marginBottom: 14 },
  footerBottom: { paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.07)", textAlign: "center" as const },
  footerCopyright: { fontSize: 13, color: "#475569", margin: 0 },

  // ── MODAL ──
  linkReset: { textDecoration: "none" },
  modalOverlay: {
    position: "fixed" as const,
    inset: 0,
    backgroundColor: "rgba(10,22,40,0.85)",
    backdropFilter: "blur(12px)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    animation: "fadeInUp 0.3s ease-out",
  },
  modalBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    width: "100%",
    maxWidth: 640,
    overflow: "hidden",
    boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
    animation: "fadeInUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  modalHeader: {
    padding: "28px 32px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
  },
  modalTitleGroup: { flex: 1 },
  aiChip: {
    display: "inline-flex",
    alignItems: "center",
    padding: "4px 12px",
    backgroundColor: "#F0FDF9",
    color: "#00897B",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 10,
    border: "1px solid #CCFBF1",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 800,
    color: "#0F1F3D",
    margin: "0 0 6px 0",
    fontFamily: '"Syne", sans-serif',
  },
  modalSubtitle: { fontSize: 14, color: "#64748B", margin: 0 },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    border: "none",
    backgroundColor: "#F1F5F9",
    color: "#64748B",
    fontSize: 16,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "all 0.2s ease",
    fontWeight: 700,
  },
  videoPlaceholder: {
    margin: "20px 32px",
    height: 280,
    backgroundColor: "#0F1F3D",
    borderRadius: 16,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    position: "relative" as const,
    overflow: "hidden",
    cursor: "pointer",
    background: "linear-gradient(145deg, #0A1628, #0F2850)",
  },
  videoPulseRing: {
    position: "absolute" as const,
    width: 120,
    height: 120,
    borderRadius: "50%",
    border: "2px solid rgba(0,212,170,0.3)",
    animation: "orbPulse 2s ease-in-out infinite",
  },
  videoPlayBig: {
    width: 72,
    height: 72,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #00D4AA, #0096C7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 32px rgba(0,212,170,0.5)",
    zIndex: 2,
    marginBottom: 20,
    cursor: "pointer",
  },
  videoLabel: { textAlign: "center" as const, zIndex: 2 },
  ekgLine: {
    position: "absolute" as const,
    bottom: 20,
    left: 0,
    right: 0,
    height: 60,
    width: "100%",
    strokeDasharray: 1000,
  },
  modalFeatures: {
    padding: "20px 32px 28px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px 24px",
  },
  modalFeatureItem: {
    fontSize: 14,
    color: "#334155",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  modalFeatureCheck: {
    color: "#00D4AA",
    fontWeight: 800,
    fontSize: 16,
  },
};

export default Landing;