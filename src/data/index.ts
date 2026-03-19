export type ProfileMode = 'personal' | 'business'

export const NAV_LINKS = [
  { label: 'home', href: 'home' },
  { label: 'about', href: 'about' },
  { label: 'projects', href: 'projects' },
  { label: 'contact', href: 'contact' },
]

// Personal Profile Data
export const ROLES = ['Developer', 'Minecraft Modder', 'Open Sourcerer', 'Chess Player']

// Business Profile Data
export const BUSINESS_ROLES = ['Game Development', 'Custom Mods', 'Web Development', 'Open Source Solutions']

export const SKILLS = [
  { name: 'Java',       level: 90, cat: 'lang' },
  { name: 'JavaScript', level: 82, cat: 'lang' },
  { name: 'HTML / CSS', level: 85, cat: 'lang' },
  { name: 'React',      level: 75, cat: 'fw' },
  { name: 'Next.js',    level: 40, cat: 'learning' },
  { name: 'TypeScript', level: 45, cat: 'learning' },
  { name: 'Git',        level: 80, cat: 'tool' },
  { name: 'VS Code',    level: 85, cat: 'tool' },
  {name: 'IntelliJ',    level: 90, cat: 'tool' },
]

export const STATS = [
  { value: 3,   suffix: '+', label: 'Years coding' },
  { value: 15,  suffix: '+', label: 'Projects shipped' },
  { value: 60,  suffix: '+', label: 'GitHub repos' },
]

export interface Project {
  title: string
  desc: string
  tags: string[]
  href: string
  img: string
  featured?: boolean
}

export const PROJECTS: Project[] = [
  {
    title: 'dev-overflow',
    desc: 'Too much code, not enough coffee. My personal portfolio showcasing projects and open-source work.',
    tags: ['React', 'TypeScript', 'Tailwind'],
    href: 'https://github.com/JaaiDead/dev-overflow',
    img: 'https://via.placeholder.com/400x300/10B981/FFFFFF?text=Portfolio',
    featured: true,
  },
  {
    title: 'SplashOminous',
    desc: 'A creative Minecraft mod allowing players to splash ominous bottles. 5 stars on GitHub!',
    tags: ['Java', 'Fabric', 'Minecraft'],
    href: 'https://github.com/JaaiDead/SplashOminous',
    img: 'https://via.placeholder.com/400x300/8B5CF6/FFFFFF?text=Minecraft+Mod',
    featured: true,
  },
  {
    title: 'Marvel-Refabricated',
    desc: 'A Minecraft mod bringing Marvel superpowers to the Fabric modloader. 2 stars and counting!',
    tags: ['Java', 'Fabric', 'Gaming'],
    href: 'https://github.com/JaaiDead/Marvel-Refabricated',
    img: 'https://via.placeholder.com/400x300/EC4899/FFFFFF?text=Marvel+Mod',
  },
  {
    title: 'PerfectParity Neo',
    desc: 'Bug reporting page for PerfectParity mod. Active community management and issue tracking.',
    tags: ['Community', 'Bug Tracking', 'Open Source'],
    href: 'https://github.com/JaaiDead/PerfectParityNeos',
    img: 'https://via.placeholder.com/400x300/06B6D4/FFFFFF?text=Bug+Tracker',
  },
  {
    title: 'Fabric Docs Contributor',
    desc: 'Contributing to FabricMC\'s official documentation to help new modders learn the ecosystem.',
    tags: ['Documentation', 'Java', 'Community'],
    href: 'https://github.com/JaaiDead/fabric-docs',
    img: 'https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=Documentation',
  },
  {
    title: 'Modrinth Profile',
    desc: 'Collection of published and maintained mods on Modrinth, reaching thousands of downloads.',
    tags: ['Portfolio', 'Mods', 'Community'],
    href: 'https://modrinth.com/user/JaaiDead',
    img: 'https://via.placeholder.com/400x300/10B981/FFFFFF?text=Modrinth',
  },
]

export const CONNECT = [
  { label: 'GitHub',   value: 'JaaiDead',                      href: 'https://github.com/JaaiDead' },
  { label: 'Email',    value: 'arcticquests.dev@gmail.com',    href: 'mailto:arcticquests.dev@gmail.com' },
  { label: 'Discord',  value: 'Jaai.',                         href: 'https://discord.com/users/730700346069876776' },
  { label: 'Modrinth', value: 'JaaiDead',                      href: 'https://modrinth.com/user/JaaiDead' },
]

// Business Profile Projects
export const BUSINESS_PROJECTS: Project[] = [
  {
    title: 'ArcticQuests Studio',
    desc: 'Professional game development and modding studio. Custom Minecraft modifications, web applications, and open-source solutions.',
    tags: ['Game Dev', 'Web Dev', 'Consulting'],
    href: 'https://arcticquests.dev',
    img: 'https://via.placeholder.com/400x300/10B981/FFFFFF?text=ArcticQuests',
    featured: true,
  },
  {
    title: 'Custom Minecraft Mods',
    desc: 'Bespoke Minecraft modifications tailored to your server or project needs. Fabric and Forge expertise.',
    tags: ['Java', 'Minecraft', 'Custom'],
    href: 'mailto:arcticquests.dev@gmail.com?subject=Custom%20Mod%20Inquiry',
    img: 'https://via.placeholder.com/400x300/8B5CF6/FFFFFF?text=Custom+Mods',
    featured: true,
  },
  {
    title: 'Web Development Services',
    desc: 'Modern, responsive web applications built with React, TypeScript, and Tailwind. Fast, clean, and maintainable.',
    tags: ['React', 'TypeScript', 'Tailwind'],
    href: 'mailto:arcticquests.dev@gmail.com?subject=Web%20Dev%20Inquiry',
    img: 'https://via.placeholder.com/400x300/06B6D4/FFFFFF?text=Web+Dev',
  },
  {
    title: 'Open Source Consulting',
    desc: 'Help with open-source projects, documentation, community management, and contribution workflows.',
    tags: ['OSS', 'Consulting', 'Documentation'],
    href: 'mailto:arcticquests.dev@gmail.com?subject=OSS%20Consulting',
    img: 'https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=Consulting',
  },
]
