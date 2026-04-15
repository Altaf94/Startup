'use client';

import { useEffect } from 'react';
import { initializeSecurityMeasures } from '@/app/lib/security';

export default function SecurityInit() {
  useEffect(() => {
    // Initialize security measures on client side
    initializeSecurityMeasures();
  }, []);

  return null;
}
