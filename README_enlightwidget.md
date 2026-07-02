# Enlight Lab AI Assistant & Voice Widget

An embeddable web widget that combines a RAG-powered chat assistant and a real-time voice call assistant (via WebRTC) for qualifying leads, booking diagnostic calls, and capturing visitor intent.

---

## ✨ Features

- **Dual-Mode AI Assistant**:
  - **Chat Assistant**: Real-time conversational interface utilizing semantic retrieval (RAG) powered by Gemini.
  - **Voice Assistant**: Low-latency, real-time voice call powered by Retell AI's WebRTC SDK.
- **Robust RAG Core**: Grounded strictly in an exportable text-based Knowledge Base (`data/knowledge_base_export.txt`) via Google Gemini (`gemini-3.1-flash-lite` + `gemini-embedding-001`).
- **HubSpot Integration**: Captures leads progressively during the conversation and pushes contact details, qualification flags (e.g., high-fit tags), and chat transcripts directly to HubSpot.
- **Dwell-Time Activation**: Autoprompts the user after a configurable number of seconds (defined in `config/client.json`).
- **Budget & Safety Controls**: Built-in rate limiting and token-capping features to prevent API abuse.
- **Embedded Integration**: Injected easily into any site with a single script tag (`widget.js`) inside a responsive iframe container.

---

## 📂 Project Structure

```
enlightlab-widget/
├── config/
│   └── client.json              # Configures branding, LLM parameters, origins, and budget caps
├── data/
│   ├── knowledge_base_export.txt # Ground truth knowledge base text file
│   └── usage.json                # Local tracker for rate limits & API caps
├── public/
│   └── widget.js                 # Compiled or static assets (if any)
├── src/
│   ├── app/
│   │   ├── api/widget/           # Backend endpoint routes
│   │   │   ├── chat/             # Chat RAG completions API
│   │   │   ├── voice/            # Retell WebRTC token retriever
│   │   │   ├── lead-capture/     # HubSpot contact ingestion API
│   │   │   ├── config/           # Fetches dwell-time & branding settings
│   │   │   └── embed.js/         # Generates the dynamic embedding script tag
│   │   ├── widget/               # Next.js page that displays the widget UI
│   │   └── widget-test/          # Sandbox page for local testing
│   └── lib/widget-service/       # Core service modules (RAG, HubSpot, rate limits)
├── vercel_deployment_guide.md    # Deployment steps for Vercel
└── package.json                  # Next.js scripts & dependency list
```

---

## 🛠️ Local Installation & Development

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **NPM** or **Bun**

### 2. Setup
1. Clone the repository and navigate into the folder:
   ```bash
   cd enlightlab-widget
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment template to create a `.env` file:
   ```bash
   cp .env.template .env
   ```
4. Fill in the required API keys in your new `.env` file:
   ```env
   GEMINI_API_KEY="your-google-gemini-api-key"
   RETELL_API_KEY="your-retell-ai-api-key"
   HUBSPOT_ACCESS_TOKEN="your-hubspot-private-app-access-token"
   ```

### 3. Run Locally
Start the local Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000/widget-test](http://localhost:3000/widget-test) in your browser. This page acts as a sandbox simulation of your client website where the widget script is embedded.

---

## 🎨 Deployment & Configuration

### Customizing the Widget
Edit [config/client.json](file:///E:/enlightlab-widget/config/client.json) to tweak the primary color, logo, assistant prompt, rate caps, and allowed cross-origin requests.

### Vercel Deployment
To host this widget in production, see [vercel_deployment_guide.md](file:///E:/enlightlab-widget/vercel_deployment_guide.md) for step-by-step instructions.

### Embedding the Widget on Target Sites
Add this script snippet before the closing `</body>` tag on any client website (ensure the website's domain is added to `allowedOrigins` in `config/client.json`):

```html
<script 
  src="https://<YOUR-PRODUCTION-WIDGET-URL>/api/widget/embed.js" 
  data-client="enlightlab"
  async>
</script>
```
