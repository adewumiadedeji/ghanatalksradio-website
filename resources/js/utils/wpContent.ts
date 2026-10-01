import type { WPPost, WPFeaturedMedia } from '../types/wordpress';

/**
 * Strips HTML tags and decodes common entities from WP's rendered fields.
 * Used for meta descriptions and anywhere plain text is needed (WP's
 * excerpt.rendered comes as HTML, e.g. "<p>...[&hellip;]</p>").
 */
export function stripHtml(html: string): string {
  const withoutTags = html.replace(/<[^>]*>/g, ' ');
  return withoutTags
    .replace(/&hellip;/g, '…')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Truncates plain text to a max length on a word boundary, for meta descriptions. */
export function truncate(text: string, maxLength = 160): string {
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`;
}

/** Convenience: post excerpt as clean plain text, suitable for cards or meta description fallback. */
export function getPlainExcerpt(post: WPPost, maxLength = 160): string {
  return truncate(stripHtml(post.excerpt.rendered), maxLength);
}

/** Convenience: post title as plain text (titles can contain entities too, e.g. &amp;). */
export function getPlainTitle(post: WPPost): string {
  return stripHtml(post.title.rendered);
}

/**
 * Picks the best-fit featured image URL for a given target width from the
 * Tagdiv-generated responsive sizes (confirmed live: td_324x235, td_696x385,
 * td_1068x580, full, etc.). Falls back to source_url if no sizes are present.
 */
export function getFeaturedImageUrl(
  media: WPFeaturedMedia | undefined,
  targetWidth: number = 696
): string | undefined {
  if (!media) return undefined;

  const sizes = media.media_details?.sizes;
  if (!sizes) return media.source_url;

  const candidates = Object.values(sizes).filter((s) => s.width > 0);
  if (candidates.length === 0) return media.source_url;

  // Smallest size that's still >= target, otherwise the largest available.
  const sorted = [...candidates].sort((a, b) => a.width - b.width);
  const fit = sorted.find((s) => s.width >= targetWidth);
  return (fit ?? sorted[sorted.length - 1]).source_url;
}

/** Pulls the featured media object out of a post's _embedded data, if present. */
export function getFeaturedMedia(post: WPPost): WPFeaturedMedia | undefined {
  return post._embedded?.['wp:featuredmedia']?.[0];
}

/** Pulls the author's display name out of a post's _embedded data, if present. */
export function getAuthorName(post: WPPost): string {
  return post._embedded?.author?.[0]?.name ?? 'GhanaTalksRadio';
}

/** Author's Gravatar avatar, if present - WordPress's own `avatar_urls` map (keyed by pixel size). No per-author "job title" exists in this data, so callers show name only, not an invented role. */
export function getAuthorAvatarUrl(post: WPPost, size = 96): string | undefined {
  const avatars = post._embedded?.author?.[0]?.avatar_urls;
  if (!avatars) return undefined;
  return avatars[String(size)] ?? Object.values(avatars)[0];
}

/**
 * Resolves category names for a post from its _embedded wp:term data.
 * wp:term is an array-of-arrays aligned to the post type's taxonomies
 * (category, then post_tag for the `post` type) — confirmed on live data.
 */
export function getEmbeddedCategories(post: WPPost) {
  const terms = post._embedded?.['wp:term']?.[0] ?? [];
  return terms.filter((t) => t.taxonomy === 'category');
}

export function getEmbeddedTags(post: WPPost) {
  const terms = post._embedded?.['wp:term']?.[1] ?? [];
  return terms.filter((t) => t.taxonomy === 'post_tag');
}

/**
 * Formats a WP date string for display, e.g. "23 June 2026". Empty
 * string, `undefined`, or otherwise unparseable input renders as '' -
 * `new Date('').toLocaleDateString()` otherwise returns the literal text
 * "Invalid Date", which has shown up in production (a VOD DTO without a
 * real published_at, e.g. the scheduled-playlist hero's placeholder
 * value - see VodSection.tsx's own comment on scheduledVodDto).
 */
export function formatPostDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return '';

  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Matches youtube.com/embed/<id>, youtube.com/watch?v=<id>, and youtu.be/<id>
 * inside raw post HTML. Confirmed live posts embed YouTube via a standard
 * <iframe src="https://www.youtube.com/embed/VIDEO_ID?..."> block (WP's
 * core YouTube oEmbed block), so the embed form is the one that matters
 * most, but watch/short links are matched too in case a post links out
 * rather than embeds.
 */
const YOUTUBE_PATTERN =
  /(?:youtube(?:-nocookie)?\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

/** Returns the first YouTube video ID found in a post's rendered HTML, if any. */
export function getYouTubeVideoId(html: string): string | null {
  const match = html.match(YOUTUBE_PATTERN);
  return match ? match[1] : null;
}

/** True if this post's content contains a YouTube embed — used to identify "watchable" posts for the video/playlist views. */
export function hasYouTubeEmbed(post: WPPost): boolean {
  return getYouTubeVideoId(post.content.rendered) !== null;
}

/** YouTube's auto-generated thumbnail URL for a given video ID (no API call needed). */
export function getYouTubeThumbnail(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}
