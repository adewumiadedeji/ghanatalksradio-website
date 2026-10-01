import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import { AudioPlayerProvider } from './context/AudioPlayerContext';
import { FloatingVideoProvider } from './context/FloatingVideoContext';
import { resolvePage } from './routing/resolvePage';

createInertiaApp({
  resolve: (name) => resolvePage(name, import.meta.glob('./pages/**/*.tsx')),
  setup({ el, App, props }) {
    createRoot(el).render(
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AudioPlayerProvider>
          <FloatingVideoProvider>
            <App {...props} />
          </FloatingVideoProvider>
        </AudioPlayerProvider>
      </ThemeProvider>
    );
  },
});
