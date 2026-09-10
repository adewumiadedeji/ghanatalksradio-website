import { useState } from 'react';
import styled from 'styled-components';
import {
  FacebookIcon,
  ShareTwitterIcon,
  InstagramIcon,
  LinkIcon,
} from './icons/BrandIcons';
import { CHANNEL_LINKS } from './footerLinks';
import {
  buildFacebookShareUrl,
  buildTwitterShareUrl,
  copyLinkToClipboard,
} from '../utils/ShareLinks';

interface ShareBarProps {
  /** Full absolute URL of the page being shared. */
  url: string;
  /** Used as the pre-filled text for Twitter and as context for the Instagram copy-link flow. */
  title: string;
}

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 1.1rem 1.4rem;
  margin: 1.75rem 0;
`;

const Group = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const Label = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin-right: 0.3rem;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.inkMuted};
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, transform 0.15s ease;
  position: relative;

  &:hover {
    transform: translateY(-1px);
  }
`;

const FacebookButton = styled(IconButton)`
  &:hover {
    background: #1877f2;
    color: #fff;
  }
`;

const TwitterButton = styled(IconButton)`
  &:hover {
    background: #000;
    color: #fff;
  }
`;

const InstagramButton = styled(IconButton)`
  &:hover {
    background: linear-gradient(45deg, #f58529, #dd2a7b, #8134af, #515bd4);
    color: #fff;
  }
`;

const ChannelLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 0.9rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 0.78rem;
  font-weight: 700;
  background: ${({ theme }) => theme.colors.goldTint};
  color: ${({ theme }) => theme.colors.goldDark};
  transition: filter 0.15s ease;

  &:hover {
    text-decoration: none;
    filter: brightness(0.96);
  }
`;

const Toast = styled.span<{ $visible: boolean }>`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.background};
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.3rem 0.6rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  white-space: nowrap;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: none;
  transition: opacity 0.15s ease;
`;

function openShareWindow(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer,width=600,height=500');
}

/**
 * Social share + community-channel bar for article-style pages.
 *
 * Instagram has no web share-intent URL (unlike Facebook/Twitter) — its
 * sharing model is app/clipboard-based by design, not link-based. Rather
 * than a dead button, the Instagram action copies the link and shows a
 * brief confirmation, matching the real workaround people already use to
 * share a link "to Instagram" from a website (paste into bio/story/DM).
 */
export function ShareBar({ url, title }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  async function handleInstagramClick() {
    const ok = await copyLinkToClipboard(url);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <Wrap>
      <Group>
        <Label>Share</Label>
        <FacebookButton
          type="button"
          aria-label="Share on Facebook"
          onClick={() => openShareWindow(buildFacebookShareUrl(url))}
        >
          <FacebookIcon size={16} />
        </FacebookButton>
        <TwitterButton
          type="button"
          aria-label="Share on Twitter"
          onClick={() => openShareWindow(buildTwitterShareUrl(url, title))}
        >
          <ShareTwitterIcon size={16} />
        </TwitterButton>
        <InstagramButton type="button" aria-label="Copy link to share on Instagram" onClick={handleInstagramClick}>
          {copied ? <LinkIcon size={16} /> : <InstagramIcon size={16} />}
          <Toast $visible={copied} role="status">Link copied!</Toast>
        </InstagramButton>
      </Group>

      <Group>
        {CHANNEL_LINKS.map(({ label, href, Icon }) => (
          <ChannelLink key={label} href={href} target="_blank" rel="noopener noreferrer">
            <Icon size={15} />
            Join on {label.replace(' Channel', '')}
          </ChannelLink>
        ))}
      </Group>
    </Wrap>
  );
}
