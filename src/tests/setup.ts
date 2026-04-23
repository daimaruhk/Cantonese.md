import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Stub browser APIs not available in jsdom
if (typeof window !== 'undefined') {
  window.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
  HTMLElement.prototype.scrollIntoView = vi.fn();
}

afterEach(() => {
  cleanup();
});
