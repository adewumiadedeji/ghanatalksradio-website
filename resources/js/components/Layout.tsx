import type { ReactNode } from 'react';
import { Link } from '../routing/Link';
import styled from 'styled-components';
import { CategoryNav } from './CategoryNav';
import { MobileNavDrawer } from './MobileNavDrawer';
import { RadioPlayer } from './RadioPlayer';
import { WatchToggle } from './WatchToggle';
import { AdSlot, GTR_AD_SLOTS } from './AdSlot';
import { APP_LINKS, SOCIAL_LINKS } from './footerLinks';
import { WelcomeModal } from './WelcomeModal';
import { CookieBanner } from './CookieBanner';
import { PromoMessageBar } from './PromoMessageBar';
import { ADVERTISER_PORTAL_URLS } from '../config/advertiserPortal';
import logoUrl from '../assets/logo.png';
import Search from './Search';

const SkipLink = styled.a`
  position: absolute;
  left: -9999px;
  top: 0;
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.ink};
  padding: 0.5rem 1rem;
  font-weight: 700;
  z-index: 100;

  &:focus {
    left: 1rem;
    top: 1rem;
  }
`;


const Header = styled.header`
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  width: 100%;
  
`;
const HeaderInner = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 0 1.25rem;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.9rem 0;
`;

const SiteName = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  flex-shrink: 0;
`;

const Logo = styled.img`
  height: 4.4rem;
  width: auto;
  display: block;
`;

const PlayerSlot = styled.div`
  display: flex;
  min-width: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const SearchSlot = styled.div`
  display: flex;
  min-width: 0;
`;

/** Hidden below tablet - MobileNavDrawer carries the same link there instead, same pattern as CategoryNav. */
const AdvertiserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const GetStartedLink = styled.a`
  padding: 0.8rem 1rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.ink};
  font-size: 0.85rem;
  font-weight: 700;
  white-space: nowrap;
  transition: filter 0.15s ease;

  &:hover {
    filter: brightness(1.05);
    text-decoration: none;
  }
`;

/**
 * Fixed bottom audio bar for mobile — replaces the old inline
 * MobilePlayerBar-under-the-header placement. Always reachable regardless
 * of scroll position, which is the expected pattern for a radio/audio
 * player on mobile (matches native app and most radio-site conventions).
 */
const MobileBottomPlayerBar = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    justify-content: center;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 80;
    padding: 0.6rem 1rem;
    background: ${({ theme }) => theme.colors.surface};
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    /* Respect iOS home-indicator safe area so the bar doesn't sit under it */
    padding-bottom: max(0.6rem, env(safe-area-inset-bottom));
  }
`;

/** Height reserved at the bottom of Main so MobileBottomPlayerBar never overlaps page content or the footer. Matches the bar's typical rendered height (player ~54px + vertical padding) with a little headroom. */
const MOBILE_PLAYER_BAR_RESERVE = '88px';

const Main = styled.main`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 2rem 1.25rem 3.5rem;
  min-height: 60vh;

  margin-top: 100px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-bottom: calc(3.5rem + ${MOBILE_PLAYER_BAR_RESERVE});
  }
`;

const Footer = styled.footer`
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.background};
  margin-top: 2rem;
`;

const FooterInner = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 3rem 1.25rem 2.5rem;
  display: grid;
  grid-template-columns: 1.6fr 0.8fr 0.8fr 1fr;
  gap: 2.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FooterBrand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FooterTagline = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.inkFaint};
  max-width: 280px;
  margin: 0;
`;

const FooterCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

const FooterHeading = styled.h3`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin: 0;
`;

const FooterLinkList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  font-size: 0.85rem;

  a {
    color: ${({ theme }) => theme.colors.background};
    opacity: 0.85;

    &:hover {
      opacity: 1;
      color: ${({ theme }) => theme.colors.gold};
    }
  }
`;

const IconLinkRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

const IconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  color: ${({ theme }) => theme.colors.background};
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.gold};
    color: ${({ theme }) => theme.colors.ink};
  }
`;

const AppLinkItem = styled.a`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.83rem;
  color: ${({ theme }) => theme.colors.background};
  opacity: 0.85;

  svg {
    flex-shrink: 0;
    opacity: 0.9;
  }

  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.gold};

    svg {
      opacity: 1;
    }
  }
`;

const Copyright = styled.div`
  
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
`; 


const CopyContent = styled.div`
  display: flex;
  justify-content: space-between;

  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 1rem 1.25rem 1.5rem;
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.inkFaint};
  border-top: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-bottom: calc(1.5rem + ${MOBILE_PLAYER_BAR_RESERVE});
  }
`;

const Privacy = styled.div`
  display: flex;
  justify-content: end;
  gap: 0.6rem;
  font-size: 0.85rem;

  a {
    color: ${({ theme }) => theme.colors.background};
    opacity: 0.85;

    &:hover {
      opacity: 1;
      color: ${({ theme }) => theme.colors.gold};
    }
  }
`;

/**
 * Ported from the Vite SPA's src/components/Layout.tsx. React Router's
 * <Outlet/> has no Inertia equivalent, so this takes `children` instead -
 * wrapped around <App/> in app.tsx/ssr.tsx (outside Inertia's own
 * page-swap boundary) so it never remounts on navigation, keeping the
 * mini-player's audio playing across page changes.
 */
export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SkipLink href="#main-content">Skip to content</SkipLink>

      <Header>
        <HeaderInner>
          <TopBar>
            <SiteName to="/">
              <Logo src={logoUrl} alt="GhanaTalksRadio" />
            </SiteName>
            <CategoryNav />
            <Actions>
              
              <PlayerSlot>
                <RadioPlayer compact />
                <WatchToggle />
              </PlayerSlot>
              <AdvertiserActions>
                <GetStartedLink href={ADVERTISER_PORTAL_URLS.getStarted}>Get started</GetStartedLink>
              </AdvertiserActions>
              <SearchSlot>
                <Search />
              </SearchSlot>
            </Actions>
            <MobileNavDrawer />
          </TopBar>
        </HeaderInner>
      </Header>

      <PromoMessageBar />

      <Main id="main-content">
        {children}
      </Main>

      <AdSlot minHeight={0} format="leaderboard" slotId={GTR_AD_SLOTS.horizontal} />

      <Footer>
        <FooterInner>
          <FooterBrand>
            <SiteName to="/">
              <Logo src={logoUrl} alt="GhanaTalksRadio" />
            </SiteName>
            <FooterTagline>
              News, politics, music and entertainment — giving the youth a voice.
            </FooterTagline>
            <div>
              <FooterHeading style={{ marginBottom: '0.6rem' }}>Follow Us</FooterHeading>
              <IconLinkRow aria-label="Follow GhanaTalksRadio on social media">
                {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                  <IconLink
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                  >
                    <Icon size={16} />
                  </IconLink>
                ))}
              </IconLinkRow>
            </div>
          </FooterBrand>

          <FooterCol style={{display: 'flex', flexDirection: 'row', gap: 20}}>
            <div>
              <FooterHeading>Explore</FooterHeading>
              <FooterLinkList>
                <Link to="/">Categories</Link>
                <Link to="/category/entertainments">Entertainments</Link>
                <Link to="/podcast">Podcasts</Link>
                <Link to="/category/lifestyle">Lifestyle</Link>
                <Link to="/playlist">Playlists</Link>
              </FooterLinkList>
            </div>
            <div>
              <FooterHeading>&nbsp;</FooterHeading>
              <FooterLinkList>
                <Link to="/category/business">Business</Link>
                <Link to="/category/featured">Featured</Link>
                <Link to="/category/tech">Technology</Link>
                <Link to="/category/crime">Crime</Link>
                <Link to="/playlist">Playlists</Link>
              </FooterLinkList>
            </div>
          </FooterCol>

          <FooterCol>
            <FooterHeading>Quick Links</FooterHeading>
            <FooterLinkList>
              <Link to="/">Home</Link>
              <Link to="/about-us">About Us</Link>
              <Link to="/authors">Authors</Link>
              <Link to="/search">Search</Link>
              <Link to="/contact-us">Contact Us</Link>
            </FooterLinkList>
          </FooterCol>

          <FooterCol>
            <FooterHeading>Get the App</FooterHeading>
            <FooterLinkList>
              {APP_LINKS.map(({ label, href, Icon }) => (
                <AppLinkItem key={label} href={href} target="_blank" rel="noopener noreferrer">
                  <Icon size={16} />
                  {label}
                </AppLinkItem>
              ))}
            </FooterLinkList>
          </FooterCol>

        </FooterInner>
        <CopyContent>
          <Copyright>© {new Date().getFullYear()} GhanaTalksRadio. All rights reserved.</Copyright>
          <Privacy>
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/editorial-policy">Editorial Policy</Link>
              <Link to="/corrections-policy">Corrections Policy</Link>
              <Link to="/account-deletion">Delete your account</Link>
          </Privacy>
        </CopyContent>
        
      </Footer>

      <MobileBottomPlayerBar>
        <RadioPlayer compact />
        <WatchToggle />
      </MobileBottomPlayerBar>

      <WelcomeModal />
      <CookieBanner />
    </>
  );
}
