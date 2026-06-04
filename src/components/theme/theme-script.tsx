import { DEFAULT_THEME, THEME_STORAGE_KEY } from "@/lib/theme";

/**
 * Runs synchronously before first paint to set `<html data-theme>` from
 * localStorage, preventing a flash of the wrong theme. Kept tiny and
 * dependency-free on purpose. Rendered as the first node inside <body>.
 */
export function ThemeScript() {
  const js = `(function(){try{var k=${JSON.stringify(
    THEME_STORAGE_KEY,
  )};var t=localStorage.getItem(k);if(t!=="light"&&t!=="dark"){t=${JSON.stringify(
    DEFAULT_THEME,
  )};}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme=${JSON.stringify(
    DEFAULT_THEME,
  )};}})();`;

  return <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: js }} />;
}
