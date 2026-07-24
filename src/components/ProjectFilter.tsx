'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface Project {
  id: string;
  title: string;
  category: 'backend' | 'ai-ml' | 'fullstack';
  categoryLabel: string;
  categoryIcon: string;
  badge?: { text: string; icon: string; style: 'shipped' | 'winner' | 'live' };
  description: string; // Short intro
  detailedExplanation: {
    overview: string;
    architecture: string[];
    features: string[];
    techStack: string[];
    apiEndpoints?: { method: string; path: string; purpose: string }[];
  };
  techTags: string[];
  githubUrl?: string;
}

export default function ProjectFilter() {
  const [filter, setFilter] = useState<'all' | 'backend' | 'ai-ml' | 'fullstack'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const projects: Project[] = [
    {
      id: 'ClinicalScribe',
      title: 'ClinicalScribe- AI Clinical Assistant',
      category: 'fullstack',
      categoryLabel: 'Full Stack / AI Scribe',
      categoryIcon: 'fa-solid fa-house-laptop',
      badge: { text: 'Production Ready', icon: 'fa-solid fa-circle-check', style: 'shipped' },
      description: 'Ambient AI clinical scribe recording consultations, transcribing with speaker labels, generating SOAP notes, and exporting to EHR systems in one click.',
      detailedExplanation: {
        overview: 'ClinicalScribe is an ambient AI documentation assistant designed for clinical settings. It records conversation audio between doctors and patients, transcribes it with speaker turn labels, automatically drafts structured medical SOAP notes, extracts billing codes, and exports everything to Electronic Health Records (EHR) using the FHIR R4 standard.',
        architecture: [
          'Audio capture: Clinician clicks "New Encounter" in the browser, starting ambient recording.',
          'Speaker Diarization: AssemblyAI API transcribes the audio, automatically separating Doctor and Patient voices.',
          'SOAP Note Draft: The text transcript is passed to Google Gemini 2.5 Flash to generate clinical SOAP (Subjective, Objective, Assessment, Plan) records.',
          'Medical Coding: Gemini extracts ICD-10 (diagnoses) and CPT (billing procedures) codes with confidence indicators.',
          'EHR Sync: Approving the encounter compiles a FHIR R4 DocumentReference payload exported directly to clinic databases.'
        ],
        features: [
          'Ambient consultation recording directly in the browser.',
          'Automated SOAP clinical note drafting.',
          'ICD-10 and CPT billing code extraction with visual confidence gauges.',
          'Physician approval workflow highlighting uncertain/assumed AI values.',
          'One-click FHIR R4 EHR compliant exporting.',
          'Unified portal with role-based auth (Admin vs Doctor) and security audit logs.'
        ],
        techStack: ['Next.js 16', 'React 19', 'Better Auth', 'Prisma ORM', 'PostgreSQL (Neon Cloud)', 'AssemblyAI / Local Whisper API', 'Gemini 2.5 Flash', 'Tailwind CSS', 'Docker & Docker Compose'],
        apiEndpoints: [
          { method: 'POST', path: '/api/encounters', purpose: 'Ingests consultation audio and triggers AI transcription/SOAP drafting.' },
          { method: 'POST', path: '/api/encounters/approve', purpose: 'Physician approves note, logs audit trail, and exports FHIR record.' },
          { method: 'GET', path: '/api/encounters/history', purpose: 'Retrieves historic patient consultations log.' }
        ]
      },
      techTags: ['Next.js 16', 'Better Auth', 'Prisma', 'PostgreSQL', 'Gemini API', 'AssemblyAI', 'Docker'],
      githubUrl: 'https://github.com/Shravankotagi/clinical_scribe'
    },
    {
      id: 'voiceagents',
      title: '18 Autonomous Voice Agents',
      category: 'ai-ml',
      categoryLabel: 'AI & ML',
      categoryIcon: 'fa-solid fa-brain',
      badge: { text: '18 Voice Bots Live', icon: 'fa-solid fa-headset', style: 'live' },
      description: 'Production-grade voice agent platform built on Retell AI and WebRTC running 18 real-world business workflows without human intervention.',
      detailedExplanation: {
        overview: 'Enlight AI is an autonomous, end-to-end voice agent platform. It utilizes the Retell AI engine and low-latency WebRTC streams to deploy 18 specialized telephone voice agents carrying out complex, multi-turn business workflows (like hotel check-out extensions, abandoned cart recovery, symptom triages, and claim processing).',
        architecture: [
          'Client Initiates: User requests a call or initiates a web-call directly from the platform.',
          'Token Retrieval: Next.js API requests an ephemeral WebRTC access token from Retell AI.',
          'WebRTC Stream: Connects a low-latency WebRTC audio stream between the browser and Retell AI servers.',
          'Custom Workflows: The call agent executes predefined multi-turn prompts and logic, calling mock APIs to complete actions during the conversation.'
        ],
        features: [
          '18 specialized autonomous voice bots mapped to specific business processes.',
          'Low-latency WebRTC integration for zero-delay human-like voice communication.',
          'Custom webhook receivers that update database models immediately upon call completion.',
          'Integration examples: Brandon (BFSI Fraud), Emily (Health Appointment Booking), Natalie (EdTech Advisor), Ethan (Solar Qualifier).'
        ],
        techStack: ['Next.js 14', 'TypeScript', 'Retell AI WebRTC SDK', 'WebRTC APIs', 'Tailwind CSS', 'Render Deployment']
      },
      techTags: ['Next.js 14', 'TypeScript', 'Retell AI', 'WebRTC', 'Tailwind CSS', 'Render'],
      githubUrl: 'https://github.com/Shravankotagi/voice-agents-'
    },
    {
      id: 'prd-creator',
      title: 'PRD Creator- AI Document Generator',
      category: 'fullstack',
      categoryLabel: 'Full Stack / AI Tool',
      categoryIcon: 'fa-solid fa-house-laptop',
      
      description: 'AI-powered Product Requirement Document (PRD) generator that guides users through a conversational intake process to translate requirements into engineering-ready specs.',
      detailedExplanation: {
        overview: 'PRD Creator is a full-stack SaaS application built to translate unstructured business ideas into comprehensive, detailed Product Requirement Documents (PRDs). Users are guided through a structured conversational form, and the system outputs fully articulated requirements, user stories, acceptance criteria, roadmaps, and edge cases.',
        architecture: [
          'Intake Wizard: Conversational user input captures core product idea and target audience.',
          'Structured Prompting: Sends parsed context details to Google Gemini API to structure requirement layers.',
          'Requirement Matrix: Translates layers into Bloom\'s taxonomy User Stories and Edge Case exceptions.',
          'Database Sync: Persists user-generated documents and version control metrics to Neon PostgreSQL.',
          'Dashboard View: Generates interactive preview tabs (Quality Scores, Edge Cases, Tech Stack, Roadmap).'
        ],
        features: [
          'Interactive questionnaire extracting detailed product goals.',
          'Automated Quality Scoring checking completeness and edge cases.',
          'Generates detailed User Stories with comprehensive Acceptance Criteria.',
          'Identifies technical Edge Cases and non-functional engineering requirements.',
          'Includes Stripe checkout mockups, Pricing structures, and Sign-in interfaces.',
          'Features an interactive landing page console demonstrating mock generations.'
        ],
        techStack: ['Next.js', 'Prisma ORM', 'PostgreSQL (Neon Cloud)', 'Google Gemini API', 'Tailwind CSS', 'TypeScript', 'zod']
      },
      techTags: ['Next.js', 'Prisma', 'PostgreSQL', 'Gemini API', 'Tailwind CSS', 'TypeScript'],
      githubUrl: 'https://github.com/Shravankotagi/PRD-creator'
    },
    {
      id: 'ai-readiness',
      title: 'AI Readiness Scorecard',
      category: 'fullstack',
      categoryLabel: 'Full Stack',
      categoryIcon: 'fa-solid fa-house-laptop',
      description: 'A free, public lead generation tool that helps CTOs and engineering leaders understand how AI-ready their company is through a 12-question maturity scorecard.',
      detailedExplanation: {
        overview: 'This tool assesses companies on AI adoption metrics across 4 business dimensions. It calculates a score out of 100, assigns a maturity tier, generates dynamic action guides, locks results behind an email gate, and syncs leads directly to HubSpot CRM and Supabase.',
        architecture: [
          'Assessment: Users answer 12 yes/partial/no questions across Team, Data, Automation, and Strategy.',
          'Scoring: A lightweight library evaluates answers, converting them into scores and 1 of 5 tiers.',
          'Gemini Recommendation: Answers are passed to Gemini 2.5 Flash to generate 3 tailored engineering recommendation bullet points.',
          'CRM Sync: Pushes lead details, scores, and recommendations directly to HubSpot contact properties.'
        ],
        features: [
          '12-question interactive AI maturity assessment.',
          'Real-time scoring out of 100 with 5 maturity tiers (Unaware to Optimised).',
          'Google Gemini dynamic recommendation generation.',
          'Pushes contact cards automatically into HubSpot CRM contacts.',
          'Shareable results page generated via unique slugs.',
          'Password-protected admin dashboard showcasing submissions.'
        ],
        techStack: ['Next.js 15', 'Tailwind CSS 3', 'Supabase JS client', 'Google Gemini AI SDK', 'HubSpot API', 'zod', 'nanoid', 'shadcn/ui'],
        apiEndpoints: [
          { method: 'POST', path: '/api/submit', purpose: 'Calculates AI scores, fetches Gemini recommendations, and syncs to Supabase/HubSpot.' },
          { method: 'POST', path: '/api/admin', purpose: 'Fetches submission analytics (protected by ADMIN_PASSWORD).' }
        ]
      },
      techTags: ['Next.js 15', 'Supabase', 'Gemini API', 'HubSpot API', 'Tailwind CSS', 'zod', 'nanoid'],
      githubUrl: 'https://github.com/Shravankotagi/ai-rediness'
    },
    {
      id: 'tech-stack-auditor',
      title: 'Tech Stack Auditor',
      category: 'fullstack',
      categoryLabel: 'Full Stack',
      categoryIcon: 'fa-solid fa-house-laptop',
      description: 'AI-powered evaluation tool that helps engineering managers instantly audit the health and risks of their technology stack based on descriptions.',
      detailedExplanation: {
        overview: 'Tech Stack Auditor evaluates user-submitted tech stack details across 5 key pillars (Scalability, Observability, Security, CI/CD, and Data). It provides clear risk assessments and saves results with unique shareable links, while leveraging rate-limiting and email-delivery integrations.',
        architecture: [
          'Ingestion: User inputs architecture details or tech lists in the textarea.',
          'AI Audit: Google AI Studio API parses the input, evaluating it against 5 core engineering dimensions.',
          'Rate-Limiting: Passes request through Upstash Redis to prevent API usage abuse.',
          'Prisma Persistence: Saves audit reports to Neon PostgreSQL with a unique share ID.',
          'Resend Email: Optionally emails report links to captured user leads.'
        ],
        features: [
          '30-second comprehensive AI tech audits.',
          'Risk, strength, and recommendation analyses mapped across 5 dimensions.',
          'Upstash Redis rate-limiting blocks spam.',
          'Unique, shareable report page URLs.',
          'Admin view supported by Prisma Studio to browse reports and captured emails.'
        ],
        techStack: ['Next.js', 'Prisma ORM', 'PostgreSQL (Neon Cloud)', 'Google AI Studio SDK', 'Upstash Redis API', 'Resend API', 'Tailwind CSS'],
        apiEndpoints: [
          { method: 'POST', path: '/api/audit', purpose: 'Ingests tech stack text, queries Gemini, verifies rate limits, and saves report.' },
          { method: 'GET', path: '/api/share', purpose: 'Fetches saved audit report by its unique share ID.' },
          { method: 'POST', path: '/api/email-capture', purpose: 'Captures and saves user email leads for follow-up.' }
        ]
      },
      techTags: ['Next.js', 'Prisma', 'PostgreSQL', 'Gemini API', 'Upstash Redis', 'Resend', 'Tailwind CSS'],
      githubUrl: 'https://github.com/Shravankotagi/Tech-stack-report-'
    },
    {
      id: 'voice-widget',
      title: 'AI Assistant & Voice Widget',
      category: 'ai-ml',
      categoryLabel: 'AI & ML',
      categoryIcon: 'fa-solid fa-brain',
      description: 'Embeddable website widget combining a RAG-powered Gemini chat assistant and a real-time voice call assistant powered by Retell AI.',
      detailedExplanation: {
        overview: 'This widget combines two modes of AI communication. The chat interface performs semantic search (RAG) over a structured corporate knowledge base, and the voice button dials an interactive Retell AI agent over WebRTC. Captures visitor details dynamically and logs them to CRM platforms.',
        architecture: [
          'Iframe Embedding: An lightweight external script embeds the widget inside a secure, sandboxed iframe.',
          'Knowledge Base RAG: Chat input is sent to Gemini (gemini-3.1-flash-lite), retrieving semantic facts from data/knowledge_base_export.txt.',
          'Voice calling: WebRTC socket connections request ephemeral voice session tokens from Retell AI.',
          'Lead Capture: Contact details and conversation summaries are compiled and sent to HubSpot CRM APIs.'
        ],
        features: [
          'Dual-mode interface supporting both semantic chat and WebRTC voice calls.',
          'RAG grounded in a structured text knowledge export file.',
          'Dwell-time activation autostarts conversation after a set duration.',
          'Progressive lead capture sends conversation tags and transcript files to HubSpot.',
          'Built-in budget and token-capping features prevent billing leaks.'
        ],
        techStack: ['Next.js App Router', 'Google Gemini (gemini-3.1-flash-lite + gemini-embedding-001)', 'Retell AI WebRTC SDK', 'HubSpot private app API', 'Vercel hosting', 'Iframe sandbox']
      },
      techTags: ['Next.js', 'Gemini API', 'Retell WebRTC SDK', 'HubSpot', 'WebRTC'],
      githubUrl: 'https://github.com/Shravankotagi/enlightlab-widget'
    },
    
    {
      id: 'prohomecare',
      title: 'ProHomeCare- On-Demand Services',
      category: 'fullstack',
      categoryLabel: 'Full Stack',
      categoryIcon: 'fa-solid fa-house-laptop',
      description: 'Architected full-stack on-demand home service marketplace application with dynamic provider dispatch, WebSocket chats, and auto-scaling capabilities.',
      detailedExplanation: {
        overview: 'ProHomeCare is a home service marketplace platform. It allows users to book verified home maintenance service providers dynamically, supporting real-time chat overlays, transaction processors, and load-balanced servers.',
        architecture: [
          'MERN Foundation: React UI queries Node/Express microservices via API calls.',
          'High performance caching: MongoDB queries are cached in Redis, resulting in sub-100ms response times.',
          'Real-time messages: Socket.io coordinates client-provider chat rooms and order dispatch alerts.',
          'Payment settlement: Integrated Razorpay checkout flow, maintaining transaction safety.'
        ],
        features: [
          'Dynamic service provider routing and order dispatch workflows.',
          'Prerendered page loads optimized with Redis caching.',
          'Socket.io handling 50+ concurrent websocket chat rooms.',
          'Razorpay payment integrations with webhook verification.',
          'Scaled infrastructure deployed on AWS EC2 nodes.'
        ],
        techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Redis cache', 'Socket.io', 'Razorpay SDK', 'AWS EC2', 'Git']
      },
      techTags: ['Node.js', 'Express', 'MongoDB', 'Redis', 'Socket.io', 'React'],
      githubUrl: 'https://github.com/Shravankotagi/prohomecare'
    },
    {
      id: 'rag-chatbot',
      title: 'PDF RAG Chatbot- Q&A System',
      category: 'ai-ml',
      categoryLabel: 'AI & ML',
      categoryIcon: 'fa-solid fa-brain',
      description: 'Built an end-to-end Retrieval-Augmented Generation pipeline to answer questions based on custom uploaded PDF documents using semantic vector matching.',
      detailedExplanation: {
        overview: 'A Python-based RAG application that allows users to upload PDF documents, splits the content, indexes it into vector stores, and performs semantic search to answer user queries with grounded citations.',
        architecture: [
          'Ingestion: PyPDF2 extracts raw text from user-uploaded PDF files.',
          'Chunking: Text is split into overlapping chunks to preserve context.',
          'Vector Indexing: sentence-transformers (all-MiniLM-L6-v2) computes vector embeddings saved into Pinecone database.',
          'Query logic: User question is vectorized, semantic matches are retrieved from Pinecone, and Gemini 2.5 Flash compiles the final answer.'
        ],
        features: [
          'Multiple PDF file uploads and text parsing.',
          'Strict context-grounded completions with direct source section citations.',
          'Automatic cleanup of old session vector indexes when uploading new files.',
          'Streamlit web dashboard supporting clean chat interfaces.'
        ],
        techStack: ['Python 3.11', 'Streamlit', 'LangChain', 'Pinecone Vector DB', 'FAISS', 'sentence-transformers (all-MiniLM-L6-v2)', 'Google Gemini 2.5 Flash', 'PyPDF2']
      },
      techTags: ['Python', 'LangChain', 'Gemini API', 'FAISS', 'Pinecone', 'Streamlit'],
      githubUrl: 'https://github.com/Shravankotagi/RAG-chatbot'
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <>
      {/* Filter Controls */}
      <div className="filter-controls">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`} 
          onClick={() => setFilter('all')}
        >
          All Projects
        </button>
        
        <button 
          className={`filter-btn ${filter === 'ai-ml' ? 'active' : ''}`} 
          onClick={() => setFilter('ai-ml')}
        >
          AI & ML
        </button>
        <button 
          className={`filter-btn ${filter === 'fullstack' ? 'active' : ''}`} 
          onClick={() => setFilter('fullstack')}
        >
          Full Stack
        </button>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid" id="projects-grid">
        {filteredProjects.map(project => (
          <div 
            key={project.id} 
            className="project-card"
            onClick={() => setSelectedProject(project)}
          >
            <div className="project-header">
              <span className="project-category">
                <i className={`${project.categoryIcon} mr-1`}></i> {project.categoryLabel}
              </span>
              {project.badge && (
                <span className={`project-status-badge ${project.badge.style}`}>
                  <i className={project.badge.icon}></i> {project.badge.text}
                </span>
              )}
              {project.githubUrl && (
                <div className="project-links" onClick={(e) => e.stopPropagation()}>
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-link" 
                    aria-label={`${project.title} GitHub Repository`}
                  >
                    <i className="fa-brands fa-github"></i>
                  </a>
                </div>
              )}
            </div>
            <div className="project-body">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              <div style={{ marginTop: '16px', color: 'var(--primary)', fontWeight: '600', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                View Full Project Details <i className="fa-solid fa-circle-arrow-right"></i>
              </div>
            </div>
            <div className="project-tech-tags">
              {project.techTags.map(tag => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Popup Overlay */}
      {mounted && selectedProject && createPortal(
        <div className="project-modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="project-modal-close" onClick={() => setSelectedProject(null)} aria-label="Close modal">
              <i className="fa-solid fa-xmark"></i>
            </button>
            
            <div className="project-modal-header">
              <span className="project-category">
                <i className={`${selectedProject.categoryIcon} mr-1`}></i> {selectedProject.categoryLabel}
              </span>
              <h3 className="project-modal-title">{selectedProject.title}</h3>
            </div>

            <div className="project-modal-body">
              <h4>Overview</h4>
              <p>{selectedProject.detailedExplanation.overview}</p>

              <h4>System Architecture & Flow</h4>
              <ul className="project-modal-highlights">
                {selectedProject.detailedExplanation.architecture.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h4>Key Features</h4>
              <ul className="project-modal-highlights">
                {selectedProject.detailedExplanation.features.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              {selectedProject.detailedExplanation.apiEndpoints && (
                <>
                  <h4>Key API Endpoints</h4>
                  <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', width: '100%' }}>
                    <table className="project-endpoints-table" style={{ width: '100%', minWidth: '460px', borderCollapse: 'collapse', marginTop: '12px', fontSize: '13px' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-default)', textAlign: 'left', color: 'var(--primary)' }}>
                          <th style={{ padding: '8px' }}>Method</th>
                          <th style={{ padding: '8px' }}>Path</th>
                          <th style={{ padding: '8px' }}>Purpose</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedProject.detailedExplanation.apiEndpoints.map((ep, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid rgba(226,232,240,0.5)' }}>
                            <td style={{ padding: '8px', fontWeight: 'bold' }}><code>{ep.method}</code></td>
                            <td style={{ padding: '8px' }}><code>{ep.path}</code></td>
                            <td style={{ padding: '8px', color: 'var(--muted)' }}>{ep.purpose}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              <h4>Technologies Used</h4>
              <div className="project-modal-tech">
                {selectedProject.detailedExplanation.techStack.map(tech => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>

            <div className="project-modal-footer">
              {selectedProject.githubUrl && (
                <a 
                  href={selectedProject.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary btn-sm"
                >
                  <i className="fa-brands fa-github"></i> View GitHub Repository
                </a>
              )}
              <button className="btn btn-primary btn-sm" onClick={() => setSelectedProject(null)}>
                Close Details
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
