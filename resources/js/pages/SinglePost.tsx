import { Head } from '@inertiajs/react';
import styled from 'styled-components';
import type { WPPost } from '../types/wordpress';
import { Link } from '../routing/Link';
import { PostContent } from '../components/PostContent';
import { ShareBar } from '../components/ShareBar';
import { AdSlot, GTR_AD_SLOTS } from '../components/AdSlot';
import { SponsoredBanner } from '../components/SponsoredBanner';
import type { BannerDto } from '../types/advertising';
import {
  getAuthorName,
  getEmbeddedCategories,
  getFeaturedImageUrl,
  getFeaturedMedia,
  getPlainExcerpt,
  getPlainTitle,
  formatPostDate,
} from '../utils/wpContent';

interface SinglePostProps {
  post: WPPost | null;
  /** Absolute URL of this page, resolved server-side (Request::url()) - no `window` during SSR. */
  url: string;
  banners?: BannerDto[];
}

const Article = styled.article`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 2rem clamp(1.25rem, 4vw, 3rem) 2.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    border-radius: ${({ theme }) => theme.radius.sm};
  }
`;

/**
 * Everything readable (headline, byline, both the featured image and any
 * images inside the body, paragraphs, share bar, ads) lives at ONE
 * consistent width - Article above stays as wide as the header only for
 * its background/card, never for content directly. Mixing a wide
 * featured image with a narrower body column was the actual bug reported
 * live: it read as "only the banner got wider," not a real fix.
 */
const ArticleInner = styled.div`
  // max-width: ${({ theme }) => theme.contentWidth};
  margin: 0 auto;
`;

const BackLink = styled(Link)`
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

const Eyebrow = styled(Link)`
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

const Title = styled.h1`
  font-size: clamp(1.65rem, 4vw, 2.4rem);
  line-height: 1.2;
  margin: 0.6rem 0 1rem;
`;

const Meta = styled.div`
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

const FeaturedImage = styled.img`
  width: 100%;
  border-radius: ${({ theme }) => theme.radius.md};
  margin-bottom: 2rem;
`;

const StateBox = styled.div`
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
export function SinglePost({ post, url, banners }: SinglePostProps) {
  if (!post) {
    return (
      <Article>
        <Head>
          <title>Story not found | GhanaTalksRadio</title>
        </Head>
        <ArticleInner>
          <StateBox role="alert">This story doesn't exist or may have been removed.</StateBox>
        </ArticleInner>
      </Article>
    );
  }

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
   * title/excerpt containing a literal `</script>` breaking out of the
   * script tag - WP post content is editorial input, not sanitized for
   * this context upstream.
   */
  const articleJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    description,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: post.date_gmt,
    dateModified: post.modified_gmt,
    author: { '@type': 'Person', name: getAuthorName(post) },
    publisher: {
      '@type': 'Organization',
      name: 'GhanaTalksRadio',
      logo: { '@type': 'ImageObject', url: `${new URL(url).origin}/og-default.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }).replace(/</g, '\\u003c');

  return (
    <Article>
      <Head>
        {/* title/description/canonical/og:site_name/og:title/og:description/og:image/og:url/
            twitter:* are deliberately NOT declared here - app.blade.php already renders all of
            them unconditionally via PageMeta::set()/canonicalUrl() (same values: SinglePostController
            now calls PageMeta::truncatedTitle(), the same length-aware logic pageTitle below used
            to compute client-side only). A duplicate declaration here isn't just redundant: the
            blade-rendered tag is what crawlers actually read (confirmed live - Bing's URL
            Inspection flagged "Title too long" because it was reading app.blade.php's unconditionally-
            suffixed title, not this component's length-aware pageTitle, which never won), and
            Google's documented behavior for a duplicate rel=canonical - even an identical one - is to
            distrust the site's signal entirely and pick a canonical algorithmically instead. Only
            og:type (blade always says "website", not "article") and article:published_time have no
            blade equivalent and stay here. */}
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date_gmt} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleJsonLd }} />
      </Head>

      <ArticleInner>
        <BackLink to="/">← Back to stories</BackLink>

        {categories[0] && (
          <Eyebrow to={`/category/${categories[0].slug}`}>{categories[0].name}</Eyebrow>
        )}
        <Title>{title}</Title>
        <Meta>
          <span>{getAuthorName(post)}</span>
          <span aria-hidden="true">·</span>
          <span>{formatPostDate(post.date)}</span>
        </Meta>

        {imageUrl && <FeaturedImage src={imageUrl} alt={media?.alt_text || title} />}

        <PostContent html={post.content.rendered} />

        <ShareBar url={url} title={title} />

        <SponsoredBanner banners={banners} />
        <AdSlot format="in-article" slotId={GTR_AD_SLOTS.inArticle} />
      </ArticleInner>
    </Article>
  );
}

export default SinglePost;
