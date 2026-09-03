export interface Bio {
  name: string;
  role: string;
  location: string;
  tagline: string;
  shortBio: string;
  longBio: string;
  availabilityStatus: string;
  primarySkills: string[];
}

export interface NavLink {
  label: string;
  href: string;
  badge?: string;
  external?: boolean;
}

export type SkillCategoryType =
  | "AI & Automation"
  | "Backend"
  | "Frontend"
  | "Databases"
  | "Cloud & DevOps"
  | "APIs & Integrations"
  | "Tools & Platforms";

export interface Skill {
  name: string;
  category: SkillCategoryType;
  level?: "Expert" | "Advanced" | "Proficient";
  featured?: boolean;
  relatedProjects?: string[];
}

export interface SkillCategory {
  id: string;
  name: SkillCategoryType;
  description: string;
}

export type ProjectCategory =
  | "AI & Automation"
  | "Full-Stack SaaS"
  | "AI Integration"
  | "Full-Stack Application";

export type ProjectStatus =
  | "Production"
  | "Active Development"
  | "Completed Concept";

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription?: string;
  category: ProjectCategory;
  technologies: string[];
  highlights: string[];
  responsibilities?: string[];
  projectType: "SaaS Product" | "Client / Enterprise Solution" | "AI System" | "Community Platform";
  featured: boolean;
  status: ProjectStatus;
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
}

export interface ExperienceItem {
  role: string;
  focusArea: string;
  period?: string;
  summary: string;
  highlights: string[];
  technologies: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
  iconName: string;
}

export interface FocusPillar {
  title: string;
  description: string;
  iconName: string;
}
