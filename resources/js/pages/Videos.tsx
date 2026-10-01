import { useEffect, useMemo, useState } from 'react';
import { Head, router } from '@inertiajs/react';
import styled from 'styled-components';
import type { YoutubeVideoDto } from '../types/youtube';
import type { BannerDto } from '../types/advertising';
import type { EngagementBannerDto } from '../types/engagement';
import { FeaturedVideoPanel } from '../components/FeaturedVideoPanel';
import { VideoCarousel } from '../components/VideoCarousel';
import { VodSection } from '../components/VodSection';
import { AdSlot, GTR_AD_SLOTS } from '../components/AdSlot';
import { getVideoStreamStatus, getCurrentScheduledPlaylistItem, type VideoStreamStatus } from '../api/streaming';

// Same cadence as WatchToggle/RadioPlayer/VodSection's own independent
// polls of this same endpoint - this app has no real-time broadcast
// client wired up anywhere, so every "is X live right now" signal here
// deliberately polls rather than subscribes, and each consumer polls
// independently rather than sharing state (see VodSection.tsx's own
// identical comment). This page needs its own copy of that signal
// because VodSection tracks live status entirely internally and has no
// props - Header/the VOD Section below it need to know before VodSection
// itself ever renders anything.
const STATUS_POLL_MS = 15000;

interface VideosProps {
  liveVideos: YoutubeVideoDto[];
  videos: YoutubeVideoDto[];
  nextPageToken: string | null;
  isError: boolean;
  /** web_video-placement advertiser banners for VodSection's right-column carousel, shown only while a viewer has joined the live stream - see VideoAdsSidebar. */
  videoBanners: BannerDto[];
  /** GhanaTalksRadio's own feature cross-promotion banners, merged into the same carousel. */
  engagementBanners: EngagementBannerDto[];
}

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Eyebrow = styled.div`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDark};
  margin-bottom: 0.4rem;
`;

const Title = styled.h1`
  font-size: clamp(1.6rem, 4vw, 2.1rem);
  margin-bottom: 0.4rem;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 0.95rem;
  margin: 0;
`;

const Section = styled.section`
  margin: 2.5rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 1.05rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
`;

const SectionAccent = styled.span`
  display: inline-block;
  width: 22px;
  height: 3px;
  background: ${({ theme }) => theme.colors.gold};
  margin-right: 0.6rem;
`;

const ErrorNotice = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 0.9rem;
  padding: 1rem 0;
`;

/**
 * Redesigned per a BBC News-style video hub reference: a large featured
 * video with an "Explore More" sidebar, plus a horizontal "In case you
 * missed it" carousel below - adapted to GhanaTalksRadio's own gold/warm
 * design system rather than a literal reskin. Replaces the previous
 * Live Now + Recent Videos grid layout.
 *
 * The live broadcast (if any) is always the default featured video;
 * otherwise the newest upload is. Selecting anything from the sidebar or
 * carousel swaps it into the featured slot, same as clicking a "watch
 * next" item on any video platform.
 *
 * YouTube's own page_token cursor (opaque, not a real page number) is
 * handled via Inertia's merge-prop support (VideosController marks
 * `videos` with Inertia::merge()) - the carousel's trailing "Load more"
 * card re-visits this route with the next token and the new batch is
 * appended automatically.
 */
export function Videos({ liveVideos, videos, nextPageToken, isError, videoBanners, engagementBanners }: VideosProps) {
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<YoutubeVideoDto | null>(null);
  const [studioStatus, setStudioStatus] = useState<VideoStreamStatus | null>(null);

  // Studio's own broadcast (VodSection's live hero), not YouTube's - the
  // Header/"Live & On Demand" Section below are hidden entirely when this
  // is false, per direct product feedback that they read as broken
  // (an eyebrow/title plus a VOD section usually just saying "No videos
  // available yet") whenever nothing was actually live.
  useEffect(() => {
    let cancelled = false;
    const poll = () => {
      getVideoStreamStatus()
        .then((result) => {
          if (!cancelled) setStudioStatus(result);
        })
        .catch(() => {
          // Best-effort - defaults to hidden (not live) on failure, same
          // fail-safe posture as every other consumer of this endpoint.
        });
    };
    poll();
    const handle = setInterval(poll, STATUS_POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(handle);
    };
  }, []);
  const isStudioLive = Boolean(studioStatus?.video_live && studioStatus.hls_url);

  // A scheduled video playlist "airing" is real, deliberately-curated
  // content too - not just the live studio broadcast - so it must ALSO
  // count as a reason to show this section, or a staff-scheduled block
  // would be invisible on this page for its entire duration whenever the
  // studio itself isn't separately live. Same independent-poll pattern as
  // studioStatus above, for the same "VodSection has no props" reason.
  const [hasScheduledVideo, setHasScheduledVideo] = useState(false);
  useEffect(() => {
    let cancelled = false;
    const poll = () => {
      getCurrentScheduledPlaylistItem()
        .then((result) => {
          if (!cancelled) setHasScheduledVideo(Boolean(result));
        })
        .catch(() => {
          // Best-effort - defaults to false (not shown for this reason) on failure.
        });
    };
    poll();
    const handle = setInterval(poll, STATUS_POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(handle);
    };
  }, []);

  const liveIds = useMemo(() => new Set(liveVideos.map((v) => v.videoId)), [liveVideos]);
  const recentVideos = useMemo(() => videos.filter((v) => !liveIds.has(v.videoId)), [videos, liveIds]);

  const defaultFeatured = liveVideos[0] ?? recentVideos[0] ?? null;
  const featured = selectedVideo ?? defaultFeatured;
  const isFeaturedLive = featured !== null && liveIds.has(featured.videoId);

  const remaining = useMemo(
    () => [...liveVideos, ...recentVideos].filter((v) => v.videoId !== featured?.videoId),
    [liveVideos, recentVideos, featured]
  );
  const sidebarVideos = remaining.slice(0, 8);
  const carouselVideos = remaining.slice(4);

  function handleSelectVideo(video: YoutubeVideoDto) {
    setSelectedVideo(video);
  }

  function handleLoadMore() {
    if (!nextPageToken) return;
    setLoadingMore(true);
    router.get(
      '/videos',
      { page_token: nextPageToken },
      {
        preserveState: true,
        preserveScroll: true,
        only: ['videos', 'nextPageToken', 'isError'],
        onFinish: () => setLoadingMore(false),
      }
    );
  }

  return (
    <>
      <Head>
        <title>Videos | GhanaTalksRadio</title>
        <meta
          name="description"
          content="Watch GhanaTalksRadio live on YouTube, plus recent uploads — news, music and talk."
        />
      </Head>
    
      {(isStudioLive || hasScheduledVideo) && (
        <>
          <Header>
            <Eyebrow>Watch</Eyebrow>
            <Title>Videos</Title>
            <Subtitle>Live broadcasts and recent uploads from the GhanaTalksRadio YouTube channel.</Subtitle>
          </Header>

          <Section>
            <SectionTitle>
              <SectionAccent />
              Live &amp; On Demand
            </SectionTitle>
            <VodSection banners={videoBanners} engagementBanners={engagementBanners} />
          </Section>
        </>
      )}

      {isError && <ErrorNotice>Videos are temporarily unavailable — please check back soon.</ErrorNotice>}

      {featured && (
        <Section>
          <SectionTitle>
            <SectionAccent />
            What you have missed
          </SectionTitle>
          <FeaturedVideoPanel
            featured={featured}
            isLive={isFeaturedLive}
            sidebarVideos={sidebarVideos}
            onSelectSidebarVideo={handleSelectVideo}
          />
        </Section>
      )}

      {carouselVideos.length > 0 && (
        <Section>
          <SectionTitle>
            <SectionAccent />
            In Case You Missed It
          </SectionTitle>
          <VideoCarousel
            videos={carouselVideos}
            onSelectVideo={handleSelectVideo}
            onLoadMore={handleLoadMore}
            loadingMore={loadingMore}
            hasMore={!isError && Boolean(nextPageToken)}
          />
        </Section>
      )}

      <AdSlot format="leaderboard" slotId={GTR_AD_SLOTS.horizontal} />
    </>
  );
}

export default Videos;
