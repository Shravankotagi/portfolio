'use client';

import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

export default function AIAssistant() {
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hello! I am Shravan's AI assistant, loaded with facts about his skills, experience, and accomplishments. What would you like to know about Shravan?"
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-scroll chat body
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const responses: Record<string, string> = {
    summary: `<strong>Professional Summary:</strong><br>
              Shravan Kotagi is a Computer Science student specializing in backend development and AI engineering with a strong foundation in Java, Python, Node.js, databases (MySQL, MongoDB), and cloud technologies (AWS). He has proven experience building scalable backend systems, RESTful APIs, voice agents, and end-to-end AI-powered products deployed in production. He is actively seeking full-time Software Engineer, Backend Developer, or AI Engineer roles to contribute to building robust, scalable backend services.`,

    skills: `<strong>Shravan's Core Technical Skills:</strong><br>
             • <strong>Programming Languages:</strong> Java, Python, SQL, TypeScript, HTML, CSS<br>
             • <strong>Backend Technologies:</strong> RESTful APIs, Microservices, Spring Framework, FastAPI, Flask, Node.js, Express.js, Next.js<br>
             • <strong>Databases & Caching:</strong> MySQL, PostgreSQL, MongoDB, Redis, DBMS, Data Modeling<br>
             • <strong>Cloud & DevOps:</strong> AWS (EC2, S3), Docker, Git/GitHub, CI/CD, Railway, Render, Vercel<br>
             • <strong>AI Frameworks & Stack:</strong> LangChain, Gemini API, OpenAI Whisper, Hugging Face, TensorFlow, PyTorch, OpenCV, YOLO, FAISS, Pinecone<br>
             • <strong>Development Practices:</strong> OOP, System Design, SDLC, Agile, Technical Documentation, Testing & Debugging`,
    
    enlightlab: `During his internship at <strong>Enlight Lab</strong> (March - May 2025), Shravan served as an AI Engineer Intern. He independently built and deployed multiple production products:<br>
                 1. <strong>18 Autonomous Voice Agents (Enlight AI)</strong>: Voice platform built with Retell AI WebRTC SDK.<br>
                 2. <strong>CareScribe (AI Clinical Scribe)</strong>: Ambient scribe built using OpenAI Whisper + FastAPI backend + Next.js frontend.<br>
                 3. <strong>PRD Document Creator</strong>: Intake chatbot leveraging Next.js and the Gemini API.<br>
                 4. <strong>AI Readiness Scorecard</strong>: Lead gen mature assessment quiz syncing to Supabase and HubSpot.<br>
                 5. <strong>Tech Stack Auditor</strong>: Evaluation tool mapping tech stacks to consulting risks.`,
    
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
    
    relocation: `Yes, Shravan Kotagi is fully open to relocating for full-time backend or AI engineering roles, and is highly adaptable to hybrid/remote work setups.`,

    carescribe: `<strong>CareScribe- AI Clinical Assistant</strong> is an ambient scribe system built by Shravan. Key features:<br>
                 • Transcribes consults with speaker labels using AssemblyAI/Whisper.<br>
                 • Dynamically structures SOAP clinical notes and extracts ICD-10/CPT coding with Gemini 2.5 Flash.<br>
                 • Built with Next.js 16, Prisma ORM, Neon cloud PostgreSQL, and Better Auth.`,

    voiceagents: `<strong>Enlight AI (18 Voice Agents)</strong> is a production voice bot platform developed by Shravan. Key features:<br>
                  • Hosts 18 voice agents automating workflows across 8 business domains.<br>
                  • Low-latency real-time voice streaming powered by Retell AI WebRTC SDK.<br>
                  • Shipped using TypeScript, Next.js, and Render.`,

    markets: `<strong>Financial Markets Experience:</strong><br>
              Shravan has 3+ years of active experience investing and trading in financial markets:<br>
              • <strong>Indian Stock Market</strong>: Equity trading and long-term investing on NSE/BSE, sector-wise analysis, and portfolio growth optimization.<br>
              • <strong>Forex Markets</strong>: Tracking central bank policies, global inflation dynamics, and macroeconomic data feeds for currency pairs.<br>
              • <strong>Commodities Market</strong>: Analyzing demand-supply cycles, USD strength, and trends for gold, silver, crude oil, and natural gas.<br>
              • <strong>Analysis Methods</strong>: Integrates fundamental statistics (P/E, D/E ratios, FCF) with technical charts (moving averages, support/resistance, trendlines) and strict risk-to-reward metrics.`,

    default: `I can search Shravan's resume for anything! Try asking about his: <strong>skills</strong>, <strong>Enlight Lab internship</strong>, <strong>Airport CCTV project</strong>, <strong>Softech Solutions role</strong>, or specific projects like <strong>CareScribe</strong>, <strong>Voice Agents</strong>, <strong>PDF RAG</strong>, <strong>ProHomeCare</strong>, <strong>Finance ledger</strong>, <strong>E-Governance</strong>, <strong>ZKP Iris Biometrics</strong>, <strong>Hackathons</strong>, <strong>Financial Markets</strong>, and <strong>Contact info</strong>.`
  };

  const corpus: Record<string, { keywords: string[]; text: string }> = {
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
      text: "Exhibit Monitor was built for the Zensar Hackathon. It is a Java multithreaded directory file monitoring backend processing 100+ daily log files up to 10 GB, reducing parsing times by 50."
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
    },
    carescribe: {
      keywords: ['carescribe', 'scribe', 'clinical', 'medical', 'doctor', 'soap', 'notes', 'icd', 'billing', 'assemblyai', 'whisper'],
      text: "CareScribe is Shravan's ambient AI clinical documentation assistant project utilizing AssemblyAI for transcription, Gemini 2.5 Flash for SOAP note formatting, and Next.js, Prisma, PostgreSQL for the portal."
    },
    voiceagents: {
      keywords: ['voiceagent', 'voiceagents', 'voice', 'agents', 'telephony', 'retell', 'webrtc', 'call', 'concierge', 'support'],
      text: "Enlight AI is Shravan's 18 autonomous voice agents platform running on Retell AI WebRTC SDK, built using Next.js and TypeScript, deploying on Render."
    },
    markets: {
      keywords: ['markets', 'finance', 'stock', 'share', 'investing', 'trading', 'forex', 'commodities', 'nse', 'bse', 'portfolio', 'fundamental', 'technical', 'analysis', 'investor', 'trader'],
      text: "Shravan has 3+ years of experience analyzing financial markets. He manages equity investments on the Indian stock market (NSE/BSE), trades Forex and Commodities (Gold, Crude Oil), and performs fundamental and technical chart analysis."
    }
  };

  const stopWords = new Set([
    'what', 'is', 'the', 'how', 'about', 'tell', 'me', 'shravan', 'kotagi', 'you', 'he', 'his', 
    'him', 'who', 'does', 'do', 'has', 'have', 'any', 'some', 'where', 'when', 'why', 'can', 
    'are', 'in', 'on', 'at', 'of', 'to', 'for', 'with', 'a', 'an', 'your', 'details', 'info'
  ]);

  const getBotResponse = (userMsg: string): string => {
    const tokens = userMsg.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(t => t && !stopWords.has(t));
    
    if (tokens.length === 0) {
      return responses.default;
    }

    let bestMatchKey = 'default';
    let maxScore = 0;

    for (const [key, item] of Object.entries(corpus)) {
      let score = 0;
      
      tokens.forEach(token => {
        if (item.keywords.includes(token)) {
          score += 3.0;
        } else if (item.keywords.some(kw => kw.includes(token) || token.includes(kw))) {
          score += 1.5;
        }
        
        if (item.text.toLowerCase().includes(token)) {
          score += 0.5;
        }
      });

      if (score > maxScore) {
        maxScore = score;
        bestMatchKey = key;
      }
    }

    if (maxScore < 1.2) {
      return responses.default;
    }

    return responses[bestMatchKey];
  };

  const handleUserQuery = async (questionText: string) => {
    if (isTyping) return;
    
    const userMsgId = 'msg-' + Date.now() + '-user';
    setMessages(prev => [...prev, { id: userMsgId, sender: 'user', text: questionText }]);
    setIsTyping(true);

    try {
      const chatHistory = messages.slice(-8).map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        text: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: questionText, history: chatHistory })
      });

      if (!res.ok) throw new Error("API route returned failure");

      const data = await res.json();
      const botReply = data.reply;
      const botMsgId = 'msg-' + Date.now() + '-bot';
      setMessages(prev => [...prev, { id: botMsgId, sender: 'bot', text: botReply }]);
    } catch (err) {
      console.warn("Gemini Chat API failed. Falling back to local keyword corpus:", err);
      const botReply = getBotResponse(questionText);
      const botMsgId = 'msg-' + Date.now() + '-bot';
      setMessages(prev => [...prev, { id: botMsgId, sender: 'bot', text: botReply }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputVal.trim();
    if (text === '') return;
    handleUserQuery(text);
    setInputVal('');
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: "Hello! I am Shravan's AI assistant, loaded with facts about his skills, experience, and accomplishments. What would you like to know about Shravan?"
      }
    ]);
  };

  if (!mounted) {
    return <div className="ai-chat-container" style={{ minHeight: '400px', opacity: 0.1 }}></div>;
  }

  return (
    <div className="ai-chat-container">
      <div className="ai-chat-header">
        <div className="bot-info">
          <div className="bot-avatar"><i className="fa-solid fa-robot"></i></div>
          <div>
            <h4>Shravan's AI Scribe</h4>
            <p className="bot-status"><span className="status-dot"></span> Online & Ready to Answer</p>
          </div>
        </div>
        <button className="chat-clear-btn" onClick={clearChat} title="Clear Chat history">
          <i className="fa-solid fa-rotate-left"></i>
        </button>
      </div>

      <div className="ai-chat-body" ref={chatBodyRef}>
        {messages.map(msg => (
          <div key={msg.id} className={`chat-message ${msg.sender}`}>
            <div className="msg-bubble" dangerouslySetInnerHTML={{ __html: msg.text }} />
          </div>
        ))}
        {isTyping && (
          <div className="chat-message bot typing-indicator-wrapper">
            <div className="msg-bubble">
              <div className="typing-dots">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="chat-suggestions">
        <button className="suggest-chip" onClick={() => handleUserQuery("What are Shravan's core skills?")}>
          What are his skills?
        </button>
        <button className="suggest-chip" onClick={() => handleUserQuery("Tell me about his internship at Enlight Lab.")}>
          Enlight Lab Intern experience?
        </button>
        <button className="suggest-chip" onClick={() => handleUserQuery("Has he won any hackathons?")}>
          Did he win any hackathons?
        </button>
        <button className="suggest-chip" onClick={() => handleUserQuery("Tell me about his financial markets and stock analysis experience.")}>
          Finance & markets experience?
        </button>
        <button className="suggest-chip" onClick={() => handleUserQuery("What is his contact information?")}>
          How do I contact him?
        </button>
      </div>

      <form className="ai-chat-input" onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Ask about skills, projects, hackathons..." 
          aria-label="Question for Shravan's AI Scribe"
        />
        <button type="submit" className="chat-submit-btn" aria-label="Send question">
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
}
