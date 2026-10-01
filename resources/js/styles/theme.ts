/**
 * Design tokens for GhanaTalksRadio.
 *
 * Direction: confident, current, content-forward. Warm off-white (not
 * clinical white), near-black ink, a single saturated gold accent doing
 * most of the work, with green reserved specifically for "live radio"
 * states so it carries one consistent meaning across the whole site.
 *
 * Display face (Space Grotesk) carries personality on headlines; Inter
 * handles body copy at article length; JetBrains Mono is seasoning only —
 * timestamps, the ON AIR tag, category eyebrows.
 */
export const theme = {
  colors: {
    background: '#F2F5F9',
    backgroundAlt: '#E7EBF1',
    surface: '#FFFFFF',
    ink: '#15171C',
    inkMuted: '#5B5E68',
    inkFaint: '#8C8F99',
    border: '#E1E5EC',
    borderStrong: '#CDD3DD',

    gold: '#F2A900',
    goldDark: '#9C6300',
    goldTint: '#FDF1D6',

    live: '#1B6B4A',
    liveTint: '#E6F3EC',

    link: '#15171C',

    overlayScrim: 'rgba(21, 23, 28, 0.55)',
  },
  font: {
    display: `'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
    mono: `'JetBrains Mono', 'SF Mono', Menlo, monospace`,
    /** Editorial masthead/headline face for the redesigned Home page only -
     * everywhere else keeps `display` (Space Grotesk) unchanged. */
    serif: `'Source Serif 4', Georgia, 'Times New Roman', serif`,
  },
  radius: {
    sm: '8px',
    md: '16px',
    pill: '999px',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1100px',
    wide: '1320px',
  },
  maxWidth: '1440px',
  contentWidth: '760px',
  shadow: {
    sm: '0 1px 3px rgba(21, 23, 28, 0.06)',
    md: '0 8px 24px rgba(21, 23, 28, 0.08)',
  },
};

export type AppTheme = typeof theme;
