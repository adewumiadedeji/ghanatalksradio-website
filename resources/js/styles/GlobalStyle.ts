import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    /* A page-level guard, not a fix for any one component: a horizontally-
       scrolling row (PostRail's Track) or any other wide descendant can
       otherwise expand its own block ancestors' layout width to fit its
       content instead of staying clipped/scrollable within them, blowing
       the whole document out to that width - which then drags anything
       position:fixed (the mobile nav drawer) along with it, since its
       containing-block math is computed against that inflated ancestor
       instead of the real viewport. Real incident: this made the entire
       site scroll horizontally on mobile. Track's own overflow-x: auto
       still scrolls its content normally - this only stops the outer
       page/viewport itself from doing so. */
    overflow-x: hidden;
  }

  html {
    -webkit-text-size-adjust: 100%;
  }

  body {
    font-family: ${({ theme }) => theme.font.body};
    color: ${({ theme }) => theme.colors.ink};
    background: ${({ theme }) => theme.colors.background};
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4 {
    font-family: ${({ theme }) => theme.font.display};
    font-weight: 700;
    letter-spacing: -0.01em;
    margin: 0;
  }

  img {
    max-width: 100%;
    display: block;
  }

  a {
    color: ${({ theme }) => theme.colors.link};
    text-decoration: none;
  }

  button {
    font-family: inherit;
  }

  /* Visible keyboard focus everywhere, including custom components */
  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 2px;
    border-radius: 2px;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.goldTint};
    color: ${({ theme }) => theme.colors.ink};
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
