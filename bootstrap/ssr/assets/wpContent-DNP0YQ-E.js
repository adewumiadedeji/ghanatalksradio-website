//#region resources/js/utils/wpContent.ts
/**
* Strips HTML tags and decodes common entities from WP's rendered fields.
* Used for meta descriptions and anywhere plain text is needed (WP's
* excerpt.rendered comes as HTML, e.g. "<p>...[&hellip;]</p>").
*/
function stripHtml(html) {
	return html.replace(/<[^>]*>/g, " ").replace(/&hellip;/g, "…").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/&#8217;/g, "'").replace(/&#8220;/g, "\"").replace(/&#8221;/g, "\"").replace(/\s+/g, " ").trim();
}
/** Truncates plain text to a max length on a word boundary, for meta descriptions. */
function truncate(text, maxLength = 160) {
	if (text.length <= maxLength) return text;
	const cut = text.slice(0, maxLength);
	const lastSpace = cut.lastIndexOf(" ");
	return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`;
}
/** Convenience: post excerpt as clean plain text, suitable for cards or meta description fallback. */
function getPlainExcerpt(post, maxLength = 160) {
	return truncate(stripHtml(post.excerpt.rendered), maxLength);
}
/** Convenience: post title as plain text (titles can contain entities too, e.g. &amp;). */
function getPlainTitle(post) {
	return stripHtml(post.title.rendered);
}
/**
* Picks the best-fit featured image URL for a given target width from the
* Tagdiv-generated responsive sizes (confirmed live: td_324x235, td_696x385,
* td_1068x580, full, etc.). Falls back to source_url if no sizes are present.
*/
function getFeaturedImageUrl(media, targetWidth = 696) {
	if (!media) return void 0;
	const sizes = media.media_details?.sizes;
	if (!sizes) return media.source_url;
	const candidates = Object.values(sizes).filter((s) => s.width > 0);
	if (candidates.length === 0) return media.source_url;
	const sorted = [...candidates].sort((a, b) => a.width - b.width);
	return (sorted.find((s) => s.width >= targetWidth) ?? sorted[sorted.length - 1]).source_url;
}
/** Pulls the featured media object out of a post's _embedded data, if present. */
function getFeaturedMedia(post) {
	return post._embedded?.["wp:featuredmedia"]?.[0];
}
/** Pulls the author's display name out of a post's _embedded data, if present. */
function getAuthorName(post) {
	return post._embedded?.author?.[0]?.name ?? "GhanaTalksRadio";
}
/**
* Resolves category names for a post from its _embedded wp:term data.
* wp:term is an array-of-arrays aligned to the post type's taxonomies
* (category, then post_tag for the `post` type) — confirmed on live data.
*/
function getEmbeddedCategories(post) {
	return (post._embedded?.["wp:term"]?.[0] ?? []).filter((t) => t.taxonomy === "category");
}
/** Formats a WP date string for display, e.g. "23 June 2026". */
function formatPostDate(dateString) {
	return new Date(dateString).toLocaleDateString("en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric"
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
var YOUTUBE_PATTERN = /(?:youtube(?:-nocookie)?\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
/** Returns the first YouTube video ID found in a post's rendered HTML, if any. */
function getYouTubeVideoId(html) {
	const match = html.match(YOUTUBE_PATTERN);
	return match ? match[1] : null;
}
/** YouTube's auto-generated thumbnail URL for a given video ID (no API call needed). */
function getYouTubeThumbnail(videoId) {
	return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}
//#endregion
export { getFeaturedMedia as a, getYouTubeThumbnail as c, getFeaturedImageUrl as i, getYouTubeVideoId as l, getAuthorName as n, getPlainExcerpt as o, getEmbeddedCategories as r, getPlainTitle as s, formatPostDate as t };
