import type { ComponentType, SVGProps } from "react";
import {
  DashboardIcon,
  LearnIcon,
  PracticeIcon,
  DsaIcon,
  RoadmapIcon,
  NotesIcon,
  ResourcesIcon,
  SettingsIcon,
} from "@/components/icons";

export type NavItem = {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Optional count of "due" items (rendered as a signal badge). */
  badge?: number;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: DashboardIcon },
  { href: "/learn", label: "Learn", icon: LearnIcon },
  { href: "/practice", label: "Practice", icon: PracticeIcon },
  { href: "/dsa", label: "DSA Log", icon: DsaIcon },
  { href: "/roadmap", label: "Roadmap", icon: RoadmapIcon },
  { href: "/notes", label: "Notes", icon: NotesIcon },
  { href: "/resources", label: "Resources", icon: ResourcesIcon },
  { href: "/settings", label: "Settings", icon: SettingsIcon },
];
