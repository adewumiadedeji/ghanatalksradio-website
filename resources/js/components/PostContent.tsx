import DOMPurify from '../utils/htmlSanitizer';
import { useMemo } from 'react';
import styled from 'styled-components';

interface PostContentProps {
  html: string;
  className?: string;
}

const Prose = styled.div`
  font-size: 1.08rem;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.ink};

  p {
    margin: 0 0 1.4em;
  }

  h2, h3, h4 {
    font-family: ${({ theme }) => theme.font.display};
    margin: 1.9em 0 0.75em;
    line-height: 1.3;
  }

  h2 { font-size: 1.4rem; }
  h3 { font-size: 1.2rem; }

  img {
    border-radius: ${({ theme }) => theme.radius.md};
    margin: 1.5em 0;
  }

  iframe {
    max-width: 100%;
    border-radius: ${({ theme }) => theme.radius.md};
  }

  ul, ol {
    margin: 0 0 1.4em;
    padding-left: 1.4em;
  }

  li {
    margin-bottom: 0.4em;
  }

  blockquote {
    margin: 1.75em 0;
    padding: 0.25em 0 0.25em 1.1em;
    border-left: 3px solid ${({ theme }) => theme.colors.gold};
    color: ${({ theme }) => theme.colors.inkMuted};
    font-style: italic;
  }

  a {
    color: ${({ theme }) => theme.colors.goldDark};
    text-decoration: underline;
    text-decoration-thickness: 1px;
  }
`;

/**
 * Renders WP's content.rendered HTML safely.
 *
 * Confirmed live: this field contains raw embeds (YouTube iframes,
 * leftover <div id="fb-root"> from old Facebook SDK snippets) alongside
 * normal <p> markup. DOMPurify strips anything dangerous (script tags,
 * inline event handlers, etc.) while preserving the iframes/images WP
 * editors actually rely on.
 *
 * Sanitizer is isomorphic (see ../utils/htmlSanitizer): this component
 * renders during SSR (Node, no real DOM) as well as in the browser, and
 * plain DOMPurify needs a real `window`/`document` to operate - without
 * this, sanitization would either throw or silently no-op during SSR,
 * which is exactly the pass this content most needs it (it's the actual
 * article body being served to crawlers).
 *
 * IMPORTANT: this allows iframe by design (for embedded YouTube videos —
 * confirmed present in real posts). If you don't want arbitrary iframes
 * from old/compromised posts rendering, tighten ALLOWED_TAGS below and
 * post-process embeds into a dedicated component instead.
 */
export function PostContent({ html, className }: PostContentProps) {
  const clean = useMemo(
    () =>
      DOMPurify.sanitize(html, {
        ADD_TAGS: ['iframe'],
        ADD_ATTR: [
          'allow',
          'allowfullscreen',
          'frameborder',
          'referrerpolicy',
          'target',
        ],
      }),
    [html]
  );

  return (
    <Prose
      className={className}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
