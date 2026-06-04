import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** Shared base: 16px line icon, 1.5 stroke, currentColor. No emoji anywhere (per DESIGN.md). */
function Base({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const SunIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="8" cy="8" r="3" />
    <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.4 1.4M11.6 11.6 13 13M3 13l1.4-1.4M11.6 4.4 13 3" />
  </Base>
);

export const MoonIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M13.5 9.3A5.5 5.5 0 1 1 6.7 2.5 4.5 4.5 0 0 0 13.5 9.3z" />
  </Base>
);

export const DashboardIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="2.4" y="2.4" width="4.6" height="4.6" rx="1" />
    <rect x="9" y="2.4" width="4.6" height="4.6" rx="1" />
    <rect x="2.4" y="9" width="4.6" height="4.6" rx="1" />
    <rect x="9" y="9" width="4.6" height="4.6" rx="1" />
  </Base>
);

export const LearnIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M8 4.4C6.8 3.5 5 3.2 3 3.4v8.2c2-.2 3.8.1 5 1 1.2-.9 3-1.2 5-1V3.4c-2-.2-3.8.1-5 1z" />
    <path d="M8 4.4v8.2" />
  </Base>
);

export const PracticeIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="2.6" y="5.4" width="9.4" height="7.4" rx="1.5" />
    <path d="M5 5.4V4.6A1.6 1.6 0 0 1 6.6 3h6A1.6 1.6 0 0 1 14.2 4.6v6A1.6 1.6 0 0 1 12.6 12.2" />
  </Base>
);

export const DsaIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 4.8 2.8 8 6 11.2" />
    <path d="M10 4.8 13.2 8 10 11.2" />
  </Base>
);

export const RoadmapIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 2.8 2.4 4.4v8.8L6 11.6l4 1.6 3.6-1.6V2.8L10 4.4 6 2.8z" />
    <path d="M6 2.8v8.8M10 4.4v8.8" />
  </Base>
);

export const NotesIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.4" y="2.4" width="9.2" height="11.2" rx="1.6" />
    <path d="M5.8 5.8h4.4M5.8 8h4.4M5.8 10.2h2.6" />
  </Base>
);

export const ResourcesIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6.6 9.4 9.4 6.6" />
    <path d="M7.2 4.6 8.2 3.6a2.4 2.4 0 0 1 3.4 3.4l-1 1" />
    <path d="M8.8 11.4l-1 1a2.4 2.4 0 0 1-3.4-3.4l1-1" />
  </Base>
);

export const SettingsIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="8" cy="8" r="2.1" />
    <path d="M8 1.6v1.7M8 12.7v1.7M2.3 4.7l1.5.85M12.2 10.45l1.5.85M2.3 11.3l1.5-.85M12.2 5.55l1.5-.85" />
  </Base>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 8h10M9 4l4 4-4 4" />
  </Base>
);

export const CheckIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
  </Base>
);

export const PanelLeftIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="2.5" y="3" width="11" height="10" rx="1.6" />
    <path d="M6.4 3v10" />
  </Base>
);

export const ChevronLeftIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M9.5 4 5.5 8l4 4" />
  </Base>
);

export const PlayIcon = (p: IconProps) => (
  <Base {...p}>
    <path
      d="M5 3.6 12.6 8 5 12.4z"
      fill="currentColor"
      strokeWidth={1.4}
      strokeLinejoin="round"
    />
  </Base>
);

export const PauseIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="5" y="3.5" width="2" height="9" rx="0.8" fill="currentColor" stroke="none" />
    <rect x="9" y="3.5" width="2" height="9" rx="0.8" fill="currentColor" stroke="none" />
  </Base>
);

export const ResetIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3.2 8a4.8 4.8 0 1 0 1.4-3.4" />
    <path d="M3 3.6V7h3.4" />
  </Base>
);

export const CloseIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 4l8 8M12 4l-8 8" />
  </Base>
);
