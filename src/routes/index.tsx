import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValue, type Variants } from "motion/react";
import {
  ArrowUpRight,
  Mail,
  Phone,
  Sun,
  Moon,
  Bot,
  Mic,
  MessageSquare,
  Code2,
  Eye,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1-.02-1.96-3.2.69-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56C20.71 21.38 24 17.08 24 12 24 5.65 18.85.5 12.5.5H12Z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

import voiceImg from "@/assets/project-voice.jpg";
import cctvImg from "@/assets/project-cctv.jpg";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rahul Wale — AI Engineer & Full-Stack Developer" },
      {
        name: "description",
        content:
          "Rahul Wale — AI Engineer and Team Lead building production LLM, voice AI, and full-stack systems. Shipping AI products at scale.",
      },
      { property: "og:title", content: "Rahul Wale — AI Engineer & Full-Stack Developer" },
      {
        property: "og:description",
        content:
          "Building AI products that scale. LLMs, real-time voice agents, RAG, and full-stack systems shipped to production.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

// ---------- shared bits ----------

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative scroll-mt-24 py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mb-14 md:mb-20"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            {eyebrow}
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            {title}
          </h2>
          {intro && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{intro}</p>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function MagneticButton({
  children,
  variant = "primary",
  href,
  className = "",
}: {
  children: ReactNode;
  variant?: "primary" | "ghost";
  href: string;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors will-change-transform";
  const styles =
    variant === "primary"
      ? "bg-foreground text-background hover:bg-foreground/90 shadow-soft"
      : "border border-hairline bg-surface text-foreground hover:bg-surface-2";

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set(((e.clientX - r.left) / r.width - 0.5) * 14);
        y.set(((e.clientY - r.top) / r.height - 0.5) * 14);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </motion.a>
  );
}

// ---------- page ----------

function Portfolio() {
  const [dark, setDark] = useState(true);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Cursor glow
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [cursorX, cursorY]);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      {/* scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-primary"
      />

      {/* cursor glow */}
      <motion.div
        aria-hidden
        style={{ x: cursorX, y: cursorY }}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
      >
        <div className="size-full rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--primary), transparent 70%)" }}
        />
      </motion.div>

      <Nav dark={dark} onToggle={() => setDark((d) => !d)} />

      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Services />
      <TechWall />
      <Contact />
      <Footer />
    </div>
  );
}

// ---------- nav ----------

function Nav({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  const links = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Work" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-40 mx-auto flex max-w-6xl items-center justify-between px-6"
    >
      <a href="#top" className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
        <span className="grid size-6 place-items-center rounded-full bg-primary text-primary-foreground">R</span>
        Rahul Wale
      </a>
      <nav className="glass hidden items-center gap-1 rounded-full px-2 py-1.5 text-sm md:flex">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
          >
            {l.label}
          </a>
        ))}
      </nav>
      <button
        onClick={onToggle}
        aria-label="Toggle theme"
        className="glass grid size-10 place-items-center rounded-full transition-colors hover:bg-surface-2"
      >
        {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </button>
    </motion.header>
  );
}

// ---------- hero ----------

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const posterY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section id="top" ref={ref} className="relative hero-gradient pt-36 md:pt-44">
      <div className="absolute inset-0 -z-10 grid-bg" aria-hidden />
      <div className="absolute -top-32 right-[-10%] -z-10 size-[520px] blob bg-primary" aria-hidden />
      <div className="absolute top-40 left-[-10%] -z-10 size-[380px] blob" aria-hidden style={{ background: "var(--glow)" }} />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-24 md:grid-cols-12 md:gap-10 md:pb-36">
        {/* LEFT — bio */}
        <motion.div style={{ y: textY }} className="md:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3 py-1.5 text-xs font-medium text-muted-foreground"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            Open to AI engineering & founder roles
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.5rem,6.5vw,5rem)] font-semibold leading-[1.02] tracking-[-0.03em]"
          >
            Hi, I'm Rahul.
            <br />
            <span className="text-gradient">AI engineer, team lead, builder.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            I architect and ship production AI — real-time voice agents, RAG systems, no-code
            AI tooling, and computer-vision platforms. Currently leading the AI team at{" "}
            <span className="text-foreground">The BAAP Company</span>, mentoring 50+ engineers and
            running platforms that serve 500+ concurrent users at 99% uptime.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <MagneticButton href="/rahul-wale-cv.pdf" variant="primary">
              Download CV <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </MagneticButton>
            <MagneticButton href="#projects" variant="ghost">
              View projects <ArrowUpRight className="size-4" />
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground"
          >
            {["AI Engineer", "Team Lead", "Full Stack", "Generative AI"].map((r) => (
              <span key={r} className="inline-flex items-center gap-2">
                <span className="size-1 rounded-full bg-primary" /> {r}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — wanted poster */}
        <motion.div
          style={{ y: posterY }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="md:col-span-5"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-hairline bg-surface shadow-lift">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--surface-2),var(--background))]" />
            <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />

            {/* corner ticks */}
            <div className="pointer-events-none absolute inset-3 rounded-2xl border border-dashed border-hairline" />

            {/* top label */}
            <div className="absolute inset-x-0 top-6 z-10 text-center">
              <div className="text-[10px] font-bold uppercase tracking-[0.55em] text-muted-foreground">
                — Wanted —
              </div>
              <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-foreground/80">
                AI Founder · Builder · Shipper
              </div>
            </div>

            {/* classified stamp */}
            <div className="pointer-events-none absolute right-4 top-16 z-10 rotate-12 rounded-md border-2 border-destructive/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-destructive/80">
              Classified
            </div>

            {/* pulsing ring + big ? */}
            <motion.div
              animate={{ scale: [1, 1.04, 1], rotate: [-1.5, 1.5, -1.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 grid place-items-center"
            >
              <motion.span
                animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.08, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute size-56 rounded-full"
                style={{ background: "radial-gradient(closest-side, var(--glow), transparent 70%)" }}
              />
              <span
                className="text-gradient relative select-none font-semibold leading-none tracking-tighter"
                style={{ fontSize: "clamp(10rem, 22vw, 18rem)" }}
              >
                ?
              </span>
            </motion.div>

            {/* reward chip */}
            <div className="absolute left-4 bottom-24 z-10 inline-flex items-center gap-2 rounded-full border border-hairline bg-background/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground backdrop-blur">
              <Sparkles className="size-3 text-primary" /> Reward: a great hire
            </div>

            {/* identity card */}
            <div className="absolute inset-x-0 bottom-0 p-4">
              <div className="glass rounded-2xl p-3.5 text-sm">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Identity classified</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">#001</div>
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">AI Engineer · Team Lead · Pune, India</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ---------- marquee strip ----------

function Marquee() {
  const items = [
    "Gemini",
    "LangChain",
    "Pipecat",
    "Sarvam AI",
    "Deepgram",
    "FastAPI",
    "Next.js",
    "React",
    "Flutter",
    "PostgreSQL",
    "Redis",
    "Docker",
    "AWS",
    "Twilio",
    "YOLOv9",
    "ArcFace",
  ];
  return (
    <div className="relative border-y border-hairline bg-surface/60 py-6">
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="flex shrink-0 gap-12 pr-12 text-lg font-medium text-muted-foreground"
        >
          {[...items, ...items].map((t, i) => (
            <span key={i} className="inline-flex items-center gap-3">
              <span className="size-1.5 rounded-full bg-primary/60" /> {t}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ---------- about ----------

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let raf = 0;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const start = performance.now();
          const dur = 1400;
          const step = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(eased * value));
            if (p < 1) raf = requestAnimationFrame(step);
          };
          raf = requestAnimationFrame(step);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, [value]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

function About() {
  const stats = [
    { v: 2, s: "+", l: "Years building production AI" },
    { v: 500, s: "+", l: "Concurrent users served" },
    { v: 50, s: "+", l: "Engineers mentored" },
    { v: 99, s: "%", l: "Platform uptime" },
  ];
  return (
    <Section
      id="about"
      eyebrow="About"
      title={
        <>
          End-to-end AI ownership —<br />
          from <span className="text-gradient">research to production</span>.
        </>
      }
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="md:col-span-5"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-hairline shadow-soft">
            {/* WANTED poster — mysterious founder */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--surface-2),var(--background))]" />
            <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />

            <div className="absolute inset-x-0 top-6 text-center">
              <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-muted-foreground">
                — Wanted —
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-[0.3em] text-foreground/70">
                AI Founder · Builder · Shipper
              </div>
            </div>

            <motion.div
              animate={{ scale: [1, 1.04, 1], rotate: [-1, 1, -1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 grid place-items-center"
            >
              <span
                className="text-gradient select-none font-semibold leading-none tracking-tighter"
                style={{ fontSize: "clamp(12rem, 26vw, 22rem)" }}
              >
                ?
              </span>
            </motion.div>

            {/* soft glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(closest-side, var(--glow), transparent 65%)", opacity: 0.5 }}
            />

            <div className="absolute inset-x-0 bottom-0 p-5">
              <div className="glass rounded-2xl p-4 text-sm">
                <div className="font-semibold">Identity classified</div>
                <div className="text-muted-foreground">AI Engineer · Team Lead · Pune, India</div>
              </div>
            </div>
          </div>

        </motion.div>

        <div className="md:col-span-7">
          <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
            I architect and ship production AI — real-time voice agents, RAG systems, no-code AI tooling,
            and computer-vision platforms. I care about latency, reliability, and shipping things real
            humans use. Currently leading the AI team at <span className="text-foreground">The BAAP Company</span>,
            building products serving rural India at scale.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-hairline bg-surface p-5 transition-colors hover:bg-surface-2"
              >
                <div className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  <AnimatedNumber value={s.v} suffix={s.s} />
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// ---------- skills ----------

function Skills() {
  const groups: { name: string; items: string[] }[] = [
    { name: "AI & GenAI", items: ["Gemini", "LangChain", "RAG", "AI Agents", "Prompt Engineering", "Hugging Face", "LLM Evaluation", "Guardrails"] },
    { name: "Voice AI", items: ["Pipecat", "Deepgram", "Sarvam AI", "Twilio Voice", "VAD", "WebSocket audio", "Vosk", "VITS"] },
    { name: "Computer Vision", items: ["YOLOv9", "ArcFace", "OpenCV", "Real-time video"] },
    { name: "Backend", items: ["FastAPI", "Python", "PostgreSQL", "Redis", "REST APIs", "WebSockets"] },
    { name: "Frontend & Mobile", items: ["Next.js", "React", "Flutter"] },
    { name: "Infrastructure", items: ["Docker", "AWS (EC2, S3)", "Firebase", "Git", "CI/CD"] },
  ];

  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title={<>The stack I ship with.</>}
      intro="A focused toolkit for production LLM, voice, vision, and full-stack systems."
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((g, i) => (
          <motion.div
            key={g.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-3xl border border-hairline bg-surface p-6 transition-colors hover:bg-surface-2"
          >
            <div className="absolute -right-12 -top-12 size-40 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{g.name}</h3>
              <span className="text-xs text-muted-foreground">{g.items.length}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {g.items.map((item) => (
                <motion.span
                  key={item}
                  whileHover={{ y: -2 }}
                  className="rounded-full border border-hairline bg-background px-3 py-1.5 text-sm font-medium text-foreground/90 transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ---------- projects ----------

function ProjectCard({
  title,
  subtitle,
  description,
  tech,
  results,
  image,
  index,
}: {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  results: string[];
  image: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * 8);
        rx.set(-py * 8);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1200 }}
      className="group relative overflow-hidden rounded-3xl border border-hairline bg-surface shadow-soft"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          loading="lazy"
          width={1280}
          height={800}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute left-5 top-5">
          <span className="glass rounded-full px-3 py-1 text-xs font-medium">{subtitle}</span>
        </div>
      </div>

      <div className="relative p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h3>
          <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>
        <p className="mt-4 max-w-2xl text-muted-foreground">{description}</p>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Results</div>
            <ul className="space-y-1.5 text-sm">
              {results.map((r) => (
                <li key={r} className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tech</div>
            <div className="flex flex-wrap gap-1.5">
              {tech.map((t) => (
                <span key={t} className="rounded-md border border-hairline bg-background px-2 py-1 text-xs text-foreground/80">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Featured projects"
      title={
        <>
          Shipped, scaled, <span className="text-gradient">in production</span>.
        </>
      }
      intro="Production systems serving real users — not demos."
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ProjectCard
          index={0}
          title="Voice-on-Call AI Platform"
          subtitle="Real-time multilingual voice agent"
          description="A real-time AI voice assistant that lets citizens lodge civic queries over a phone call in their native Indian language. I owned the full stack — ML pipeline, FastAPI backend, React dashboard, and Twilio voice integration."
          tech={["Pipecat", "Gemini", "Sarvam AI", "Deepgram", "Twilio", "FastAPI", "React", "WebSockets"]}
          results={[
            "99% uptime under 500+ concurrent calls",
            "Sub-second response with VAD + barge-in",
            "Cut manual call-centre workload by 60%",
          ]}
          image={voiceImg}
        />
        <ProjectCard
          index={1}
          title="SmartCCTV — AI Surveillance"
          subtitle="Plug-and-play AI for IP cameras"
          description="Upgrades existing IP CCTV cameras into intelligent monitoring — no hardware replacement. Connect a camera and the system becomes instantly intelligent with face recognition, attendance, and unknown-person alerts."
          tech={["Python", "YOLOv9", "ArcFace", "OpenCV", "FastAPI", "React", "PostgreSQL", "Redis"]}
          results={[
            "Deployed across 20+ cameras at pilot sites",
            "10,000+ daily face-recognition events",
            "Live React monitoring dashboard",
          ]}
          image={cctvImg}
        />
      </div>
    </Section>
  );
}

// ---------- experience ----------

function Experience() {
  const milestones = [
    {
      title: "Architected 4+ production AI platforms",
      body: "Real-time voice agents, RAG chatbots, no-code AI tools, and CCTV intelligence — serving rural India at 99% uptime under 500+ concurrent users.",
    },
    {
      title: "Real-time multilingual Voice-on-Call AI",
      body: "Combined Gemini LLM, Sarvam STT, Deepgram TTS, and Pipecat over Twilio. Cut manual call-centre workload by 60%.",
    },
    {
      title: "No-code AI chatbot platform",
      body: "Built on LangChain + Gemini with RAG over municipal knowledge bases. Local governments self-serve 5,000+ daily citizen interactions with zero engineering support.",
    },
    {
      title: "Low-latency voice pipelines",
      body: "Sub-second response with WebSocket audio, VAD, and barge-in. STT, LLM reasoning, and TTS productionised as a single conversational stack.",
    },
    {
      title: "Leading AI team · mentoring 50+ engineers",
      body: "Driving the AI roadmap, code review culture, and a junior-engineer mentorship program across the org.",
    },
  ];

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title={
        <>
          AI Engineer & Team Lead<br />
          <span className="text-gradient">The BAAP Company</span>
        </>
      }
      intro="Jul 2023 — Present · Generative AI · Voice AI · Computer Vision"
    >
      <div className="relative">
        <div className="absolute left-4 top-2 bottom-2 w-px bg-hairline md:left-1/2" aria-hidden />
        <div className="space-y-12">
          {milestones.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={`relative grid grid-cols-1 gap-4 md:grid-cols-2 ${
                i % 2 === 0 ? "" : "md:[&>*:first-child]:col-start-2"
              }`}
            >
              <div className={`md:col-span-1 ${i % 2 === 1 ? "md:text-left" : "md:text-right"}`}>
                <div className="relative pl-12 md:pl-0 md:pr-12">
                  <span className="absolute left-0 top-2 grid size-8 place-items-center rounded-full border border-hairline bg-background md:left-auto md:right-[-1rem] md:translate-x-1/2">
                    <span className="size-2 rounded-full bg-primary" />
                  </span>
                  {i % 2 === 1 && (
                    <span className="absolute left-[-1rem] top-2 hidden size-8 -translate-x-1/2 place-items-center rounded-full border border-hairline bg-background md:grid">
                      <span className="size-2 rounded-full bg-primary" />
                    </span>
                  )}
                  <div className="rounded-2xl border border-hairline bg-surface p-5 transition-colors hover:bg-surface-2">
                    <h3 className="text-lg font-semibold">{m.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ---------- services ----------

function Services() {
  const services = [
    { icon: Bot, title: "AI Agents", body: "Autonomous, tool-using agents with guardrails and evals." },
    { icon: Mic, title: "Voice AI Systems", body: "Real-time multilingual voice over phone & web — STT, LLM, TTS." },
    { icon: MessageSquare, title: "RAG Chatbots", body: "Production RAG over your knowledge base with citations." },
    { icon: Code2, title: "Full-Stack Builds", body: "FastAPI + Next.js + Flutter, shipped end-to-end." },
    { icon: Eye, title: "Computer Vision", body: "YOLO + ArcFace pipelines for live video & CCTV intelligence." },
    { icon: Sparkles, title: "Custom AI Solutions", body: "From research spike to production rollout, owned by one team." },
  ];
  return (
    <Section
      id="services"
      eyebrow="Services"
      title={<>How I can help your team.</>}
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-3xl border border-hairline bg-surface p-6 transition-all hover:border-primary/30"
          >
            <div className="absolute inset-0 -z-10 opacity-0 transition-opacity group-hover:opacity-100"
              style={{ background: "radial-gradient(400px 200px at 50% 0%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 60%)" }}
            />
            <div className="mb-5 inline-grid size-11 place-items-center rounded-2xl border border-hairline bg-background text-primary transition-transform group-hover:scale-110">
              <s.icon className="size-5" />
            </div>
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ---------- tech wall ----------

function TechWall() {
  const tech = [
    "Gemini",
    "Python",
    "React",
    "Next.js",
    "Flutter",
    "FastAPI",
    "Docker",
    "AWS",
    "Firebase",
    "PostgreSQL",
    "LangChain",
    "Pipecat",
  ];
  return (
    <Section id="tech" eyebrow="Tech wall" title={<>The systems behind the work.</>}>
      <div className="grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-6">
        {tech.map((t, i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            animate={{ y: [0, -6, 0] }}
            // staggered float
            style={{ animationDelay: `${i * 200}ms` }}
            className="grid aspect-square place-items-center rounded-2xl border border-hairline bg-surface text-center text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            {t}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ---------- contact ----------

function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={
        <>
          Let's build something <span className="text-gradient">real</span>.
        </>
      }
      intro="Have an AI product in mind, a founding-engineer role, or a team that needs to ship faster? Let's talk."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="space-y-3 lg:col-span-2">
          <ContactRow
            icon={<Mail className="size-4" />}
            label="Email"
            value="walerahul96@gmail.com"
            href="mailto:walerahul96@gmail.com"
          />
          <ContactRow
            icon={<Phone className="size-4" />}
            label="Phone"
            value="+91 93568 53041"
            href="tel:+919356853041"
          />
          <ContactRow
            icon={<LinkedinIcon className="size-4" />}
            label="LinkedIn"
            value="linkedin.com/in/rahul-wale"
            href="https://linkedin.com/in/rahul-wale"
          />
          <ContactRow
            icon={<GithubIcon className="size-4" />}
            label="GitHub"
            value="github.com/Rahuwale123"
            href="https://github.com/Rahuwale123"
          />
        </div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const body = `Hi Rahul,%0D%0A%0D%0A${data.get("message")}%0D%0A%0D%0A— ${data.get("name")}`;
            window.location.href = `mailto:walerahul96@gmail.com?subject=Project inquiry from ${data.get("name")}&body=${body}`;
          }}
          className="glass relative overflow-hidden rounded-3xl p-6 shadow-lift lg:col-span-3 md:p-8"
        >
          <div className="absolute -right-20 -top-20 size-72 blob bg-primary opacity-30" aria-hidden />
          <div className="relative space-y-5">
            <Field label="Name" name="name" placeholder="Your name" required />
            <Field label="Email" name="email" type="email" placeholder="you@company.com" required />
            <Field label="Message" name="message" placeholder="What are you building?" required textarea />
            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-transform hover:scale-[1.01]"
            >
              Send message
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </motion.form>
      </div>
    </Section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <motion.a
      whileHover={{ y: -2 }}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="group flex items-center justify-between rounded-2xl border border-hairline bg-surface p-5 transition-colors hover:border-primary/30 hover:bg-surface-2"
    >
      <div className="flex items-center gap-4">
        <span className="grid size-10 place-items-center rounded-xl border border-hairline bg-background text-primary">
          {icon}
        </span>
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="font-medium">{value}</div>
        </div>
      </div>
      <ArrowUpRight className="size-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
    </motion.a>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const cls =
    "w-full rounded-2xl border border-hairline bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-primary/60 focus:bg-background";
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {textarea ? (
        <textarea name={name} required={required} placeholder={placeholder} rows={4} className={cls} />
      ) : (
        <input name={name} type={type} required={required} placeholder={placeholder} className={cls} />
      )}
    </label>
  );
}

function Footer() {
  return (
    <footer className="border-t border-hairline py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
        <div>© {new Date().getFullYear()} Rahul Wale. Built with care.</div>
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-primary" />
          Available for AI engineering & founder roles
        </div>
      </div>
    </footer>
  );
}
