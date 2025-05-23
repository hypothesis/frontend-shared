import { SummaryReporter } from '@hypothesis/frontend-testing/vitest';
import { defineConfig } from 'vitest/config';

import { excludeFromCoverage } from './rollup-tests.config.js';

export default defineConfig({
  test: {
    globals: true,
    reporters: [new SummaryReporter()],

    browser: {
      provider: 'playwright',
      enabled: true,
      headless: true,
      screenshotFailures: false,
      instances: [{ browser: 'chromium' }],
    },

    // CSS bundle relied upon by accessibility tests (eg. for color-contrast
    // checks).
    setupFiles: './build/styles/test.css',
    include: [
      // Test bundle
      './build/scripts/tests.bundle.js',
    ],

    coverage: {
      enabled: true,
      provider: 'istanbul',
      reportsDirectory: './coverage',
      reporter: ['json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: excludeFromCoverage,
    },
  },
});
