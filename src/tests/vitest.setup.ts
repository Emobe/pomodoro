import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

afterEach(() => {
  // Clean up the DOM after each test to prevent memory leaks
  cleanup();
});