/**
 * Share URL builders for the ShareBar component.
 *
 * Facebook and Twitter/X both have stable, documented web share-intent
 * URLs that open a pre-filled share dialog. Instagram has NO equivalent —
 * it doesn't support sharing an arbitrary link via a URL scheme on web by
 * design (Instagram's sharing model is app-and-clipboard based, not
 * link-based). Rather than fake a button that silently does nothing, the
 * Instagram action here copies the link to the clipboard and tells the
 * person to paste it into their Instagram bio/story/DM — the actual real
 * workaround people use, instead of a dead link.
 */

export function buildFacebookShareUrl(pageUrl: string): string {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
}

export function buildTwitterShareUrl(pageUrl: string, text: string): string {
  const params = new URLSearchParams({ url: pageUrl, text });
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

/** Copies the current page URL to the clipboard. Returns whether it succeeded — clipboard access can be denied by browser permissions. */
export async function copyLinkToClipboard(url: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch {
    return false;
  }
}