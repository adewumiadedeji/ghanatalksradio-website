import { o as __toESM } from "./rolldown-runtime-BMI-E3GI.js";
import { n as Tt, s as require_react, t as require_jsx_runtime } from "./jsx-runtime-BC7GUiKv.js";
import { t as Head_default } from "./index.esm-zJybEw0J.js";
import { t as Link } from "./Link-W-JB9btq.js";
import { n as GTR_AD_SLOTS, t as AdSlot } from "./AdSlot-CQVTHkAz.js";
import { o as InstagramIcon, r as FacebookIcon, s as LinkIcon, u as ShareTwitterIcon } from "./BrandIcons-DtHNkxVX.js";
import { n as CHANNEL_LINKS } from "./footerLinks-DqQSNlGQ.js";
import { a as getFeaturedMedia, i as getFeaturedImageUrl, n as getAuthorName, o as getPlainExcerpt, r as getEmbeddedCategories, s as getPlainTitle, t as formatPostDate } from "./wpContent-DNP0YQ-E.js";
import { t as SponsoredBanner } from "./SponsoredBanner-DmG_BriB.js";
import { t as PostContent } from "./PostContent-B2MFChge.js";
//#region resources/js/utils/ShareLinks.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* Share URL builders for the ShareBar component.
*
* Facebook and Twitter/X both have stable, documented web share-intent
* URLs that open a pre-filled share dialog. Instagram has NO equivalent —
* it doesn't support sharing an arbitrary link via a URL scheme on web by
* design (Instagram's sharing model is app-and-clipboard based, not
* link-based). Rather than fake a button that silently does nothing, the
* Instagram action here copies the link to the clipboard and tells the
* person to paste it into their Instagram bio/story/DM — the actual real
* workaround people use, instead of a dead link.
*/
function buildFacebookShareUrl(pageUrl) {
	return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
}
function buildTwitterShareUrl(pageUrl, text) {
	return `https://twitter.com/intent/tweet?${new URLSearchParams({
		url: pageUrl,
		text
	}).toString()}`;
}
/** Copies the current page URL to the clipboard. Returns whether it succeeded — clipboard access can be denied by browser permissions. */
async function copyLinkToClipboard(url) {
	try {
		await navigator.clipboard.writeText(url);
		return true;
	} catch {
		return false;
	}
}
//#endregion
//#region resources/js/components/ShareBar.tsx
var import_jsx_runtime = require_jsx_runtime();
var Wrap = Tt.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 1.1rem 1.4rem;
  margin: 1.75rem 0;
`;
var Group = Tt.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
`;
var Label = Tt.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin-right: 0.3rem;
`;
var IconButton = Tt.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.inkMuted};
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, transform 0.15s ease;
  position: relative;

  &:hover {
    transform: translateY(-1px);
  }
`;
var FacebookButton = Tt(IconButton)`
  &:hover {
    background: #1877f2;
    color: #fff;
  }
`;
var TwitterButton = Tt(IconButton)`
  &:hover {
    background: #000;
    color: #fff;
  }
`;
var InstagramButton = Tt(IconButton)`
  &:hover {
    background: linear-gradient(45deg, #f58529, #dd2a7b, #8134af, #515bd4);
    color: #fff;
  }
`;
var ChannelLink = Tt.a`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 0.9rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 0.78rem;
  font-weight: 700;
  background: ${({ theme }) => theme.colors.goldTint};
  color: ${({ theme }) => theme.colors.goldDark};
  transition: filter 0.15s ease;

  &:hover {
    text-decoration: none;
    filter: brightness(0.96);
  }
`;
var Toast = Tt.span`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.background};
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.3rem 0.6rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  white-space: nowrap;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  pointer-events: none;
  transition: opacity 0.15s ease;
`;
function openShareWindow(url) {
	window.open(url, "_blank", "noopener,noreferrer,width=600,height=500");
}
/**
* Social share + community-channel bar for article-style pages.
*
* Instagram has no web share-intent URL (unlike Facebook/Twitter) — its
* sharing model is app/clipboard-based by design, not link-based. Rather
* than a dead button, the Instagram action copies the link and shows a
* brief confirmation, matching the real workaround people already use to
* share a link "to Instagram" from a website (paste into bio/story/DM).
*/
function ShareBar({ url, title }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	async function handleInstagramClick() {
		if (await copyLinkToClipboard(url)) {
			setCopied(true);
			setTimeout(() => setCopied(false), 2e3);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Share" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FacebookButton, {
			type: "button",
			"aria-label": "Share on Facebook",
			onClick: () => openShareWindow(buildFacebookShareUrl(url)),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FacebookIcon, { size: 16 })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TwitterButton, {
			type: "button",
			"aria-label": "Share on Twitter",
			onClick: () => openShareWindow(buildTwitterShareUrl(url, title)),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareTwitterIcon, { size: 16 })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InstagramButton, {
			type: "button",
			"aria-label": "Copy link to share on Instagram",
			onClick: handleInstagramClick,
			children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkIcon, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstagramIcon, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast, {
				$visible: copied,
				role: "status",
				children: "Link copied!"
			})]
		})
	] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, { children: CHANNEL_LINKS.map(({ label, href, Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ChannelLink, {
		href,
		target: "_blank",
		rel: "noopener noreferrer",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 15 }),
			"Join on ",
			label.replace(" Channel", "")
		]
	}, label)) })] });
}
//#endregion
//#region resources/js/pages/SinglePost.tsx
var Article = Tt.article`
  max-width: ${({ theme }) => theme.contentWidth};
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 2rem clamp(1.25rem, 4vw, 3rem) 2.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    border-radius: ${({ theme }) => theme.radius.sm};
  }
`;
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
var Eyebrow = Tt(Link)`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDark};

  &:hover {
    text-decoration: underline;
  }
`;
var Title = Tt.h1`
  font-size: clamp(1.65rem, 4vw, 2.4rem);
  line-height: 1.2;
  margin: 0.6rem 0 1rem;
`;
var Meta = Tt.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin-bottom: 1.75rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;
var FeaturedImage = Tt.img`
  width: 100%;
  border-radius: ${({ theme }) => theme.radius.md};
  margin-bottom: 2rem;
`;
var StateBox = Tt.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.inkMuted};
  padding: 4rem 1.5rem;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.radius.md};
`;
/**
* Ported from the Vite SPA's src/pages/SinglePost.tsx. The post is
* resolved server-side (SinglePostController) instead of a react-query
* hook, and `window.location.href` (used for ShareBar/canonical in the
* original) is replaced with `url`, resolved from the request server-side
* since there's no `window` during SSR.
*/
function SinglePost({ post, url, banner }) {
	if (!post) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Article, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head_default, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: "Story not found | GhanaTalksRadio" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBox, {
		role: "alert",
		children: "This story doesn't exist or may have been removed."
	})] });
	const media = getFeaturedMedia(post);
	const imageUrl = getFeaturedImageUrl(media, 1024);
	const categories = getEmbeddedCategories(post);
	const title = getPlainTitle(post);
	const description = getPlainExcerpt(post);
	/**
	* NewsArticle structured data - this page had none at all before, which
	* puts it at a real disadvantage against Google News/Top Stories/Discover
	* surfaces (and, for a timely local-news query, against social posts)
	* for exactly the kind of "just happened" headline this page type exists
	* to serve. `.replace(/</g, ...)` guards the inlined JSON against a post
	* title/excerpt containing a literal `<\/script>` breaking out of the
	* script tag - WP post content is editorial input, not sanitized for
	* this context upstream.
	*/
	const articleJsonLd = JSON.stringify({
		"@context": "https://schema.org",
		"@type": "NewsArticle",
		headline: title,
		description,
		image: imageUrl ? [imageUrl] : void 0,
		datePublished: post.date_gmt,
		dateModified: post.modified_gmt,
		author: {
			"@type": "Person",
			name: getAuthorName(post)
		},
		publisher: {
			"@type": "Organization",
			name: "GhanaTalksRadio",
			logo: {
				"@type": "ImageObject",
				url: `${new URL(url).origin}/og-default.png`
			}
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": url
		}
	}).replace(/</g, "\\u003c");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Article, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Head_default, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: `${title} | GhanaTalksRadio` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
				name: "description",
				content: description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("link", {
				rel: "canonical",
				href: url
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
				property: "og:site_name",
				content: "GhanaTalksRadio"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
				property: "og:type",
				content: "article"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
				property: "og:title",
				content: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
				property: "og:description",
				content: description
			}),
			imageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
				property: "og:image",
				content: imageUrl
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
				property: "og:url",
				content: url
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
				property: "article:published_time",
				content: post.date_gmt
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
				name: "twitter:card",
				content: "summary_large_image"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
				name: "twitter:title",
				content: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
				name: "twitter:description",
				content: description
			}),
			imageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
				name: "twitter:image",
				content: imageUrl
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
				type: "application/ld+json",
				dangerouslySetInnerHTML: { __html: articleJsonLd }
			})
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {
			to: "/",
			children: "← Back to stories"
		}),
		categories[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, {
			to: `/category/${categories[0].slug}`,
			children: categories[0].name
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { children: title }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Meta, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: getAuthorName(post) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				children: "·"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPostDate(post.date) })
		] }),
		imageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedImage, {
			src: imageUrl,
			alt: media?.alt_text || title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostContent, { html: post.content.rendered }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareBar, {
			url,
			title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SponsoredBanner, { banner }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, {
			format: "in-article",
			slotId: GTR_AD_SLOTS.inArticle
		})
	] });
}
//#endregion
export { SinglePost, SinglePost as default };
