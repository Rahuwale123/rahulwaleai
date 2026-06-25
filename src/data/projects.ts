import voiceImg from "@/assets/project-voice.jpg";
import cctvImg from "@/assets/project-cctv.jpg";

export type ProjectStage = {
  title: string;
  body: string;
};

export type ProjectChallenge = {
  title: string;
  body: string;
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  image: string;
  tech: string[];
  results: string[];
  problem: string;
  solution: string;
  architecture: ProjectStage[];
  challenges: ProjectChallenge[];
  impact: string[];
};

export const projects: Project[] = [
  {
    slug: "voice-on-call-ai",
    title: "Voice-on-Call AI Platform",
    subtitle: "Real-time multilingual voice agent",
    tagline:
      "A phone call is all it takes — AI-powered civic and farmer support in any Indian language, no smartphone required.",
    description:
      "A real-time AI voice assistant that lets citizens lodge civic queries over a phone call in their native Indian language. I owned the full stack — ML pipeline, FastAPI backend, React dashboard, and Twilio voice integration.",
    image: voiceImg,
    tech: [
      "Pipecat",
      "Gemini",
      "Sarvam AI",
      "Deepgram",
      "Twilio",
      "FastAPI",
      "React",
      "WebSockets",
      "PostgreSQL",
    ],
    results: [
      "99% uptime under 500+ concurrent calls",
      "Sub-second response with VAD + barge-in",
      "Cut manual call-centre workload by 60%",
    ],
    problem:
      "Millions of people in rural India — farmers, citizens needing civic services — don't have access to apps, smartphones, or English-language support systems. Existing call-centre infrastructure is expensive to scale and limited to business hours. The result: people who need help most are the ones least served by digital systems.",
    solution:
      "I built a real-time, multilingual voice AI agent that lets anyone call a regular phone number and have a natural, spoken conversation in their native Indian language — no app to download, no smartphone needed, works on any basic phone. The system listens, understands intent, looks up relevant information, and responds — all in the time it takes a human to answer a question.",
    architecture: [
      {
        title: "Call ingestion",
        body: "Twilio handles inbound/outbound telephony, streaming raw audio over WebSockets into the pipeline.",
      },
      {
        title: "Speech-to-Text",
        body: "Sarvam AI's STT converts spoken Indian-language audio into text in real time, tuned for regional accents and dialects.",
      },
      {
        title: "Reasoning layer",
        body: "Gemini LLM interprets intent, holds conversational context, and decides what information or action is needed.",
      },
      {
        title: "Text-to-Speech",
        body: "Deepgram TTS converts the LLM's response back into natural-sounding speech in the same language.",
      },
      {
        title: "Orchestration",
        body: "Pipecat ties these stages together as one low-latency, interruption-aware voice pipeline, with FastAPI as the backend and a React dashboard for monitoring live calls.",
      },
    ],
    challenges: [
      {
        title: "Sub-second latency",
        body: "Voice conversations break down if response time feels unnatural. I engineered a WebSocket-based audio streaming pipeline with overlapping STT/LLM/TTS stages instead of sequential processing, getting end-to-end response time down to sub-second.",
      },
      {
        title: "Barge-in handling",
        body: "Real conversations involve interruptions. I implemented Voice Activity Detection (VAD) and barge-in logic so the system stops speaking and listens the moment the caller starts talking — just like a human would.",
      },
      {
        title: "Concurrency at scale",
        body: "The system runs at 99% uptime under 500+ simultaneous calls — designing the backend to handle many parallel conversation states without one call's load affecting another's latency.",
      },
      {
        title: "Multilingual robustness",
        body: "Indian languages have huge dialect and accent variation. Tuning Sarvam STT and prompt-engineering Gemini's responses for natural, locally appropriate phrasing — not robotic translation — was a continuous iteration process.",
      },
    ],
    impact: [
      "99% uptime under 500+ concurrent calls",
      "Cut manual call-centre workload by 60%",
      "Showcased at Mumbai Tech Week 2026",
      "Built and owned end-to-end: ML pipeline, backend, frontend dashboard, and telephony integration — solo",
    ],
  },
  {
    slug: "smartcctv",
    title: "SmartCCTV — AI Surveillance & Monitoring Platform",
    subtitle: "Plug-and-play AI for IP cameras",
    tagline:
      "Turn any existing CCTV camera into an intelligent monitoring system — no new hardware, just plug in and the camera starts thinking.",
    description:
      "Upgrades existing IP CCTV cameras into intelligent monitoring — no hardware replacement. Connect a camera and the system becomes instantly intelligent with face recognition, attendance, and unknown-person alerts.",
    image: cctvImg,
    tech: [
      "Python",
      "YOLOv9",
      "ArcFace",
      "OpenCV",
      "FastAPI",
      "React",
      "PostgreSQL",
      "Redis",
    ],
    results: [
      "Deployed across 20+ cameras at pilot sites",
      "10,000+ daily face-recognition events",
      "Live React monitoring dashboard",
    ],
    problem:
      "Most CCTV systems in India just record — they don't understand what they're seeing. Upgrading to 'smart' surveillance usually means ripping out existing cameras and buying expensive proprietary hardware, which is a non-starter for most schools, offices, and small businesses.",
    solution:
      "I built a software-only AI layer that sits on top of any existing IP camera setup and adds real-time intelligence — face recognition, attendance tracking, and unknown-person alerts — without replacing a single piece of hardware. Connect a camera to the system, and it instantly becomes intelligent.",
    architecture: [
      {
        title: "Video ingestion",
        body: "Pulls live RTSP/IP streams from existing cameras, no special hardware required.",
      },
      {
        title: "Detection",
        body: "YOLOv9 runs real-time object/person detection on each video frame.",
      },
      {
        title: "Recognition",
        body: "ArcFace generates facial embeddings and matches them against a known-faces database for identity recognition.",
      },
      {
        title: "Event pipeline",
        body: "Recognized/unrecognized faces trigger structured events (attendance log, alert, etc.), processed through a FastAPI backend.",
      },
      {
        title: "Storage & alerts",
        body: "PostgreSQL stores attendance and event logs; Redis handles real-time alert queuing and caching for fast lookups.",
      },
      {
        title: "Live dashboard",
        body: "A React-based monitoring dashboard shows live camera feeds, face-recognition events, and alerts in real time.",
      },
    ],
    challenges: [
      {
        title: "Real-time performance at scale",
        body: "Processing 10,000+ daily face-recognition events across 20+ cameras meant optimizing the detection-to-recognition pipeline so it could run continuously without lag, balancing accuracy against compute cost.",
      },
      {
        title: "Zero hardware dependency",
        body: "Designing the system to work with whatever IP cameras a site already has — rather than requiring specific proprietary hardware — meant building a flexible ingestion layer that handles varying stream qualities and protocols.",
      },
      {
        title: "False positive control",
        body: "Unknown-person alerts need to be reliable — too many false alarms make the system useless. Tuning ArcFace's similarity thresholds and adding consistency checks across multiple frames reduced false positives significantly.",
      },
      {
        title: "Live dashboard responsiveness",
        body: "Showing real-time events from 20+ camera feeds simultaneously without overwhelming the frontend or backend required efficient event batching and Redis-backed caching.",
      },
    ],
    impact: [
      "Deployed across pilot sites with 20+ cameras",
      "Processing 10,000+ daily face-recognition events",
      "Built ArcFace-based automated attendance system replacing manual tracking",
      "Live unknown-person alerting for site security",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
