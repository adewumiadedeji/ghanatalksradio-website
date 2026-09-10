import ReactDOMServer from 'react-dom/server';
import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { ThemeProvider, ServerStyleSheet } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import { AudioPlayerProvider } from './context/AudioPlayerContext';
import { resolvePage } from './routing/resolvePage';

createServer((page) => {
  // Populated by the custom `render` call below, then appended to Inertia's
  // own head array after createInertiaApp resolves.
  let styleTags = '';

  return createInertiaApp({
    page,
    resolve: (name) => resolvePage(name, import.meta.glob('./pages/**/*.tsx')),
    setup: ({ App, props }) => (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AudioPlayerProvider>
          <App {...props} />
        </AudioPlayerProvider>
      </ThemeProvider>
    ),
    render: (app) => {
      // ServerStyleSheet collects every styled-component's CSS emitted
      // during this render. Without this, crawlers (and the first paint
      // for real users) get correctly-structured but completely unstyled
      // markup, since styled-components normally injects <style> tags
      // client-side only via a <style> element mutation.
      const sheet = new ServerStyleSheet();
      try {
        const body = ReactDOMServer.renderToString(sheet.collectStyles(app));
        styleTags = sheet.getStyleTags();
        return body;
      } finally {
        sheet.seal();
      }
    },
  }).then((result) => ({
    ...result,
    head: [...result.head, styleTags],
  }));
});
