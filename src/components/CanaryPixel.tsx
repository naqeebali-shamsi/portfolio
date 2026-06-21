import { CANARY_PIXEL_URL } from '@/lib/attribution';

/**
 * Invisible canary tracking pixel. When a verbatim copy of a page is loaded anywhere,
 * the canarytokens.org image URL fires and emails the loader's IP / host / user-agent
 * — the highest-confidence detector for "someone cloned my page and is serving it."
 *
 * Positioned 1px off-screen (NOT display:none) so browsers actually fetch it; a
 * display:none image may never be requested, which would defeat the canary. Renders
 * nothing until a token URL is configured in src/lib/attribution.ts.
 */
export default function CanaryPixel() {
  if (!CANARY_PIXEL_URL) return null;
  return (
    <img
      src={CANARY_PIXEL_URL}
      alt=""
      width={1}
      height={1}
      aria-hidden="true"
      decoding="async"
      style={{ position: 'absolute', left: '-9999px', top: 0, width: 1, height: 1, opacity: 0 }}
    />
  );
}
