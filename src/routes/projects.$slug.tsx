import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowLeft, ArrowUpRight, Sparkles, Cpu, Wrench, Target, Layers } from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { absoluteUrl, SITE_NAME, projectUrl } from "../lib/site";

export const Route = createFileRoute("/projects/$slug")({
  head: ({ params }) => {
    const p = getProject(params.slug);
    const title = p ? `${p.title} | Rahul Wale` : "Project | Rahul Wale";
    const description = p?.tagline ?? "Project case study by Rahul Wale.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "author", content: SITE_NAME },
        { property: "og:title", content: title },
        { property: "og:site_name", content: SITE_NAME },
        { property: "og:description", content: description },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        ...(p ? [{ property: "og:image", content: absoluteUrl(p.image) }] : []),
        ...(p ? [{ name: "twitter:image", content: absoluteUrl(p.image) }] : []),
        { name: "twitter:card", content: "summary_large_image" },
        ...(p ? [{ property: "og:url", content: projectUrl(p.slug) }] : []),
        { property: "og:type", content: "article" },
      ],
      links: p ? [{ rel: "canonical", href: projectUrl(p.slug) }] : [],
    };
  },
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-5xl font-semibold text-foreground">Not found</h1>
        <p className="mt-3 text-muted-foreground">That project doesn't exist.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-4 py-2 text-sm font-medium hover:bg-background"
        >
          <ArrowLeft className="size-4" /> Back home
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <p className="text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: ProjectPage,
});

function ProjectPage() {
  const { project } = Route.useLoaderData() as { project: import("@/data/projects").Project };
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const otherProjects = projects.filter((p) => p.slug !== project.slug);
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: absoluteUrl(project.image),
    url: projectUrl(project.slug),
    author: {
      "@type": "Person",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
    about: project.tech,
    keywords: [
      SITE_NAME,
      "AI engineer",
      "AI full stack developer",
      "AI developer",
      "voice AI",
      "RAG",
      "computer vision",
      ...project.tech,
    ],
  };

  return (
    <main className="relative min-h-screen overflow-x-clip bg-background text-foreground antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-0 size-[60rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[160px]" />
        <div className="absolute bottom-0 right-0 size-[40rem] rounded-full bg-primary/5 blur-[140px]" />
      </div>

      {/* Top nav */}
      <header className="sticky top-0 z-50 border-b border-hairline/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            Back to portfolio
          </Link>
          <Link
            to="/"
            hash="contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
          >
            Get in touch <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section ref={heroRef} className="relative pb-16 pt-16 md:pb-24 md:pt-24">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="size-1.5 rounded-full bg-primary" />
              Case study · {project.subtitle}
            </div>
            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
              {project.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {project.tagline}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-hairline bg-surface px-2.5 py-1 text-xs text-foreground/80 transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Hero image with parallax */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="group relative mt-14 overflow-hidden rounded-3xl border border-hairline bg-surface shadow-soft"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <motion.img
                src={project.image}
                alt={project.title}
                style={{ y: imageY, scale: imageScale }}
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Highlights
                    </div>
                    <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/90">
                      {project.results.map((r) => (
                        <li key={r} className="flex items-center gap-2">
                          <span className="size-1.5 rounded-full bg-primary" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem / Solution */}
      <Block>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card
            icon={<Target className="size-5" />}
            eyebrow="The problem"
            title="What needed solving"
          >
            <p className="text-muted-foreground">{project.problem}</p>
          </Card>
          <Card icon={<Sparkles className="size-5" />} eyebrow="The solution" title="What I built">
            <p className="text-muted-foreground">{project.solution}</p>
          </Card>
        </div>
      </Block>

      {/* Architecture */}
      <Block eyebrow="How it works" title="Architecture" icon={<Layers className="size-4" />}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {project.architecture.map((stage, i) => (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-hairline bg-surface p-6 shadow-soft transition-colors hover:border-primary/40"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-primary/0 blur-2xl transition-colors duration-500 group-hover:bg-primary/15" />
              <div className="flex items-center gap-3">
                <span className="inline-flex size-8 items-center justify-center rounded-full border border-hairline bg-background text-xs font-semibold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-semibold tracking-tight">{stage.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{stage.body}</p>
            </motion.div>
          ))}
        </div>
      </Block>

      {/* Challenges */}
      <Block
        eyebrow="Engineering"
        title="Key challenges solved"
        icon={<Wrench className="size-4" />}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {project.challenges.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-hairline bg-surface p-6 shadow-soft transition-colors hover:border-primary/40"
            >
              <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-primary/0 via-primary/60 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <h3 className="text-lg font-semibold tracking-tight">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </motion.div>
          ))}
        </div>
      </Block>

      {/* Impact */}
      <Block eyebrow="Impact" title="What it shipped" icon={<Cpu className="size-4" />}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {project.impact.map((line, i) => (
            <motion.div
              key={line}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="flex items-start gap-3 rounded-2xl border border-hairline bg-surface p-5 transition-colors hover:border-primary/40"
            >
              <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
              <span className="text-sm text-foreground/90">{line}</span>
            </motion.div>
          ))}
        </div>
      </Block>

      {/* Other projects */}
      <Block eyebrow="More work" title="Other projects">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {otherProjects.map((p) => (
            <Link
              key={p.slug}
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="group relative block overflow-hidden rounded-3xl border border-hairline bg-surface shadow-soft transition-transform hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              </div>
              <div className="flex items-start justify-between gap-4 p-6">
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {p.subtitle}
                  </div>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight">{p.title}</h3>
                </div>
                <ArrowUpRight className="size-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
            </Link>
          ))}
        </div>
      </Block>

      {/* CTA */}
      <section className="relative py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="relative overflow-hidden rounded-3xl border border-hairline bg-surface p-10 text-center shadow-soft md:p-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,theme(colors.primary/15),transparent_60%)]" />
            <h2 className="relative text-3xl font-semibold tracking-tight md:text-5xl">
              Have a system that needs to ship?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-muted-foreground">
              I build production-grade AI — voice, vision, and full-stack. Open to senior AI
              engineering and founder roles.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/"
                hash="contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
              >
                Get in touch <ArrowUpRight className="size-4" />
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full border border-hairline bg-background px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-surface"
              >
                <ArrowLeft className="size-4" /> Back to portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Block({
  eyebrow,
  title,
  icon,
  children,
}: {
  eyebrow?: string;
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="relative py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        {(eyebrow || title) && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            {eyebrow && (
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
                {icon}
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{title}</h2>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}

function Card({
  icon,
  eyebrow,
  title,
  children,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-3xl border border-hairline bg-surface p-8 shadow-soft transition-colors hover:border-primary/40"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary/0 blur-3xl transition-colors duration-500 group-hover:bg-primary/15" />
      <div className="relative">
        <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
          {icon}
          {eyebrow}
        </div>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">{title}</h3>
        <div className="mt-4 leading-relaxed">{children}</div>
      </div>
    </motion.div>
  );
}
