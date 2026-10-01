import { _ as YouTubeIcon, d as SpotifyIcon, i as GooglePodcastsIcon, n as AppleIcon, t as AmazonIcon } from "./BrandIcons-DgSb_rol.js";
//#region resources/js/utils/PodcastPlatforms.ts
var PODCAST_PLATFORM_META = [
	{
		key: "spotify",
		label: "Spotify",
		Icon: SpotifyIcon,
		accent: "#1DB954"
	},
	{
		key: "apple",
		label: "Apple Podcasts",
		Icon: AppleIcon,
		accent: "#A35BFF"
	},
	{
		key: "youtube",
		label: "YouTube",
		Icon: YouTubeIcon,
		accent: "#FF0000"
	},
	{
		key: "amazon",
		label: "Amazon Music",
		Icon: AmazonIcon,
		accent: "#00A8E1"
	},
	{
		key: "google",
		label: "Google Podcasts",
		Icon: GooglePodcastsIcon,
		accent: "#4285F4"
	}
];
/** Returns only the platform entries that actually have a real link, in a fixed display order. */
function getAvailablePlatformLinks(external) {
	return PODCAST_PLATFORM_META.filter((meta) => Boolean(external[meta.key])).map((meta) => ({
		...meta,
		url: external[meta.key]
	}));
}
//#endregion
export { getAvailablePlatformLinks as t };
