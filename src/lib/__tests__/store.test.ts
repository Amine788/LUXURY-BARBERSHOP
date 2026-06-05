import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getBarbersSync,
  getContactPhoneSync,
  login,
  logout,
  isAuthenticated,
  DEFAULT_BARBERS
} from '../store';

// Mock fetch pour simuler les réponses de l'API PHP
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('Store', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    // Par défaut, fetch échoue pour forcer le fallback localStorage
    mockFetch.mockRejectedValue(new Error('API not available'));
  });

  it('should return default barbers when localStorage is empty', () => {
    const barbers = getBarbersSync();
    expect(barbers).toEqual(DEFAULT_BARBERS);
  });

  it('should return default contact phone', () => {
    const phone = getContactPhoneSync();
    expect(phone).toBe('212659659715');
  });

  describe('Auth', () => {
    it('should login with correct password via API', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ value: 'aviator2024' }),
      });
      const result = await login('aviator2024');
      expect(result).toBe(true);
      expect(isAuthenticated()).toBe(true);
    });

    it('should fallback to hardcoded password when API fails', async () => {
      mockFetch.mockRejectedValue(new Error('API not available'));
      const result = await login('aviator2024');
      expect(result).toBe(true);
      expect(isAuthenticated()).toBe(true);
    });

    it('should fail login with incorrect password', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ value: 'aviator2024' }),
      });
      const result = await login('wrongpassword');
      expect(result).toBe(false);
      expect(isAuthenticated()).toBe(false);
    });

    it('should logout correctly', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ value: 'aviator2024' }),
      });
      await login('aviator2024');
      expect(isAuthenticated()).toBe(true);
      logout();
      expect(isAuthenticated()).toBe(false);
    });
  });
});
