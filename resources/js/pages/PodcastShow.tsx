import { Head, router } from '@inertiajs/react';
import { Link } from '../routing/Link';
import styled from 'styled-components';
import type { PodcastEpisode, PodcastShow as PodcastShowType } from '../types/podcast';
import { PodcastEpisodeList } from '../components/PodcastEpisodeList';
import { Pagination } from '../components/Pagination';
import { AdSlot, GTR_AD_SLOTS } from '../components/AdSlot';
import { SponsoredBanner } from '../components/SponsoredBanner';
import { getAvailablePlatformLinks } from '../utils/PodcastPlatforms';
import type { BannerDto } from '../types/advertising';

interface PodcastShowProps {
  episodes: PodcastEpisode[];
  show: PodcastShowType | null;
  page: number;
  totalPages: number;
  isError: boolean;
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

const Header = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Artwork = styled.div`
  flex-shrink: 0;
  width: 96px;
  height: 96px;
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.backgroundAlt};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const HeaderBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
`;

const Eyebrow = styled.div`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDark};
`;

const Title = styled.h1`
  font-size: clamp(1.4rem, 3.5vw, 1.9rem);
  margin: 0;
`;

const PlatformRow = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.3rem;
`;

const PlatformPill = styled.a<{ $accent: string }>`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.75rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.78rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.ink};
  transition: border-color 0.15s ease, color 0.15s ease;

  &:hover {
    text-decoration: none;
    border-color: ${({ $accent }) => $accent};
    color: ${({ $accent }) => $accent};
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
 * Ported from the Vite SPA's src/pages/PodcastShow.tsx. Show + episodes
 * resolved server-side (PodcastShowController) instead of a react-query
 * hook; pagination is a real Inertia navigation.
 */
export function PodcastShow({ episodes, show, page, totalPages, isError, banners }: PodcastShowProps) {
  const platformLinks = show ? getAvailablePlatformLinks(show.external) : [];

  function handlePageChange(newPage: number) {
    router.get(`/podcast/${show!.slug}`, { page: newPage }, { preserveScroll: true });
  }

  if (!show) {
    return (
      <>
        <Head>
          <title>Show not found | GhanaTalksRadio</title>
        </Head>
        <BackLink to="/podcast">← Back to Podcast</BackLink>
        <StateBox role="alert">This show doesn't exist or may have been removed.</StateBox>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{`${show.name} | GhanaTalksRadio`}</title>
        <meta name="description" content={`Episodes of ${show.name} on GhanaTalksRadio.`} />
      </Head>

      <BackLink to="/podcast">← Back to Podcast</BackLink>

      <Header>
        {show.imageUrl && (
          <Artwork>
            <img src={show.imageUrl} alt={show.name} />
          </Artwork>
        )}
        <HeaderBody>
          <Eyebrow>Show</Eyebrow>
          <Title>{show.name}</Title>
          {platformLinks.length > 0 && (
            <PlatformRow>
              {platformLinks.map(({ key, label, Icon, accent, url }) => (
                <PlatformPill key={key} href={url} target="_blank" rel="noopener noreferrer" $accent={accent}>
                  <Icon size={14} />
                  {label}
                </PlatformPill>
              ))}
            </PlatformRow>
          )}
        </HeaderBody>
      </Header>

      <PodcastEpisodeList episodes={episodes} isLoading={false} isError={isError} />

      <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />

      <SponsoredBanner banners={banners} />
      <AdSlot format="leaderboard" slotId={GTR_AD_SLOTS.vertical} />
    </>
  );
}

export default PodcastShow;
