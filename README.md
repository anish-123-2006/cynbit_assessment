# Cynbit Project Discovery Assistant

> A guided lead-discovery and technical qualification prototype for **Cynbit Technologies** ([cynbit.in](https://www.cynbit.in/)), engineered to replace passive contact forms with an initial structured architecture brief and discovery scheduler.

---

## 1. Research and Design Rationale

### 1.1 The Problem Identified on Cynbit’s Website
Cynbit Technologies is an AI automation and software solutions company based in Jaipur, Rajasthan. The core branding emphasizes *"Autonomous AI agents & cognitive automation"*, *"The speed of a startup, the rigor of an enterprise"*, and high-performance digital platforms.

However, an audit of the live digital property revealed a notable **"Show, Don't Just Tell" disconnect**:
- Prospective clients landing on an AI automation firm's site encounter a standard brochureware website.
- The contact flow is entirely passive: a blank text box, followed by a promise of a *"24 H Response Sync"*.
- There is no interactive demonstration of Cynbit’s intelligence, no self-service qualification, and no direct route to book an exploratory conversation.

### 1.2 Evidence from the Current Contact Experience
Direct reverse-engineering and HTTP/DOM inspection of `https://cynbit.in/contact` revealed:
1. **The Server-Side `style="opacity: 0"` Bug:**
   The server-rendered HTML of Cynbit's live contact form contains:
   ```html
   <form class="space-y-6" style="opacity:0">
   ```
   Because Framer Motion's `initial={{ opacity: 0 }}` is applied on the server, the form is **completely invisible** until client-side hydration finishes. If a visitor is on a spotty mobile network, has an ad-blocker, or experiences a hydration delay, the contact form fails to appear.
2. **Blank-Page Cognitive Friction:**
   The primary input is an open-ended textarea: *"How can we help you architect your next chapter?"*. Many business owners know their pain point (e.g. *“our team spends 20 hours transcribing invoices”*), but lack the technical vocabulary to articulate software requirements in a blank box.
3. **Monolithic Error States:**
   Inspecting client chunks revealed a single fallback error string: `"Something went wrong. Please try again or email us directly."`, lacking field-level validation or recovery guidance.

### 1.3 Target Users
1. **Non-Technical Founders & Business Operators:** Leaders with clear operational pain points (manual workflows, slow customer support) who need scaffolding to express their needs without technical jargon.
2. **CTOs & VP of Engineering:** Technical buyers looking for immediate proof of competence, cloud architectural depth (AWS/Azure), and rapid scheduling without marketing fluff.
3. **Enterprise Operations & IT Managers:** Teams evaluating legacy modernization, ERP/CRM integration, or data pipeline automation.

### 1.4 Why a Guided Flow is Better Than a Blank Form
- **Scaffolding & Cognitive Relief:** Progressive disclosure breaks a complex project into manageable steps: *Need → Business Objective → Systems Involved → Stage → Timeline*.
- **Pre-Qualified Inbound Briefs:** The Cynbit team receives structured technical briefs with specific environments (e.g. PostgreSQL, Salesforce, PDFs) rather than generic one-liners like *"Need an AI app, how much?"*.
- **Reduced Scheduling Drag:** May reduce initial scheduling back-and-forth by collecting project context upfront.
- **Living Proof of Competence:** Demonstrates that Cynbit deploys automation on its own front door.

### 1.5 Why We Avoided Guaranteed Timelines and ROI Claims
Many agency AI tools make exaggerated claims like *"Guaranteed 3.5x ROI"* or *"Delivered in exactly 4 weeks"*. In professional engineering, these claims destroy credibility:
- Real-world AI and software projects depend heavily on data cleanliness, legacy technical debt, API rate limits, and compliance requirements.
- By using cautious, professional phrasing (*"Preliminary exploratory assessment"*, *"May be relevant"*, *"Requires collaborative engineering discovery"*), the prototype sets trustworthy expectations and frames discovery as an honest technical consultation.

### 1.6 What is Implemented
- **Full 5-Step Guided Questionnaire:** Needs selector, objective & challenge description (with 20–2,000 char counter), multi-system selector, stage, timeline, and contact information.
- **Client & Server Zod Validation:** Inline field-level error feedback on every step.
- **Client State Persistence:** Drafts are saved in `sessionStorage` so refreshing does not wipe progress.
- **Dynamic Capability Recommendation:** Maps vetted Cynbit services (Autonomous Agents, Full-Stack Apps, Cloud Modernization, Technical SEO, CRM Sync) according to user responses.
- **Progressive Enhancement Direct Form:** The fallback contact form renders with `opacity: 1` on the server and features a Next.js Server Action (`action={submitContactAction}`) that functions with or without client JavaScript.
- **Process Overview Section:** Visible *"Why this helps & what happens next"* section detailing the discovery journey.
- **Local Development Logging:** Safe, anonymous event tracking strictly stripped of personal data.

### 1.7 What is Mocked & Data Privacy
- **Calendar Scheduling (`BookingPanel.tsx`):** The date/time picker and meeting confirmation are an interactive UI prototype. It does not contact external Google Meet or Cal.com APIs unless configured via `NEXT_PUBLIC_CALENDAR_URL`.
- **Submission Storage (`api/submit-brief/route.ts`):** Inquiries and briefs are validated and handled in-memory for local development logging with simulated reference IDs (e.g., `CYN-MOCK-XXXXXX`).
- **Data Privacy Assurance:** **No personal data (names, emails, phone numbers, or project descriptions) is persisted to a database or sent to any third-party analytics service.** All console logging for prototype evaluation is local and anonymized.

### 1.8 What Would Be Built for Production
1. **Persistent Database:** Production PostgreSQL / Supabase storage with encrypted PII and access audit logs.
2. **CRM & Team Webhooks:** Real-time webhooks dispatching the structured brief to Cynbit's CRM and internal Slack channel (`#inbound-discovery`).
3. **Live Calendar Sync:** Embedding Cal.com or Calendly API to synchronize real-time availability with the Cynbit team.
4. **Streaming AI Synthesis:** Using the Vercel AI SDK on Next.js Edge runtime to stream the architectural brief token-by-token.

### 1.9 How Success Would Be Measured
- **Form Completion Rate:** Percentage of visitors initiating discovery who complete Step 4 vs. the bounce rate on legacy `/contact`.
- **Inbound Lead Quality Score:** Ratio of inquiries with actionable technical parameters (systems, timeline, stage) vs. ambiguous one-line inquiries.
- **Time-to-Discovery-Call:** Reduction in average time elapsed between initial website contact and the first technical call.
- **Conversion Rate:** Percentage of qualified discovery briefs converting into funded architectural sprints.

---

## 2. Project Architecture & Tech Stack

- **Framework:** Next.js 14 (App Router, Server Actions, React Server Components)
- **Language:** TypeScript 5.6
- **Styling:** Tailwind CSS 3.4 (Cynbit Dark Matrix theme with electric cyan & violet accents)
- **Validation:** Zod 3.23 (isomorphic validation schemas)
- **Icons:** Lucide React
- **Package Manager:** npm

```text
cynbit-discovery-assistant/
├── app/
│   ├── layout.tsx                     # Root layout, theme, metadata, and fonts
│   ├── page.tsx                       # Landing page with Cynbit branding & CTAs
│   ├── globals.css                    # Tailwind directives & custom scrollbars
│   ├── discover/
│   │   └── page.tsx                   # Main Discovery Assistant page
│   ├── contact/
│   │   ├── page.tsx                   # Dedicated direct contact page with Fallback form
│   │   └── actions.ts                 # Next.js Server Action for progressive enhancement
│   ├── results/
│   │   └── page.tsx                   # Results permalink / session review page
│   └── api/
│       ├── project-summary/
│       │   └── route.ts               # POST: validates & generates structured summary
│       └── submit-brief/
│           └── route.ts               # POST: handles simulated brief & contact submissions
├── components/
│   ├── Navbar.tsx                     # Top navigation with responsive mobile menu
│   ├── Footer.tsx                     # Cynbit Jaipur footer, credentials, and disclaimer
│   └── discovery/
│       ├── DiscoveryShell.tsx         # Multi-step state orchestrator & persistence
│       ├── ProgressIndicator.tsx      # Accessible step tracker (Step X of 5)
│       ├── NeedSelector.tsx           # Step 1: Selectable focus area cards
│       ├── ProjectQuestions.tsx       # Steps 2 & 3: Goal, challenge textarea, systems, stage, timeline
│       ├── ContactDetails.tsx         # Step 4: Full name, work email, company, phone, contact preference
│       ├── ProjectSummary.tsx         # Step 5: Preliminary brief, capability cards, follow-up questions
│       ├── BookingPanel.tsx           # Interactive discovery call scheduler (Mock)
│       ├── FallbackContactForm.tsx    # Resilient, SSR-visible direct contact form (Server Action)
│       └── DiscoveryValueProps.tsx    # "Why this helps & what happens next" roadmap
├── lib/
│   └── discovery/
│       ├── types.ts                   # TypeScript data models and enums
│       ├── validation.ts              # Zod schemas for all forms & steps
│       ├── analytics.ts               # Local development logging abstraction (Sanitized, No PII)
│       ├── recommendations.ts         # Cynbit capability cards & dynamic matching
│       ├── mockSummary.ts             # Deterministic local summary engine
│       └── summaryPrompt.ts           # Optional external LLM prompt builder & fallback
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

---

## 3. Getting Started Locally

### Prerequisites
- Node.js v18.17+ (tested on Node v22.13.1)
- npm

### Installation
```bash
# Navigate to the project directory
cd C:\Users\hacke\.gemini\antigravity\scratch\cynbit-discovery-assistant

# Install dependencies
npm install
```

### Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
npm run build
npm run start
```

---

## 4. Configuration & Environment Variables

The prototype runs **100% out of the box** without external API keys using its deterministic local rules engine.

To test live external AI summarization via OpenAI or an external calendar URL, add a `.env.local` file:

```env
# Optional: OpenAI API Key for live AI brief generation
OPENAI_API_KEY=sk-...

# Optional: Real scheduling URL (e.g. Cal.com or Calendly)
NEXT_PUBLIC_CALENDAR_URL=https://cal.com/cynbit/discovery
```

If `OPENAI_API_KEY` is omitted or invalid, the API route automatically and seamlessly falls back to the deterministic local summary engine, ensuring zero downtime.

---

## 5. Verification of Non-JavaScript & Progressive Enhancement Behavior

1. **Initial SSR Visibility:** The contact form renders with normal HTML visibility (`opacity: 1`), eliminating the `style="opacity: 0"` bug present on Cynbit's production site.
2. **Server Action Form Action:** The form uses `<form action={formAction} method="POST">` powered by Next.js Server Actions (`app/contact/actions.ts`). Even if JavaScript is completely disabled in the browser, submitting the form performs a standard POST request, validates on the server, and renders the result.
3. **Client-Enhanced Feedback:** When JavaScript is active, the form intercepts submissions to provide instant inline validation without a page reload.
