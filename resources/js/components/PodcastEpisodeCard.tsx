import { useRef, useState } from 'react';
import { Link } from '../routing/Link';
import styled, { keyframes } from 'styled-components';
import type { PodcastEpisode } from '../types/podcast';
import { formatEpisodeDate, formatEpisodeTimeRange } from '../utils/podcastContent';
import { useAudioPlayer } from '../context/AudioPlayerContext';

import spotifyIcon from '../assets/brands/spotify.png';
import youtubeIcon from '../assets/brands/youtube.png';
import appleIcon from '../assets/brands/apple.png';
import amazonIcon from '../assets/brands/amazon.png';
import googleIcon from '../assets/brands/google.png';
import banner from '../assets/banner.png';

interface PodcastEpisodeCardProps {
  episode: PodcastEpisode;
  showExternal?: Boolean
}

// ─── Waveform animation (same keyframe as RadioPlayer's Bars) ────────────────

const barAnim = keyframes`
  0%, 100% { transform: scaleY(0.4); }
  50%       { transform: scaleY(1);   }
`;

// ─── Styled components ───────────────────────────────────────────────────────

const Card = styled.article`
  display: flex;
  gap: 1rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 1rem;
  transition: box-shadow 0.18s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.md};
    cursor: pointer;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const Artwork = styled.div`
  flex-shrink: 0;
  width: 184px;
  height: 184px;
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.backgroundAlt};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
  }
`;

const Body = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;


  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-width: 200px;
  }
`;

const ShowName = styled(Link)`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDark};
  width: fit-content;

  &:hover {
    text-decoration: underline;
  }
`;

const Title = styled(Link)`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.ink};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  &:hover {
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.colors.gold};
  }
`;

const Description = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: pre-line;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 0.2rem;
  flex-wrap: wrap;
`;

const Meta = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.68rem;
  color: ${({ theme }) => theme.colors.inkFaint};
`;

/**
 * Compact play button shown when idle — plain pill with play icon + label.
 * When playing this gets hidden and replaced by the animated PlayerBar.
 */
const IdlePlayButton = styled.button`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border: none;
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.35rem 0.8rem 0.35rem 0.55rem;
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.ink};
  transition: filter 0.15s ease;

  &:hover {
    filter: brightness(1.05);
  }
`;

/**
 * Active playing state: dark pill with pause icon + animated waveform bars.
 * Matches the RadioPlayer Bar visual — same dark background, gold bars.
 */
const PlayerBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.35rem 0.65rem 0.35rem 0.45rem;
`;

const PauseBtn = styled.button`
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.ink};
  cursor: pointer;
  transition: transform 0.12s ease;

  &:hover {
    transform: scale(1.08);
  }
`;

const NowPlayingLabel = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.inkFaint};
`;

/** Animated waveform bars — identical animation to RadioPlayer's Bars. */
const WaveBars = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  height: 14px;
  padding-right: 0.15rem;

  span {
    display: block;
    width: 3px;
    background: ${({ theme }) => theme.colors.gold};
    border-radius: 1px;
    animation: ${barAnim} 0.9s ease-in-out infinite;
  }

  span:nth-child(1) { height: 40%; animation-delay: -0.6s; }
  span:nth-child(2) { height: 100%; animation-delay: -0.3s; }
  span:nth-child(3) { height: 65%; animation-delay: -0.9s; }
`;

const ServiceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 0.1rem 0.5rem;
  border-radius: 25px;
`;

const ServiceLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  padding: 0.25rem;
  background: ${({ theme }) => theme.colors.background};
  flex-shrink: 0;

  &:hover {
    opacity: 0.8;
  }
`;

const ServiceIcon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
  display: block;
`;

const Label = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

const UnavailableNote = styled.span`
  font-size: 0.7rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors.inkFaint};
`;

// ─── Icons ───────────────────────────────────────────────────────────────────

function PlayIcon() {
  return (
    <svg width="9" height="11" viewBox="0 0 9 11" fill="currentColor" aria-hidden="true">
      <path d="M0 0L9 5.5L0 11V0Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="9" height="11" viewBox="0 0 9 11" fill="currentColor" aria-hidden="true">
      <rect x="0" y="0" width="3" height="11" rx="1" />
      <rect x="6" y="0" width="3" height="11" rx="1" />
    </svg>
  );
}

// ─── Platform icon map ───────────────────────────────────────────────────────

const platformIcons: Record<string, string> = {
  spotify: spotifyIcon,
  youtube: youtubeIcon,
  apple: appleIcon,
  amazon: amazonIcon,
  google: googleIcon,
};

// ─── Component ───────────────────────────────────────────────────────────────

export function PodcastEpisodeCard({ episode, showExternal=true }: PodcastEpisodeCardProps) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { currentId, requestPlay, notifyStop } = useAudioPlayer();

  // Unique context ID for this card's audio source.
  const playerId = `episode-card-${episode.id}`;

  const timeRange = formatEpisodeTimeRange(episode.startDate, episode.endDate);

  // If the context gave playback to something else (live stream or another
  // episode), reflect that in our own state.
  const isOwned = currentId === playerId;
  const effectivePlaying = playing && isOwned;

  async function handlePlay() {
    if (!episode.audioUrl || !audioRef.current) return;
    setPlaying(true);
    const ok = await requestPlay(playerId, audioRef.current);
    if (!ok) setPlaying(false);
  }

  // Sets the OS lock-screen/media-notification artwork so a minimized/
  // backgrounded tab still shows the podcast image, matching TrackPlayer's
  // artwork on mobile - same fix as EpisodePlayer in RadioPlayer.tsx, just
  // fired from this card's own onPlaying since it has its own <audio>.
  function updateMediaSessionMetadata() {
    if (!('mediaSession' in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: episode.title,
      artist: episode.show.name || 'GhanaTalksRadio Podcast',
      artwork: episode.show.imageUrl ? [{ src: episode.show.imageUrl, sizes: '512x512', type: 'image/png' }] : [],
    });
  }

  function handlePause() {
    audioRef.current?.pause();
    notifyStop(playerId);
    setPlaying(false);
  }

  return (
    <Card>
      {episode.show.imageUrl && (
        <Artwork>
          <img src={episode.show.imageUrl} alt={episode.show.name} loading="lazy" />
        </Artwork>
      )}
      <Body>
        <ShowName to={`/podcast/${episode.show.slug}`}>{episode.show.name}</ShowName>
        <Title to={`/podcast/${episode.show.slug}/${episode.slug}`}>{episode.title}</Title>
        {episode.description && <Description>{episode.description}</Description>}

        <MetaRow>
          <Meta>{formatEpisodeDate(episode.startDate)}</Meta>
          {timeRange && <Meta>{timeRange}</Meta>}
        </MetaRow>

        <MetaRow>
          {episode.audioUrl ? (
            <>
              <audio
                ref={audioRef}
                src={episode.audioUrl}
                preload="none"
                onPlaying={updateMediaSessionMetadata}
                onEnded={() => { setPlaying(false); notifyStop(playerId); }}
                onPause={() => setPlaying((p) => (p && !isOwned ? false : p))}
              />

              {effectivePlaying ? (
                /* ── Playing state: dark pill + pause button + waveform ── */
                <PlayerBar>
                  <PauseBtn
                    type="button"
                    onClick={handlePause}
                    aria-label="Pause episode"
                  >
                    <PauseIcon />
                  </PauseBtn>
                  <NowPlayingLabel>Playing</NowPlayingLabel>
                  <WaveBars aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </WaveBars>
                </PlayerBar>
              ) : (
                /* ── Idle state: compact gold play button ── */
                <IdlePlayButton
                  type="button"
                  onClick={handlePlay}
                  aria-label="Play episode"
                >
                  <PlayIcon />
                  Play
                </IdlePlayButton>
              )}
            </>
          ) : (
            <UnavailableNote>Audio unavailable for this episode</UnavailableNote>
          )}

          {showExternal && episode.show.external && (
            <ServiceRow>
              <Label>LISTEN ON: </Label>
              {Object.entries(episode.show.external).map(([name, url]) =>
                url ? (
                  <ServiceLink
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ServiceIcon
                      src={platformIcons[name as keyof typeof platformIcons]}
                      alt={name}
                    />
                  </ServiceLink>
                ) : null
              )}
            </ServiceRow>
          )}
        </MetaRow>
      </Body>
    </Card>
  );
}
