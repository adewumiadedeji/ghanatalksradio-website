import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  getVodVideos,
  getVodVideo,
  toggleVodLike,
  getVodComments,
  postVodComment,
  type VodVideoDto,
  type VodVideoDetailDto,
  type VodCommentDto,
} from '../api/streaming';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { useFloatingVideo } from '../context/FloatingVideoContext';
import { getDeviceId } from '../utils/deviceId';
import { formatPostDate, getYouTubeVideoId } from '../utils/wpContent';
import { AdSlot, GTR_AD_SLOTS } from './AdSlot';
import { VideoAdsSidebar } from './VideoAdsSidebar';
import type { BannerDto } from '../types/advertising';
import type { EngagementBannerDto } from '../types/engagement';

// A staff member can paste any video URL into a video-playlist item (see
// VideoPlaylistForm::createVideoForItem() in the portal) - `video_url`
// isn't guaranteed to be a direct media file a native <video> element can
// decode. A YouTube link is the one case actually seen in practice, so
// that's what's detected and embedded via an iframe instead; anything
// else still assumes a direct file, same as before.
declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let youtubeApiPromise: Promise<void> | null = null;

/** Loads the YouTube IFrame Player API script at most once per page - a second call while it's already loading/loaded resolves from the same shared promise. */
function loadYoutubeIframeApi(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();
  if (youtubeApiPromise) return youtubeApiPromise;

  youtubeApiPromise = new Promise((resolve) => {
    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousCallback?.();
      resolve();
    };
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(script);
  });

  return youtubeApiPromise;
}

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
`;

// Two-column layout for the hero card + its right-column ad carousel -
// same grid ratio/breakpoint as FeaturedVideoPanel's own `Panel` further
// down this page, reused here for visual consistency. `$withSidebar`
// collapses to a single column (no gap) when false - VideoAdsSidebar is
// simply not rendered in that case (see the `isJoinedLive` gate at the
// render site below), so VOD/scheduled playback and the pre-join
// "Join Live" state keep the existing full-width hero layout unchanged
// without duplicating the whole HeroCard JSX tree in two branches.
const LiveWithAdsPanel = styled.div<{ $withSidebar: boolean }>`
  display: grid;
  grid-template-columns: ${({ $withSidebar }) => ($withSidebar ? '2fr 1fr' : '1fr')};
  gap: ${({ $withSidebar }) => ($withSidebar ? '1.75rem' : '0')};
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

const HeroCard = styled.article`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.md};
  overflow: hidden;
`;

const ThumbWrap = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  background: ${({ theme }) => theme.colors.ink};
  overflow: hidden;
`;

const Thumb = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ThumbPlaceholder = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.ink}, #2a2d36);
`;

/** YT.Player mounts its own iframe into this div - see loadYoutubeIframeApi(). */
const YoutubePlayerHost = styled.div`
  width: 100%;
  height: 100%;

  iframe {
    display: block;
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const YoutubeFrame = styled.iframe`
  display: block;
  width: 100%;
  height: 100%;
  border: none;
`;

const LiveBadge = styled.span`
  position: absolute;
  top: 0.85rem;
  left: 0.85rem;
  /* Must paint above FloatingVideoPlayer's OverlayHost, a position:fixed
     sibling elsewhere in the tree that visually sits at this exact spot
     when docked (see that file's own docblock) - z-index: 1 was enough
     back when the <video> was a plain DOM sibling here, but a fixed
     element needs a real numeric gap over OverlayHost's own (deliberately
     low, 2) docked z-index to reliably stack above it regardless of DOM
     order. */
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background: ${({ theme }) => theme.colors.live};
  color: #fff;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.35rem 0.65rem;
  border-radius: ${({ theme }) => theme.radius.sm};

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #fff;
    animation: ${pulse} 1.6s ease-in-out infinite;
  }
`;

const UnmuteBadge = styled.button`
  position: absolute;
  bottom: 0.85rem;
  right: 0.85rem;
  /* See LiveBadge's own comment on why this needs to be a real gap above
     OverlayHost's docked z-index (2), not just above the old z-index: 1
     it used to only need to beat. */
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border: none;
  background: rgba(21, 23, 28, 0.72);
  color: #fff;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  padding: 0.45rem 0.75rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: rgba(21, 23, 28, 0.88);
  }
`;

const JoinLiveButton = styled.button`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  /* See LiveBadge's own comment - must clear OverlayHost's docked z-index. */
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  border: none;
  background: rgba(21, 23, 28, 0.28);
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: rgba(21, 23, 28, 0.42);
  }
`;

const JoinLivePill = styled.span`
  /* Explicitly stacked above the absolutely-positioned ThumbPlaceholder
     sibling - without this, the pill (an in-flow flex item) paints
     *below* the abs-positioned placeholder in every browser tested and
     is invisible despite being technically present/accessible in the DOM. */
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.ink};
  font-weight: 700;
  font-size: 0.95rem;
  padding: 0.75rem 1.5rem;
  border-radius: ${({ theme }) => theme.radius.pill};
`;

const PlayBadge = styled.button`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  /* See LiveBadge's own comment - must clear OverlayHost's docked z-index. */
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: rgba(21, 23, 28, 0.18);
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: rgba(21, 23, 28, 0.32);
  }
`;

const PlayCircle = styled.span`
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.94);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadow.md};
  transition: transform 0.15s ease;

  ${PlayBadge}:hover & {
    transform: scale(1.08);
  }
`;

const HeroBody = styled.div`
  padding: 1.25rem 1.5rem 1.5rem;
`;

const HeroTitle = styled.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.15rem, 2.4vw, 1.5rem);
  font-weight: 700;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.ink};
  margin: 0 0 0.5rem;
`;

const HeroMetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const HeroMeta = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.inkFaint};
`;

const EngagementRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const LikeButton = styled.button<{ $liked: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border: 1px solid ${({ theme, $liked }) => ($liked ? theme.colors.gold : theme.colors.border)};
  background: ${({ theme, $liked }) => ($liked ? theme.colors.goldTint : 'transparent')};
  color: ${({ theme, $liked }) => ($liked ? theme.colors.goldDark : theme.colors.inkMuted)};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.4rem 0.85rem;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

const CommentsToggleBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.inkMuted};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.4rem 0.85rem;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
`;

const CommentsBox = styled.div`
  margin-top: 1.25rem;
  padding-top: 1.1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

const CommentRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const CommentTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const CommentAuthor = styled.span`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.ink};
`;

const CommentBody = styled.p`
  margin: 0;
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.25rem;
`;

const CommentInputRow = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const TextField = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 0.55rem 0.75rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.ink};
`;

const SubmitButton = styled.button`
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 0.55rem 1.1rem;
  font-size: 0.85rem;
  font-weight: 700;
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  white-space: nowrap;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

const EmptyNote = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin: 0;
`;

const GridTitle = styled.h3`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin: 1.75rem 0 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CardButton = styled.button`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  cursor: pointer;
  text-align: left;
  padding: 0;
  font-family: inherit;
  transition: border-color 0.15s ease, transform 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.gold};
    transform: translateY(-2px);
  }
`;

const CardThumbWrap = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  background: ${({ theme }) => theme.colors.ink};
`;

const CardThumb = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardDuration = styled.span`
  position: absolute;
  bottom: 0.4rem;
  right: 0.4rem;
  background: rgba(15, 17, 22, 0.78);
  color: #fff;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.68rem;
  font-weight: 600;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
`;

const CardBody = styled.div`
  padding: 0.85rem 0.95rem 1rem;
`;

const CardTitle = styled.span`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-family: ${({ theme }) => theme.font.display};
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.ink};
  margin-bottom: 0.4rem;
`;

const CardMeta = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.inkFaint};
`;

function PlayGlyph({ size = 22 }: { size?: number }) {
  return (
    <svg width={size * 0.7} height={size} viewBox="0 0 18 20" fill="#fff" aria-hidden="true">
      <path d="M0 0L18 10L0 20V0Z" />
    </svg>
  );
}

function MutedGlyph() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} aria-hidden="true">
      <path d="M11 5 6 9H2v6h4l5 4V5Z" fill="#fff" stroke="none" />
      <path d="M23 9 17 15M17 9l6 6" strokeLinecap="round" />
    </svg>
  );
}

function formatDuration(seconds: number | null): string | null {
  if (seconds === null || Number.isNaN(seconds)) return null;
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function formatCommentDate(dateString: string): string {
  return new Date(dateString.replace(' ', 'T')).toLocaleDateString();
}

/**
 * Live-or-VOD hero + browsable VOD grid + likes/comments for the currently
 * featured video — the new half of the /videos page (see the "VOD + video
 * hub" plan, Part B). Fully separate data source from the YouTube-backed
 * FeaturedVideoPanel/VideoCarousel section that already exists on this
 * page — this talks to the portal's new `Modules\VideoOnDemand` API
 * (being built in parallel; every call below degrades to an empty/loading
 * state rather than crashing if that backend isn't up yet).
 *
 * Hero priority: a live broadcast (video_live) is the default when nothing
 * else has been explicitly picked; otherwise the most recently published
 * VOD video is. Picking any video from the grid below overrides that
 * default for the rest of the page's lifetime (no auto-return to Live —
 * the user can always scroll back to a "Join Live" card in the grid, or
 * refresh, matching how FeaturedVideoPanel's own sidebar selection works
 * on the YouTube section further down this page).
 *
 * Live/scheduled/VOD native-<video> playback itself (hls.js setup,
 * requestPlay/session heartbeat, autoplay-policy muted fallback) lives in
 * FloatingVideoContext, not here - this component only decides WHICH
 * source should be featured and calls that context's actions
 * (joinLive/playScheduledNative/playVodNative); the context owns the
 * actual element so a floated video/live session survives this component
 * unmounting on navigation. See that context's own docblock for the full
 * reasoning. Only a YouTube-embedded scheduled/VOD item is still handled
 * entirely locally here - that's a real, documented limitation, not an
 * oversight (see the render branches below and FloatingVideoContext's own
 * docblock).
 */
interface VodSectionProps {
  /** web_video-placement advertiser banners for the right-column ad carousel - see VideoAdsSidebar. Optional/nullable since not every caller (if any are ever added) needs to fetch these. */
  banners?: BannerDto[] | null;
  /** GhanaTalksRadio's own feature cross-promotion banners, merged into the same carousel - see VideoAdsSidebar. */
  engagementBanners?: EngagementBannerDto[] | null;
}

export function VodSection({ banners, engagementBanners }: VodSectionProps = {}) {
  const {
    liveStatus,
    isLive,
    scheduledCurrent,
    active,
    playBlocked,
    muted,
    registerDockTarget,
    joinLive,
    playScheduledNative,
    playVodNative,
    tapToPlay,
    unmute,
    refreshScheduledCurrent,
  } = useFloatingVideo();

  const [vodVideos, setVodVideos] = useState<VodVideoDto[]>([]);
  const [vodLoading, setVodLoading] = useState(true);
  const [vodError, setVodError] = useState(false);
  // Restored from the floating context on mount rather than reset to null -
  // a user who picked a grid video, floated it by navigating away, then
  // came back to /videos must see the SAME video still featured, not the
  // default priority (live/scheduled/most-recent) recomputed from scratch.
  // Live/scheduled don't need this same treatment - showLiveHero/
  // showScheduledHero below are derived straight from the same
  // isLive/scheduledCurrent the floating context exposes, so they
  // naturally recompute correctly on remount with no extra state needed.
  const [selectedVod, setSelectedVod] = useState<VodVideoDto | null>(() =>
    active?.kind === 'vod' ? active.video : null
  );
  const [vodPlaying, setVodPlaying] = useState(() => active?.kind === 'vod');

  const [featuredDetail, setFeaturedDetail] = useState<VodVideoDetailDto | null>(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [liking, setLiking] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<VodCommentDto[] | null>(null);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [draft, setDraft] = useState('');
  const [posting, setPosting] = useState(false);

  const scheduledYoutubeContainerRef = useRef<HTMLDivElement | null>(null);
  const scheduledYoutubePlayerRef = useRef<any>(null);
  // Local to the YouTube-embedded scheduled case only - a YouTube iframe
  // isn't tracked by FloatingVideoContext at all (see that context's own
  // docblock), so it can't share the context's playBlocked/muted state the
  // way the native (direct-file) scheduled/live/vod cases now do.
  const [scheduledPlayBlocked, setScheduledPlayBlocked] = useState(false);
  const [scheduledMuted, setScheduledMuted] = useState(false);
  const { notifyStop } = useAudioPlayer();

  // VOD list for the grid + the "most recent" default hero. If the portal's
  // VideoOnDemand API isn't up yet (parallel work), this just fails
  // gracefully into an empty grid/hero rather than crashing the page.
  useEffect(() => {
    let cancelled = false;
    getVodVideos()
      .then(({ videos }) => {
        if (cancelled) return;
        const sorted = [...videos].sort(
          (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
        );
        setVodVideos(sorted);
      })
      .catch(() => {
        if (!cancelled) setVodError(true);
      })
      .finally(() => {
        if (!cancelled) setVodLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const mostRecentVod = vodVideos[0] ?? null;
  const showLiveHero = isLive && !selectedVod;
  // Priority: live beats everything; a scheduled block beats the default
  // most-recent-video; a manual grid pick (selectedVod) overrides both for
  // the rest of this page session - matches the pre-existing live/
  // most-recent priority, with the scheduled tier inserted in the middle.
  const showScheduledHero = !showLiveHero && !selectedVod && Boolean(scheduledCurrent);
  const scheduledVodDto: VodVideoDto | null = scheduledCurrent
    ? {
        id: scheduledCurrent.video.id,
        title: scheduledCurrent.video.title,
        slug: scheduledCurrent.video.slug,
        description: '',
        video_url: scheduledCurrent.video.video_url,
        thumbnail_url: scheduledCurrent.video.thumbnail_url,
        duration_seconds: null,
        views_count: 0,
        likes_count: 0,
        published_at: '',
      }
    : null;
  const featuredVod = selectedVod ?? (showScheduledHero ? scheduledVodDto : mostRecentVod);

  // Full detail (comments_count, and a fresh views/likes read) for
  // whichever video is currently featured — also how the portal's
  // views_count increment (see that endpoint's own docblock) actually
  // fires, matching "viewing the detail is what counts as a view".
  useEffect(() => {
    if (!featuredVod) {
      setFeaturedDetail(null);
      return;
    }
    let cancelled = false;
    getVodVideo(featuredVod.slug)
      .then((detail) => {
        if (cancelled) return;
        setFeaturedDetail(detail);
        setLikesCount(detail.likes_count);
        setLiked(false); // the API doesn't expose "did this viewer already like it"
        setShowComments(false);
        setComments(null);
      })
      .catch(() => {
        if (!cancelled) setFeaturedDetail(null);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [featuredVod?.slug]);

  // Live join/playback/session-heartbeat lifecycle (join, autoplay-policy
  // muted fallback, hls.js wiring, tap-to-play/unmute) all now lives in
  // FloatingVideoContext - see that file's own docblock for why: it needs
  // to survive this component unmounting (Inertia navigation) so a
  // floated live session keeps playing, which it structurally can't do as
  // local state/effects here. `joinLive`/`tapToPlay`/`unmute` above are
  // this component's only remaining touchpoints with it.

  // Autoplays the scheduled hero, reusing the exact muted-fallback pattern
  // above - a mid-block joiner has no click to piggyback browser autoplay
  // permission on (unlike "Join Live" or a grid pick), so this must
  // default straight to attempting a real play and falling back to muted.
  // Keyed on the video's own id, not on scheduledCurrent as a whole - a
  // routine poll refreshing offset_seconds/seconds_remaining_in_item for
  // the SAME still-playing video must never restart or re-seek it; only
  // an actual item/playlist change (a new video id) should.
  useEffect(() => {
    if (!showScheduledHero || !scheduledCurrent) return;
    const current = scheduledCurrent;
    const youtubeId = getYouTubeVideoId(current.video.video_url);
    let cancelled = false;

    // A YouTube-sourced item (staff pasted a YouTube URL into the
    // playlist item instead of uploading a file - see
    // VideoPlaylistForm::createVideoForItem()) can't be a native <video>
    // src, and isn't tracked by FloatingVideoContext at all (a cross-origin
    // iframe reliably surviving navigation is a much less standard problem
    // than a <video> element - see that context's own docblock). The
    // IFrame Player API here is the only way to still get an "ended"
    // signal to advance the block and a seekable start offset for a
    // mid-block joiner.
    if (youtubeId) {
      if (!scheduledYoutubeContainerRef.current) return;
      const container = scheduledYoutubeContainerRef.current;

      loadYoutubeIframeApi().then(() => {
        if (cancelled || !container) return;
        scheduledYoutubePlayerRef.current = new window.YT!.Player(container, {
          videoId: youtubeId,
          playerVars: {
            autoplay: 1,
            playsinline: 1,
            // Clamped the same way the native path clamps currentTime -
            // stale/clock-skew data must never be trusted past the real
            // video's own length (YouTube itself just clamps this
            // server-side too, but keeping the same guard here for
            // parity/clarity with the native branch below).
            start: Math.max(0, Math.floor(current.offset_seconds)),
          },
          events: {
            onReady: (event: any) => {
              event.target.playVideo();
              // Unmuted programmatic playback with no prior user gesture
              // is blocked by some browsers - same restriction the
              // native <video> path below works around. If playback
              // hasn't actually started shortly after, retry muted
              // rather than leaving the item stuck on its first frame.
              setTimeout(() => {
                if (cancelled) return;
                if (event.target.getPlayerState?.() !== window.YT!.PlayerState.PLAYING) {
                  event.target.mute();
                  event.target.playVideo();
                  setScheduledMuted(true);
                }
              }, 700);
              setScheduledPlayBlocked(false);
            },
            onStateChange: (event: any) => {
              if (event.data === window.YT!.PlayerState.ENDED) refreshScheduledCurrent();
            },
            // An unplayable video (removed/private/region-blocked) should
            // still advance the block rather than get stuck forever.
            onError: () => refreshScheduledCurrent(),
          },
        });
      });

      return () => {
        cancelled = true;
        scheduledYoutubePlayerRef.current?.destroy?.();
        scheduledYoutubePlayerRef.current = null;
        notifyStop(`scheduled-${current.video.id}`);
        setScheduledPlayBlocked(false);
        setScheduledMuted(false);
      };
    }

    // Native (direct-file) case - playback itself is owned by
    // FloatingVideoContext so it can survive this component unmounting
    // (see that context's own docblock). Don't (re)trigger if this exact
    // item is already the active source - e.g. re-mounting after
    // navigating back to /videos while it's already playing/floating; the
    // context's own effect handles advancing an already-active session to
    // a genuinely NEW item on its own.
    if (active?.kind === 'scheduled' && active.id === current.video.id) return;
    playScheduledNative(current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showScheduledHero, scheduledCurrent?.video.id]);

  function handleTapToPlayScheduled() {
    if (scheduledYoutubePlayerRef.current) {
      scheduledYoutubePlayerRef.current.playVideo();
      setScheduledPlayBlocked(false);
      return;
    }
    tapToPlay();
  }

  function handleUnmuteScheduled() {
    if (scheduledYoutubePlayerRef.current) {
      scheduledYoutubePlayerRef.current.unMute();
      setScheduledMuted(false);
      return;
    }
    unmute();
  }

  function handleJoinLive() {
    joinLive();
  }

  // Keeps local vodPlaying in sync with FloatingVideoContext's own `active`
  // for the NATIVE (non-YouTube) case - e.g. pausing the shared video
  // (handled inside that context) resets `active` to null, which should
  // revert this hero back to its thumbnail+play-button state. The YouTube
  // branch is untouched by this - it's not tracked by the floating context
  // at all, so vodPlaying there stays purely under this component's own
  // local control (handlePlayFeaturedVod/handleSelectVod below).
  useEffect(() => {
    if (!featuredVod || getYouTubeVideoId(featuredVod.video_url)) return;
    setVodPlaying(active?.kind === 'vod' && active.video.id === featuredVod.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, featuredVod?.id]);

  function handlePlayFeaturedVod() {
    if (!featuredVod) return;
    setVodPlaying(true);
    if (!getYouTubeVideoId(featuredVod.video_url)) playVodNative(featuredVod);
  }

  function handleSelectVod(video: VodVideoDto) {
    setSelectedVod(video);
    setVodPlaying(true); // an explicit grid pick plays immediately
    if (!getYouTubeVideoId(video.video_url)) playVodNative(video);
  }

  function handleToggleLike() {
    if (!featuredDetail || liking) return;
    setLiking(true);
    toggleVodLike(featuredDetail.id, getDeviceId())
      .then((result) => {
        setLiked(result.liked);
        setLikesCount(result.likes_count);
      })
      .catch(() => {})
      .finally(() => setLiking(false));
  }

  function toggleComments() {
    const next = !showComments;
    setShowComments(next);
    if (next && comments === null && featuredDetail) {
      setCommentsLoading(true);
      getVodComments(featuredDetail.id)
        .then(({ comments }) => setComments(comments))
        .catch(() => setComments([]))
        .finally(() => setCommentsLoading(false));
    }
  }

  function handlePostComment(e: React.FormEvent) {
    e.preventDefault();
    if (!featuredDetail) return;
    const body = draft.trim();
    if (!body || !guestName.trim()) return;
    setPosting(true);
    postVodComment(featuredDetail.id, { deviceId: getDeviceId(), guestName: guestName.trim(), body })
      .then((comment) => {
        setComments((prev) => [...(prev ?? []), comment]);
        setDraft('');
      })
      .catch(() => {})
      .finally(() => setPosting(false));
  }

  const gridVideos = vodVideos.filter((v) => v.id !== featuredVod?.id);
  const hasHero = showLiveHero || Boolean(featuredVod);
  const scheduledIsYoutube = scheduledCurrent ? Boolean(getYouTubeVideoId(scheduledCurrent.video.video_url)) : false;
  const scheduledNativeActive = active?.kind === 'scheduled';
  // "When a user joins video live stream" (the feature's own trigger) -
  // deliberately active?.kind === 'live', not showLiveHero: the latter is
  // true as soon as the live hero/"Join Live" button is showing, before
  // any click. This is true only once playback has actually started.
  const isJoinedLive = active?.kind === 'live';

  if (!hasHero) {
    if (vodLoading) return <EmptyNote>Loading videos…</EmptyNote>;
    return vodError ? (
      <EmptyNote>Videos are temporarily unavailable — please check back soon.</EmptyNote>
    ) : (
      <EmptyNote>No videos available yet — check back soon.</EmptyNote>
    );
  }

  return (
    <>
      {hasHero && (
        <LiveWithAdsPanel $withSidebar={isJoinedLive}>
        <HeroCard>
          <ThumbWrap>
            {showLiveHero ? (
              <>
                <LiveBadge>Live</LiveBadge>
                {/* Always mounted the moment this is the featured slot -
                    NOT swapped in only once joined. Registering the dock
                    target only after the "Join Live" click would mean the
                    portal target changes (hidden host -> this div) in the
                    same tick joinLive() calls video.play() on it - a real,
                    observed race where the browser aborts the in-flight
                    play() with "removed from the document" because the
                    node briefly leaves the DOM mid-move. Keeping this div
                    (and therefore the dock) stable across the join
                    transition avoids that entirely. */}
                <div ref={registerDockTarget} style={{ width: '100%', height: '100%' }} />
                {active?.kind === 'live' ? (
                  <>
                    {playBlocked && (
                      <PlayBadge
                        type="button"
                        onClick={tapToPlay}
                        aria-label="Tap to start the live video"
                      >
                        <PlayCircle>
                          <PlayGlyph size={26} />
                        </PlayCircle>
                      </PlayBadge>
                    )}
                    {muted && (
                      <UnmuteBadge type="button" onClick={unmute}>
                        <MutedGlyph />
                        Tap to unmute
                      </UnmuteBadge>
                    )}
                  </>
                ) : (
                  <JoinLiveButton type="button" onClick={handleJoinLive} aria-label="Join the live video stream">
                    <ThumbPlaceholder />
                    <JoinLivePill>
                      <PlayGlyph size={16} />
                      Join Live
                    </JoinLivePill>
                  </JoinLiveButton>
                )}
              </>
            ) : showScheduledHero && scheduledCurrent ? (
              <>
                <LiveBadge>Now Playing</LiveBadge>
                {scheduledIsYoutube ? (
                  <YoutubePlayerHost
                    key={`scheduled-yt-${scheduledCurrent.video.id}`}
                    ref={scheduledYoutubeContainerRef}
                  />
                ) : (
                  <div
                    key={`scheduled-${scheduledCurrent.video.id}`}
                    ref={registerDockTarget}
                    style={{ width: '100%', height: '100%' }}
                  />
                )}
                {(scheduledIsYoutube ? scheduledPlayBlocked : scheduledNativeActive && playBlocked) && (
                  <PlayBadge
                    type="button"
                    onClick={handleTapToPlayScheduled}
                    aria-label="Tap to start this video"
                  >
                    <PlayCircle>
                      <PlayGlyph size={26} />
                    </PlayCircle>
                  </PlayBadge>
                )}
                {(scheduledIsYoutube ? scheduledMuted : scheduledNativeActive && muted) && (
                  <UnmuteBadge type="button" onClick={handleUnmuteScheduled}>
                    <MutedGlyph />
                    Tap to unmute
                  </UnmuteBadge>
                )}
              </>
            ) : featuredVod ? (
              getYouTubeVideoId(featuredVod.video_url) ? (
                vodPlaying ? (
                  <YoutubeFrame
                    key={`vod-yt-${featuredVod.id}`}
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(featuredVod.video_url)}?autoplay=1`}
                    title={featuredVod.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <>
                    {featuredVod.thumbnail_url ? (
                      <Thumb src={featuredVod.thumbnail_url} alt={featuredVod.title} loading="lazy" />
                    ) : (
                      <ThumbPlaceholder />
                    )}
                    <PlayBadge
                      type="button"
                      onClick={handlePlayFeaturedVod}
                      aria-label={`Play video: ${featuredVod.title}`}
                    >
                      <PlayCircle>
                        <PlayGlyph size={26} />
                      </PlayCircle>
                    </PlayBadge>
                  </>
                )
              ) : (
                <>
                  {/* Always mounted as soon as this is the featured slot,
                      same "no dock-target swap mid-play()" reasoning as
                      the live branch above - handlePlayFeaturedVod/
                      handleSelectVod call playVodNative() synchronously
                      from a click handler too, so the dock target must
                      already be stable before that click, not created by
                      it. */}
                  <div
                    key={`vod-${featuredVod.id}`}
                    ref={registerDockTarget}
                    style={{ width: '100%', height: '100%' }}
                  />
                  {!vodPlaying && (
                    <>
                      {featuredVod.thumbnail_url ? (
                        <Thumb src={featuredVod.thumbnail_url} alt={featuredVod.title} loading="lazy" />
                      ) : (
                        <ThumbPlaceholder />
                      )}
                      <PlayBadge
                        type="button"
                        onClick={handlePlayFeaturedVod}
                        aria-label={`Play video: ${featuredVod.title}`}
                      >
                        <PlayCircle>
                          <PlayGlyph size={26} />
                        </PlayCircle>
                      </PlayBadge>
                    </>
                  )}
                </>
              )
            ) : (
              <ThumbPlaceholder />
            )}
          </ThumbWrap>

          

          <HeroBody>
            <HeroTitle>{showLiveHero ? liveStatus?.label || 'GhanaTalksRadio Live' : featuredVod?.title}</HeroTitle>
            <HeroMetaRow>
              <HeroMeta>
                {showLiveHero
                  ? 'Live now'
                  : showScheduledHero
                    // The scheduled-playlist API has no published_at for
                    // its embedded video summary at all (see
                    // ScheduledPlaylistVideo's own type) - scheduledVodDto
                    // fills it with '' as a placeholder, which
                    // formatPostDate('') rendered as the literal text
                    // "Invalid Date". This item isn't "published" in the
                    // normal sense anyway (it's mid-broadcast-block), so
                    // "Now playing" is the honest label, not a fabricated date.
                    ? 'Now playing'
                    : featuredVod
                      ? `${formatPostDate(featuredVod.published_at)} · ${featuredVod.views_count.toLocaleString()} views`
                      : null}
              </HeroMeta>

              {!showLiveHero && featuredDetail && (
                <EngagementRow>
                  <LikeButton type="button" $liked={liked} disabled={liking} onClick={handleToggleLike}>
                    {liked ? '♥' : '♡'} {likesCount.toLocaleString()}
                  </LikeButton>
                  <CommentsToggleBtn type="button" onClick={toggleComments}>
                    💬 {(featuredDetail.comments_count ?? 0).toLocaleString()}
                  </CommentsToggleBtn>
                </EngagementRow>
              )}
            </HeroMetaRow>

            {!showLiveHero && showComments && featuredDetail && (
              <CommentsBox>
                {commentsLoading ? (
                  <EmptyNote>Loading comments…</EmptyNote>
                ) : !comments || comments.length === 0 ? (
                  <EmptyNote>No comments yet — be the first.</EmptyNote>
                ) : (
                  comments.map((c) => (
                    <CommentRow key={c.id}>
                      <CommentTopRow>
                        <CommentAuthor>{c.author}</CommentAuthor>
                        <HeroMeta>{formatCommentDate(c.created_at)}</HeroMeta>
                      </CommentTopRow>
                      <CommentBody>{c.body}</CommentBody>
                    </CommentRow>
                  ))
                )}

                <CommentForm onSubmit={handlePostComment}>
                  <TextField
                    placeholder="Your name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                  />
                  <CommentInputRow>
                    <TextField
                      style={{ flex: 1 }}
                      placeholder="Add a comment"
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                    />
                    <SubmitButton type="submit" disabled={posting}>
                      {posting ? 'Posting…' : 'Post'}
                    </SubmitButton>
                  </CommentInputRow>
                </CommentForm>
              </CommentsBox>
            )}
          </HeroBody>
        </HeroCard>
        {isJoinedLive && <VideoAdsSidebar banners={banners} engagementBanners={engagementBanners} />}
        </LiveWithAdsPanel>
      )}
      {isJoinedLive && <AdSlot format="leaderboard" slotId={GTR_AD_SLOTS.horizontal} />}

      {gridVideos.length > 0 && (
        <>
          <GridTitle>More Videos</GridTitle>
          <Grid>
            {gridVideos.map((video) => {
              const duration = formatDuration(video.duration_seconds);
              return (
                <CardButton key={video.id} type="button" onClick={() => handleSelectVod(video)}>
                  <CardThumbWrap>
                    {video.thumbnail_url ? (
                      <CardThumb src={video.thumbnail_url} alt="" loading="lazy" />
                    ) : (
                      <ThumbPlaceholder />
                    )}
                    {duration && <CardDuration>{duration}</CardDuration>}
                  </CardThumbWrap>
                  <CardBody>
                    <CardTitle>{video.title}</CardTitle>
                    <CardMeta>
                      {formatPostDate(video.published_at)} · {video.views_count.toLocaleString()} views
                    </CardMeta>
                  </CardBody>
                </CardButton>
              );
            })}
          </Grid>
        </>
      )}
    </>
  );
}

export default VodSection;
