import { useState, useCallback, useRef } from 'react';

export function useCopyToClipboard(resetDelay = 2000) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => setCopied(false), resetDelay);

        return true;
      } catch (error) {
        console.error('Failed to copy to clipboard:', error);
        return false;
      }
    },
    [resetDelay],
  );

  return { copied, copy };
}
