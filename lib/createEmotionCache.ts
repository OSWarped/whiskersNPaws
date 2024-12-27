import createCache from '@emotion/cache';

const isBrowser = typeof document !== 'undefined';

export default function createEmotionCache() {
  return createCache({
    key: 'css',
    prepend: true, // Ensures MUI styles are loaded first
    container: isBrowser
      ? document.querySelector('meta[name="emotion-insertion-point"]') ?? undefined
      : undefined,
  });
}
