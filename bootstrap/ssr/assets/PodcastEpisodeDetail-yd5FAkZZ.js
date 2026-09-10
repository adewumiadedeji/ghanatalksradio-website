import { n as Tt, t as require_jsx_runtime } from "./jsx-runtime-BC7GUiKv.js";
import { t as Head_default } from "./index.esm-zJybEw0J.js";
import { t as Link } from "./Link-W-JB9btq.js";
import { t as EpisodePlayer } from "./RadioPlayer-Ql1Jw-7m.js";
import { n as GTR_AD_SLOTS, t as AdSlot } from "./AdSlot-CQVTHkAz.js";
import { t as SponsoredBanner } from "./SponsoredBanner-DmG_BriB.js";
import { n as formatEpisodeTimeRange, t as formatEpisodeDate } from "./podcastContent-Bn_AzXYj.js";
import { t as getAvailablePlatformLinks } from "./PodcastPlatforms-CpaGAbup.js";
//#region resources/js/pages/PodcastEpisodeDetail.tsx
var import_jsx_runtime = require_jsx_runtime();
var BackLink = Tt(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin-bottom: 1.5rem;

  &:hover {
    color: ${({ theme }) => theme.colors.ink};
  }
`;
var Hero = Tt.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 1.75rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 1.75rem;
  margin-bottom: 1.75rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;
var Artwork = Tt.div`
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  aspect-ratio: 1 / 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 220px;
  }
`;
var HeroBody = Tt.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
`;
var ShowEyebrow = Tt(Link)`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDark};
  width: fit-content;

  &:hover {
    text-decoration: underline;
  }
`;
var Title = Tt.h1`
  font-size: clamp(1.4rem, 3.2vw, 1.9rem);
  line-height: 1.25;
  margin: 0;
`;
var MetaRow = Tt.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  flex-wrap: wrap;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.76rem;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin: 0.2rem 0 0.5rem;
`;
var UnavailableNote = Tt.span`
  font-size: 0.85rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors.inkFaint};
`;
var Section = Tt.section`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 1.75rem;
  margin-bottom: 1.5rem;
`;
var SectionHeading = Tt.h2`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin: 0 0 1rem;
`;
var Description = Tt.p`
  font-size: 1rem;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.ink};
  margin: 0;
  white-space: pre-line;
`;
var PlatformGrid = Tt.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.75rem;
`;
var PlatformLink = Tt.a`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 1rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.ink};
  transition: border-color 0.15s ease, color 0.15s ease, transform 0.15s ease;

  svg {
    flex-shrink: 0;
  }

  &:hover {
    text-decoration: none;
    border-color: ${({ $accent }) => $accent};
    color: ${({ $accent }) => $accent};
    transform: translateY(-1px);
  }
`;
var StateBox = Tt.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.inkMuted};
  padding: 4rem 1.5rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;
/**
* Ported from the Vite SPA's src/pages/PodcastEpisodeDetail.tsx. Episode
* resolved server-side (PodcastEpisodeDetailController), a real 404 when
* missing. Uses EpisodePlayer from PodcastAudioPlayer.tsx (the extracted,
* non-live-stream subset of the SPA's RadioPlayer.tsx).
*/
function PodcastEpisodeDetail({ episode, banner }) {
	if (!episode) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head_default, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: "Episode not found | GhanaTalksRadio" }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {
			to: "/podcast",
			children: "← Back to Podcast"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBox, {
			role: "alert",
			children: "This episode doesn't exist or may have been removed."
		})
	] });
	const timeRange = formatEpisodeTimeRange(episode.startDate, episode.endDate);
	const platformLinks = getAvailablePlatformLinks(episode.show.external);
	const description = episode.description.slice(0, 160) || `${episode.show.name} on GhanaTalksRadio`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Head_default, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: `${episode.title} | GhanaTalksRadio` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
				name: "description",
				content: description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
				property: "og:type",
				content: "article"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
				property: "og:title",
				content: episode.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
				property: "og:description",
				content: description
			})
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {
			to: "/podcast",
			children: "← Back to Podcast"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Hero, { children: [episode.show.imageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Artwork, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: episode.show.imageUrl,
			alt: episode.show.name
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HeroBody, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShowEyebrow, {
				to: `/podcast/${episode.show.slug}`,
				children: episode.show.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { children: episode.title }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MetaRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatEpisodeDate(episode.startDate) }), timeRange && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				children: "·"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: timeRange })] })] }),
			episode.audioUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EpisodePlayer, {
				audioUrl: episode.audioUrl,
				title: episode.title,
				id: `episode-${episode.id}`,
				artist: episode.show.name,
				artwork: episode.show.imageUrl
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnavailableNote, { children: "Audio isn't available for this episode." })
		] })] }),
		episode.description && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, { children: "About this episode" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, { children: episode.description })] }),
		platformLinks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, { children: "Listen on" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlatformGrid, { children: platformLinks.map(({ key, label, Icon, accent, url }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PlatformLink, {
			href: url,
			target: "_blank",
			rel: "noopener noreferrer",
			$accent: accent,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 20 }), label]
		}, key)) })] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SponsoredBanner, { banner }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, {
			format: "in-article",
			slotId: GTR_AD_SLOTS.inArticle
		})
	] });
}
//#endregion
export { PodcastEpisodeDetail, PodcastEpisodeDetail as default };
