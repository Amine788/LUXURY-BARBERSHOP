import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AdminLogin } from '../AdminLogin';
import * as store from '../../../lib/store';

// Mock store
vi.mock('../../../lib/store', () => ({
  login: vi.fn(),
  verifyOTP: vi.fn(),
}));

describe('AdminLogin Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form', () => {
    render(<AdminLogin onLogin={() => {}} />);
    expect(screen.getByPlaceholderText('Entrez le mot de passe')).toBeInTheDocument();
  });

  it('calls onLogin on successful direct login', async () => {
    vi.mocked(store.login).mockResolvedValue({ success: true, requireOTP: false });
    const mockOnLogin = vi.fn();

    render(<AdminLogin onLogin={mockOnLogin} />);

    const input = screen.getByPlaceholderText('Entrez le mot de passe');
    fireEvent.change(input, { target: { value: 'correct-pass' } });
    
    const button = screen.getByTestId('login-button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(store.login).toHaveBeenCalledWith('correct-pass');
      expect(mockOnLogin).toHaveBeenCalled();
    });
  });

  it('transitions to OTP step when requireOTP is true and handles verification', async () => {
    vi.mocked(store.login).mockResolvedValue({
      success: true,
      requireOTP: true,
      maskedEmail: 'ad***@barber.com',
      expiresIn: 300,
    });
    vi.mocked(store.verifyOTP).mockResolvedValue({ success: true });
    
    const mockOnLogin = vi.fn();
    render(<AdminLogin onLogin={mockOnLogin} />);

    // Enter password
    const pwdInput = screen.getByPlaceholderText('Entrez le mot de passe');
    fireEvent.change(pwdInput, { target: { value: 'correct-pass' } });
    fireEvent.click(screen.getByTestId('login-button'));

    // Verify it transitioned to OTP screen
    await waitFor(() => {
      expect(screen.getByText(/ad\*\*\*@barber.com/)).toBeInTheDocument();
      expect(screen.getByPlaceholderText('000000')).toBeInTheDocument();
    });

    // Enter OTP
    const otpInput = screen.getByPlaceholderText('000000');
    fireEvent.change(otpInput, { target: { value: '123456' } });
    fireEvent.click(screen.getByTestId('login-button'));

    await waitFor(() => {
      expect(store.verifyOTP).toHaveBeenCalledWith('123456');
      expect(mockOnLogin).toHaveBeenCalled();
    });
  });

  it('shows error message on incorrect password', async () => {
    vi.mocked(store.login).mockResolvedValue({
      success: false,
      error: 'Mot de passe incorrect',
      attemptsLeft: 3,
    });

    render(<AdminLogin onLogin={() => {}} />);

    const pwdInput = screen.getByPlaceholderText('Entrez le mot de passe');
    fireEvent.change(pwdInput, { target: { value: 'wrong-pass' } });
    fireEvent.click(screen.getByTestId('login-button'));

    await waitFor(() => {
      expect(screen.getByText(/Mot de passe incorrect/)).toBeInTheDocument();
      expect(screen.getByText(/\(3 tentatives restantes\)/)).toBeInTheDocument();
    });
  });
});
