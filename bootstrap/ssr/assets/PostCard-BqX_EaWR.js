import { r as Tt, t as require_jsx_runtime } from "./jsx-runtime-BjQWgNTJ.js";
import { t as Link } from "./Link-CrWePb0Y.js";
import { a as getFeaturedImageUrl, c as getPlainTitle, i as getEmbeddedCategories, o as getFeaturedMedia, s as getPlainExcerpt, t as formatPostDate } from "./wpContent-FS3Fyx5P.js";
//#region resources/js/components/PostCard.tsx
var import_jsx_runtime = require_jsx_runtime();
var Card = Tt.article`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;
  display: flex;
  flex-direction: ${({ $featured }) => $featured ? "column" : "row"};
  transition: box-shadow 0.18s ease, transform 0.18s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.md};
    transform: translateY(-1px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;
var Thumb = Tt(Link)`
  display: block;
  flex-shrink: 0;
  width: ${({ $featured }) => $featured ? "100%" : "148px"};
  aspect-ratio: ${({ $featured }) => $featured ? "16 / 9" : "1 / 1"};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.04);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    aspect-ratio: 16 / 9;
  }
`;
var Body = Tt.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 0;
  justify-content: center;
  padding: 1rem 1.1rem;
`;
var Eyebrow = Tt(Link)`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDark};
  width: fit-content;

  &:hover {
    text-decoration: underline;
  }
`;
var Title = Tt(Link)`
  font-family: ${({ theme }) => theme.font.display};
  font-size: ${({ $featured }) => $featured ? "1.7rem" : "1rem"};
  font-weight: ${({ $featured }) => $featured ? 700 : 600};
  line-height: ${({ $featured }) => $featured ? 1.22 : 1.35};
  color: ${({ theme }) => theme.colors.ink};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  &:hover {
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.colors.gold};
    text-decoration-thickness: 2px;
  }
`;
var Excerpt = Tt.p`
  font-size: 0.92rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0.1rem 0 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
var Meta = Tt.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin-top: 0.15rem;
`;
function PostCard({ post, variant = "default" }) {
	const featured = variant === "featured";
	const media = getFeaturedMedia(post);
	const imageUrl = getFeaturedImageUrl(media, featured ? 1024 : 320);
	const categories = getEmbeddedCategories(post);
	const postUrl = `/post/${post.slug}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		$featured: featured,
		children: [imageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, {
			to: postUrl,
			$featured: featured,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: imageUrl,
				alt: media?.alt_text || getPlainTitle(post),
				loading: "lazy"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Body, { children: [
			categories[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, {
				to: `/category/${categories[0].slug}`,
				children: categories[0].name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
				to: postUrl,
				$featured: featured,
				children: getPlainTitle(post)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Excerpt, { children: getPlainExcerpt(post) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, { children: formatPostDate(post.date) })
		] })]
	});
}
//#endregion
export { PostCard as t };
