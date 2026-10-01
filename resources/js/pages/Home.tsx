import { Head } from '@inertiajs/react';
import styled from 'styled-components';
import type { WPPost } from '../types/wordpress';
import { Link } from '../routing/Link';
import { HomeMasthead, NewsTicker, HomeHeroBlock, WeeklyStoriesSection, MultimediaDeskSection } from '../components/HomeEditorial';
import { PostCard } from '../components/PostCard';
import { CompactPostList } from '../components/CompactPostList';
import { PostRail } from '../components/PostRail';
import { PostGrid } from '../components/PostGrid';
import { AdSlot, GTR_AD_SLOTS } from '../components/AdSlot';
import { SponsoredBanner } from '../components/SponsoredBanner';
import { EngagementBannerStrip } from '../components/EngagementBannerStrip';
import type { EngagementBannerDto } from '../types/engagement';
import { VideoGrid } from '../components/VideoGrid';
import { YoutubeVideoGrid } from '../components/YoutubeVideoGrid';
import type { YoutubeVideoDto } from '../types/youtube';
import type { BannerDto } from '../types/advertising';
import type { PodcastEpisode } from '../types/podcast';
import type { PodcastProps } from './Podcast';
import { PodcastEpisodeList } from '../components/PodcastEpisodeList';
import { PodcastCard } from '../components/PodcastCard';

const YOUTUBE_TEASER_COUNT = 4;

interface HomeProps {
  banners?: BannerDto[];
  secondaryBanners?: BannerDto[];
  houseHorizontalBanners?: BannerDto[];
  houseVerticalBanners?: BannerDto[];
  houseSquareBanners?: BannerDto[];
  engagementBanners: EngagementBannerDto[];
  heroPosts: WPPost[];
  topGridPosts: WPPost[];
  trendingPosts: WPPost[];
  riverPosts: WPPost[];
  entertainmentPosts: WPPost[];
  sportsPosts: WPPost[];
  lifestylePosts: WPPost[];
  podcasts: PodcastProps;
  videoPosts: WPPost[];
  youtubeVideos: YoutubeVideoDto[];
  youtubeError: boolean;
}

const SectionHead = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 1.25rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.05rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  display: flex;
  align-items: center;
`;

const SectionAccent = styled.span`
  display: inline-block;
  width: 22px;
  height: 3px;
  background: ${({ theme }) => theme.colors.gold};
  margin-right: 0.6rem;
`;

/** Caps the secondary banner slot to a real 728x90 Leaderboard's own
    width, since SponsoredBanner itself now always fills 100% of whatever
    container it's placed in - the main hero slot above wants that
    full-bleed behavior, this one deliberately doesn't (a 728px-sized
    creative would render blurry stretched any wider). */
const SecondaryBannerWrap = styled.div`
  max-width: 728px;
  margin: 0 auto;
`;

const SeeAllLink = styled(Link)`
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.goldDark};
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
`;

/**
 * `min-width: 0` matters whenever this is placed as a grid/flex item (as
 * CategorySection now is, inside TopStoriesGrid alongside the Engagement
 * banner) - a grid/flex item's default min-width is `auto`, which means
 * "at least the min-content size of its descendants," not zero. PostRail's
 * cards use `flex: 0 0 220px` (explicitly non-shrinking), so their summed
 * width becomes this item's min-content floor - forcing the grid column
 * to that width regardless of its `1fr` track and breaking the mobile
 * single-column collapse entirely. Real bug found on a real mobile view.
 */
const Section = styled.section`
  margin: 2.5rem 0;
  min-width: 0;
`;

/**
 * Two-zone layout: a wide "Top Stories" grid alongside a narrow "Trending"
 * rail. On narrower viewports the trending rail drops below the grid
 * rather than squeezing into a useless sliver.
 */
const SplitZone = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

const TopStoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const TrendingPanel = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 1.25rem 1.4rem;
`;

/**
 * Resilient wrapper for a category-driven homepage section: only renders
 * if there are posts to show. An unconfirmed category slug simply produces
 * no section at all rather than an empty, broken-looking gap with a
 * heading and nothing under it.
 */
function CategorySection({
  title,
  categorySlug,
  seeAllHref,
  hasPosts,
  children,
}: {
  title: string;
  categorySlug: string;
  seeAllHref: string;
  hasPosts: boolean;
  children: React.ReactNode;
}) {
  if (!hasPosts) return null;

  return (
    <Section aria-label={title} data-category={categorySlug}>
      <SectionHead>
        <SectionTitle>
          <SectionAccent />
          {title}
        </SectionTitle>
        <SeeAllLink to={seeAllHref}>See all →</SeeAllLink>
      </SectionHead>
      {children}
    </Section>
  );
}

/**
 * Ported from the Vite SPA's src/pages/Home.tsx. Data now arrives as props
 * from HomeController (fetched server-side, during the Inertia/SSR render)
 * instead of via react-query hooks in the browser — same WordPress and
 * portal content, same layout, but crawlers now get it as real HTML on the
 * first response.
 */
export function Home({
  banners,
  secondaryBanners,
  houseHorizontalBanners,
  houseVerticalBanners,
  houseSquareBanners,
  engagementBanners,
  heroPosts,
  topGridPosts,
  trendingPosts,
  riverPosts,
  entertainmentPosts,
  sportsPosts,
  lifestylePosts,
  podcasts,
  videoPosts,
  youtubeVideos,
  youtubeError,
}: HomeProps) {

  return (
    <>
      <Head>
        <title>GhanaTalksRadio</title>
        <meta
          name="description"
          content="News, politics, music, lifestyle and entertainment for the youth voice in Ghana."
        />
      </Head>

      <HomeMasthead />
       <SponsoredBanner banners={banners} />
      <SecondaryBannerWrap>
        <SponsoredBanner banners={secondaryBanners} />
      </SecondaryBannerWrap>
      <NewsTicker posts={heroPosts} />
      <HomeHeroBlock
        heroPosts={heroPosts}
        mostRead={trendingPosts}
        subStories={heroPosts.slice(1, 4)}
        engagementBanners={engagementBanners}
      />


      <AdSlot format="leaderboard" slotId={GTR_AD_SLOTS.vertical} />
      {/* GTR's own internal-program promotion (web_house_horizontal) -
          shape-matched to this full-width strip position, distinct from
          the advertiser AdSlot right above it. */}
      <SponsoredBanner banners={houseHorizontalBanners} />

      <SectionHead>
        <SectionTitle>
          <SectionAccent />
          Top Stories
        </SectionTitle>
      </SectionHead>

      <SplitZone>
        <TopStoriesGrid>
          {topGridPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </TopStoriesGrid>

        <TrendingPanel>
          <SectionTitle style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}>Trending</SectionTitle>
          <CompactPostList posts={trendingPosts} isLoading={false} />
          {/* web_house_vertical - a 300x600 shape fits this narrow
              sidebar column naturally, right where the equivalent
              advertiser Half Page size would go. */}
          <SponsoredBanner banners={houseVerticalBanners} />
        </TrendingPanel>
      </SplitZone>

      <CategorySection
        title="Entertainment"
        categorySlug="entertainment"
        seeAllHref="/category/entertainment"
        hasPosts={entertainmentPosts.length > 0}
      >
        <PostRail posts={entertainmentPosts} isLoading={false} />
      </CategorySection>

      {/* web_house_square - a compact 250x250/150x150 shape as its own
          centered breathing-room slot between sections, rather than
          forced into a grid/sidebar it wasn't sized for. */}
      <SponsoredBanner banners={houseSquareBanners} />

      <WeeklyStoriesSection
        title="Sports"
        subtitle="The scores, signings and storylines from the pitches, courts and tracks this week."
        posts={sportsPosts}
      />

      <CategorySection
        title="Lifestyle"
        categorySlug="lifestyle"
        seeAllHref="/category/lifestyle"
        hasPosts={lifestylePosts.length > 0}
      >
        <PostGrid posts={lifestylePosts} isLoading={false} columns={4} />
      </CategorySection>

      <CategorySection
        title="Podcasts"
        categorySlug="podcasts"
        seeAllHref="/podcast"
        hasPosts={podcasts.episodes.length > 0}
      >
        <PodcastCard episodes={podcasts.episodes} isLoading={false} isError={false} />
      </CategorySection>

      {videoPosts.length > 0 && (
        <Section>
          <SectionHead>
            <SectionTitle>
              <SectionAccent />
              Playlist
            </SectionTitle>
            <SeeAllLink to="/playlist">See all →</SeeAllLink>
          </SectionHead>
          <VideoGrid posts={videoPosts} isLoading={false} isError={false} />
        </Section>
      )}

      {youtubeVideos.length > 0 && !youtubeError && (
        <Section>
          <SectionHead>
            <SectionTitle>
              <SectionAccent />
              Videos
            </SectionTitle>
            <SeeAllLink to="/videos">See all →</SeeAllLink>
          </SectionHead>
          <YoutubeVideoGrid
            videos={youtubeVideos.slice(0, YOUTUBE_TEASER_COUNT)}
            isLoading={false}
            isError={youtubeError}
          />
        </Section>
      )}

      <MultimediaDeskSection posts={riverPosts} trending={trendingPosts} />
    </>
  );
}

// Inertia's page resolver reads `module.default` (see
// resolveComponent in @inertiajs/react) - falling back to the whole
// module object if there's no default export, which is not a valid
// React component type. Every page component needs this.
export default Home;
