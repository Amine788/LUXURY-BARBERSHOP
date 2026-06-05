import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getBarbersSync,
  getContactPhoneSync,
  login,
  logout,
  isAuthenticated,
  DEFAULT_BARBERS
} from '../store';

vi.mock('../db', () => ({
  supabase: null,
  isSupabaseReady: false
}));

describe('Store', () => {
  beforeEach(() => {
    localStorage.clear();
    // Clear all mocks if any
    vi.clearAllMocks();
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
    it('should login with correct password', async () => {
      // Assuming 'aviator2024' is the default fallback password when Supabase is not configured
      const result = await login('aviator2024');
      expect(result).toBe(true);
      expect(isAuthenticated()).toBe(true);
    });

    it('should fail login with incorrect password', async () => {
      const result = await login('wrongpassword');
      expect(result).toBe(false);
      expect(isAuthenticated()).toBe(false);
    });

    it('should logout correctly', async () => {
      await login('aviator2024');
      expect(isAuthenticated()).toBe(true);
      logout();
      expect(isAuthenticated()).toBe(false);
    });
  });
});
