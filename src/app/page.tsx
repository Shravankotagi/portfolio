'use client';

import React, { useState, useEffect } from 'react';
import NeuralCanvas from '@/components/NeuralCanvas';
import Typewriter from '@/components/Typewriter';
import ProjectFilter from '@/components/ProjectFilter';
import AIAssistant from '@/components/AIAssistant';
// Animated Counter Component
function CounterNumber({ endValue, suffix = '', decimals = 0 }: { endValue: number; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = React.useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number | null = null;
          const duration = 1800; // 1.8s duration

          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(easeOut * endValue);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [endValue, hasAnimated]);

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}{suffix}
    </span>
  );
}

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  
  // Toast notifications state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll listener for header shadow & active section highlights
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsHeaderScrolled(true);
      } else {
        setIsHeaderScrolled(false);
      }

      const sections = document.querySelectorAll('section[id]');
      const scrollY = window.pageYOffset;

      sections.forEach((current) => {
        const sectionHeight = (current as HTMLElement).offsetHeight;
        const sectionTop = (current as HTMLElement).offsetTop - 120;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          if (sectionId) {
            setActiveSection(sectionId);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll-reveal: fade-in sections as they enter the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Toast handlers
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Contact form handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    const fieldMap: Record<string, string> = {
      'form-name': 'name',
      'form-email': 'email',
      'form-subject': 'subject',
      'form-message': 'message'
    };
    const field = fieldMap[id];
    if (field) {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setFormErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = {
      name: formData.name.trim() === '',
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()),
      subject: formData.subject.trim() === '',
      message: formData.message.trim() === ''
    };
    setFormErrors(errors);

    const hasErrors = Object.values(errors).some((err) => err);
    if (hasErrors) {
      showToast('Please correct the highlighted form errors.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      showToast(
        `Thank you, ${formData.name.trim()}! Your message has been sent successfully.`,
        'success'
      );
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  // Resume Print handler
  const handleResumePrint = () => {
    showToast('Opening printable resume preview...', 'success');
    setTimeout(() => {
      window.open('/resume.html#print', '_blank');
    }, 800);
  };

  return (
    <>
      {/* Toast Notification System */}
      {toast && (
        <div id="toast-container" className="toast-container">
          <div className={`toast ${toast.type}`}>
            <i
              className={
                toast.type === 'success'
                  ? 'fa-solid fa-circle-check toast-icon'
                  : 'fa-solid fa-circle-exclamation toast-icon'
              }
            ></i>
            <span className="toast-message">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Decorative Blobs */}
      <div className="blob-container">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Header & Navigation */}
      <header className={`header ${isHeaderScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#" className="logo-text">
            <span className="logo-symbol">&lt;/&gt;</span> Shravan
            <span className="highlight">.</span>
          </a>
          <nav className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`} id="nav-menu">
            <a
              href="#about"
              className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#skills"
              className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Skills
            </a>
            <a
              href="#experience"
              className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Experience
            </a>
            <a
              href="#projects"
              className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Projects
            </a>
            <a
              href="#finance"
              className={`nav-link ${activeSection === 'finance' ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Finance
            </a>
            <a
              href="#ai-scribe"
              className={`nav-link ${activeSection === 'ai-scribe' ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              AI Assistant
            </a>
            <a
              href="#contact"
              className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
          </nav>
          <div className="nav-actions">
            <button
              id="cv-btn"
              onClick={handleResumePrint}
              className="btn btn-primary btn-sm cv-btn"
            >
              <i className="fa-solid fa-download"></i> Get Resume
            </button>
            <button
              className={`mobile-toggle ${isMobileMenuOpen ? 'open' : ''}`}
              id="mobile-toggle"
              aria-label="Toggle Menu"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero-section" id="hero">
          <NeuralCanvas />
          <div className="container hero-container">
            <div className="hero-content">
              <div className="badge-tag">
                <span className="ping-dot"></span>{' '}
                <i className="fa-solid fa-robot"></i> Open for Backend & AI Roles
              </div>
              <h1 className="hero-title">
                Hi, I'm <span className="gradient-text">Shravan Kotagi</span>
              </h1>
              <h2 className="hero-subtitle">
                I build <Typewriter />
              </h2>
              <p className="hero-description">
                Computer Science student specializing in backend architecture, microservices, and AI-powered products. Passionate about engineering high-throughput APIs, optimizing complex data models, and deploying intelligent models in production.
              </p>
              <div className="hero-ctas">
                <a href="#contact" className="btn btn-primary">
                  <i className="fa-regular fa-paper-plane"></i> Let's Connect
                </a>
                <a href="#projects" className="btn btn-secondary">
                  View Work <i className="fa-solid fa-arrow-down"></i>
                </a>
              </div>
              <div className="social-links">
                <a
                  href="https://github.com/Shravankotagi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="GitHub"
                >
                  <i className="fa-brands fa-github"></i>
                </a>
                <a
                  href="https://linkedin.com/in/shravankotagi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="LinkedIn"
                >
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
                <a
                  href="mailto:shravankotagi314@gmail.com"
                  className="social-icon"
                  aria-label="Email"
                >
                  <i className="fa-regular fa-envelope"></i>
                </a>
                <a href="tel:+918262937458" className="social-icon" aria-label="Phone">
                  <i className="fa-solid fa-phone"></i>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="metrics-section reveal">
          <div className="container grid-4">
            <div className="metric-item card-hover">
              <div className="metric-number">
                <CounterNumber endValue={6} suffix="+" />
              </div>
              <div className="metric-label">AI Products Built & Deployed</div>
            </div>
            <div className="metric-item card-hover">
              <div className="metric-number">
                <CounterNumber endValue={70} suffix="%" />
              </div>
              <div className="metric-label">Surveillance Workload Cut</div>
            </div>
            <div className="metric-item card-hover">
              <div className="metric-number">
                <CounterNumber endValue={90.6} suffix="%" decimals={1} />
              </div>
              <div className="metric-label">Threat Detection Accuracy</div>
            </div>
            <div className="metric-item card-hover">
              <div className="metric-number">
                <CounterNumber endValue={45} suffix="%" />
              </div>
              <div className="metric-label">Database Load Cut via Redis</div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="about-section section-padding reveal" id="about">
          <div className="container">
            <div className="section-header">
              <span className="subtitle-badge">My Story</span>
              <h2 className="section-title">About Me</h2>
              <div className="section-line"></div>
            </div>

            <div className="about-grid">
              <div className="about-details">
                <h3 className="about-subtitle">AI & Backend Engineer Specialization</h3>
                <p className="about-paragraph">
                  I am currently pursuing my <strong>Bachelor of Engineering in Computer Science</strong> with specialization in <strong>Artificial Intelligence & Machine Learning</strong> from Kolhapur Institute of Technology (CGPA: 7.5/10.00). My sweet spot lies at the intersection of robust backend engineering and modern generative AI technology.
                </p>
                <p className="about-paragraph">
                  During my recent internship at <strong>Enlight Lab</strong>, I acted as an autonomous builder, taking multiple end-to-end AI products (Voice Agents, Clinical Scribes, PRD Creator pipelines) from architectural design and database modeling to cloud deployment. I focus on developing systems that are not just smart, but highly performant, utilizing Redis caching, multithreaded workers, and streamlined database schemas to deliver responsive client experiences.
                </p>
                <div className="bio-info-grid">
                  <div className="bio-item">
                    <strong>Education:</strong> <span>B.E. CS (AI & ML)</span>
                  </div>
                  <div className="bio-item">
                    <strong>Location:</strong> <span>Maharashtra, India</span>
                  </div>
                  <div className="bio-item">
                    <strong>Email:</strong> <span>shravankotagi314@gmail.com</span>
                  </div>
                  <div className="bio-item">
                    <strong>Relocation:</strong> <span>Open to relocate</span>
                  </div>
                </div>
              </div>

              <div className="about-education-card">
                <div className="edu-card">
                  <div className="edu-icon">
                    <i className="fa-solid fa-graduation-cap"></i>
                  </div>
                  <div className="edu-details">
                    <span className="edu-duration">2022 – 2026</span>
                    <h4 className="edu-degree">Kolhapur Institute of Technology</h4>
                    <p className="edu-major">
                      Bachelor of Engineering in Computer Science (AI & ML)
                    </p>
                    <div className="edu-coursework">
                      <strong>Coursework:</strong> DSA, DBMS, OOP, OS, Computer Networks, Software Engineering, Cloud Computing
                    </div>
                  </div>
                </div>

                <div className="edu-card mt-4">
                  <div className="edu-icon">
                    <i className="fa-solid fa-certificate"></i>
                  </div>
                  <div className="edu-details">
                    <span className="edu-duration">Certifications</span>
                    <ul className="cert-list">
                      <li>
                        <i className="fa-solid fa-circle-check text-primary"></i>{' '}
                        Generative AI with LLMs{' '}
                        <span className="cert-issuer">(DeepLearning.ai)</span>
                      </li>
                      <li>
                        <i className="fa-solid fa-circle-check text-primary"></i>{' '}
                        Supervised Machine Learning{' '}
                        <span className="cert-issuer">(DeepLearning.ai)</span>
                      </li>
                      <li>
                        <i className="fa-solid fa-circle-check text-primary"></i>{' '}
                        Tech & Data Analytics Simulation{' '}
                        <span className="cert-issuer">(Deloitte Australia)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="skills-section section-padding reveal" id="skills">
          <div className="container">
            <div className="section-header">
              <span className="subtitle-badge">Stack & Tools</span>
              <h2 className="section-title">Technical Expertise</h2>
              <div className="section-line"></div>
            </div>

            <div className="skills-grid">
              {/* Backend Engineering */}
              <div className="skill-category-card">
                <div className="category-header">
                  <i className="fa-solid fa-server category-icon"></i>
                  <h3>Backend Technologies</h3>
                </div>
                <div className="skills-list">
                  <div className="skill-tag">
                    <i className="devicon-spring-original colored"></i> Spring Framework
                  </div>
                  <div className="skill-tag">
                    <i className="devicon-nodejs-plain colored"></i> Node.js
                  </div>
                  <div className="skill-tag">
                    <i className="devicon-express-original"></i> Express.js
                  </div>
                  <div className="skill-tag">
                    <i className="devicon-flask-original"></i> Flask
                  </div>
                  <div className="skill-tag">
                    <i className="devicon-nextjs-original-wordmark"></i> Next.js
                  </div>
                  <div className="skill-tag">
                    <i className="fa-solid fa-network-wired text-primary"></i> RESTful APIs
                  </div>
                  <div className="skill-tag">
                    <i className="fa-solid fa-cubes text-secondary"></i> Microservices
                  </div>
                </div>
              </div>

              {/* AI & ML Tools */}
              <div className="skill-category-card">
                <div className="category-header">
                  <i className="fa-solid fa-brain category-icon"></i>
                  <h3>AI & Intelligence</h3>
                </div>
                <div className="skills-list">
                  <div className="skill-tag">
                    <i className="fa-solid fa-link text-primary"></i> LangChain
                  </div>
                  <div className="skill-tag">
                    <i className="fa-solid fa-wand-magic-sparkles text-warning"></i> Gemini API
                  </div>
                  <div className="skill-tag">
                    <i className="fa-solid fa-microphone text-danger"></i> OpenAI Whisper
                  </div>
                  <div className="skill-tag">
                    <i className="devicon-tensorflow-line colored"></i> TensorFlow
                  </div>
                  <div className="skill-tag">
                    <i className="devicon-python-plain colored"></i> Scikit-Learn
                  </div>
                  <div className="skill-tag">
                    <i className="devicon-opencv-plain colored"></i> OpenCV
                  </div>
                  <div className="skill-tag">
                    <i className="fa-solid fa-bolt text-success"></i> Socket.io
                  </div>
                </div>
              </div>

              {/* Databases & Caching */}
              <div className="skill-category-card">
                <div className="category-header">
                  <i className="fa-solid fa-database category-icon"></i>
                  <h3>Databases & DevOps</h3>
                </div>
                <div className="skills-list">
                  <div className="skill-tag">
                    <i className="devicon-mysql-plain colored"></i> MySQL
                  </div>
                  <div className="skill-tag">
                    <i className="devicon-postgresql-plain colored"></i> PostgreSQL
                  </div>
                  <div className="skill-tag">
                    <i className="devicon-mongodb-plain colored"></i> MongoDB
                  </div>
                  <div className="skill-tag">
                    <i className="devicon-redis-plain colored"></i> Redis
                  </div>
                  <div className="skill-tag">
                    <i className="devicon-amazonwebservices-plain colored"></i> AWS EC2 / S3
                  </div>
                  <div className="skill-tag">
                    <i className="devicon-docker-plain colored"></i> Docker
                  </div>
                  <div className="skill-tag">
                    <i className="devicon-git-plain colored"></i> Git / GitHub
                  </div>
                  <div className="skill-tag">
                    <i className="fa-solid fa-arrows-spin text-info"></i> CI/CD
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="skill-category-card">
                <div className="category-header">
                  <i className="fa-solid fa-code category-icon"></i>
                  <h3>Languages & Practices</h3>
                </div>
                <div className="skills-list">
                  <div className="skill-tag">
                    <i className="devicon-java-plain colored"></i> Java
                  </div>
                  <div className="skill-tag">
                    <i className="devicon-python-plain colored"></i> Python
                  </div>
                  <div className="skill-tag">
                    <i className="devicon-typescript-plain colored"></i> TypeScript
                  </div>
                  <div className="skill-tag">
                    <i className="devicon-html5-plain colored"></i> HTML5 & CSS3
                  </div>
                  <div className="skill-tag">
                    <i className="fa-solid fa-gears text-primary"></i> System Design & OOP
                  </div>
                  <div className="skill-tag">
                    <i className="fa-solid fa-users-rectangle text-secondary"></i> Agile Methodology
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="experience-section section-padding reveal" id="experience">
          <div className="container">
            <div className="section-header">
              <span className="subtitle-badge">Timeline</span>
              <h2 className="section-title">Professional Experience</h2>
              <div className="section-line"></div>
            </div>

            <div className="timeline">
              {/* Timeline Item 1 */}
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-date">March 2025 – May 2025</div>
                <div className="timeline-content card-hover">
                  <div className="experience-role-header">
                    <div>
                      <h3 className="role-title">AI Engineer Intern</h3>
                      <span className="company-name">
                        <i className="fa-solid fa-building"></i> Enlight Lab
                      </span>
                    </div>
                    <span className="location-badge">
                      <i className="fa-solid fa-location-dot"></i> Remote
                    </span>
                  </div>
                  <ul className="experience-details">
                    <li>
                      Built and deployed multiple end-to-end AI products independently, including a{' '}
                      <strong>Real-time Voice Agent</strong>, <strong>AI Clinical Scribe</strong>{' '}
                      (utilizing OpenAI Whisper + FastAPI + Next.js), and an{' '}
                      <strong>AI Readiness Testing tool</strong>. All shipped to the company platform, contributing directly to revenue.
                    </li>
                    <li>
                      Engineered a <strong>PRD Document Creator</strong> utilizing Next.js and the Gemini API, creating a conversational intake pipeline that converts verbal client requirements into structured technical docs. Active in live client engagements.
                    </li>
                    <li>
                      Demonstrated complete end-to-end ownership across 4 distinct products, designing systems from PostgreSQL schema/Prisma ORM configurations up through Next.js frontend integrations, Docker packaging, and AWS production release.
                    </li>
                  </ul>
                  <div className="tech-badges">
                    <span>Gemini API</span>
                    <span>OpenAI Whisper</span>
                    <span>FastAPI</span>
                    <span>Next.js</span>
                    <span>PostgreSQL</span>
                    <span>Prisma</span>
                    <span>Docker</span>
                  </div>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-date">July 2024 – August 2024</div>
                <div className="timeline-content card-hover">
                  <div className="experience-role-header">
                    <div>
                      <h3 className="role-title">Project Intern</h3>
                      <span className="company-name">
                        <i className="fa-solid fa-building"></i> Airport Authority of India
                      </span>
                    </div>
                    <span className="location-badge">
                      <i className="fa-solid fa-location-dot"></i> Kolhapur, India
                    </span>
                  </div>
                  <ul className="experience-details">
                    <li>
                      Developed a real-time smart video processing system integrating 15+ CCTV feeds. Leveraged Python and OpenCV running at 30 FPS with optimized multi-threaded frames capture, reducing physical surveillance workload by 70%.
                    </li>
                    <li>
                      Achieved a threat detection/intrusion accuracy of <strong>90.6%</strong> using fine-tuned computer vision scripts.
                    </li>
                    <li>
                      Built a lightweight backend microservice for automated alert generation and security logs, designing the comprehensive network architecture for integration into existing airport physical security servers.
                    </li>
                  </ul>
                  <div className="tech-badges">
                    <span>Python</span>
                    <span>OpenCV</span>
                    <span>Multithreading</span>
                    <span>Data Flow Diagrams</span>
                    <span>Alerting Engine</span>
                  </div>
                </div>
              </div>

              {/* Timeline Item 3 */}
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-date">June 2024 – August 2024</div>
                <div className="timeline-content card-hover">
                  <div className="experience-role-header">
                    <div>
                      <h3 className="role-title">Software Development Intern</h3>
                      <span className="company-name">
                        <i className="fa-solid fa-building"></i> Softech Solutions Pvt. Ltd.
                      </span>
                    </div>
                    <span className="location-badge">
                      <i className="fa-solid fa-location-dot"></i> Kolhapur, India
                    </span>
                  </div>
                  <ul className="experience-details">
                    <li>
                      Developed a database-driven inventory management system; engineered optimized SQL queries for validation, reducing manual workload by 35% and improving operational efficiency by 25%.
                    </li>
                    <li>
                      Wrote and executed extensive unit and integration tests; analyzed system defects and resolved bugs to increase code reliability, cutting data entry errors by 60%.
                    </li>
                    <li>
                      Prepared thorough technical documentation, API specifications, and workflow diagrams for bugs, fixes, and inventory models.
                    </li>
                  </ul>
                  <div className="tech-badges">
                    <span>SQL</span>
                    <span>Java</span>
                    <span>Unit Testing</span>
                    <span>Git</span>
                    <span>Technical Documentation</span>
                    <span>Bug Debugging</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="projects-section section-padding reveal" id="projects">
          <div className="container">
            <div className="section-header">
              <span className="subtitle-badge">Portfolio Showcase</span>
              <h2 className="section-title">Key Projects</h2>
              <div className="section-line"></div>
            </div>
            <ProjectFilter />
          </div>
        </section>

        {/* Finance & Markets Section */}
        <section className="finance-section section-padding reveal" id="finance">
          <div className="container">
            <div className="section-header">
              <span className="subtitle-badge">Finance & Analysis</span>
              <h2 className="section-title">Financial Markets Experience</h2>
              <p className="section-subtitle-description">
                Active investor and market analyst with 3+ years of experience across multiple financial asset classes, combining technical precision with fundamental indicators.
              </p>
              <div className="section-line"></div>
            </div>

            <div className="finance-grid">
              <div className="finance-card card-hover">
                <div className="finance-card-icon">
                  <i className="fa-solid fa-chart-line"></i>
                </div>
                <h3>Indian Stock Market</h3>
                <p>
                  Engaged in equity trading and long-term investing across NSE/BSE. Specialize in sector-wise growth analysis, value investing, and optimizing portfolio returns based on company earnings, market capitalizations, and macroeconomic indicators.
                </p>
                <div className="finance-tags">
                  <span>Equities</span>
                  <span>Portfolio Management</span>
                  <span>NSE/BSE</span>
                </div>
              </div>

              <div className="finance-card card-hover">
                <div className="finance-card-icon">
                  <i className="fa-solid fa-coins"></i>
                </div>
                <h3>Forex Markets</h3>
                <p>
                  Analyze major and minor currency pairs by monitoring central bank policy rates, inflation dynamics, global macroeconomic data feeds, and geopolitical events. Apply systematic risk management to calculate trade viability.
                </p>
                <div className="finance-tags">
                  <span>FX Trading</span>
                  <span>Macro Analysis</span>
                  <span>Risk Management</span>
                </div>
              </div>

              <div className="finance-card card-hover">
                <div className="finance-card-icon">
                  <i className="fa-solid fa-cubes"></i>
                </div>
                <h3>Commodities Market</h3>
                <p>
                  Formulate strategic trading views on gold, silver, crude oil, and natural gas. Track global supply/demand imbalances, US Dollar strength fluctuations, inventory releases, and cyclical seasonal trends to hedge and capitalize on price actions.
                </p>
                <div className="finance-tags">
                  <span>Commodities</span>
                  <span>Supply-Demand</span>
                  <span>Hedging</span>
                </div>
              </div>

              <div className="finance-card card-hover">
                <div className="finance-card-icon">
                  <i className="fa-solid fa-magnifying-glass-chart"></i>
                </div>
                <h3>Stock Analysis & Strategy</h3>
                <p>
                  Execute thorough stock evaluations by integrating key fundamental metrics (P/E ratio, D/E ratio, ROE, Free Cash Flow) with technical analysis (support/resistance, moving averages, trendline breakouts). Deploy strict risk-to-reward metrics.
                </p>
                <div className="finance-tags">
                  <span>Fundamental Analysis</span>
                  <span>Technical Charting</span>
                  <span>Risk:Reward</span>
                </div>
              </div>
            </div>

            {/* Visual highlight box showing key stats/beliefs */}
            <div className="finance-insights-banner">
              <div className="insight-metric">
                <span className="insight-value">3+ Years</span>
                <span className="insight-label">Active Market Experience</span>
              </div>
              <div className="insight-divider"></div>
              <div className="insight-metric">
                <span className="insight-value">1:2+</span>
                <span className="insight-label">Min Risk-to-Reward Ratio</span>
              </div>
              <div className="insight-divider"></div>
              <div className="insight-metric">
                <span className="insight-value">Data-Driven</span>
                <span className="insight-label">Analysis Approach</span>
              </div>
            </div>
          </div>
        </section>

        {/* AI Scribe Section */}
        <section className="ai-scribe-section section-padding reveal" id="ai-scribe">
          <div className="container">
            <div className="section-header">
              <span className="subtitle-badge">
                <i className="fa-solid fa-robot"></i> Interactive Agent
              </span>
              <h2 className="section-title">Resume AI Assistant</h2>
              <p className="section-subtitle-description">
                Interact with a mock AI Scribe that answers recruiter questions instantly based on Shravan's background and resume data.
              </p>
              <div className="section-line"></div>
            </div>
            <AIAssistant />
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section section-padding reveal" id="contact">
          <div className="container">
            <div className="section-header">
              <span className="subtitle-badge">Get In Touch</span>
              <h2 className="section-title">Contact Me</h2>
              <div className="section-line"></div>
            </div>

            <div className="contact-grid">
              {/* Info Details Card */}
              <div className="contact-info-card">
                <h3>Let's build something exceptional!</h3>
                <p>
                  I am seeking a full-time Software Engineer, Backend Developer, or AI Engineer role. Drop me a line, and I will get back to you within 24 hours.
                </p>

                <div className="contact-details-list">
                  <div className="contact-item">
                    <div className="contact-icon-circle">
                      <i className="fa-solid fa-envelope"></i>
                    </div>
                    <div>
                      <span className="detail-label">Email Me</span>
                      <a href="mailto:shravankotagi314@gmail.com" className="detail-value">
                        shravankotagi314@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon-circle">
                      <i className="fa-solid fa-phone"></i>
                    </div>
                    <div>
                      <span className="detail-label">Call / WhatsApp</span>
                      <a href="tel:+918262937458" className="detail-value">
                        +91 8262937458
                      </a>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon-circle">
                      <i className="fa-solid fa-location-dot"></i>
                    </div>
                    <div>
                      <span className="detail-label">Location</span>
                      <span className="detail-value">
                        Kolhapur, Maharashtra 416005, India
                      </span>
                    </div>
                  </div>
                </div>

                <div className="social-circles">
                  <a
                    href="https://linkedin.com/in/shravankotagi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-circle-link"
                    aria-label="LinkedIn Profile"
                  >
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                  <a
                    href="https://github.com/Shravankotagi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-circle-link"
                    aria-label="GitHub Profile"
                  >
                    <i className="fa-brands fa-github"></i>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* Floating Quick Action Pill */}
      <div className="floating-quick-dock">
        <a href="#ai-scribe" className="dock-btn" title="Ask AI Scribe Assistant">
          <i className="fa-solid fa-robot"></i> <span>Ask AI Scribe</span>
        </a>
        <button onClick={handleResumePrint} className="dock-btn primary" title="Get Resume">
          <i className="fa-solid fa-file-pdf"></i> <span>Resume</span>
        </button>
        <a href="mailto:shravankotagi314@gmail.com" className="dock-btn" title="Email Shravan">
          <i className="fa-regular fa-paper-plane"></i> <span>Hire Me</span>
        </a>
      </div>
    </>
  );
}
