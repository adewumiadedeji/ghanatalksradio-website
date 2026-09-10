import type { ReactNode } from 'react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Layout } from '../components/Layout';

type PageModule = { default: React.ComponentType & { layout?: (page: ReactNode) => ReactNode } };

/**
 * Wraps resolvePageComponent to attach Layout as every page's persistent
 * Inertia layout (Component.layout). This must be a real Inertia
 * "persistent layout" (https://inertiajs.com/pages#persistent-layouts) -
 * not a wrapper placed around <App/> in app.tsx/ssr.tsx - for two reasons:
 * usePage() (used by CategoryNav/MobileNavDrawer via useNav()) only works
 * inside Inertia's own PageContext, which only exists inside <App/>; and
 * Inertia keeps a Component.layout mounted across page navigations (same
 * component reference at the same tree position), which is what keeps the
 * mini-player's audio playing when the user clicks to a different page.
 *
 * `pages` must be passed in from the caller's own import.meta.glob() call
 * (app.tsx/ssr.tsx) rather than called in here - import.meta.glob()
 * resolves its pattern relative to the FILE IT'S WRITTEN IN, not the
 * caller, so calling it from this file would look for resources/js/routing/pages/*
 * instead of resources/js/pages/*.
 */
export async function resolvePage(name: string, pages: Record<string, () => Promise<PageModule>>) {
  const page = await resolvePageComponent<PageModule>(`./pages/${name}.tsx`, pages);

  const component = page.default;
  component.layout ??= (page: ReactNode) => <Layout>{page}</Layout>;

  return component;
}
