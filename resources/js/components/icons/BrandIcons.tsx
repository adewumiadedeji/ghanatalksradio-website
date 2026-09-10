/**
 * Minimal inline icon set for footer "Get the App" and "Follow Us" links.
 *
 * These are simple generic glyphs (an outlined apple, play triangle, etc.),
 * not reproductions of Apple/Google/Amazon/Huawei's actual trademarked
 * logo artwork. That keeps things visually clear without redistributing
 * brand marks we don't have a license for. If GhanaTalksRadio later wants
 * the official "Download on the App Store" / "Get it on Google Play" badge
 * graphics, those should come directly from Apple's and Google's brand
 * asset kits rather than being recreated here.
 */

type IconProps = { size?: number };

export function AppleIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.365 1.43c0 1.14-.448 2.067-1.067 2.745-.69.76-1.823 1.36-2.864 1.296-.099-1.078.428-2.144 1.04-2.764.696-.74 1.91-1.27 2.891-1.277zM20.4 17.06c-.516 1.18-.764 1.704-1.43 2.752-.93 1.46-2.243 3.27-3.87 3.29-1.45.02-1.825-.94-3.79-.93-1.965.01-2.38.95-3.83.93-1.626-.02-2.87-1.65-3.8-3.11C1.06 16.6.3 12.86 1.65 10.13c.94-1.9 2.6-3.1 4.4-3.13 1.5-.02 2.44 1.02 3.78 1.02 1.34 0 1.83-1.02 3.79-1.02 1.6 0 3.27.86 4.21 2.34-3.7 2.03-3.1 7.3.57 7.72z" />
    </svg>
  );
}

export function PlayStoreIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 2.5a1 1 0 0 0-.5.87v17.26a1 1 0 0 0 .5.87l9.6-9.5L4 2.5zm12.1 8.5-2.2 2.18 7.9-4.4a1 1 0 0 0 0-1.76l-7.9-4.4 2.2 2.18 3.7 3.7-3.7 2.5zM12.6 12 3 21.6l9.6-5.8L14.6 14l-2-2zm2-2L12.6 12l2-2 9.6-5.8L14.6 10z" />
    </svg>
  );
}

export function AmazonIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14.6 13.9c-.9.8-2.2 1.3-3.5 1.3-1.7 0-2.7-.9-2.7-2.2 0-1.7 1.6-2.6 4.5-2.9l1.7-.2v-.6c0-1.1-.4-1.6-1.6-1.6-1 0-1.7.4-1.9 1.3l-1.9-.2c.3-1.7 1.8-2.7 3.9-2.7 2.3 0 3.5 1 3.5 3.1v3.6c0 .6.1.8.6 1v.4c-.9.2-1.7.1-2.1-.4l-.5-.9zm-1.3-.9c.9 0 1.6-.5 1.6-1.5v-.9l-1.3.2c-1.4.2-2 .6-2 1.4 0 .6.5.8 1.2.8h.5zM4.5 18.5c2.3 1.6 5 2.5 7.8 2.5 2.6 0 5.3-.7 7.7-2.1.3-.2.6.1.4.4-2.1 1.9-5 3-8.1 3-2.9 0-5.9-1-8.1-2.9-.2-.2.1-.5.3-.3v.4zm15.8-.6c-.3-.4-2-.2-2.8-.1-.2 0-.3-.2-.1-.3.9-.6 2.5-.4 2.7-.2.3.3-.1 1.7-.5 2.4-.1.2-.3.1-.2-.1.1-.5.3-1.5.0-1.7z" />
    </svg>
  );
}

export function HuaweiIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7.5 14.5c1.2 1.6 3 2.6 4.5 2.6s3.3-1 4.5-2.6c-1.6.6-3 .9-4.5.9s-2.9-.3-4.5-.9zM12 6c-2.6 0-4.8 1.5-5.8 3.7.9-.5 1.9-.9 2.9-1.2C9.6 8 10.7 7.7 12 7.7s2.4.3 2.9.8c1 .3 2 .7 2.9 1.2C16.8 7.5 14.6 6 12 6z" />
    </svg>
  );
}

export function TvIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="5" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 18v3" strokeLinecap="round" />
    </svg>
  );
}

export function InstagramIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.2h2.4l.4-2.8h-2.8V9.1c0-.8.2-1.4 1.4-1.4h1.5V5.2c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.1H8v2.8h2.5V21h3z" />
    </svg>
  );
}

export function XIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 3.5h3.4l4 5.4 4.4-5.4h2.4l-5.8 7.1 6.2 8.4h-3.4l-4.4-5.9-4.8 5.9H3.2l6.2-7.6L4 3.5z" />
    </svg>
  );
}

export function TikTokIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14.5 3h2.3c.2 1.6 1.3 2.9 3.2 3.1v2.3c-1.2 0-2.3-.4-3.2-1v6.8c0 2.7-2.2 4.8-4.9 4.8S7 16.9 7 14.2s2.2-4.8 4.9-4.8c.3 0 .6 0 .9.1v2.4c-.3-.1-.6-.2-.9-.2-1.3 0-2.4 1.1-2.4 2.5s1.1 2.5 2.4 2.5 2.5-1.1 2.5-2.5V3z" />
    </svg>
  );
}

export function PinterestIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3a9 9 0 0 0-3.3 17.4c-.1-.8-.1-2 0-2.8l1.3-5.6s-.3-.7-.3-1.6c0-1.5.9-2.6 2-2.6.9 0 1.4.7 1.4 1.6 0 .9-.6 2.3-.9 3.6-.3 1 .5 1.9 1.6 1.9 1.9 0 3.2-2.4 3.2-5.3 0-2.2-1.5-3.8-4.2-3.8-3 0-4.9 2.2-4.9 4.7 0 .9.3 1.5.6 2 .2.2.2.3.1.5l-.3 1c-.1.3-.3.4-.6.3-1.3-.5-2-2-2-3.6 0-2.7 2.3-5.9 6.7-5.9 3.6 0 6 2.6 6 5.4 0 3.7-2.1 6.5-5.1 6.5-1 0-2-.5-2.3-1.2l-.6 2.5c-.2.8-.7 1.9-1.1 2.5A9 9 0 1 0 12 3z" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.9 1-.2.2-.3.2-.6.1-.9-.4-1.9-1-2.7-1.9-.6-.6-1.1-1.4-1.4-2-.1-.3 0-.4.1-.6l.4-.5c.1-.2.2-.4.1-.6-.1-.2-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.4-.2.3-.9 1-.9 2.4s1 2.8 1.2 3c.2.2 1.6 2.5 4 3.5 2 .9 2.5.8 2.9.7.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1l-.1-.1c-.1-.1-.2-.2-.5-.3z" />
      <path d="M20.5 3.5A10 10 0 0 0 3.9 16.2L3 21l4.9-1.3A10 10 0 1 0 20.5 3.5zm-8.5 17a8.3 8.3 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.4 8.4 0 1 1 19.7 12 8.4 8.4 0 0 1 12 20.5z" />
    </svg>
  );
}

export function TelegramIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6.8 11.9l9.6-3.7c.4-.2.8.1.6.6l-1.9 9c-.1.5-.4.6-.8.4l-2.6-1.9-1.3 1.2c-.1.1-.3.2-.5.2l.2-2.6 5-4.5c.2-.2 0-.3-.2-.1l-6.2 3.9-2.6-.8c-.5-.2-.5-.6.1-.7z" />
    </svg>
  );
}

export function ShareTwitterIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 3.5h3.4l4 5.4 4.4-5.4h2.4l-5.8 7.1 6.2 8.4h-3.4l-4.4-5.9-4.8 5.9H3.2l6.2-7.6L4 3.5z" />
    </svg>
  );
}

export function LinkIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M10 14a3.5 3.5 0 0 0 5 0l3-3a3.5 3.5 0 0 0-5-5l-1 1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 10a3.5 3.5 0 0 0-5 0l-3 3a3.5 3.5 0 0 0 5 5l1-1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SpotifyIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7.5 9.8c2.8-.8 6-.6 8.3.7M7.8 12.6c2.3-.6 4.9-.5 6.9.6M8.2 15.2c1.9-.5 3.9-.4 5.5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function YouTubeIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="4" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10.5 9.2v5.6l5-2.8-5-2.8z" />
    </svg>
  );
}

export function GooglePodcastsIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="4.5" y="3" width="3" height="8" rx="1.5" />
      <rect x="9.5" y="3" width="3" height="14" rx="1.5" />
      <rect x="14.5" y="3" width="3" height="18" rx="1.5" />
      <rect x="19.5" y="3" width="3" height="14" rx="1.5" />
    </svg>
  );
}