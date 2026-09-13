export type ProfileMode = "personal" | "business";

export const NAV_LINKS = [
  { label: "home", href: "home" },
  { label: "projects", href: "projects" },
  { label: "skills", href: "skills" },
  { label: "experience", href: "experience" },
  { label: "modrinth", href: "modrinth" },
  { label: "contact", href: "contact" },
];

export const MODRINTH_USERNAME = "JaaiDead";
export const GITHUB_USERNAME = "JaaiDead";
const GMAIL_COMPOSE_BASE =
  "https://mail.google.com/mail/?view=cm&fs=1&to=arcticquests.dev%40gmail.com";

export function createGmailComposeUrl(
  subject = "Hello Jaai",
  body = "Hi Jaai,\n\nI'd like to talk about a project or collaboration.\n\nThanks!",
) {
  return `${GMAIL_COMPOSE_BASE}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const GMAIL_COMPOSE_URL = createGmailComposeUrl();

export const TAGLINE = {
  personal: "Developer & Modder",
  business: "Game Development · Custom Mods · Web Development",
};

export const STATS = [
  { value: 4, suffix: "+", label: "Years coding" },
  { value: 15, suffix: "+", label: "Projects contributed to" },
  { value: 60, suffix: "+", label: "GitHub repos" },
];

export const MOD_STATS = [
  { value: 111.7, suffix: "K", label: "Modrinth downloads" },
  { value: 11.3, suffix: "K", label: "CurseForge downloads" },
  { value: 12, suffix: "", label: "Published mods" },
];

// Skills grouped by category. Only verified experience is included.
export interface Skill {
  name: string;
  level: number; // 0-100
}

export const SKILL_CATEGORIES = ["Languages", "Frameworks", "Minecraft Modding", "Tools"] as const;
export type SkillCategory = (typeof SKILL_CATEGORIES)[number];

export const SKILLS_BY_CATEGORY: Record<SkillCategory, Skill[]> = {
  Languages: [
    { name: "Java", level: 90 },
    { name: "TypeScript", level: 70 },
    { name: "JavaScript", level: 82 },
    { name: "HTML / CSS", level: 85 },
  ],
  Frameworks: [
    { name: "React", level: 78 },
    { name: "Next.js", level: 45 },
    { name: "Tailwind CSS", level: 80 },
  ],
  "Minecraft Modding": [
    { name: "Fabric API", level: 88 },
    { name: "Forge", level: 55 },
    { name: "Mixin", level: 65 },
  ],
  Tools: [
    { name: "Git", level: 80 },
    { name: "VS Code", level: 85 },
    { name: "IntelliJ IDEA", level: 90 },
  ],
};

// ---- Experience timeline. Years are approximate, anchored to the "4+ years
// coding" stat above. Replace with exact dates and roles before publishing.
export interface ExperienceEntry {
  period: string;
  title: string;
  description: string;
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    period: "2022",
    title: "Started building",
    description:
      "Self-taught, starting with Java and shaping Minecraft worlds, which led to everything that followed.",
  },
  {
    period: "2023",
    title: "First mods shipped",
    description:
      "Published early Fabric mods and started learning the modding ecosystem in depth, from mixins to datagen.",
  },
  {
    period: "2024",
    title: "Founded ArcticQuests",
    description:
      "Turned modding and dev work into a small studio brand, supporting custom Minecraft mods, web apps, and open-source contributions.",
  },
  {
    period: "2025",
    title: "Fabric docs contributor",
    description:
      "Started contributing to FabricMC's official documentation to help new modders learn the ecosystem.",
  },
  {
    period: "Now",
    title: "Java + Python development",
    description:
      "Contributing to Minecraft projects with Java, while using Python for smaller tools and experiments.",
  },
];

export interface Project {
  title: string;
  desc: string;
  tags: string[];
  href: string;
  icon: string;
  featured?: boolean;
  category: "web" | "mod" | "oss";
  demo?: string;
  timeline?: string;
  features?: string[];
  challenges?: string[];
}

export const PROJECTS: Project[] = [
  {
    title: "dev-overflow",
    desc: "Too much code, not enough coffee. Our portfolio showcasing projects and open-source work.",
    tags: ["React", "TypeScript", "Tailwind"],
    href: "https://github.com/JaaiDead/dev-overflow",
    demo: "https://arcticquests.dev",
    icon: "Code2",
    featured: true,
    category: "web",
    timeline: "2025 - ongoing",
    features: [
      "Interactive project showcase with live GitHub + Modrinth data",
      "Personal/business profile modes",
      "Light/dark theme with zero flash-of-wrong-theme",
    ],
    challenges: [
      "Keeping the bundle lightweight while still feeling premium and animated",
      "Designing a component system that works for both a dev portfolio and a studio site",
    ],
  },
  {
    title: "SplashOminous",
    desc: "A creative Minecraft mod allowing players to splash ominous bottles onto entities and blocks.",
    tags: ["Java", "Fabric", "Minecraft"],
    href: "https://github.com/JaaiDead/SplashOminous",
    icon: "Sparkles",
    featured: true,
    category: "mod",
    features: ["Splash-bottle mechanics for the Ominous effect", "Fabric API integration"],
  },
  {
    title: "Fabric Docs Contributor",
    desc: "Contributing to FabricMC's official documentation to help new modders learn the ecosystem.",
    tags: ["Documentation", "Java", "Community"],
    href: "https://github.com/JaaiDead/fabric-docs",
    icon: "BookOpen",
    category: "oss",
  },
  {
    title: "Modrinth Profile",
    desc: "12 published projects with 111.7K downloads. Active author for 4 years.",
    tags: ["Portfolio", "Mods", "Community"],
    href: "https://modrinth.com/user/JaaiDead",
    icon: "Package",
    category: "mod",
  },
  {
    title: "CurseForge Profile",
    desc: "Author with 2 followers and 11.3K downloads.",
    tags: ["Portfolio", "Mods", "CurseForge"],
    href: "https://www.curseforge.com/members/jaaidead/projects",
    icon: "Zap",
    category: "mod",
  },
];

export const CONNECT = [
  { label: "GitHub", value: "JaaiDead", href: "https://github.com/JaaiDead" },
  {
    label: "Email",
    value: "arcticquests.dev@gmail.com",
    href: GMAIL_COMPOSE_URL,
  },
  { label: "Discord", value: "Jaai.", href: "https://discord.com/users/730700346069876776" },
  { label: "Modrinth", value: "JaaiDead", href: "https://modrinth.com/user/JaaiDead" },
  {
    label: "CurseForge",
    value: "JaaiDead",
    href: "https://www.curseforge.com/members/jaaidead/projects",
  },
];

// Business Profile Projects
export const BUSINESS_PROJECTS: Project[] = [
  {
    title: "ArcticQuests Studio",
    desc: "Professional game development and modding studio. Custom Minecraft modifications, web applications, and open-source solutions.",
    tags: ["Game Dev", "Web Dev", "Consulting"],
    href: "https://arcticquests.dev",
    icon: "Snowflake",
    featured: true,
    category: "web",
  },
  {
    title: "Custom Minecraft Mods",
    desc: "Bespoke Minecraft modifications tailored to your server or project needs. Fabric and Forge expertise.",
    tags: ["Java", "Minecraft", "Custom"],
    href: createGmailComposeUrl(
      "Custom Mod Inquiry",
      "Hi Jaai,\n\nI'd like to talk about a custom Minecraft mod.\n\nProject details:\n\nThanks!",
    ),
    icon: "Blocks",
    featured: true,
    category: "mod",
  },
  {
    title: "Web Development Services",
    desc: "Modern, responsive web applications built with React, TypeScript, and Tailwind. Fast, clean, and maintainable.",
    tags: ["React", "TypeScript", "Tailwind"],
    href: createGmailComposeUrl(
      "Web Development Inquiry",
      "Hi Jaai,\n\nI'd like to talk about a web development project.\n\nProject details:\n\nThanks!",
    ),
    icon: "Globe",
    category: "web",
  },
  {
    title: "Open Source Consulting",
    desc: "Help with open-source projects, documentation, community management, and contribution workflows.",
    tags: ["OSS", "Consulting", "Documentation"],
    href: createGmailComposeUrl(
      "Open Source Consulting",
      "Hi Jaai,\n\nI'd like to talk about open-source consulting.\n\nProject details:\n\nThanks!",
    ),
    icon: "Users",
    category: "oss",
  },
];
