import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getBarbersSync,
  getContactPhoneSync,
  login,
  verifyOTP,
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
    sessionStorage.clear();
    vi.clearAllMocks();
    // Par défaut, fetch échoue pour simuler une indisponibilité API
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
    it('should trigger OTP request on correct password via API', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ requireOTP: true, maskedEmail: 'am***@gmail.com', expiresIn: 300 }),
      });
      const result = await login('aviator2024');
      expect(result.success).toBe(true);
      expect(result.requireOTP).toBe(true);
      expect(result.maskedEmail).toBe('am***@gmail.com');
      expect(result.expiresIn).toBe(300);
      expect(isAuthenticated()).toBe(false); // Pas connecté tant que l'OTP n'est pas validé
    });

    it('should handle API failures and return error object', async () => {
      mockFetch.mockRejectedValue(new Error('API not available'));
      const result = await login('aviator2024');
      expect(result.success).toBe(false);
      expect(result.error).toContain('inaccessible');
      expect(isAuthenticated()).toBe(false);
    });

    it('should fail login with incorrect password', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({ error: 'Mot de passe incorrect', attemptsLeft: 3 }),
      });
      const result = await login('wrongpassword');
      expect(result.success).toBe(false);
      expect(result.error).toBe('Mot de passe incorrect');
      expect(result.attemptsLeft).toBe(3);
      expect(isAuthenticated()).toBe(false);
    });

    it('should authenticate successfully when OTP is verified', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ token: 'mock.jwt.token' }),
      });
      const result = await verifyOTP('123456');
      expect(result.success).toBe(true);
      expect(isAuthenticated()).toBe(true);
    });

    it('should fail OTP verification with incorrect code', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({ error: 'Code incorrect', locked: false }),
      });
      const result = await verifyOTP('000000');
      expect(result.success).toBe(false);
      expect(result.error).toBe('Code incorrect');
      expect(isAuthenticated()).toBe(false);
    });

    it('should logout correctly', async () => {
      // Pré-remplir le localStorage pour simuler un état connecté
      localStorage.setItem('aviator_admin_auth', 'true');
      localStorage.setItem('aviator_admin_token', 'mock.jwt.token');
      expect(isAuthenticated()).toBe(true);

      logout();
      expect(isAuthenticated()).toBe(false);
    });
  });
});
