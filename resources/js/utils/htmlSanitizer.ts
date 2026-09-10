import createDOMPurify from 'dompurify';

/**
 * Isomorphic DOMPurify instance: a real `window` in the browser, `linkedom`
 * (not jsdom) during SSR.
 *
 * jsdom was the original choice here (via isomorphic-dompurify) but its
 * main entry unconditionally `require("undici")` the moment it's imported -
 * undici's HTTP parser is WebAssembly-compiled, and on some restrictive
 * hosting environments (confirmed on the IONOS deploy target) even a tiny
 * WebAssembly.Memory allocation fails outright, crashing the SSR server on
 * startup before it ever handles a request. linkedom is a lightweight,
 * dependency-free DOM implementation with no networking/undici dependency
 * at all - a well-established pairing with DOMPurify for Node-side
 * sanitization specifically because of jsdom's weight.
 */
let purify: ReturnType<typeof createDOMPurify>;

if (typeof window !== 'undefined') {
  purify = createDOMPurify(window);
} else {
  const { parseHTML } = await import('linkedom');
  const { window: fakeWindow } = parseHTML('<!doctype html><html><body></body></html>');
  purify = createDOMPurify(fakeWindow as unknown as Window);
}

export default purify;
