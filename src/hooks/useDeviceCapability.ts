import { useState } from 'react';

interface NavigatorExtended extends Navigator {
  deviceMemory?: number;
}

function detectCapability(): boolean {
  const nav = navigator as NavigatorExtended;
  const cores = nav.hardwareConcurrency ?? 0;
  // deviceMemory is Chromium-only; Safari/Firefox don't expose it — default to capable
  const memory = nav.deviceMemory ?? 8;
  return cores >= 4 && memory >= 4;
}

export function useDeviceCapability() {
  const [canRender3D] = useState(detectCapability);
  return { canRender3D } as const;
}
