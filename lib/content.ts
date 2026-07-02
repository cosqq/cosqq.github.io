// ────────────────────────────────────────────────────────────────────────────
// CONTENT LOADER
// Reads every piece of site content from Markdown files in /content and turns
// it into typed data for the components. You never edit this file to change
// what the site says — you edit the Markdown in /content. See README.
// ────────────────────────────────────────────────────────────────────────────

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

// ── helpers ─────────────────────────────────────────────────────────────────

/** Read a single Markdown file → { frontmatter data, body }. */
function readFile(...segments: string[]) {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, ...segments), "utf8");
  return matter(raw);
}

/** Read every .md file in a folder, sorted by filename (use 1-, 2- prefixes). */
function readFolder(folder: string) {
  const dir = path.join(CONTENT_DIR, folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((f) => matter(fs.readFileSync(path.join(dir, f), "utf8")));
}

/** Split a Markdown body into paragraphs (blank-line separated). */
function paragraphs(body: string): string[] {
  return body
    .trim()
    .split(/\n\s*\n/)
    .map((p) => p.trim().replace(/\s*\n\s*/g, " "))
    .filter(Boolean);
}

/**
 * Split a body into a lead paragraph (summary) and bullet "- " lines
 * (highlights). Bullets may appear anywhere; everything else is the summary.
 */
function summaryAndBullets(body: string) {
  const highlights: string[] = [];
  const summaryLines: string[] = [];
  for (const line of body.split("\n")) {
    const bullet = line.match(/^\s*[-*]\s+(.*)$/);
    if (bullet) highlights.push(bullet[1].trim());
    else if (line.trim()) summaryLines.push(line.trim());
  }
  return { summary: summaryLines.join(" "), highlights };
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.map(String) : [];
}

// ── profile ───────────────────────────────────────────────────────────────

export type Profile = {
  name: string;
  title: string;
  tagline: string;
  location: string;
  focus: string[];
  intro: string;
  about: string[];
  links: {
    email: string;
    linkedin: string;
    github: string;
    twitter: string;
    website: string;
  };
  resumePdf: string;
};

export function getProfile(): Profile {
  const { data, content } = readFile("profile.md");
  const paras = paragraphs(content);
  return {
    name: data.name ?? "",
    title: data.title ?? "",
    tagline: data.tagline ?? "",
    location: data.location ?? "",
    focus: asStringArray(data.focus),
    intro: paras[0] ?? "",
    about: paras.slice(1),
    links: {
      email: data.email ?? "",
      linkedin: data.linkedin ?? "",
      github: data.github ?? "",
      twitter: data.twitter ?? "",
      website: data.website ?? "",
    },
    resumePdf: data.resumePdf ?? "",
  };
}

// ── experience ──────────────────────────────────────────────────────────────

export type Experience = {
  role: string;
  company: string;
  companyUrl?: string;
  start: string;
  end: string;
  location?: string;
  summary: string;
  highlights: string[];
  tech: string[];
};

export function getExperience(): Experience[] {
  return readFolder("experience").map(({ data, content }) => {
    const { summary, highlights } = summaryAndBullets(content);
    return {
      role: data.role ?? "",
      company: data.company ?? "",
      companyUrl: data.companyUrl || undefined,
      start: String(data.start ?? ""),
      end: String(data.end ?? ""),
      location: data.location || undefined,
      summary,
      highlights,
      tech: asStringArray(data.tech),
    };
  });
}

// ── education ─────────────────────────────────────────────────────────────

export type Education = {
  school: string;
  credential: string;
  start?: string;
  end?: string;
  note?: string;
};

export function getEducation(): Education[] {
  return readFolder("education").map(({ data, content }) => ({
    school: data.school ?? "",
    credential: data.credential ?? "",
    start: data.start != null ? String(data.start) : undefined,
    end: data.end != null ? String(data.end) : undefined,
    note: paragraphs(content).join(" ") || undefined,
  }));
}

// ── projects ─────────────────────────────────────────────────────────────

export type Project = {
  name: string;
  blurb: string;
  tech: string[];
  link?: string;
  repo?: string;
  featured?: boolean;
};

export function getProjects(): Project[] {
  return readFolder("projects").map(({ data, content }) => ({
    name: data.name ?? "",
    blurb: paragraphs(content).join(" "),
    tech: asStringArray(data.tech),
    link: data.link || undefined,
    repo: data.repo || undefined,
    featured: Boolean(data.featured),
  }));
}

// ── skills ──────────────────────────────────────────────────────────────────

export type Skill = { name: string; core: boolean };
export type SkillGroup = {
  category: string;
  items: Skill[];
};

/**
 * Parse skills.md: each "## Heading" is a group, each "- item" an entry.
 * Wrap an item in **double asterisks** to mark it a "core" (emphasized) skill.
 * Core items are sorted to the front of their group.
 */
export function getSkills(): SkillGroup[] {
  const { content } = readFile("skills.md");
  const groups: SkillGroup[] = [];
  let current: SkillGroup | null = null;
  for (const line of content.split("\n")) {
    const heading = line.match(/^#{2,3}\s+(.*)$/);
    const item = line.match(/^\s*[-*]\s+(.*)$/);
    if (heading) {
      current = { category: heading[1].trim(), items: [] };
      groups.push(current);
    } else if (item && current) {
      const raw = item[1].trim();
      const core = /^\*\*.*\*\*$/.test(raw);
      current.items.push({ name: raw.replace(/^\*\*|\*\*$/g, "").trim(), core });
    }
  }
  for (const g of groups) {
    g.items.sort((a, b) => Number(b.core) - Number(a.core));
  }
  return groups;
}
