import type { ComponentType } from 'react';
import {
  SpotifyIcon,
  AppleIcon,
  YouTubeIcon,
  AmazonIcon,
  GooglePodcastsIcon,
} from '../components/icons/BrandIcons';
import type { PodcastExternalLinks } from '../types/podcast';

export interface PlatformLinkMeta {
  key: keyof PodcastExternalLinks;
  label: string;
  Icon: ComponentType<{ size?: number }>;
  /** Brand-ish accent used on hover only — kept subtle elsewhere to match the rest of the site's restrained accent use. */
  accent: string;
}

export const PODCAST_PLATFORM_META: PlatformLinkMeta[] = [
  { key: 'spotify', label: 'Spotify', Icon: SpotifyIcon, accent: '#1DB954' },
  { key: 'apple', label: 'Apple Podcasts', Icon: AppleIcon, accent: '#A35BFF' },
  { key: 'youtube', label: 'YouTube', Icon: YouTubeIcon, accent: '#FF0000' },
  { key: 'amazon', label: 'Amazon Music', Icon: AmazonIcon, accent: '#00A8E1' },
  { key: 'google', label: 'Google Podcasts', Icon: GooglePodcastsIcon, accent: '#4285F4' },
];

/** Returns only the platform entries that actually have a real link, in a fixed display order. */
export function getAvailablePlatformLinks(external: PodcastExternalLinks): Array<PlatformLinkMeta & { url: string }> {
  return PODCAST_PLATFORM_META.filter((meta) => Boolean(external[meta.key])).map((meta) => ({
    ...meta,
    url: external[meta.key] as string,
  }));
}