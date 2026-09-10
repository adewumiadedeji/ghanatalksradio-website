import { forwardRef } from 'react';
import { Link as InertiaLink, type InertiaLinkProps } from '@inertiajs/react';

/**
 * Drop-in shim for react-router-dom's <Link to="..."> so components ported
 * from the Vite SPA (which use `styled(Link)` with a `to` prop throughout)
 * need only change their import, not their JSX. Inertia's own Link uses
 * `href` instead of `to`.
 */
export interface LinkProps extends Omit<InertiaLinkProps, 'href'> {
  to: string;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { to, ...props },
  ref
) {
  return <InertiaLink ref={ref} href={to} {...props} />;
});
