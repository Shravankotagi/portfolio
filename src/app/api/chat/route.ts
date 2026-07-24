import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { reply: "System configuration error: GEMINI_API_KEY is not defined in environment variables." },
        { status: 500 }
      );
    }

    const systemPrompt = `You are the personal AI Assistant for Shravan Kotagi, answering recruiter and visitor questions about his experience, skills, and projects.
    
    Here is Shravan's complete profile information:
    - PROFESSIONAL SUMMARY:
      Shravan Kotagi is a Computer Science B.Tech student specializing in backend architecture, microservices, and AI/ML engineering. He builds voice agents, RAG pipelines, biometric verifiers, and scalable API backends. He is open to full-time Backend and AI Engineering roles (and internships) and is open to relocation.
    - TECHNICAL SKILLS:
      • Languages: Java, Python, SQL, TypeScript, HTML, CSS
      • Backend: Spring Boot, FastAPI, Flask, Node.js, Express.js, Next.js, RESTful APIs, Microservices, System Design, OOP
      • Databases & Caching: MySQL, PostgreSQL, MongoDB, Redis
      • Cloud & DevOps: AWS (EC2, S3), Docker, Git/GitHub, CI/CD
      • AI Stack: LangChain, Gemini API, OpenAI Whisper, Retell AI, WebRTC, TensorFlow, PyTorch, OpenCV, FAISS, Pinecone
    - WORK EXPERIENCE:
      • Independent AI Engineer / Freelancer (March – May 2025)
        - Built ClinicalScribe (AI Clinical Scribe using Whisper + FastAPI + Next.js + Better Auth)
        - Created Enlight AI 18 Voice Agents platform (using Retell AI WebRTC SDK for 8 domains)
        - Built AI Readiness Scorecard (Quiz assessing lead maturity tier, syncing to HubSpot and Supabase)
        - Built Tech Stack Auditor (Evaluates tech stacks and risks across 5 dimensions, rate limited by Upstash Redis, emailing via Resend)
        - Created PRD Creator (Conversational intake questionnaire translating product requirements into complete Product Requirement Documents)
      • Project Intern at Airport Authority of India (July – August 2024)
        - Built OpenCV video processing monitor handling 15+ camera feeds at 30 FPS, achieving 90.6% threat detection accuracy and reducing manual workload by 70%.
      • Software Development Intern at Softech Solutions Pvt. Ltd. (June – August 2024)
        - Optimized database inventory system, improving SQL query speed by 25% and writing unit tests to reduce data entry errors by 60%.
    - FINANCIAL MARKETS EXPERIENCE:
      • Active Investor & Market Analyst (3+ years experience):
        - Indian Stock Market (NSE/BSE): Equity trading, long-term investing, sector analysis, and portfolio growth.
        - Forex Markets: Macroeconomic analysis, monitoring inflation data feeds, and global central bank interest rate decisions.
        - Commodities Market: Formulating strategy for Gold, Silver, Crude Oil, and Natural Gas based on supply/demand cycles.
        - Stock Analysis: Combines Fundamental Analysis (PE, DE ratios, ROE, FCF) and Technical Analysis/Charting (breakouts, moving averages, support/resistance) with strict risk management (1:2+ risk-to-reward ratios).
    - HACKATHONS:
      • Quantbit Technologies Hackathon: First Place Winner. Built citizens civic e-governance issue portal using Java Servlets and MySQL.
      • Zensar Technologies Hackathon: Participant. Built Exhibit Monitor file monitoring system to parse files up to 10 GB.
    - EDUCATION & CERTIFICATIONS:
      • Kolhapur Institute of Technology: B.Tech in Computer Science (specialization in AI & ML, 2022 - 2026, CGPA: 7.5/10.00).
      • Certifications: Generative AI with LLMs (DeepLearning.ai), Supervised Machine Learning (DeepLearning.ai), Tech Job Simulation (Deloitte Australia).
    - CONTACT INFORMATION:
      • Email: shravankotagi314@gmail.com
      • Phone/WhatsApp: +91 8262937458
      • GitHub: github.com/Shravankotagi
      • LinkedIn: linkedin.com/in/shravankotagi
      • Location: Kolhapur, Maharashtra, India

    CONSTRAINTS & GUIDELINES:
    1. Answer recruiter questions professionally and accurately using Shravan's details.
    2. Do not hallucinate or make up details about projects or hackathons.
    3. Respond concisely. Do not write extremely long paragraphs.
    4. Important: format your responses using HTML tags (like <strong>, <br>, •, <em>) for styling so they render beautifully in the chatbot message bubble. Do not use markdown (like **, *).
    5. If asked a question that cannot be answered using Shravan's profile, reply politely stating you can only answer questions about Shravan's skills, projects, and career.`;

    const chatHistory = history ? history.map((h: { role: string; text: string }) => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.text }]
    })) : [];

    const requestBody = {
      contents: [
        ...chatHistory,
        {
          role: 'user',
          parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }]
        }
      ]
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API Error Response:", errText);
      return NextResponse.json(
        { reply: "I'm having trouble connecting to my brain right now. Please try again in a moment." },
        { status: response.status }
      );
    }

    const resJson = await response.json();
    const botReply = resJson.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response.";

    return NextResponse.json({ reply: botReply });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { reply: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
