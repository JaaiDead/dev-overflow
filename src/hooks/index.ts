import { useState, useEffect, useRef } from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(1, doc.scrollTop / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

export interface ModrinthProject {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon_url: string | null;
  downloads: number;
  followers: number;
  categories: string[];
  project_type: string;
}

interface ModrinthState {
  projects: ModrinthProject[];
  status: "loading" | "ok" | "error";
}

export function useModrinthProjects(username: string) {
  const [state, setState] = useState<ModrinthState>({ projects: [], status: "loading" });

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    setState({ projects: [], status: "loading" });

    fetch(`https://api.modrinth.com/v2/user/${username}/projects`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Modrinth API responded ${res.status}`);
        return res.json() as Promise<ModrinthProject[]>;
      })
      .then((data) => {
        if (cancelled) return;
        const sorted = data
          .filter((project) => project.project_type !== "modpack")
          .sort((a, b) => b.downloads - a.downloads);
        setState({ projects: sorted, status: "ok" });
      })
      .catch((err: unknown) => {
        if (cancelled || (err instanceof DOMException && err.name === "AbortError")) return;
        setState({ projects: [], status: "error" });
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [username]);

  return state;
}

export interface GithubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
}

interface GithubReposState {
  repos: GithubRepo[];
  status: "loading" | "ok" | "error";
}

export function useGithubRepos(username: string, limit = 6) {
  const [state, setState] = useState<GithubReposState>({ repos: [], status: "loading" });

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    setState({ repos: [], status: "loading" });

    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);
        return res.json() as Promise<GithubRepo[]>;
      })
      .then((data) => {
        if (cancelled) return;
        const filtered = data.filter((r) => !r.fork).slice(0, limit);
        setState({ repos: filtered, status: "ok" });
      })
      .catch((err: unknown) => {
        if (cancelled || (err instanceof DOMException && err.name === "AbortError")) return;
        setState({ repos: [], status: "error" });
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [username, limit]);

  return state;
}

export function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}
