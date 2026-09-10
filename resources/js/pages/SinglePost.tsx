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
  banner: BannerDto | null;
}

const Article = styled.article`
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
export function SinglePost({ post, url, banner }: SinglePostProps) {
  if (!post) {
    return (
      <Article>
        <Head>
          <title>Story not found | GhanaTalksRadio</title>
        </Head>
        <StateBox role="alert">This story doesn't exist or may have been removed.</StateBox>
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
        <title>{`${title} | GhanaTalksRadio`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:site_name" content="GhanaTalksRadio" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {imageUrl && <meta property="og:image" content={imageUrl} />}
        <meta property="og:url" content={url} />
        <meta property="article:published_time" content={post.date_gmt} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {imageUrl && <meta name="twitter:image" content={imageUrl} />}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleJsonLd }} />
      </Head>

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

      <SponsoredBanner banner={banner} />
      <AdSlot format="in-article" slotId={GTR_AD_SLOTS.inArticle} />
    </Article>
  );
}

export default SinglePost;
