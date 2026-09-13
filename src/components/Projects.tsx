import { useMemo, useState, MouseEvent as ReactMouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  ExternalLink,
  Star,
  Code2,
  Sparkles,
  Zap,
  BookOpen,
  Package,
  Snowflake,
  Blocks,
  Globe,
  Users,
  Github,
  Clock,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";
import { PROJECTS, BUSINESS_PROJECTS, type Project } from "../data";
import { useProfile } from "../contexts/ProfileContext";
import { usePrefersReducedMotion } from "../hooks";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/Dialog";
import Badge from "./ui/Badge";

const iconMap = {
  Code2,
  Sparkles,
  Zap,
  BookOpen,
  Package,
  Snowflake,
  Blocks,
  Globe,
  Users,
};

const CATEGORY_LABEL: Record<Project["category"], string> = {
  web: "Web",
  mod: "Minecraft Mods",
  oss: "Open Source",
};

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const Icon = iconMap[project.icon as keyof typeof iconMap];
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });

  const handleMove = (e: ReactMouseEvent<HTMLButtonElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 8);
    rx.set(-py * 8);
  };
  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.button
      onClick={onOpen}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-magnetic="true"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.07, 0.4) }}
      style={reducedMotion ? undefined : { rotateX: srx, rotateY: sry, transformPerspective: 800 }}
      className="glass group relative flex flex-col overflow-hidden rounded-2xl p-6 text-left transition-shadow hover:shadow-glow-primary"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.06] via-secondary/[0.04] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-dark-primary/[0.08] dark:via-dark-secondary/[0.05]" />

      {project.featured && (
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 font-mono text-[10px] text-primary dark:bg-dark-primary/10 dark:text-dark-primary">
          <Star size={9} /> featured
        </div>
      )}

      <div className="relative mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 dark:bg-dark-surface-2">
        {Icon && <Icon size={18} className="text-primary dark:text-dark-primary" />}
      </div>

      <h3 className="relative mb-1.5 font-display text-lg font-semibold text-text-primary dark:text-dark-text-primary">
        {project.title}
      </h3>
      <p className="relative mb-5 flex-1 font-mono text-xs leading-relaxed text-text-dim dark:text-dark-text-dim">
        {project.desc}
      </p>

      <div className="relative flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>
    </motion.button>
  );
}

function ProjectDetail({ project }: { project: Project }) {
  const Icon = iconMap[project.icon as keyof typeof iconMap];
  return (
    <>
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-2 dark:bg-dark-surface-2">
          {Icon && <Icon size={20} className="text-primary dark:text-dark-primary" />}
        </div>
        <div>
          <DialogTitle className="font-display text-xl font-semibold text-text-primary dark:text-dark-text-primary">
            {project.title}
          </DialogTitle>
          <DialogDescription className="font-mono text-[11px] text-text-dim dark:text-dark-text-dim">
            {CATEGORY_LABEL[project.category]}
            {project.timeline ? ` · ${project.timeline}` : ""}
          </DialogDescription>
        </div>
      </div>

      <p className="mb-5 font-body text-sm leading-relaxed text-text-dim dark:text-dark-text-dim">
        {project.desc}
      </p>

      <div className="mb-6 flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <Badge key={t} variant="primary">
            {t}
          </Badge>
        ))}
      </div>

      {project.features && project.features.length > 0 && (
        <div className="mb-5">
          <p className="mb-2 flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-text-dim dark:text-dark-text-dim">
            <CheckCircle2 size={12} className="text-primary dark:text-dark-primary" /> Features
          </p>
          <ul className="space-y-1.5">
            {project.features.map((f) => (
              <li
                key={f}
                className="font-body text-sm text-text-dim dark:text-dark-text-dim before:mr-2 before:text-primary before:content-['-'] dark:before:text-dark-primary"
              >
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.challenges && project.challenges.length > 0 && (
        <div className="mb-6">
          <p className="mb-2 flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-text-dim dark:text-dark-text-dim">
            <Lightbulb size={12} className="text-secondary dark:text-dark-secondary" /> Challenges
          </p>
          <ul className="space-y-1.5">
            {project.challenges.map((c) => (
              <li
                key={c}
                className="font-body text-sm text-text-dim dark:text-dark-text-dim before:mr-2 before:text-secondary before:content-['-'] dark:before:text-dark-secondary"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary via-accent to-secondary px-5 py-2.5 font-mono text-xs text-white dark:from-dark-primary dark:via-dark-accent dark:to-dark-secondary dark:text-dark-bg"
        >
          <Github size={13} /> Source ↗
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-mono text-xs text-text-primary hover:border-primary/60 dark:border-dark-border dark:text-dark-text-primary dark:hover:border-dark-primary/60"
          >
            <ExternalLink size={13} /> Live demo
          </a>
        )}
      </div>

      {project.timeline && (
        <p className="mt-5 flex items-center gap-1.5 font-mono text-[11px] text-text-muted dark:text-dark-text-muted">
          <Clock size={11} /> {project.timeline}
        </p>
      )}
    </>
  );
}

export default function Projects() {
  const { profile } = useProfile();
  const isPersonal = profile === "personal";
  const projects = isPersonal ? PROJECTS : BUSINESS_PROJECTS;
  const [filter, setFilter] = useState<"all" | Project["category"]>("all");
  const [openProject, setOpenProject] = useState<Project | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(projects.map((p) => p.category))),
    [projects],
  );
  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary dark:text-dark-primary">
            // projects
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-text-primary dark:text-dark-text-primary md:text-5xl">
            {isPersonal ? "What we've built" : "Our services"}
          </h2>
        </motion.div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {(["all", ...categories] as const).map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-3.5 py-1.5 font-mono text-[11px] transition-colors ${
                filter === c
                  ? "border-primary/50 bg-primary/10 text-primary dark:border-dark-primary/50 dark:bg-dark-primary/10 dark:text-dark-primary"
                  : "border-border text-text-dim hover:text-text-primary dark:border-dark-border dark:text-dark-text-dim dark:hover:text-dark-text-primary"
              }`}
            >
              {c === "all" ? "All" : CATEGORY_LABEL[c]}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} onOpen={() => setOpenProject(p)} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-xs text-text-dim dark:text-dark-text-dim">
            <a
              href="https://github.com/JaaiDead"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-primary dark:hover:text-dark-primary"
            >
              GitHub ↗
            </a>
            <a
              href="https://modrinth.com/user/JaaiDead"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-primary dark:hover:text-dark-primary"
            >
              Modrinth ↗
            </a>
            <a
              href="https://www.curseforge.com/members/jaaidead/projects"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-primary dark:hover:text-dark-primary"
            >
              CurseForge ↗
            </a>
          </div>
        </div>
      </div>

      <Dialog open={!!openProject} onOpenChange={(o) => !o && setOpenProject(null)}>
        <DialogContent>{openProject && <ProjectDetail project={openProject} />}</DialogContent>
      </Dialog>
    </section>
  );
}
