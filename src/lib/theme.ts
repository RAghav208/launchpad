export type Theme = "light" | "dark";

/** localStorage key for the persisted theme (mirrors profiles.theme once auth lands). */
export const THEME_STORAGE_KEY = "launchpad-theme";

/** Dark is the signature look for the "Quiet Tool" direction. */
export const DEFAULT_THEME: Theme = "dark";
