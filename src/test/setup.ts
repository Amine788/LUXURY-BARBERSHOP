import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Cleanup DOM after each test
afterEach(() => {
  cleanup();
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = MockIntersectionObserver as any;

// Mock fetch globalement pour tous les tests (remplace Supabase)
global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: async () => ([]),
}) as any;
