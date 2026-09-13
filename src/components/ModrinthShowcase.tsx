import { motion } from "framer-motion";
import { AlertTriangle, Download, ExternalLink, Package, Users } from "lucide-react";
import { MODRINTH_USERNAME } from "../data";
import { useModrinthProjects } from "../hooks";

const numberFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export default function ModrinthShowcase() {
  const { projects, status } = useModrinthProjects(MODRINTH_USERNAME);

  return (
    <section id="modrinth" className="relative px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary dark:text-dark-primary">
            // modrinth
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-text-primary dark:text-dark-text-primary md:text-5xl">
            Minecraft projects
          </h2>
          <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-text-dim dark:text-dark-text-dim">
            Projects I contribute to with their teams on Modrinth and CurseForge. These are team
            efforts, not solo releases.
          </p>
        </motion.div>

        {status === "loading" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="glass h-48 animate-pulse rounded-2xl" />
            ))}
          </div>
        )}

        {status === "error" && (
          <div className="glass flex flex-col items-center gap-3 rounded-2xl p-8 text-center">
            <AlertTriangle size={18} className="text-text-dim dark:text-dark-text-dim" />
            <p className="font-mono text-xs text-text-dim dark:text-dark-text-dim">
              Couldn&apos;t reach the Modrinth API right now.
            </p>
            <a
              href={`https://modrinth.com/user/${MODRINTH_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-primary hover:underline dark:text-dark-primary"
            >
              view profile on Modrinth ↗
            </a>
          </div>
        )}

        {status === "ok" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 6).map((project, index) => (
              <motion.a
                key={project.id}
                href={`https://modrinth.com/${project.project_type}/${project.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic="true"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass group flex min-h-48 flex-col rounded-2xl p-5 transition-shadow hover:shadow-glow-primary"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {project.icon_url ? (
                      <img
                        src={`/images/projects/${project.slug}.webp`}
                        alt={`${project.title} icon`}
                        className="h-11 w-11 rounded-xl object-cover"
                        width="44"
                        height="44"
                        loading="lazy"
                        decoding="async"
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src = "/favicon.svg";
                        }}
                      />
                    ) : (
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-2 dark:bg-dark-surface-2">
                        <Package size={19} className="text-primary dark:text-dark-primary" />
                      </div>
                    )}
                    <h3 className="font-mono text-sm text-text-primary transition-colors group-hover:text-primary dark:text-dark-text-primary dark:group-hover:text-dark-primary">
                      {project.title}
                    </h3>
                  </div>
                  <ExternalLink
                    size={13}
                    className="mt-1 flex-shrink-0 text-text-dim dark:text-dark-text-dim"
                  />
                </div>
                <p className="mb-5 flex-1 font-body text-xs leading-relaxed text-text-dim dark:text-dark-text-dim">
                  {project.description}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] text-text-muted dark:text-dark-text-muted">
                  <span className="flex items-center gap-1">
                    <Download size={11} /> {numberFormatter.format(project.downloads)} downloads
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={11} /> {numberFormatter.format(project.followers)} followers
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <div className="glass inline-flex max-w-full flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-full px-5 py-3 font-mono text-xs text-text-dim dark:text-dark-text-dim">
            <a
              href={`https://modrinth.com/user/${MODRINTH_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-primary dark:hover:text-dark-primary"
            >
              Modrinth ↗
            </a>
            <a
              href="https://github.com/JaaiDead"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-primary dark:hover:text-dark-primary"
            >
              GitHub ↗
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
    </section>
  );
}
