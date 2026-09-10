import { usePage } from '@inertiajs/react';
import type { SharedPageProps } from '../types/nav';

/** Reads the server-resolved nav data shared on every Inertia response - no client fetch needed. */
export function useNav() {
  return usePage<SharedPageProps>().props.nav;
}
