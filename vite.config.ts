import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
    ssr: {
        // Bundle every dependency into bootstrap/ssr/ssr.js instead of
        // leaving them as external `require`/`import` calls Node resolves
        // from node_modules at runtime. Needed because the SSR server runs
        // on shared hosting with no node_modules deployed at all (see the
        // IONOS deployment runbook) - `noExternal: true` makes ssr.js fully
        // self-contained, needing nothing but the `node` binary itself.
        // (Also fixes the styled-components CJS/ESM interop bug: it ships
        // CJS-only with an __esModule flag that Node's native interop,
        // unlike Babel/webpack's, doesn't unwrap for a plain `import styled
        // from 'styled-components'` - bundling it lets Rollup's commonjs
        // interop handle the default export correctly instead.)
        noExternal: true,
    },
});
