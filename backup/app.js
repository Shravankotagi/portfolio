/* ==========================================================================
   SHRAVAN KOTAGI - PORTFOLIO INTERACTIVE LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNeuralCanvas();
  initTypewriter();
  initNavigation();
  initProjectFilter();
  initIntersectionObserver();
  initContactForm();
  initAIScribe();
  initResumePrint();
});

/* ==========================================================================
   TYPEWRITER ANIMATION (HERO SECTION)
   ========================================================================== */
function initTypewriter() {
  const typewriterElement = document.getElementById('typewriter');
  if (!typewriterElement) return;

  const words = [
    "Scalable Backend APIs",
    "Intelligent AI Agents",
    "Real-time Video Processing",
    "High-Performance Code",
    "Distributed Systems"
  ];
  
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      // Remove character
      typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Deleting is faster
    } else {
      // Add character
      typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120; // Natural typing speed
    }

    // Checking word completion
    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at full word
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      // Move to next word
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500; // Pause before starting next word
    }

    setTimeout(type, typingSpeed);
  }

  // Start typing cycle
  setTimeout(type, 1000);
}

/* ==========================================================================
   NAVIGATION & ACTIVE STATES
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll Header Shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    highlightActiveLink();
  });

  // Mobile Menu Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  // Highlight Nav Link on Scroll
  function highlightActiveLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector(`.nav-link[href*=${sectionId}]`)?.classList.add('active');
      } else {
        document.querySelector(`.nav-link[href*=${sectionId}]`)?.classList.remove('active');
      }
    });
  }
}

/* ==========================================================================
   PROJECT FILTERING LOGIC
   ========================================================================== */
function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle Active Button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        // Add subtle scale out animation before hiding
        if (filterVal === 'all' || category === filterVal) {
          card.classList.remove('hidden');
          // Trigger CSS scale animation
          card.style.opacity = '0';
          card.style.transform = 'scale(0.85)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
            card.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
          }, 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
   ========================================================================== */
function initIntersectionObserver() {
  const animatedElements = [
    ...document.querySelectorAll('.skill-category-card'),
    ...document.querySelectorAll('.timeline-item'),
    ...document.querySelectorAll('.project-card'),
    ...document.querySelectorAll('.metric-item'),
    ...document.querySelectorAll('.edu-card'),
    document.querySelector('.about-details'),
    document.querySelector('.about-education-card'),
    document.querySelector('.contact-info-card'),
    document.querySelector('.contact-form-card')
  ];

  // Set default opacity of elements to 0 in JS to prevent blocking load if JS fails
  animatedElements.forEach(el => {
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
    }
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        target.style.opacity = '1';
        target.style.transform = 'translateY(0)';
        observer.unobserve(target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => {
    if (el) observer.observe(el);
  });
}

/* ==========================================================================
   RESUME PRINT ACTION (CV DOWNLOAD TRIGGERS)
   ========================================================================== */
function initResumePrint() {
  const cvBtn = document.getElementById('cv-btn');
  if (cvBtn) {
    cvBtn.addEventListener('click', () => {
      showToast('Opening printable resume preview...', 'success');
      setTimeout(() => {
        window.open('resume.html#print', '_blank');
      }, 800);
    });
  }
}

/* ==========================================================================
   TOAST NOTIFICATION SYSTEM
   ========================================================================== */
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icon = document.createElement('i');
  icon.className = type === 'success' 
    ? 'fa-solid fa-circle-check toast-icon' 
    : 'fa-solid fa-circle-exclamation toast-icon';
    
  const text = document.createElement('span');
  text.className = 'toast-message';
  text.textContent = message;

  toast.appendChild(icon);
  toast.appendChild(text);
  container.appendChild(toast);

  // Fade out and remove
  setTimeout(() => {
    toast.classList.add('fade-out');
    toast.addEventListener('animationend', () => {
      toast.remove();
    });
  }, 4000);
}

/* ==========================================================================
   CONTACT FORM VALIDATION & MOCK SUBMIT
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const subjectInput = document.getElementById('form-subject');
  const messageInput = document.getElementById('form-message');
  const submitBtn = document.getElementById('submit-btn');

  // Real-time error removal
  const inputs = [nameInput, emailInput, subjectInput, messageInput];
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.value.trim() !== '') {
        input.classList.remove('error');
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate Name
    if (nameInput.value.trim() === '') {
      nameInput.classList.add('error');
      isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      emailInput.classList.add('error');
      isValid = false;
    }

    // Validate Subject
    if (subjectInput.value.trim() === '') {
      subjectInput.classList.add('error');
      isValid = false;
    }

    // Validate Message
    if (messageInput.value.trim() === '') {
      messageInput.classList.add('error');
      isValid = false;
    }

    if (!isValid) {
      showToast('Please correct the highlighted form errors.', 'error');
      return;
    }

    // Form is Valid: Simulate Submission
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

    setTimeout(() => {
      showToast(`Thank you, ${nameInput.value.trim()}! Your message has been sent successfully.`, 'success');
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }, 1500);
  });
}

/* ==========================================================================
   INTERACTIVE RESUME AI SCRIBE
   ========================================================================== */
function initAIScribe() {
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input-text');
  const chatBody = document.getElementById('chat-body');
  const clearBtn = document.getElementById('chat-clear-btn');
  const suggestionChips = document.querySelectorAll('.suggest-chip');

  if (!chatForm || !chatInput || !chatBody) return;

  // QA Corpus about Shravan (Formatted Answers)
  const responses = {
    summary: `<strong>Professional Summary:</strong><br>
              Shravan Kotagi is a Computer Science student specializing in backend development and AI engineering with a strong foundation in Java, Python, Node.js, databases (MySQL, MongoDB), and cloud technologies (AWS). He has proven experience building scalable backend systems, RESTful APIs, voice agents, and end-to-end AI-powered products deployed in production. He is actively seeking a Backend Engineering Intern role to contribute to building robust, scalable backend services.`,

    skills: `<strong>Shravan's Core Technical Skills:</strong><br>
             • <strong>Programming Languages:</strong> Java, Python, SQL, TypeScript, HTML, CSS<br>
             • <strong>Backend Technologies:</strong> RESTful APIs, Microservices, Spring Framework, FastAPI, Flask, Node.js, Express.js, Next.js<br>
             • <strong>Databases & Caching:</strong> MySQL, PostgreSQL, MongoDB, Redis, DBMS, Data Modeling<br>
             • <strong>Cloud & DevOps:</strong> AWS (EC2, S3), Docker, Git/GitHub, CI/CD, Railway, Render, Vercel<br>
             • <strong>AI Frameworks & Stack:</strong> LangChain, Gemini API, OpenAI Whisper, Hugging Face, TensorFlow, PyTorch, OpenCV, YOLO, FAISS, Pinecone<br>
             • <strong>Development Practices:</strong> OOP, System Design, SDLC, Agile, Technical Documentation, Testing & Debugging`,
    
    enlightlab: `During his internship at <strong>Enlight Lab</strong> (March - May 2025), Shravan served as an AI Engineer Intern. He independently built and deployed 4 production products:<br>
                 1. <strong>Real-time Voice Agent</strong>: Voice pipeline shipped directly to the company website.<br>
                 2. <strong>AI Clinical Scribe</strong>: Built using OpenAI Whisper + FastAPI backend + Next.js frontend.<br>
                 3. <strong>PRD Document Creator</strong>: An intake chatbot leveraging Next.js and the Gemini API, now active in client consulting calls.<br>
                 4. <strong>AI Readiness Testing tool</strong>.<br>
                 He took ownership of full-stack delivery including DB layouts (PostgreSQL + Prisma) and Docker cloud packaging, contributing directly to client revenue generation.`,
    
    airport: `At the <strong>Airport Authority of India, Kolhapur</strong> (July - August 2024), Shravan served as an AI/ML Intern and built an automated <strong>CCTV video processing security monitor</strong> using Python, OpenCV, and multithreading.<br>
              Key metrics reached:<br>
              • Thread-pool frame feeds: <strong>15+ streams at 30 FPS</strong><br>
              • Intrusions threat accuracy: <strong>90.6% threat detection</strong><br>
              • Manual security workload: <strong>reduced by 70%</strong><br>
              He also developed the alerting backend and data flow diagrams for airport infrastructure logs.`,
    
    softech: `During his internship at <strong>Softech Solutions Pvt. Ltd.</strong> (June - August 2024), Shravan served as a Software Development Intern.<br>
              Key contributions include:<br>
              • Developed a database-driven inventory management system, writing optimized SQL queries for validation that reduced manual workload by 35% and improved efficiency by 25%.<br>
              • Wrote and executed unit and integration tests to resolve bugs, reducing data entry errors by 60%.<br>
              • Generated comprehensive technical documentation and system workflow diagrams.`,
    
    prohomecare: `<strong>ProHomeCare</strong> is an on-demand services MERN platform engineered by Shravan. Key features include:<br>
                  • Node.js & Express microservices with MongoDB database.<br>
                  • <strong>Redis caching</strong>: Cut DB load by 45% and boosted API speed by 60% (sub-100ms queries).<br>
                  • <strong>WebSockets</strong>: Socket.io handling 50+ active real-time notifications sessions.<br>
                  • <strong>Payments</strong>: Razorpay gateway integration maintaining 99.8% transaction success rates. Deployed on AWS EC2 with auto-scaling.`,
    
    pdfrag: `The <strong>PDF RAG Chatbot</strong> is an end-to-end question answering system built using:<br>
             • Python, LangChain, FAISS, Pinecone, and Gemini API to load, chunk, and embed PDFs for context-aware Q&A.<br>
             • Optimized retrieval parameters to prevent LLM hallucinations, returning answers with source citations.<br>
             • Built a clean frontend UI in Streamlit supporting multiple document uploads.`,
    
    finance: `The <strong>Finance Management System</strong> is a secure ledger backend built with:<br>
              • Java, Spring Boot, and Spring Security for secure endpoints.<br>
              • Role-Based Access Controls and JWT Web Tokens.<br>
              • SOLID architecture principles and comprehensive testing pipelines.`,
    
    egovernance: `The <strong>E-Governance Management System</strong> won first place at the <strong>Quantbit Technologies Hackathon</strong>. Built by Shravan, it features:<br>
                  • Scalable Java Servlets and normalized MySQL design handling 1,000+ civic transactions daily.<br>
                  • Role-Based Auth (Citizens, Officers, and Administrators).<br>
                  • Automated email notification triggers, which reduced citizen support queries by 40%.`,
    
    exhibit: `<strong>Exhibit Monitor</strong> is a Java backend file processing system built during the <strong>Zensar Technologies Hackathon</strong>:<br>
              • Designed to monitor and digest 100+ files daily up to 10 GB in size.<br>
              • Leveraged multithreading to cut file parsing times by 50%.<br>
              • Implemented duplicate checks utilizing memory-mapped HashMaps, and structured runtime configs.`,
    
    zkpiris: `The <strong>ZKP-Verified Iris Biometric System</strong> is a privacy-preserving authentication pipeline:<br>
              • Processed 50k+ eye iris samples using Python, TensorFlow, and OpenCV.<br>
              • Achieved 97.8% precision and reduced verification time by 35% through computer vision optimizations.`,
    
    hackathons: `Shravan won first place at the <strong>Quantbit Technologies Hackathon</strong> for his Java-based E-Governance Management platform. He also built his multithreaded Exhibit Monitor file processing backend during the <strong>Zensar Technologies Hackathon</strong> in 2025.`,
    
    contact: `You can reach Shravan through:<br>
              • <strong>Phone / WhatsApp:</strong> +91 8262937458<br>
              • <strong>Email:</strong> shravankotagi314@gmail.com<br>
              • <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/shravankotagi" target="_blank" style="color:var(--primary);text-decoration:underline;">linkedin.com/in/shravankotagi</a><br>
              • <strong>GitHub:</strong> <a href="https://github.com/Shravankotagi" target="_blank" style="color:var(--primary);text-decoration:underline;">github.com/Shravankotagi</a>`,
    
    education: `Shravan is pursuing his <strong>Bachelor of Engineering / B.Tech in Computer Science</strong> with a specialization in <strong>Artificial Intelligence & Machine Learning</strong> from the <strong>Kolhapur Institute of Technology</strong> (2022 - 2026).<br>
                He currently holds a <strong>CGPA of 7.5/10.00</strong>. Core coursework includes: DSA, OOP, DBMS, OS, networks, system design, and cloud computing.`,
    
    certifications: `Shravan holds key industry certifications:<br>
                     1. <strong>Generative AI with Large Language Models</strong> (DeepLearning.ai - August 2024)<br>
                     2. <strong>Supervised Machine Learning: Regression and Classification</strong> (DeepLearning.ai - January 2024)<br>
                     3. <strong>Technology & Data Analytics Job Simulation</strong> (Deloitte Australia - June 2024)`,
    
    relocation: `Yes, Shravan Kotagi is fully open to relocating for backend or AI engineering internship roles, and is highly adaptable to hybrid/remote work setups.`,

    default: `I can search Shravan's resume for anything! Try asking about his: <strong>skills</strong>, <strong>Enlight Lab internship</strong>, <strong>Airport CCTV project</strong>, <strong>Softech Solutions role</strong>, or specific projects like <strong>PDF RAG</strong>, <strong>ProHomeCare</strong>, <strong>Finance ledger</strong>, <strong>E-Governance</strong>, <strong>ZKP Iris Biometrics</strong>, <strong>Hackathons</strong>, and <strong>Contact info</strong>.`
  };

  // Structured retrieval corpus mapping keywords to formatted response keys
  const corpus = {
    summary: {
      keywords: ['summary', 'profile', 'bio', 'who', 'about', 'background', 'engineer', 'developer', 'specialist', 'student', 'resume', 'intro', 'introduction'],
      text: "Shravan Kotagi is a Computer Science B.Tech student specializing in backend architecture and AI/ML engineering. He has built voice agents, RAG systems, biometrics verifiers, and microservice APIs using Spring, Node, Express, Python, and AWS."
    },
    skills: {
      keywords: ['skills', 'technologies', 'stack', 'languages', 'databases', 'frameworks', 'tools', 'coding', 'java', 'python', 'sql', 'typescript', 'docker', 'git', 'caching', 'devops', 'cloud', 'aws', 'redis', 'postgres', 'mongodb', 'tensorflow', 'pytorch', 'opencv', 'langchain', 'yolo'],
      text: "Shravan's skills: Languages (Java, Python, SQL, TypeScript); Backend (Spring Boot, FastAPI, Flask, Node.js, Express.js, Next.js); Databases (MySQL, PostgreSQL, MongoDB, Redis); Cloud & DevOps (AWS EC2/S3, Docker, CI/CD, Git); AI Stack (LangChain, Gemini API, OpenAI Whisper, Hugging Face, TensorFlow, PyTorch, OpenCV, YOLO, FAISS, Pinecone)."
    },
    enlightlab: {
      keywords: ['enlight', 'lab', 'internship', 'voice agent', 'clinical scribe', 'prd', 'whisper', 'fastapi', 'prisma', 'postgres', 'intern', 'work'],
      text: "During his AI Engineer internship at Enlight Lab (March – May 2025), Shravan built a real-time Voice Agent, an AI Clinical Scribe (Whisper + FastAPI + Next.js), an AI Readiness Testing tool, and a PRD Document Creator (Gemini API + Next.js), deploying them using Prisma and Docker."
    },
    airport: {
      keywords: ['airport', 'aai', 'cctv', 'surveillance', 'video', 'opencv', 'feeds', 'detection', 'threat', 'intrusion', 'camera'],
      text: "As an AI/ML Intern at the Airport Authority of India (July – August 2024), Shravan developed an OpenCV-based multithreaded real-time CCTV video system for 15+ camera feeds. It reduced manual workloads by 70% with 90.6% threat detection accuracy."
    },
    softech: {
      keywords: ['softech', 'solutions', 'inventory', 'sql', 'database', 'testing', 'unit', 'integration', 'defects', 'bugs', 'work', 'experience'],
      text: "As a Software Development Intern at Softech Solutions Pvt. Ltd. (June – August 2024), Shravan built an inventory database system. He optimized SQL queries (25% speedup, 35% manual work reduction), wrote unit and integration tests (reducing data errors by 60%), and prepared documentation."
    },
    prohomecare: {
      keywords: ['prohomecare', 'home', 'service', 'mern', 'mongodb', 'express', 'react', 'node', 'redis', 'socket', 'websocket', 'razorpay', 'project'],
      text: "ProHomeCare is a full-stack home services platform with Node/Express microservices, Redis caching (45% database load reduction, 60% faster APIs), JWT auth, Socket.io chats, and Razorpay payment integrations."
    },
    pdfrag: {
      keywords: ['rag', 'pdf', 'chatbot', 'document', 'faiss', 'pinecone', 'langchain', 'embeddings', 'citations', 'qa', 'project'],
      text: "The PDF RAG Chatbot is an AI Document Q&A pipeline built with Python, LangChain, FAISS, Pinecone, Streamlit, and Gemini API. It parses PDFs, chunks text, stores vector embeddings, and answers queries with citations."
    },
    finance: {
      keywords: ['finance', 'spring', 'boot', 'security', 'wallet', 'ledger', 'solid', 'jwt', 'project'],
      text: "The Finance Management System is a secure Spring Boot and Spring Security backend ledger application featuring JWT auth, role-based controls, SOLID principles, and full test coverages."
    },
    egovernance: {
      keywords: ['governance', 'egovernance', 'quantbit', 'hackathon', 'municipal', 'civic', 'issue', 'project'],
      text: "The E-Governance System won the Quantbit Hackathon. Built with Java Servlets and MySQL, it automates email alerts (reducing query load by 40%) and has a SQL department dashboard."
    },
    exhibit: {
      keywords: ['exhibit', 'monitor', 'zensar', 'file', 'parsing', 'log4j', 'multithreading', 'project'],
      text: "Exhibit Monitor was built for the Zensar Hackathon. It is a Java multithreaded directory file monitoring backend processing 100+ daily log files up to 10 GB, reducing parsing times by 50%."
    },
    zkpiris: {
      keywords: ['iris', 'zkp', 'biometric', 'eye', 'tensorflow', 'opencv', 'flask', 'privacy', 'project'],
      text: "The ZKP-Verified Iris Biometric System is a privacy-oriented computer vision pipeline that processes 50k+ iris samples using TensorFlow and OpenCV, reducing latency by 35% with 97.8% precision."
    },
    hackathons: {
      keywords: ['hackathon', 'hackathons', 'winner', 'victory', 'quantbit', 'zensar', 'competition', 'first', 'trophy'],
      text: "Shravan won the Quantbit Technologies Hackathon in 2025 (E-Governance platform, Java) and built the Exhibit Monitor during the Zensar Technologies Hackathon."
    },
    contact: {
      keywords: ['contact', 'email', 'phone', 'mobile', 'reach', 'github', 'linkedin', 'address', 'location', 'phone', 'call', 'mail'],
      text: "Contact Shravan Kotagi: Phone +91 8262937458, Email shravankotagi314@gmail.com, LinkedIn linkedin.com/in/shravankotagi, GitHub github.com/Shravankotagi. He is based in Kolhapur, Maharashtra, India, and is open to relocation."
    },
    education: {
      keywords: ['education', 'college', 'kit', 'cgpa', 'degree', 'coursework', 'study', 'major', 'institute', 'gpa', 'course', 'btech', 'be'],
      text: "Shravan is studying B.Tech/B.E. in Computer Science (AI & ML Specialization) at Kolhapur Institute of Technology (2022–2026) with a CGPA of 7.5/10.00."
    },
    certifications: {
      keywords: ['certifications', 'certify', 'courses', 'deeplearning', 'deloitte', 'analytics', 'certificate'],
      text: "Shravan holds certifications in Generative AI with LLMs (DeepLearning.ai), Supervised Machine Learning (DeepLearning.ai), and Deloitte Australia's Technology & Data Simulation."
    },
    relocation: {
      keywords: ['relocate', 'relocation', 'travel', 'move', 'adapt', 'join', 'office'],
      text: "Yes, Shravan is open to relocation for intern and full-time opportunities, and is highly adaptable to hybrid and remote workspace environments."
    }
  };

  function appendMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    
    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.innerHTML = text;
    
    messageDiv.appendChild(bubble);
    chatBody.appendChild(messageDiv);
    
    // Auto-scroll
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function showTypingIndicator() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message bot typing-indicator-wrapper';
    
    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    
    const dots = document.createElement('div');
    dots.className = 'typing-dots';
    dots.innerHTML = '<span></span><span></span><span></span>';
    
    bubble.appendChild(dots);
    messageDiv.appendChild(bubble);
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function removeTypingIndicator() {
    const indicator = chatBody.querySelector('.typing-indicator-wrapper');
    if (indicator) indicator.remove();
  }

  // Stop words to filter out from user query for semantic token matching
  const stopWords = new Set([
    'what', 'is', 'the', 'how', 'about', 'tell', 'me', 'shravan', 'kotagi', 'you', 'he', 'his', 
    'him', 'who', 'does', 'do', 'has', 'have', 'any', 'some', 'where', 'when', 'why', 'can', 
    'are', 'in', 'on', 'at', 'of', 'to', 'for', 'with', 'a', 'an', 'your', 'details', 'info'
  ]);

  function getBotResponse(userMsg) {
    // Clean and tokenize query
    const tokens = userMsg.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(t => t && !stopWords.has(t));
    
    if (tokens.length === 0) {
      return responses.default;
    }

    let bestMatchKey = 'default';
    let maxScore = 0;

    // Run similarity scoring over the corpus
    for (const [key, item] of Object.entries(corpus)) {
      let score = 0;
      
      tokens.forEach(token => {
        // Direct keyword matching (highest weight)
        if (item.keywords.includes(token)) {
          score += 3.0;
        } 
        // Substring keyword matching (medium weight)
        else if (item.keywords.some(kw => kw.includes(token) || token.includes(kw))) {
          score += 1.5;
        }
        
        // Search matches inside the plain text body (lower weight)
        if (item.text.toLowerCase().includes(token)) {
          score += 0.5;
        }
      });

      if (score > maxScore) {
        maxScore = score;
        bestMatchKey = key;
      }
    }

    // Similarity threshold to confirm matching confidence
    if (maxScore < 1.2) {
      return responses.default;
    }

    return responses[bestMatchKey];
  }

  function handleUserQuery(questionText) {
    appendMessage('user', questionText);
    
    showTypingIndicator();
    
    // Simulate organic AI latency (800ms - 1500ms)
    const latency = Math.floor(Math.random() * 700) + 800;
    
    setTimeout(() => {
      removeTypingIndicator();
      const botReply = getBotResponse(questionText);
      appendMessage('bot', botReply);
    }, latency);
  }

  // Submit through form
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (text === '') return;
    
    handleUserQuery(text);
    chatInput.value = '';
  });

  // Suggestion Chips
  suggestionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const question = chip.getAttribute('data-question');
      handleUserQuery(question);
    });
  });

  // Clear Chat History
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      chatBody.innerHTML = `
        <div class="chat-message bot">
          <div class="msg-bubble">
            Hello! I am Shravan's AI assistant, loaded with facts about his skills, experience, and accomplishments. What would you like to know about Shravan?
          </div>
        </div>
      `;
      showToast('Chat history cleared.', 'success');
    });
  }
}

/* ==========================================================================
   INTERACTIVE NEURAL NETWORK CANVAS (AI BACKGROUND VIBES)
   ========================================================================== */
function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  
  // Set dimensions
  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const particles = [];
  const maxParticles = window.innerWidth < 768 ? 30 : 65;
  const maxDistance = 120;
  const mouse = { x: null, y: null, radius: 155 };

  // Track cursor
  canvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.parentElement.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 1.5;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce bounds
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(111, 76, 255, 0.35)'; // Primary light violet
      ctx.fill();
    }
  }

  // Populate particles
  for (let i = 0; i < maxParticles; i++) {
    particles.push(new Particle());
  }

  // Draw lines between nodes
  function connect() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          // Calculate opacity based on proximity
          const alpha = (1 - distance / maxDistance) * 0.15;
          ctx.strokeStyle = `rgba(111, 76, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }

      // Connect to mouse cursor
      if (mouse.x !== null && mouse.y !== null) {
        const dxMouse = particles[a].x - mouse.x;
        const dyMouse = particles[a].y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < mouse.radius) {
          const alpha = (1 - distMouse / mouse.radius) * 0.28;
          ctx.strokeStyle = `rgba(180, 75, 255, ${alpha})`; // Purple secondary
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    connect();
    requestAnimationFrame(animate);
  }

  animate();
}
