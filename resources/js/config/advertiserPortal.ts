/**
 * The self-service advertiser portal (register/login/book airtime/manage
 * campaigns) deliberately still lives in ghanatalksradio-portal, not
 * here - it's tightly coupled to the operational Advertising data
 * (Campaign, AdCreative, StreamAdDecisionController, the HLS pipeline)
 * that also lives there, and that portal is becoming the one shared,
 * multi-tenant backend for every tenant station. This site's job is just
 * the top-of-funnel entry point (a "Get started" button) that links out
 * to it - see Modules/Sales/routes/web.php on the portal side for the
 * route this points at. No "Sign in" link here by design - existing
 * advertisers sign in directly on the portal, not via this site.
 *
 * Reuses VITE_PORTAL_API_URL rather than a separate env var - same
 * origin the API client files already call.
 */
const PORTAL_BASE_URL =
  (import.meta.env.VITE_PORTAL_API_URL as string | undefined)?.replace(/\/$/, '') ||
  'https://app.ghanatalksradio.com';

export const ADVERTISER_PORTAL_URLS = {
  getStarted: `${PORTAL_BASE_URL}/portal/register`,
};
