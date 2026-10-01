import { Head } from '@inertiajs/react';
import { Link } from '../routing/Link';
import styled from 'styled-components';
import type { PodcastEpisode } from '../types/podcast';
import { AdSlot, GTR_AD_SLOTS } from '../components/AdSlot';
import { SponsoredBanner } from '../components/SponsoredBanner';
import { EpisodePlayer } from '../components/RadioPlayer';
import { formatEpisodeDate, formatEpisodeTimeRange } from '../utils/podcastContent';
import { getAvailablePlatformLinks } from '../utils/PodcastPlatforms';
import type { BannerDto } from '../types/advertising';

interface PodcastEpisodeDetailProps {
  episode: PodcastEpisode | null;
  banners?: BannerDto[];
}

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

const Hero = styled.div`
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

const Artwork = styled.div`
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

const HeroBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
`;

const ShowEyebrow = styled(Link)`
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

const Title = styled.h1`
  font-size: clamp(1.4rem, 3.2vw, 1.9rem);
  line-height: 1.25;
  margin: 0;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  flex-wrap: wrap;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.76rem;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin: 0.2rem 0 0.5rem;
`;

const UnavailableNote = styled.span`
  font-size: 0.85rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors.inkFaint};
`;

const Section = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 1.75rem;
  margin-bottom: 1.5rem;
`;

const SectionHeading = styled.h2`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin: 0 0 1rem;
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.ink};
  margin: 0;
  white-space: pre-line;
`;

const PlatformGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.75rem;
`;

const PlatformLink = styled.a<{ $accent: string }>`
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

const StateBox = styled.div`
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
export function PodcastEpisodeDetail({ episode, banners }: PodcastEpisodeDetailProps) {
  if (!episode) {
    return (
      <>
        <Head>
          <title>Episode not found | GhanaTalksRadio</title>
        </Head>
        <BackLink to="/podcast">← Back to Podcast</BackLink>
        <StateBox role="alert">This episode doesn't exist or may have been removed.</StateBox>
      </>
    );
  }

  const timeRange = formatEpisodeTimeRange(episode.startDate, episode.endDate);
  const platformLinks = getAvailablePlatformLinks(episode.show.external);
  const description = episode.description.slice(0, 160) || `${episode.show.name} on GhanaTalksRadio`;

  return (
    <>
      <Head>
        <title>{`${episode.title} | GhanaTalksRadio`}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={episode.title} />
        <meta property="og:description" content={description} />
      </Head>

      <BackLink to="/podcast">← Back to Podcast</BackLink>

      <Hero>
        {episode.show.imageUrl && (
          <Artwork>
            <img src={episode.show.imageUrl} alt={episode.show.name} />
          </Artwork>
        )}
        <HeroBody>
          <ShowEyebrow to={`/podcast/${episode.show.slug}`}>{episode.show.name}</ShowEyebrow>
          <Title>{episode.title}</Title>
          <MetaRow>
            <span>{formatEpisodeDate(episode.startDate)}</span>
            {timeRange && (
              <>
                <span aria-hidden="true">·</span>
                <span>{timeRange}</span>
              </>
            )}
          </MetaRow>

          {episode.audioUrl ? (
            <EpisodePlayer
              audioUrl={episode.audioUrl}
              title={episode.title}
              id={`episode-${episode.id}`}
              artist={episode.show.name}
              artwork={episode.show.imageUrl}
            />
          ) : (
            <UnavailableNote>Audio isn't available for this episode.</UnavailableNote>
          )}
        </HeroBody>
      </Hero>

      {episode.description && (
        <Section>
          <SectionHeading>About this episode</SectionHeading>
          <Description>{episode.description}</Description>
        </Section>
      )}

      {platformLinks.length > 0 && (
        <Section>
          <SectionHeading>Listen on</SectionHeading>
          <PlatformGrid>
            {platformLinks.map(({ key, label, Icon, accent, url }) => (
              <PlatformLink key={key} href={url} target="_blank" rel="noopener noreferrer" $accent={accent}>
                <Icon size={20} />
                {label}
              </PlatformLink>
            ))}
          </PlatformGrid>
        </Section>
      )}

      <SponsoredBanner banners={banners} />
      <AdSlot format="in-article" slotId={GTR_AD_SLOTS.inArticle} />
    </>
  );
}

export default PodcastEpisodeDetail;
